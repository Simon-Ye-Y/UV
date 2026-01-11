'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function FooterSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    if (!isHovering) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setMousePosition({ x: 0, y: 0 }); // 重置位置
  };

  return (
    <div className="footer">
      {/* CTA Section */}
      <section className="section cta">
        <div className="w-layout-blockcontainer container w-container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="cta-wrapper-2"
          >
            <h2 className="cta-title">Let&apos;s Talk</h2>
            <motion.div
              className="cta-link-wrap-4"
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              animate={{
                x: mousePosition.x,
                y: mousePosition.y,
                scale: isHovering ? 1.2 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 15,
                mass: 0.1
              }}
            >
              <Link href="#">
                <div className="cta-arrow"></div>
                <div className="cta-text">Let&apos;s Chat</div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <style jsx>{`
        .cta-wrapper-2 {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 150rem;
        }

        .cta-title {
          margin: 0;
          padding: 0;
        }

        .cta-link-wrap-4 {
          position: relative;
          display: inline-block;
        }

        .cta-link-wrap-4 a {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
      `}</style>
    </div>
  )
}
