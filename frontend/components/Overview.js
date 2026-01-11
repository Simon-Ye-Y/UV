'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const Counter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime
    let animationFrame

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime
      const progress = (currentTime - startTime) / duration

      if (progress < 1) {
        setCount(Math.floor(end * progress))
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return <h2 className="counter-number">{count}</h2>
}

export default function Overview() {
  return (
    <section className="section overview">
      <div className="w-layout-blockcontainer container w-container">
        <div className="overview-wrapper">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="overview-top-wrap"
          >
            <Image
              src="/images/Logo-1_1Logo (1).webp"
              alt="Overview Image"
              className="overview-image"
              width={200}
              height={200}
            />
            <p className="overview-details">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
              sed do eiusmod tempor incididunt ut labore et dolore.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="overview-grid-wrap"
          >
            {/* Clients Counter */}
            <div className="overview-single-wrap">
              <div className="overview-counter-wrapper">
                <Counter end={180} />
                <h2 className="overview-plus">+</h2>
              </div>
              <div className="overview-counter-details">Clients Worldwide</div>
            </div>

            {/* Projects Counter */}
            <div className="overview-single-wrap">
              <div className="overview-counter-wrapper">
                <Counter end={60} />
                <h2 className="overview-plus">+</h2>
              </div>
              <div className="overview-counter-details">Projects Done</div>
            </div>

            {/* Experience Counter */}
            <div className="overview-single-wrap">
              <div className="overview-counter-wrapper">
                <Counter end={7} />
                <h2 className="overview-plus">+</h2>
              </div>
              <div className="overview-counter-details">Years of Experience</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
