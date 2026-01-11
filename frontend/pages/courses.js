import Head from 'next/head';
import Image from 'next/image'

import Navbar from '../components/Navbar/Navbar'

export default function Courses() {
    // 模拟课程数据
    const courses = [
        {
            title: 'Introduction to Programming',
            description: 'Learn the basics of programming with Python.',
            image: '/images/Academic.png',
        },
        {
            title: 'Data Structures and Algorithms',
            description: 'Explore efficient data organization and manipulation.',
            image: '/images/Campus.png',
        },
        {
            title: 'Web Development',
            description: 'Build modern web applications using HTML, CSS, and JavaScript.',
            image: '/images/Career.png',
        },
        {
            title: 'Machine Learning Basics',
            description: 'Understand the fundamentals of machine learning and its applications.',
            image: '/images/Work.svg',
        },
    ];

    return (
        <>
            <Head>
                <title>Courses</title>
                <meta
                    name="description"
                    content="Explore a variety of courses designed to enhance your knowledge and skills."
                />
            </Head>
            <Navbar />
            <section>
                <h1 className="heading-14 commonheading">Our Courses</h1>
                <div className="div-block-16">
                    <h2 className="heading-17">
                        Discover a wide range of courses tailored to meet your learning goals.
                    </h2>
                </div>
            </section>
            <div>
                <h3 className="heading-18">Available Courses:</h3>
                <div className="w-layout-grid grid">
                    {courses.map((course, index) => (
                        <div key={index} className="w-layout-blockcontainer course-card w-container">
                            <Image
                                src={course.image}
                                alt={course.title}
                                width={320}
                                height={180}
                                className="course-image"
                            />
                            <h4 className="course-title">{course.title}</h4>
                            <p className="course-description">{course.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            <style jsx>{`
                .grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 20px;
                    margin: 20px 0;
                }
                .course-card {
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    padding: 16px;
                    text-align: center;
                    transition: transform 0.3s, box-shadow 0.3s;
                }
                .course-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                .course-image {
                    width: 100%;
                    height: 150px;
                    object-fit: cover;
                    border-radius: 8px;
                }
                .course-title {
                    font-size: 1.2rem;
                    margin: 10px 0;
                }
                .course-description {
                    font-size: 1rem;
                    color: #555;
                }
            `}</style>
        </>
    );
}
