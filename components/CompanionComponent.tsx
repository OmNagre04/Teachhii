/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}
import { cn, configureAssistant, getSubjectColor } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import soundwaves from "@/constants/soundwaves.json";

const CompanionComponent = ({
  companionId,
  userName,
  userImage,
  style,
  voice,
  name,
  subject,
  topic,    
}: CompanionComponentProps) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);

  const [speaking, setSpeaking] = useState(false);

  const [isMuted, setisMuted] = useState(false);

  const [messages, setMessages] = useState<SavedMessage[]>([]);

  const LottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (LottieRef) {
      if (speaking) {
        LottieRef.current?.play();
      } else {
        LottieRef.current?.stop();
      }
    }
  }, [speaking, LottieRef]);

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);

    const onCallEnd = () => setCallStatus(CallStatus.FINISHED);

    const onMessage = (message: Message) => {
      if(message.type === 'transcript' && message.transcriptType === 'final'){
        const newMessage = { role: message.role, content: message.transcript};
        setMessages((prev) => [newMessage, ...prev]);

      }
    };

    const onSpeechStart = () => setSpeaking(true);

    const onSpeechEnd = () => setSpeaking(false);

    const onError = (error: Error) => console.log("Error", error);

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  const toggleMicrophone = () => {
    const isMuted = vapi.isMuted();
    vapi.setMuted(!isMuted);
    setisMuted(!isMuted);
  };

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    const assistantOverrides = {
      variableValues : {
        subject, style, topic
      },
      clientMessages: ['transcript'],
      serverMessages: []
    }
    // @ts-expect-error
    vapi.start(configureAssistant(voice, style), assistantOverrides)

  }

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();

  }

  return (
    <section className="flex flex-col h-[70vh]">
      <section className="flex gap-8 max-sm:flex-col">
        <div className="companion-section">
          <div
            className="companion-avatar"
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <div
              className={cn(
                "absolute transition-opacity duration-1000",
                callStatus === CallStatus.FINISHED ||
                  callStatus === CallStatus.INACTIVE
                  ? "opacity-100"
                  : "opacity-0",
                callStatus === CallStatus.CONNECTING &&
                  "opacity-100 animate-pulse"
              )}
            >
              <div className="relative w-[70px] h-[70px] sm:w-[150px] sm:h-[150px]">
                <Image
                  src={`/icons/${subject}.svg`}
                  alt={subject}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div
              className={cn(
                "absolute transition-opacity duration-1000",
                callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0"
              )}
            >
              <Lottie
                lottieRef={LottieRef}
                animationData={soundwaves}
                autoplay={false}
                className="companion-lottie"
              />
            </div>
          </div>
          <p className="font-bold text-2xl">{name}</p>
        </div>
        <div className="user-section">
          <div className="user-avatar">
            <Image
              src={userImage}
              alt={userName}
              width={130}
              height={130}
              className="rounded-lg"
            />
            <p className="font-bold text-2xl">{userName}</p>
          </div>
          <button className="btn-mic" onClick={toggleMicrophone} disabled={callStatus !==  CallStatus.ACTIVE}>
            <Image
              src={isMuted ? "/icons/mic-off.svg" : "/icons/mic-on.svg"}
              alt="mic"
              width={36}
              height={36}
            />
            <p className="max-sm:hidden">
              {isMuted ? "Turn off microphone" : "Turn on microphone"}
            </p>
          </button>
          <button
            className={cn(
              "rounded-lg py-2 cursor-pointer transition-colors w-full text-white",
              callStatus === CallStatus.ACTIVE ? "bg-red-700" : "bg-primary",
              callStatus === CallStatus.CONNECTING && "animate-pulse"
            )} onClick={ callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}
          >
            {callStatus === CallStatus.ACTIVE
              ? "End Session"
              : callStatus === CallStatus.CONNECTING
              ? "Connecting..."
              : "Start Session"}
          </button>
        </div>
      </section>

      <section className="transcript">
        <div className="transcript-message no-srollbar">
          {messages.map((message, index) =>  {
            if(message.role === "assistant"){
              return (
                <p key={index} className="max-sm:text-sm">
                  {name
                  .split(' ')[0]
                  .replace('/[.,]/g,',' ')
                  }: {message.content}</p>
              )
            } else {
              return(<p key={index} className="text-primary max-sm:text-sm">
                {userName}: {message.content}
              </p>)
            }
          })}
        </div>
        <div className="transcript-fade"/>

      </section>
    </section>
  );
};

export default CompanionComponent;
