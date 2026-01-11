'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const services = [
  {
    icon: 'https://uploads-ssl.webflow.com/664ad14438ed2d6b390c3f9e/66962eeabe05e5e3a22c2bcd_course.png',
    title: 'Course Info',
    details: 'We provide real, valid and objective course information to help students plan each semester intelligently.',
    link: '/courses'
  },
  {
    icon: 'https://uploads-ssl.webflow.com/664ad14438ed2d6b390c3f9e/66962fcbf5fb75bf61749297_news.png',
    title: 'News',
    details: 'Synchronized with the official college news and updated with upcoming school events.',
    link: '#'
  },
  {
    icon: 'https://cdn.prod.website-files.com/664ad14438ed2d6b390c3f9e/66962fdacb673dc0a79107dc_postbar.png',
    title: 'Postbar',
    details: 'Provide a communication platform for students to help each other',
    link: '/forum'
  },
  {
    icon: 'https://uploads-ssl.webflow.com/664ad14438ed2d6b390c3f9e/66962fe7c10a34a36ccf7618_dinning.png',
    title: 'Dinning',
    details: 'Updated daily school menus and patronage',
    link: '/dining'
  },
  {
    icon: 'https://uploads-ssl.webflow.com/664ad14438ed2d6b390c3f9e/66962ff2b0cc585972657e09_map.png',
    title: 'Map',
    details: 'Clear school navigation with marked Key building in NYU.',
    link: '/map'
  },
  {
    icon: 'https://uploads-ssl.webflow.com/664ad14438ed2d6b390c3f9e/6698e1aa86b8fa9393d970ad_%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20240718173208.png',
    title: 'AI Support',
    details: 'If anything bothers you, just ask it.',
    link: '/AI'
  }
]

export default function Services() {
  return (
    <section className="section services">
      <div className="w-layout-blockcontainer container w-container">
        <div className="services-wrapper">
          <div className="section-top-wrap services-home">
            <div className="section-name-wrap">
              <Image 
                src="/images/f98679793aec94d11bbf2547234b8c2.png"
                alt="Section Logo"
                width={34}
                height={34}
                className="section-top-icon"
              />
              <div className="section-name">Services</div>
            </div>
            <div className="section-number-wrap">
              <div className="section-number active">1</div>
              <div className="section-number">/</div>
              <div className="section-number">5</div>
            </div>
          </div>

          <div className="section-title-wrap services-v1">
            <h2 className="section-title services">Our Educational Services</h2>
            <Link href="/courses" className="secondary-button-wrapper two">
              <div className="primary-button-text">All Services</div>
              <div className="primary-button-arrow" />
            </Link>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="services-wrap"
          >
            <div className="services-grid-wrap-v1">
              {services.map((service, index) => (
                <Link 
                  key={index} 
                  href={service.link}
                  className="services-single-wrap"
                >
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="service-content"
                  >
                    <div className="services-icon-wrap">
                      <Image 
                        src={service.icon}
                        alt={service.title}
                        width={60}
                        height={60}
                        className="services-icon"
                        unoptimized
                      />
                    </div>
                    <h3 className="services-title">{service.title}</h3>
                    <p className="services-details">{service.details}</p>
                  </motion.div>
                </Link>
              ))}
            </div>
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
          className="service-shape"
          width={1920}
          height={100}
        />
      </motion.div>
    </section>
  )
}
