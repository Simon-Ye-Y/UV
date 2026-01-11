'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const works = [
  {
    image: '/images/Campus.png',
    title: 'Course Search',
    details: 'Find and plan your courses easily',
    category: 'Academic'
  },
  {
    image: '/images/Academic.png',
    title: 'Campus Navigation',
    details: '3D interactive campus map',
    category: 'Navigation'
  },
  {
    image: '/images/Career.png',
    title: 'Student Forum',
    details: 'Connect with your peers',
    category: 'Community'
  }
]

export default function Works() {
  return (
    <section className="section works-v1">
      <div className="w-layout-blockcontainer container w-container">
        <div className="works-v1-wrapper">
          <div className="section-top-wrap works-v1">
            <div className="section-name-wrap">
              <Image 
                src="/images/f98679793aec94d11bbf2547234b8c2.png"
                alt="Section Logo"
                width={34}
                height={34}
                className="section-top-icon"
              />
              <div className="section-name">Highlight</div>
            </div>
            <div className="section-number-wrap">
              <div className="section-number active">3</div>
              <div className="section-number">/</div>
              <div className="section-number">5</div>
            </div>
          </div>

          <div className="section-title-wrap works-v1">
            <h2 className="section-title works-v1">Our Advancing Technologies</h2>
          </div>

          <div className="works-v1-wrap">
            <div className="works-v1-grid-wrap">
              {works.map((work, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="works-v1-single-wrap"
                >
                  <div className="works-v1-image-wrap">
                    <Image 
                      src={work.image}
                      alt={work.title}
                      width={300}
                      height={300}
                      className="works-v1-image"
                    />
                  </div>
                  <div className="works-v1-details-wrap">
                    <div className="works-v1-button-wrap">
                      <Link href="#" className="works-v1-btn-link">
                        {work.category}
                      </Link>
                    </div>
                    <h3 className="works-v1-title">{work.title}</h3>
                    <p className="works-v1-details">{work.details}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="secondary-button-wrap works-v1"
          >
            <Link href="/projects" className="secondary-button-wrapper two">
              <div className="primary-button-text">View All</div>
              <div className="primary-button-arrow" />
            </Link>
          </motion.div>
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Image 
          src="/images/Service-Shape.svg"
          alt="Service Shape"
          className="work-shape"
          width={1920}
          height={100}
        />
      </motion.div>
    </section>
  )
}
