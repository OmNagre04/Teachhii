import Image from "next/image"
import Link from "next/link"

const CTA = () => {
  return (
    <section className="cta-section">
      <div className="cta-badge">Start Learning Your Way.</div>
      <h2 className="text-3xl font-bold">
        Build & Personlize Learning Companion
      </h2>
      <p>Pick a name, subject, voice, & personality — and start learning through voice conversations that feel natural and fun.</p>
      <Image src={`/images/cta.svg`} alt="cta" height={232} width={336}/>
      <button className="btn-primary">
        <Image src={`/icons/plus.svg`} alt="plus" width={14} height={14}/>
        <Link href={`/companions/new`}>Build a New Companion</Link>
      </button>
    </section>
  )
}

export default CTA
