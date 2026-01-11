import Head from 'next/head'
import Navbar from '../components/Navbar/Navbar'
import FooterSection from '../components/FooterSection'

const sampleProjects = [
  {
    title: 'Campus Navigator',
    description: 'Routing, campus highlights, and signaled spaces for every visitor.',
  },
  {
    title: 'Community Forum',
    description: 'An inclusive space for students to ask questions and share knowledge.',
  },
  {
    title: 'AI Study Advisor',
    description: 'A learning companion that breaks down curricula and learning paths.',
  },
]

export default function Projects() {
  return (
    <>
      <Head>
        <title>Projects</title>
        <meta name="description" content="Featured initiatives that help NYU students thrive." />
      </Head>

      <div className="page-wrapper">
        <Navbar />
        <main className="section projects">
          <div className="section-title-wrap services-v1">
            <h1 className="section-title">Live Initiatives</h1>
            <p className="section-description">Learn how Campus UV brings intelligence to campus services.</p>
          </div>

          <div className="w-layout-grid grid">
            {sampleProjects.map((project) => (
              <article key={project.title} className="works-v1-single-wrap">
                <h2 className="works-v1-title">{project.title}</h2>
                <p className="works-v1-details">{project.description}</p>
              </article>
            ))}
          </div>
        </main>
        <FooterSection />
      </div>
    </>
  )
}
