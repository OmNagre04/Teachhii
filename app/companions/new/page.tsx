import CompanionForm from "@/components/CompanionForm"
import { newCompanionPermission } from "@/lib/actions/companion.actions";
import { auth } from "@clerk/nextjs/server"
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const NewCompanion = async () => {
  const { userId } = await auth();
  if ( !userId ) redirect("/sign-in");
  const canCreatCompanion = await newCompanionPermission();
  
  return (
    <main className="items-center justify-center min-lg:w-1/3 min-md:w-2/3">
      { canCreatCompanion ? (<article className="w-full flex flex-col">
        <h1>Companion Builder</h1>

        <CompanionForm />
      </article>) : ( 
          <article className="companion-limit">
              <Image src="/images/limit.svg" alt="Companion Limit Reached" width={360} height={230}/>
              <div className="cta-badge">
                Upgrade Your Plan
              </div>
              <h1>Your Reched Your Limit</h1>
              <p>You’ve reached your companion limit. Upgrade to create more companions and premium features.</p>
              <Link href="/subscription" className="btn btn-primary w-full justify-center">
                Upgrade My Plan
              </Link>
          </article>)
      }
    </main>
  )
}

export default NewCompanion
