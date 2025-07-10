import Image from "next/image";
import Link from "next/link";

interface CompanionCardsProps {
    id: string;
    name: string;
    subject: string;
    duration: number;
    topic: string;
    color: string;
}
const CompanionCard = ({id, name, duration, color, subject, topic} : CompanionCardsProps) => {
  return (
    <article className="companion-card" style={{backgroundColor: color}}>
        <div className="flex items-center justify-between">
            <div className="subject-badge">
                {subject}
            </div>
            <button className="companion-bookmark">
                <Image src="/icons/bookmark.svg" alt="bookmark" width={12.5} height={15}/>
            </button>
        </div>

        <h2 className="text-2xl font-bold">{name}</h2>
        <p className="text-sm">Topic : {topic}</p>
        <div className="flex items-center gap-2">
            <Image src="/icons/clock.svg" alt="Duration" height={13.5} width={13.5}/>
            <p className="text-sm">{duration} minutes</p>
        </div>
        <Link href={`/companions/${id}`} className="w-full ">
            <button className="btn-primary w-full justify-center">
                Launch Lesson
            </button>
        </Link>
    </article>
  )
}

export default CompanionCard
