import CompanionCard from "@/components/CompanionCard";
import CompanionList from "@/components/CompanionList";
import CTA from "@/components/CTA";
import { getAllCompanions, getSessionHistory } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";

const Page = async () => {
  const companions = await getAllCompanions({limit: 3});
  const recentSessionsCompanions = await getSessionHistory({limit:10});
  return (
    <main>
      <h1>Popular Companions</h1>
      <section className="home-section">
        {companions.map((companion) => (
          <CompanionCard 
          key={companion.id}
          {...companion}
          color={getSubjectColor(companion.subject)}
        />
        ))}
        
      </section>
      <section className="home-section">
        <CompanionList 
          title="Recently Completed Sessions"
          companions={recentSessionsCompanions}
          classNames="w-2/3 max-lg:w-full"
        />
        <CTA />
      </section>
    </main>
  );
};

export default Page;
