import CompanionForm from "@/components/CompanionForm"

const NewCompanion = () => {
  return (
    <main className="items-center justify-center min-lg:w-1/3 min-md:w-2/3">
      <article className="w-full flex flex-col">
        <h1>Companion Builder</h1>

        <CompanionForm />
      </article>
    </main>
  )
}

export default NewCompanion
