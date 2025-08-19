import { useEffect, useRef } from 'react'
import './Hero.css'

export default function Hero() {
  const videoRef = useRef(null)

  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    // Garantir mute antes de tentar dar play (requisito para autoplay em vários navegadores)
    videoElement.muted = true
    videoElement.defaultMuted = true

    const tryPlay = () => {
      const playPromise = videoElement.play()
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise.catch(() => {
          // Nova tentativa silenciosa
          videoElement.muted = true
          videoElement.play().catch(() => {})
        })
      }
    }

    const handleCanPlay = () => tryPlay()
    const handleLoadedData = () => tryPlay()

    videoElement.addEventListener('canplay', handleCanPlay)
    videoElement.addEventListener('loadeddata', handleLoadedData)

    // Tenta tocar imediatamente também
    tryPlay()

    return () => {
      videoElement.removeEventListener('canplay', handleCanPlay)
      videoElement.removeEventListener('loadeddata', handleLoadedData)
    }
  }, [])

  return (
    <div className="hero">
      <video
        ref={videoRef}
        className="background-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/videos/placas.mp4" type="video/mp4" />
      </video>
      <div className="hero-content">
        <h1>ENERGIA NA PALMA DA MÃO</h1>
        <p>Descubra o consumo da sua casa e economize com sustentabilidade e inteligência.</p>
      </div>
    </div>
  )
}
