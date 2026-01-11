import Head from 'next/head';
import Navbar from '../components/Navbar/Navbar';
import Image from 'next/image';

export default function AI() {
    const features = [
        {
            title: 'Academic Excellence',
            description: 'Personalized study support and course material guidance.',
            style: 'bg1',
        },
        {
            title: 'Research Efficiency',
            description: 'Seamless access to NYU library resources and citation tools.',
            style: 'bg2',
        },
        {
            title: 'Campus Life Management',
            description: 'Up-to-date campus information, event reminders, and student service assistance.',
            style: 'bg3',
        },
        {
            title: 'Career Development',
            description: 'Tailored career advice, resume building, and job search tools.',
            style: 'bg4',
        },
    ];

    return (
        <>
            <Head>
                <title>AI-Chatbot</title>
                <meta
                    name="description"
                    content="Empowering NYU students with an intelligent assistant designed to streamline academic success."
                />
            </Head>
            <Navbar />
            <section>
                <h1 className="heading-14 commonheading">AI Assistants</h1>
                <div className="div-block-16">
                    <a
                        href="https://chatgpt.com/g/g-vMed5r9Ot-nyu-student-assistant-gpt"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-block-2 w-inline-block"
                    >
                        <Image
                            src="/images/ai_link.png"
                            alt="AI Assistant"
                            width={400}
                            height={320}
                            priority
                        />
                    </a>
                    <h2 className="heading-17">
                        Empowering NYU students with an intelligent assistant designed to streamline academic success,
                        enhance research efficiency, and simplify campus life management.
                    </h2>
                </div>
            </section>
            <div>
                <h3 className="heading-18">Key Features:</h3>
                <div className="w-layout-grid grid">
                    {features.map((feature, index) => (
                        <div key={index} className={`w-layout-blockcontainer keyFeature ${feature.style} w-container`}>
                            <h4 className="keyheading">{feature.title}</h4>
                            <p className="keyParagraph">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
