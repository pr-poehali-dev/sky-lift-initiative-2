import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Layout from './Layout'
import Icon from '@/components/ui/icon'
import { Badge } from '@/components/ui/badge'
import {
  AUTHOR,
  pages,
  aboutText,
  galleryImage,
  tableData,
  listItems,
  videoUrl,
} from './pagesData'

const fade = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -40 },
}

function AboutPage() {
  return (
    <motion.div {...fade} transition={{ duration: 0.5 }} className="max-w-5xl mx-auto w-full">
      <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-8">О проекте</h2>
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-5">
          <p className="text-lg md:text-xl text-neutral-400 leading-relaxed">
            Этот сайт создан в качестве учебного сайта. Его цель — показать умение работать с современными веб-технологиями:{' '}
            <a href="https://ru.wikipedia.org/wiki/%D0%92%D1%91%D1%80%D1%81%D1%82%D0%BA%D0%B0" target="_blank" rel="noopener noreferrer" className="text-[#FF4D00] hover:underline">вёрсткой</a>
            , анимациями и немного с мемами.
          </p>
          <p className="text-lg md:text-xl text-neutral-400 leading-relaxed">{aboutText[1]}</p>
        </div>
        <img
          src="https://cdn.poehali.dev/projects/6ff344d6-fee3-4221-bb5d-9c00d540a2b9/bucket/1bc45d29-48e6-4a92-90dd-1dd5143a0063.png"
          alt="О проекте"
          className="rounded-2xl border border-neutral-700 w-full object-cover aspect-square"
        />
      </div>
    </motion.div>
  )
}

function GalleryPage() {
  return (
    <motion.div {...fade} transition={{ duration: 0.5 }} className="max-w-5xl mx-auto w-full">
      <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">О себе</h2>
      <p className="text-neutral-400 text-lg mb-8 italic">Один день ИСПэшника</p>
      <div className="rounded-2xl border border-neutral-700 overflow-x-auto">
        <table className="w-full text-left min-w-[800px]">
          <thead>
            <tr className="bg-white/5">
              {tableData.headers.map((h) => (
                <th key={h} className="px-4 py-3 text-white font-semibold text-sm">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.rows.map((row, i) => (
              <tr key={i} className="border-t border-neutral-800">
                {row.map((cell, j) => (
                  <td key={j} className="px-4 py-3 text-neutral-300 text-sm">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

function ListPage() {
  return (
    <motion.div {...fade} transition={{ duration: 0.5 }} className="max-w-5xl mx-auto w-full">
      <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-2">БАЗА</h2>
      <p className="text-neutral-400 text-lg mb-8 italic">Без этого ты не студент</p>
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <ul className="space-y-4">
          {listItems.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-start gap-3"
            >
              <Icon name="Check" className="text-[#FF4D00] mt-1 shrink-0" size={22} />
              <div>
                <span className="text-white font-semibold text-base md:text-lg">{item.title}</span>
                <p className="text-neutral-400 text-sm md:text-base">{item.desc}</p>
              </div>
            </motion.li>
          ))}
        </ul>
        <div className="space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-neutral-700 aspect-video">
            <iframe
              className="w-full h-full"
              src={videoUrl}
              title="Видео"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="text-center text-neutral-400 text-lg italic">Встретимся снова !?</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function LandingPage() {
  const [active, setActive] = useState(0)

  return (
    <Layout>
      <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-12 h-20">
        <div className="flex items-center gap-2 text-white font-bold text-lg">
          <Icon name="Rocket" className="text-[#FF4D00]" size={22} />
          <span>Учебный сайт</span>
        </div>
        <nav className="flex gap-1 md:gap-2">
          {pages.map((page, index) => (
            <button
              key={page.id}
              onClick={() => setActive(index)}
              className={`px-3 md:px-5 py-2 rounded-full text-sm md:text-base transition-colors ${
                index === active
                  ? 'bg-white text-black font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {page.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="h-full flex items-center px-6 md:px-16 lg:px-24 pt-20 pb-16">
        <AnimatePresence mode="wait">
          {active === 0 && <AboutPage key="about" />}
          {active === 1 && <GalleryPage key="gallery" />}
          {active === 2 && <ListPage key="list" />}
        </AnimatePresence>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 z-30 text-center py-4 text-neutral-500 text-sm">
        {AUTHOR}
      </footer>
    </Layout>
  )
}