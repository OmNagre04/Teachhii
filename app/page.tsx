import CompanionCard from "@/components/CompanionCard";
import CompanionList from "@/components/CompanionList";
import CTA from "@/components/CTA";
import { recentSessions } from "@/constants";

const Page = () => {
  return (
    <main>
      <h1>Popular Companions</h1>
      <section className="home-section">
        <CompanionCard 
          id="123"
          name="Neura the Brainy Explorer"
          topic="Neural Network of the Brain"
          duration={45}
          subject="Science"
          color="#E5D0FF"
        />
        <CompanionCard 
          id="456"
          name="Countsy the Number Wizard"
          topic="Derivatives & Integrals"
          duration={30}
          subject="Maths"
          color="#FFDA6E"
        />
        <CompanionCard 
          id="789"
          name="Verba the Vocabulary Builder"
          topic="English Literature "
          duration={30}
          color="#BDE7FF"
          subject="Language"
        />
      </section>
      <section className="home-section">
        <CompanionList 
          title="Recently Completed Sessions"
          companions={recentSessions}
          classNames="w-2/3 max-lg:w-full"
        />
        <CTA />
      </section>
    </main>
  );
};

export default Page;
