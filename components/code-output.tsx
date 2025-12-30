"use client"

import { useState, useEffect } from "react"
import type { MetaData } from "@/app/page"
import { useLanguage } from "@/app/page"

interface CodeOutputProps {
  metaData: MetaData
}

export function CodeOutput({ metaData }: CodeOutputProps) {
  const { t } = useLanguage()
  const [includeBasic, setIncludeBasic] = useState(true)
  const [includeOG, setIncludeOG] = useState(true)
  const [includeTwitter, setIncludeTwitter] = useState(true)
  const [includeExtras, setIncludeExtras] = useState(false)
  const [includeSchema, setIncludeSchema] = useState(false)
  const [codeFormat, setCodeFormat] = useState<"html" | "angular" | "tsx">("html")
  const [copied, setCopied] = useState(false)
  const [code, setCode] = useState("")

  useEffect(() => {
    generateCode()
  }, [metaData, includeBasic, includeOG, includeTwitter, includeExtras, includeSchema, codeFormat])

  const generateCode = () => {
    let generatedCode = ""

    if (codeFormat === "angular") {
      generatedCode = generateAngularCode()
    } else if (codeFormat === "tsx") {
      generatedCode = generateNextJsCode()
    } else {
      generatedCode = generateHTMLCode()
    }

    if (!generatedCode.trim()) {
      generatedCode = "<!-- Enter your meta data to generate code -->"
    }

    setCode(generatedCode)
  }

  const generateHTMLCode = () => {
    let generatedCode = ""

    if (includeBasic) {
      generatedCode += `<!-- Primary Meta Tags -->\n`
      if (metaData.title) generatedCode += `<title>${metaData.title}</title>\n`
      if (metaData.title) generatedCode += `<meta name="title" content="${metaData.title}">\n`
      if (metaData.description) generatedCode += `<meta name="description" content="${metaData.description}">\n`
      if (metaData.keywords) generatedCode += `<meta name="keywords" content="${metaData.keywords}">\n`
      if (metaData.url) generatedCode += `<link rel="canonical" href="${metaData.url}">\n`
      if (metaData.robots) generatedCode += `<meta name="robots" content="${metaData.robots}">\n`
      generatedCode += `\n`
    }

    if (includeOG) {
      generatedCode += `<!-- Open Graph / Facebook -->\n`
      generatedCode += `<meta property="og:type" content="${metaData.ogType || "website"}">\n`
      if (metaData.url) generatedCode += `<meta property="og:url" content="${metaData.url}">\n`
      if (metaData.title) generatedCode += `<meta property="og:title" content="${metaData.title}">\n`
      if (metaData.description) generatedCode += `<meta property="og:description" content="${metaData.description}">\n`
      if (metaData.image) generatedCode += `<meta property="og:image" content="${metaData.image}">\n`
      if (metaData.imageWidth) generatedCode += `<meta property="og:image:width" content="${metaData.imageWidth}">\n`
      if (metaData.imageHeight) generatedCode += `<meta property="og:image:height" content="${metaData.imageHeight}">\n`
      if (metaData.imageType) generatedCode += `<meta property="og:image:type" content="${metaData.imageType}">\n`
      if (metaData.siteName) generatedCode += `<meta property="og:site_name" content="${metaData.siteName}">\n`
      if (metaData.articlePublisher)
        generatedCode += `<meta property="article:publisher" content="${metaData.articlePublisher}">\n`
      if (metaData.articlePublishedTime)
        generatedCode += `<meta property="article:published_time" content="${metaData.articlePublishedTime}">\n`
      if (metaData.articleModifiedTime)
        generatedCode += `<meta property="article:modified_time" content="${metaData.articleModifiedTime}">\n`
      generatedCode += `\n`
    }

    if (includeTwitter) {
      generatedCode += `<!-- Twitter -->\n`
      if (metaData.twitterCard) generatedCode += `<meta name="twitter:card" content="${metaData.twitterCard}">\n`
      if (metaData.url) generatedCode += `<meta name="twitter:url" content="${metaData.url}">\n`
      if (metaData.title) generatedCode += `<meta name="twitter:title" content="${metaData.title}">\n`
      if (metaData.description) generatedCode += `<meta name="twitter:description" content="${metaData.description}">\n`
      if (metaData.image) generatedCode += `<meta name="twitter:image" content="${metaData.image}">\n`
      if (metaData.imageWidth) generatedCode += `<meta name="twitter:image:width" content="${metaData.imageWidth}">\n`
      if (metaData.imageHeight)
        generatedCode += `<meta name="twitter:image:height" content="${metaData.imageHeight}">\n`
      if (metaData.imageType) generatedCode += `<meta name="twitter:image:type" content="${metaData.imageType}">\n`
      if (metaData.twitterSite) generatedCode += `<meta name="twitter:site" content="${metaData.twitterSite}">\n`
      if (metaData.twitterLabel2) generatedCode += `<meta name="twitter:label2" content="${metaData.twitterLabel2}">\n`
      if (metaData.twitterData2) generatedCode += `<meta name="twitter:data2" content="${metaData.twitterData2}">\n`
      generatedCode += `\n`
    }

    if (includeSchema && metaData.schemaName) {
      generatedCode += `<!-- Schema.org JSON-LD -->\n`
      generatedCode += `<script type="application/ld+json">\n${generateSchemaJSON()}\n</script>\n`
    }

    return generatedCode
  }

  const generateAngularCode = () => {
    const lines: string[] = []

    lines.push(`// Import services in your component`)
    lines.push(`import { Title, Meta } from '@angular/platform-browser';`)
    lines.push(`import { DOCUMENT } from '@angular/common';`)
    lines.push(`import { Inject } from '@angular/core';`)
    lines.push(``)
    lines.push(`// In your component constructor:`)
    lines.push(
      `constructor(private titleService: Title, private metaService: Meta, @Inject(DOCUMENT) private dom: Document) {}`,
    )
    lines.push(``)
    lines.push(`// In ngOnInit() or your setup method:`)
    lines.push(``)

    if (includeBasic && metaData.title) {
      lines.push(`// Set title`)
      lines.push(`this.titleService.setTitle('${metaData.title}');`)
      lines.push(``)
    }

    if (includeBasic) {
      lines.push(`// Basic meta tags`)
      if (metaData.description) {
        lines.push(`this.metaService.updateTag({`)
        lines.push(`  name: 'description',`)
        lines.push(`  content: '${metaData.description}'`)
        lines.push(`});`)
      }
      if (metaData.keywords) {
        lines.push(`this.metaService.updateTag({`)
        lines.push(`  name: 'keywords',`)
        lines.push(`  content: '${metaData.keywords}'`)
        lines.push(`});`)
      }
      if (metaData.robots) {
        lines.push(`this.metaService.updateTag({`)
        lines.push(`  name: 'robots',`)
        lines.push(`  content: '${metaData.robots}'`)
        lines.push(`});`)
      }
      lines.push(``)
    }

    if (includeBasic && metaData.url) {
      lines.push(`// Canonical link`)
      lines.push(`const head = this.dom.getElementsByTagName('head')[0];`)
      lines.push(`const element: HTMLLinkElement = this.dom.createElement('link') as HTMLLinkElement;`)
      lines.push(`head.appendChild(element);`)
      lines.push(`element.setAttribute('rel', 'canonical');`)
      lines.push(`element.setAttribute('href', '${metaData.url}');`)
      lines.push(``)
    }

    if (includeOG) {
      lines.push(`// Open Graph tags`)
      lines.push(`this.metaService.updateTag({ property: 'og:type', content: '${metaData.ogType || "website"}' });`)
      if (metaData.url) lines.push(`this.metaService.updateTag({ property: 'og:url', content: '${metaData.url}' });`)
      if (metaData.title)
        lines.push(`this.metaService.updateTag({ property: 'og:title', content: '${metaData.title}' });`)
      if (metaData.description)
        lines.push(`this.metaService.updateTag({ property: 'og:description', content: '${metaData.description}' });`)
      if (metaData.image)
        lines.push(`this.metaService.updateTag({ property: 'og:image', content: '${metaData.image}' });`)
      if (metaData.imageWidth)
        lines.push(`this.metaService.updateTag({ property: 'og:image:width', content: '${metaData.imageWidth}' });`)
      if (metaData.imageHeight)
        lines.push(`this.metaService.updateTag({ property: 'og:image:height', content: '${metaData.imageHeight}' });`)
      if (metaData.imageType)
        lines.push(`this.metaService.updateTag({ property: 'og:image:type', content: '${metaData.imageType}' });`)
      if (metaData.siteName)
        lines.push(`this.metaService.updateTag({ property: 'og:site_name', content: '${metaData.siteName}' });`)
      if (metaData.articlePublisher)
        lines.push(
          `this.metaService.updateTag({ property: 'article:publisher', content: '${metaData.articlePublisher}' });`,
        )
      if (metaData.articlePublishedTime)
        lines.push(
          `this.metaService.updateTag({ property: 'article:published_time', content: '${metaData.articlePublishedTime}' });`,
        )
      if (metaData.articleModifiedTime)
        lines.push(
          `this.metaService.updateTag({ property: 'article:modified_time', content: '${metaData.articleModifiedTime}' });`,
        )
      lines.push(``)
    }

    if (includeTwitter) {
      lines.push(`// Twitter Card tags`)
      if (metaData.twitterCard)
        lines.push(`this.metaService.updateTag({ property: 'twitter:card', content: '${metaData.twitterCard}' });`)
      if (metaData.url)
        lines.push(`this.metaService.updateTag({ property: 'twitter:url', content: '${metaData.url}' });`)
      if (metaData.title)
        lines.push(`this.metaService.updateTag({ property: 'twitter:title', content: '${metaData.title}' });`)
      if (metaData.description)
        lines.push(
          `this.metaService.updateTag({ property: 'twitter:description', content: '${metaData.description}' });`,
        )
      if (metaData.image)
        lines.push(`this.metaService.updateTag({ property: 'twitter:image', content: '${metaData.image}' });`)
      if (metaData.imageWidth)
        lines.push(
          `this.metaService.updateTag({ property: 'twitter:image:width', content: '${metaData.imageWidth}' });`,
        )
      if (metaData.imageHeight)
        lines.push(
          `this.metaService.updateTag({ property: 'twitter:image:height', content: '${metaData.imageHeight}' });`,
        )
      if (metaData.imageType)
        lines.push(`this.metaService.updateTag({ property: 'twitter:image:type', content: '${metaData.imageType}' });`)
      if (metaData.twitterSite)
        lines.push(`this.metaService.updateTag({ property: 'twitter:site', content: '${metaData.twitterSite}' });`)
      if (metaData.twitterLabel2)
        lines.push(`this.metaService.updateTag({ property: 'twitter:label2', content: '${metaData.twitterLabel2}' });`)
      if (metaData.twitterData2)
        lines.push(`this.metaService.updateTag({ property: 'twitter:data2', content: '${metaData.twitterData2}' });`)
      lines.push(``)
    }

    if (includeSchema && metaData.schemaName) {
      lines.push(`// Schema.org JSON-LD`)
      lines.push(`const schemaScript = this.dom.createElement('script');`)
      lines.push(`schemaScript.type = 'application/ld+json';`)
      lines.push(`schemaScript.text = \`${generateSchemaJSON()}\`;`)
      lines.push(`this.dom.head.appendChild(schemaScript);`)
    }

    return lines.join("\n")
  }

  const generateSchemaJSON = () => {
    const schema: any = {
      "@context": "https://schema.org",
      "@type": metaData.schemaType || "Course",
    }

    if (metaData.schemaName) schema.name = metaData.schemaName
    if (metaData.schemaDescription) schema.description = metaData.schemaDescription
    if (metaData.url) schema.url = metaData.url

    if (metaData.schemaType === "ItemList") {
      schema.itemListElement = []
      // Example items structure - users can edit this in the generated code
      if (metaData.schemaName) {
        schema.itemListElement.push({
          "@type": "ListItem",
          position: 1,
          name: metaData.schemaName,
          url: metaData.url,
        })
      }
    }

    if (metaData.schemaLowPrice || metaData.schemaHighPrice) {
      schema.offers = {
        "@type": "AggregateOffer",
        priceCurrency: metaData.schemaPriceCurrency || "INR",
      }
      if (metaData.schemaLowPrice) schema.offers.lowPrice = metaData.schemaLowPrice
      if (metaData.schemaHighPrice) schema.offers.highPrice = metaData.schemaHighPrice
      if (metaData.schemaOfferCount) schema.offers.offerCount = metaData.schemaOfferCount
      if (metaData.url) schema.offers.url = metaData.url
    }

    if (metaData.schemaRatingValue || metaData.schemaRatingCount) {
      schema.aggregateRating = {
        "@type": "AggregateRating",
      }
      if (metaData.schemaRatingValue) schema.aggregateRating.ratingValue = metaData.schemaRatingValue
      if (metaData.schemaRatingCount) schema.aggregateRating.ratingCount = metaData.schemaRatingCount
    }

    return JSON.stringify(schema, null, 2)
  }

  const generateNextJsCode = () => {
    const metadataObj: any = {}

    if (includeBasic) {
      if (metaData.title) metadataObj.title = metaData.title
      if (metaData.description) metadataObj.description = metaData.description
      if (metaData.keywords) metadataObj.keywords = metaData.keywords.split(",").map((k) => k.trim())
      if (metaData.robots) {
        metadataObj.robots = metaData.robots
      }
    }

    if (includeOG || includeTwitter) {
      metadataObj.openGraph = {
        type: metaData.ogType || "website",
      }
      if (metaData.title) metadataObj.openGraph.title = metaData.title
      if (metaData.description) metadataObj.openGraph.description = metaData.description
      if (metaData.url) metadataObj.openGraph.url = metaData.url
      if (metaData.siteName) metadataObj.openGraph.siteName = metaData.siteName
      if (metaData.image) {
        metadataObj.openGraph.images = [
          {
            url: metaData.image,
            width: Number.parseInt(metaData.imageWidth) || 1280,
            height: Number.parseInt(metaData.imageHeight) || 720,
            type: metaData.imageType || "image/webp",
          },
        ]
      }
      if (metaData.articlePublishedTime) metadataObj.openGraph.publishedTime = metaData.articlePublishedTime
      if (metaData.articleModifiedTime) metadataObj.openGraph.modifiedTime = metaData.articleModifiedTime
    }

    if (includeTwitter) {
      metadataObj.twitter = {
        card: metaData.twitterCard || "summary_large_image",
      }
      if (metaData.title) metadataObj.twitter.title = metaData.title
      if (metaData.description) metadataObj.twitter.description = metaData.description
      if (metaData.image) metadataObj.twitter.images = [metaData.image]
      if (metaData.twitterSite) metadataObj.twitter.site = metaData.twitterSite
    }

    let code = `import type { Metadata } from 'next'\n\nexport const metadata: Metadata = ${JSON.stringify(metadataObj, null, 2)}\n`

    if (includeSchema && metaData.schemaName) {
      code += `\nconst jsonLd = ${generateSchemaJSON()}\n`
      code += `\nexport default function Page() {\n`
      code += `  return (\n`
      code += `    <>\n`
      code += `      <script\n`
      code += `        type="application/ld+json"\n`
      code += `        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}\n`
      code += `      />\n`
      code += `      <div>\n`
      code += `        {/* Your page content */}\n`
      code += `      </div>\n`
      code += `    </>\n`
      code += `  )\n`
      code += `}\n`
    } else {
      code += `\nexport default function Page() {\n`
      code += `  return (\n`
      code += `    <div>\n`
      code += `      {/* Your page content */}\n`
      code += `    </div>\n`
      code += `  )\n`
      code += `}\n`
    }

    return code
  }

  const copyCode = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      id="code"
      className="bg-[#0d1117]/50 backdrop-blur-sm border border-[#21262d] rounded-lg p-6 transition-all duration-300 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/10"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
          {t("generatedCode")}
        </h3>
        <button
          onClick={copyCode}
          className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white py-2 px-4 rounded-md transition-all duration-300 text-sm hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
            />
          </svg>
          <span>{copied ? t("codeCopied") : t("copyCode")}</span>
        </button>
      </div>

      <div className="mb-4">
        <label className="text-sm font-medium text-gray-300 block mb-2">{t("codeFormat")}</label>
        <div className="flex gap-2">
          <button
            onClick={() => setCodeFormat("html")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 ${
              codeFormat === "html"
                ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg shadow-orange-500/30"
                : "bg-[#161b22] text-gray-400 hover:bg-[#21262d] hover:text-white hover:border hover:border-orange-500/30"
            }`}
          >
            HTML
          </button>
          <button
            onClick={() => setCodeFormat("angular")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 ${
              codeFormat === "angular"
                ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg shadow-orange-500/30"
                : "bg-[#161b22] text-gray-400 hover:bg-[#21262d] hover:text-white hover:border hover:border-orange-500/30"
            }`}
          >
            Angular
          </button>
          <button
            onClick={() => setCodeFormat("tsx")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 ${
              codeFormat === "tsx"
                ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg shadow-orange-500/30"
                : "bg-[#161b22] text-gray-400 hover:bg-[#21262d] hover:text-white hover:border hover:border-orange-500/30"
            }`}
          >
            Next.js TypeScript
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer hover:text-orange-400 transition-all duration-200 hover:scale-105">
          <input
            type="checkbox"
            checked={includeBasic}
            onChange={(e) => setIncludeBasic(e.target.checked)}
            className="accent-orange-500 w-4 h-4 cursor-pointer"
          />
          {t("includeBasic")}
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer hover:text-orange-400 transition-all duration-200 hover:scale-105">
          <input
            type="checkbox"
            checked={includeOG}
            onChange={(e) => setIncludeOG(e.target.checked)}
            className="accent-orange-500 w-4 h-4 cursor-pointer"
          />
          {t("includeOG")}
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer hover:text-orange-400 transition-all duration-200 hover:scale-105">
          <input
            type="checkbox"
            checked={includeTwitter}
            onChange={(e) => setIncludeTwitter(e.target.checked)}
            className="accent-orange-500 w-4 h-4 cursor-pointer"
          />
          {t("includeTwitter")}
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer hover:text-orange-400 transition-all duration-200 hover:scale-105">
          <input
            type="checkbox"
            checked={includeExtras}
            onChange={(e) => setIncludeExtras(e.target.checked)}
            className="accent-orange-500 w-4 h-4 cursor-pointer"
          />
          {t("includeExtra")}
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer hover:text-orange-400 transition-all duration-200 hover:scale-105">
          <input
            type="checkbox"
            checked={includeSchema}
            onChange={(e) => setIncludeSchema(e.target.checked)}
            className="accent-orange-500 w-4 h-4 cursor-pointer"
          />
          {t("includeSchema")}
        </label>
      </div>

      <div className="mb-4 space-y-2">
        <p className="text-sm text-gray-400 flex items-center gap-2">
          <svg className="w-4 h-4 text-orange-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {codeFormat === "html" && (
            <>
              {t("copyToWebsite")} <code className="text-orange-400 bg-[#1a1a1d] px-1 rounded">{"<head>"}</code>
            </>
          )}
          {codeFormat === "angular" && t("addToAngularOnInit")}
          {codeFormat === "tsx" && t("useInNextJs")}
        </p>
      </div>

      <div className="bg-[#0a0a0b] border border-[#21262d] rounded-lg p-4 overflow-x-auto hover:border-orange-500/20 transition-all duration-300 max-h-[500px] overflow-y-auto custom-scrollbar">
        <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap ">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}
