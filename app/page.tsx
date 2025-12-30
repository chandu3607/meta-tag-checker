"use client"

import { useState, createContext, useContext } from "react"
import { MetaEditor } from "@/components/meta-editor"
import { PreviewTabs } from "@/components/preview-tabs"
import { CodeOutput } from "@/components/code-output"
import { SEOContent } from "@/components/seo-content"
import { Footer } from "@/components/footer"
import { MetaAudit } from "@/components/meta-audit"
import { HeadingStructure } from "@/components/heading-structure"
import { AltTextAudit } from "@/components/alt-text-audit"
import { SiteVerification } from "@/components/site-verification"
import Header from "@/components/header"
import { translations, type Language } from "@/lib/i18n"
import { Globe } from "lucide-react"

export interface MetaData {
  title: string
  description: string
  keywords: string
  url: string
  siteName: string
  image: string
  imageWidth: string
  imageHeight: string
  imageType: string
  twitterCard: string
  twitterSite: string
  twitterLabel2: string
  twitterData2: string
  articlePublisher: string
  articlePublishedTime: string
  articleModifiedTime: string
  robots: string
  ogType: string
  // Schema.org fields
  schemaType: string
  schemaName: string
  schemaDescription: string
  schemaPriceCurrency: string
  schemaLowPrice: string
  schemaHighPrice: string
  schemaOfferCount: string
  schemaRatingValue: string
  schemaRatingCount: string
  // Additional fields
  headings?: {
    h1: string[]
    h2: string[]
    h3: string[]
  }
  imagesWithoutAlt?: number
  imagesWithoutAltData?: Array<{ src: string; width: string; height: string }>
  totalImages?: number
  googleVerification?: string
  facebookVerification?: string
  pinterestVerification?: string
  bingVerification?: string
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
})

export const useLanguage = () => useContext(LanguageContext)

export default function Home() {
  const [metaData, setMetaData] = useState<MetaData>({
    title: "",
    description: "",
    keywords: "",
    url: "",
    siteName: "",
    image: "",
    imageWidth: "1280",
    imageHeight: "720",
    imageType: "image/webp",
    twitterCard: "summary_large_image",
    twitterSite: "",
    twitterLabel2: "Est. reading time",
    twitterData2: "12 Minutes",
    articlePublisher: "",
    articlePublishedTime: "",
    articleModifiedTime: "",
    robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    ogType: "website",
    // Schema.org defaults
    schemaType: "Course",
    schemaName: "",
    schemaDescription: "",
    schemaPriceCurrency: "INR",
    schemaLowPrice: "",
    schemaHighPrice: "",
    schemaOfferCount: "",
    schemaRatingValue: "",
    schemaRatingCount: "",
    // Default values for new fields
    headings: { h1: [], h2: [], h3: [] },
    imagesWithoutAlt: 0,
    imagesWithoutAltData: [], // Initialize array for image data
    totalImages: 0,
    googleVerification: "",
    facebookVerification: "",
    pinterestVerification: "",
    bingVerification: "",
  })

  const [urlInput, setUrlInput] = useState("")
  const [urlError, setUrlError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string) => {
    return translations[language][key] || key
  }

  const handleFetchUrl = async () => {
    if (!urlInput.trim()) {
      setUrlError(t("urlError"))
      return
    }

    setIsLoading(true)
    setUrlError("")

    try {
      const response = await fetch("/api/fetch-meta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: urlInput }),
      })

      const result = await response.json()

      if (!response.ok) {
        setUrlError(result.error || t("fetchError"))
        return
      }

      if (result.success && result.data) {
        const data = result.data

        setMetaData({
          title: data.ogTitle || data.title || "",
          description: data.ogDescription || data.description || "",
          keywords: data.keywords || "",
          url: data.ogUrl || urlInput,
          siteName: data.ogSiteName || data.hostname || "",
          image: data.ogImage || data.twitterImage || "",
          imageWidth: data.imageWidth || "1280",
          imageHeight: data.imageHeight || "720",
          imageType: data.imageType || "image/webp",
          twitterCard: data.twitterCard || "summary_large_image",
          twitterSite: data.twitterSite || "",
          twitterLabel2: data.twitterLabel2 || "Est. reading time",
          twitterData2: data.twitterData2 || "12 Minutes",
          articlePublisher: data.articlePublisher || "",
          articlePublishedTime: data.articlePublishedTime || "",
          articleModifiedTime: data.articleModifiedTime || "",
          robots: data.robots || "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
          ogType: data.ogType || "website",
          // Schema.org fields from extracted JSON-LD
          schemaType: data.schemaType || "Course",
          schemaName: data.schemaName || data.title || "",
          schemaDescription: data.schemaDescription || data.description || "",
          schemaPriceCurrency: data.schemaPriceCurrency || "INR",
          schemaLowPrice: data.schemaLowPrice || "",
          schemaHighPrice: data.schemaHighPrice || "",
          schemaOfferCount: data.schemaOfferCount || "",
          schemaRatingValue: data.schemaRatingValue || "",
          schemaRatingCount: data.schemaRatingCount || "",
          // New extracted data
          headings: data.headings || { h1: [], h2: [], h3: [] },
          imagesWithoutAlt: data.imagesWithoutAlt || 0,
          imagesWithoutAltData: data.imagesWithoutAltData || [], // Store the detailed image data
          totalImages: data.totalImages || 0,
          googleVerification: data.googleVerification || "",
          facebookVerification: data.facebookVerification || "",
          pinterestVerification: data.pinterestVerification || "",
          bingVerification: data.bingVerification || "",
        })
      }
    } catch (error) {
      console.error("Error:", error)
      setUrlError(t("analyzeError"))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className="min-h-screen relative z-10 bg-[#0a0a0b]">
        {/* Header Component */}
        <Header />

        {/* Hero Section */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              {t("heroTitle")} <span className="text-orange-400">{t("heroHighlight")}</span>
            </h2>
            <p className="text-lg text-gray-400 mb-8">{t("heroDescription")}</p>

            {/* URL Input */}
            <div>
              <div className="relative max-w-xl mx-auto">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                 <Globe  className="w-5 h-5"/>
                </div>
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleFetchUrl()}
                  placeholder={t("urlPlaceholder")}
                  className="w-full pl-12 pr-28 py-4 text-base bg-[#111113] border border-[#1a1a1d] rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-orange-400/50 focus:ring-2 focus:ring-orange-400/20 transition-all duration-200"
                />
                <button
                  onClick={handleFetchUrl}
                  disabled={isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white font-medium py-2 px-4 rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 hover:scale-105"
                >
                  {isLoading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span>{t("analyzingButton")}</span>
                    </>
                  ) : (
                    <span>{t("analyzeButton")}</span>
                  )}
                </button>
              </div>
              {urlError && <p className="text-sm text-red-400 mt-2">{urlError}</p>}
            </div>
          </div>
        </section>

        {/* Main Content Grid */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left Column: Editor */}
            <div id="editor" className="space-y-6">
              <MetaEditor metaData={metaData} setMetaData={setMetaData} />
              <MetaAudit metaData={metaData} />
            </div>

            {/* Right Column: Previews */}
            <div id="previews" className="space-y-6">
              <PreviewTabs metaData={metaData} />
              <CodeOutput metaData={metaData} />
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mt-6">
            <HeadingStructure metaData={metaData} />
            <AltTextAudit metaData={metaData} />
            <SiteVerification metaData={metaData} />
          </div>
        </main>

        <SEOContent />
        <Footer />
      </div>
    </LanguageContext.Provider>
  )
}
