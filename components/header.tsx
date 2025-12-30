"use client"

import { useState, useEffect, useRef } from "react"
import { useLanguage } from "@/app/page"

export default function Header() {
  const { language, setLanguage, t } = useLanguage()
  const [isLangOpen, setIsLangOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false)
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsLangOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [])

  const languages = [
    { code: "en" as const, flag: "🇬🇧", name: "English", path: "/" },
    { code: "fr" as const, flag: "🇫🇷", name: "Français", path: "/fr" },
    { code: "es" as const, flag: "🇪🇸", name: "Español", path: "/es" },
    { code: "de" as const, flag: "🇩🇪", name: "Deutsch", path: "/de" },
    { code: "pt" as const, flag: "🇵🇹", name: "Português", path: "/pt" },
    { code: "it" as const, flag: "🇮🇹", name: "Italiano", path: "/it" },
    { code: "ja" as const, flag: "🇯🇵", name: "日本語", path: "/ja" },
    { code: "zh" as const, flag: "🇨🇳", name: "中文", path: "/zh" },
    { code: "ko" as const, flag: "🇰🇷", name: "한국어", path: "/ko" },
    { code: "ru" as const, flag: "🇷🇺", name: "Русский", path: "/ru" },
  ]

  const currentLang = languages.find((l) => l.code === language) || languages[0]

  return (
    <header className="border-b border-[#21262d] bg-[#0a0a0b]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 via-orange-500 to-amber-500 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-3 hover:shadow-lg hover:shadow-orange-500/50">
              <span className="text-lg font-bold text-white">{"</>"}</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">MetaTagsChecker</h1>
              <p className="text-xs text-gray-500">Preview, Edit & Generate</p>
            </div>
          </div>

          <nav className="hidden sm:flex items-center gap-6">
            <a
              href="#editor"
              className="text-sm text-gray-400 hover:text-orange-400 transition-all duration-200 hover:scale-105"
            >
              {t("editor")}
            </a>
            <a
              href="#previews"
              className="text-sm text-gray-400 hover:text-orange-400 transition-all duration-200 hover:scale-105"
            >
              {t("previews")}
            </a>
            <a
              href="#code"
              className="text-sm text-gray-400 hover:text-orange-400 transition-all duration-200 hover:scale-105"
            >
              {t("code")}
            </a>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-orange-400 transition-all duration-200 px-3 py-1.5 rounded-md hover:bg-[#0d1117] hover:scale-105"
                aria-label="Select language"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
                <span className="hidden xs:inline">{currentLang.flag}</span>
                <span>{currentLang.code.toUpperCase()}</span>
                <svg
                  className={`w-3 h-3 transition-transform ${isLangOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </button>

              <div
                className={`absolute right-0 top-full mt-2 py-2 w-44 bg-[#0d1117] border border-[#21262d] rounded-lg shadow-xl transition-all duration-200 z-50 ${isLangOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`}
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code)
                      setIsLangOpen(false)
                    }}
                    className={`flex items-center gap-3 px-4 py-2 text-sm transition-all duration-200 w-full text-left ${
                      lang.code === language
                        ? "text-orange-400 bg-[#161b22]"
                        : "text-gray-400 hover:text-white hover:bg-[#161b22] hover:translate-x-1"
                    }`}
                  >
                    <span className="text-base">{lang.flag}</span>
                    <span>{lang.name}</span>
                    {lang.code === language && (
                      <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
