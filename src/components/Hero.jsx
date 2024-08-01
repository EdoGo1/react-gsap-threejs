import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { heroVideo, smallHeroVideo } from "../utils"
import { useState } from "react"
import { useEffect } from "react"

const Hero = () => {
  // Set the video source based on the screen width
  const [videoSrc, setVideoSrc] = useState(window.innerWidth < 760 ? smallHeroVideo : heroVideo)

  // Change the video source when the screen width changes
  const handleVideoSrcSet = () => {
     if(window.innerWidth < 760) {
        setVideoSrc(smallHeroVideo)
      } else {
        setVideoSrc(heroVideo)
      }
  }

  // Add an event listener to the window object to listen for screen width changes
  useEffect(() => {
    window.addEventListener("resize", handleVideoSrcSet) // Call the handleVideoSrcSet function when the screen width changes

    return () => {
      window.removeEventListener("resize", handleVideoSrcSet) // Remove the event listener when the component is unmounted
    }
  })

  // Use the useGSAP hook to animate
  useGSAP(() => {
    // Animate the hero title and video
    gsap.to("#hero", {
      opacity : 1, delay: 1.5, duration: 1.5
    })

    // Animate the CTA
    gsap.to("#cta", {
      opacity: 1, delay: 2.5,  y: -50
    })
  }, [])

  return (
    <section className="w-full nav-height bg-black relative">
      <div className="h-5/6 w-full flex-center flex-col">
        <p id="hero" className="hero-title">iPhone 15 Pro</p>
        <div className="md:w-10/12 w-9/12">
          <video autoPlay muted playsInline={true} key={videoSrc}>
            <source src={videoSrc} type="video/mp4"/>
            </video>    
        </div>
      </div>

      <div id="cta" className="flex 
                               flex-col 
                               items-center // Center the CTA horizontally
                               opacity-0 // Hide the CTA
                               translate-y-20 // Move the CTA down by 20px
                               ">
        <a href="#highlights" className="btn">Buy</a>
        <p className="font-normal text-xl">From $199/month or $999</p>
      </div>
    </section>
  )
}

export default Hero