'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function About() {
  return (
    <div className="section about">
      <div className="w-layout-blockcontainer container w-container">
        {/* About Section */}
        <div className="about-section">
          <div className="section-top-wrap about">
            <div className="section-name-wrap">
              <Image 
                src="/images/f98679793aec94d11bbf2547234b8c2.png"
                alt="Section Logo"
                width={34}
                height={34}
                className="section-top-icon"
              />
              <div className="section-name">About</div>
            </div>
            <div className="section-number-wrap">
              <div className="section-number active">2</div>
              <div className="section-number">/</div>
              <div className="section-number">5</div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="section-content-wrap"
          >
            <div className="about-v1-details">
              Ultra Violet is an App that facilitates academic as well as campus life for NYU students. 
              Our app allows students to get information about essentially all NYU courses, including but 
              not limited to course descriptions, fulfillment of field requirements, and GPA distribution. 
              A one-stop collection of essential websites (course selection, assignments, grading websites) 
              and one-stop study aids websites. Also a one-stop view of library crowding (per floor), and 
              room reservations and crowding in each cafeteria is available in the APP.
              <br/><br/>
              Similarly, we provide a map in the APP that can quickly retrieve the school building, so that 
              students can quickly find the corresponding building. Our forum is a platform for NYU students 
              to help each other, we link all students from different regions and majors together by college basis. 
              We will be the first to disseminate important news and events happening on campus.
            </div>
          </motion.div>
        </div>

        {/* Logo Section */}
        <div className="section logo">
          <div className="section-top-wrap about">
            <div className="section-name-wrap">
              <Image 
                src="/images/f98679793aec94d11bbf2547234b8c2.png"
                alt="Section Logo"
                width={34}
                height={34}
                className="section-top-icon"
              />
              <div className="section-name">Logo</div>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="section-content-wrap logo-content-wrap"
          >
            <div className="logo-flex-container">
              <div className="about-v1-details logo-text">
                Our logo is inspired by NYU&apos;s emblem, the torch, and we put the letter U upside down 
                on top of the letter V to make an ice cream style logo, symbolizing that students use 
                UV to make their study life simple and easy (torch to ice cream).
              </div>
              
              <div className="logo-image-wrap">
                <Image 
                  src="/images/logo1.png"
                  alt="UV Logo"
                  width={296}
                  height={296}
                  className="logo-image"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .section {
          padding: 2rem 0;
        }

        .section.about {
          padding-top: 4rem;
        }

        .section.logo {
          margin-top: 4rem;
        }

        .section-content-wrap {
          margin-top: 2rem;
          width: 100%;
          padding: 0 2rem;
        }

        .logo-flex-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12rem;
          padding-right: 1rem;
          margin: 0 auto;
          max-width: 1400px;
          position: relative;
          left: 12.5%;
        }

        .about-v1-details {
          line-height: 1.8;
          color: #bfa2db;
          font-size: 1.3rem;
          text-align: left;
          letter-spacing: 1.25px;
          width: 75%;
        }

        .logo-text {
          flex: 2;
        }

        .logo-image-wrap {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin-right: -25%;
          transform: translateX(5rem);
        }

        .logo-image {
          transition: transform 0.3s ease;
        }

        .logo-image:hover {
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          .section.about {
            padding-top: 3rem;
          }

          .section.logo {
            margin-top: 3rem;
          }

          .section-content-wrap {
            padding: 0 1.5rem;
          }

          .logo-flex-container {
            flex-direction: column;
            gap: 1.5rem;
            left: 7.5%;
          }

          .about-v1-details {
            font-size: 1.1rem;
            width: 85%;
          }

          .logo-image-wrap {
            margin-right: -7.5%;
          }
        }

        @media (max-width: 479px) {
          .section {
            padding: 1.5rem 0;
          }

          .section.about {
            padding-top: 2.5rem;
          }

          .section.logo {
            margin-top: 2.5rem;
          }

          .section-content-wrap {
            padding: 0 1rem;
          }

          .logo-flex-container {
            gap: 1rem;
            left: 5%;
          }

          .about-v1-details {
            font-size: 1rem;
            width: 90%;
          }

          .logo-image-wrap {
            margin-right: -5%;
          }
        }
      `}</style>
    </div>
  )
}
