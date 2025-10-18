'use client'

import React, { useState, useRef, useCallback, useEffect, JSX } from 'react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { PlayCircle, Loader2 } from 'lucide-react'

// ✅ Define the type of each video item
interface VideoItem {
  src: string
  title: string
}

// ✅ Example video list
const VIDEOS: VideoItem[] = [
  { src: 'https://www.youtube.com/shorts/r8H-2jmnha8', title: 'YouTube Short ' },
  { src: 'https://www.youtube.com/shorts/EYnRWGHxfvw', title: 'YouTube Video ' },
  { src: 'https://www.youtube.com/shorts/I8CGW4l4ntU', title: 'YouTube video' },
]


const isYouTube = (url: string): boolean =>
  url.includes('youtube.com') || url.includes('youtu.be')

const getYouTubeEmbed = (url: string, isPlaying: boolean): string => {
  let videoId = ''

  if (url.includes('youtube.com/watch')) {
    const params = new URL(url).searchParams
    videoId = params.get('v') || ''
  } else if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1]?.split('?')[0] || ''
  } else if (url.includes('youtube.com/shorts/')) {
    videoId = url.split('youtube.com/shorts/')[1]?.split('?')[0] || ''
  }

  return `https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}&modestbranding=1&rel=0&enablejsapi=1`
}

// --- Slide Content ---
interface VideoSlideContentProps {
  video: VideoItem
  isActive: boolean
}

const VideoSlideContent: React.FC<VideoSlideContentProps> = ({ video, isActive }) => {
  const swiper = useSwiper()
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const isYoutubeVideo = isYouTube(video.src)

  const handleVideoEnd = useCallback(() => {
    setIsPlaying(false)
    swiper.slideNext()
  }, [swiper])

  const handlePlayClick = () => {
    setIsLoading(true)
    setIsPlaying(true)

    if (!isYoutubeVideo && videoRef.current) {
      videoRef.current
        .play()
        .then(() => setIsLoading(false))
        .catch((err) => {
          console.error('Autoplay failed:', err)
          setIsLoading(false)
        })
    }
  }

  useEffect(() => {
    if (videoRef.current && !isActive) {
      videoRef.current.pause()
      setIsPlaying(false)
      setIsLoading(false)
    }
  }, [isActive])

  return (
    <div className="relative w-full h-[500px] flex justify-center items-center bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
      {/* Video Player */}
      {isYoutubeVideo ? (
        isPlaying && (
          <iframe
            key={video.src}
            src={getYouTubeEmbed(video.src, true)}
            className="w-full h-full"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={video.title}
            onLoad={() => setIsLoading(false)}
          ></iframe>
        )
      ) : (
        <video
          ref={videoRef}
          src={video.src}
          controls={isPlaying}
          className={`w-full h-full object-contain transition-opacity duration-300 ${!isPlaying ? 'opacity-0 absolute top-0 left-0' : 'opacity-100'}`}
          onLoadedData={() => setIsLoading(false)}
          onEnded={handleVideoEnd}
          onClick={() => {
            if (isPlaying && videoRef.current) {
              videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause()
            }
          }}
        />
      )}

      {/* Overlay */}
      {!isPlaying && (
        <div
          className="absolute inset-0 flex flex-col justify-center items-center bg-gray-800/80 hover:bg-gray-700/80 cursor-pointer transition-all duration-300 p-8"
          onClick={handlePlayClick}
        >
          <PlayCircle className="w-20 h-20 text-indigo-400 hover:text-indigo-300 transition-colors duration-300 drop-shadow-lg" />
          <p className="mt-4 text-xl font-semibold text-white">Click to Play: {video.title}</p>
          <p className="text-sm text-gray-300 mt-1">(Local videos auto-advance)</p>
        </div>
      )}

      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-900/90 z-10">
          <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
        </div>
      )}

      {/* Tag */}
      <div className="absolute top-4 left-4 bg-indigo-600/90 text-white text-xs font-mono tracking-wider px-3 py-1 rounded-full shadow-md z-20">
        {isYoutubeVideo ? 'YOUTUBE' : 'LOCAL MP4'}
      </div>
    </div>
  )
}

// --- Main Carousel ---
export default function VideoCarousel(): JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="w-full min-h-screen bg-gray-90 flex items-center justify-center p-4 sm:p-8 font-sans">
      <div className="max-w-6xl w-full mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center tracking-tight">
          short videos
        </h1>
        

        <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-2xl border border-gray-100">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="w-full"
          >
            {VIDEOS.map((video, index) => (
              <SwiperSlide key={index}>
                <VideoSlideContent video={video} isActive={index === activeIndex} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}
