import { type NextRequest, NextResponse } from "next/server"
import { load } from "cheerio"

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    // Add protocol if missing
    const fullUrl = url.includes("://") ? url : `https://${url}`

    // Validate URL
    try {
      new URL(fullUrl)
    } catch {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 })
    }

    // Fetch the webpage
    const response = await fetch(fullUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; MetaTagsChecker/1.0)",
      },
      redirect: "follow",
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch URL: ${response.status} ${response.statusText}` },
        { status: response.status },
      )
    }

    const html = await response.text()
    const $ = load(html)

    const headings = {
      h1: $("h1")
        .map((_, el) => $(el).text().trim())
        .get(),
      h2: $("h2")
        .map((_, el) => $(el).text().trim())
        .get(),
      h3: $("h3")
        .map((_, el) => $(el).text().trim())
        .get(),
    }

    const imagesWithoutAltData = $("img:not([alt]), img[alt='']")
      .map((_, el) => {
        let src = $(el).attr("src") || ""
        // Convert relative URLs to absolute
        if (src && !src.startsWith("http") && !src.startsWith("data:")) {
          try {
            src = new URL(src, fullUrl).href
          } catch (e) {
            // If URL conversion fails, keep original src
          }
        }
        return {
          src,
          width: $(el).attr("width") || "",
          height: $(el).attr("height") || "",
        }
      })
      .get()
      .filter((img) => img.src && !img.src.startsWith("data:")) // Filter out data URLs and empty src

    const imagesWithoutAlt = imagesWithoutAltData.length
    const totalImages = $("img").length

    const verificationTags = {
      googleVerification: $('meta[name="google-site-verification"]').attr("content") || "",
      facebookVerification: $('meta[name="facebook-domain-verification"]').attr("content") || "",
      pinterestVerification: $('meta[name="p:domain_verify"]').attr("content") || "",
      bingVerification: $('meta[name="msvalidate.01"]').attr("content") || "",
    }

    // Extract meta tags
    const metaData = {
      // Basic meta tags
      title: $("title").text() || $('meta[property="og:title"]').attr("content") || "",
      description:
        $('meta[name="description"]').attr("content") || $('meta[property="og:description"]').attr("content") || "",
      keywords: $('meta[name="keywords"]').attr("content") || "",

      // Open Graph tags
      ogTitle: $('meta[property="og:title"]').attr("content") || "",
      ogDescription: $('meta[property="og:description"]').attr("content") || "",
      ogImage: $('meta[property="og:image"]').attr("content") || "",
      ogUrl: $('meta[property="og:url"]').attr("content") || fullUrl,
      ogSiteName: $('meta[property="og:site_name"]').attr("content") || "",
      ogType: $('meta[property="og:type"]').attr("content") || "website",
      imageWidth: $('meta[property="og:image:width"]').attr("content") || "1280",
      imageHeight: $('meta[property="og:image:height"]').attr("content") || "720",

      // Twitter tags
      twitterCard: $('meta[name="twitter:card"]').attr("content") || "summary_large_image",
      twitterSite: $('meta[name="twitter:site"]').attr("content") || "",
      twitterTitle: $('meta[name="twitter:title"]').attr("content") || "",
      twitterDescription: $('meta[name="twitter:description"]').attr("content") || "",
      twitterImage: $('meta[name="twitter:image"]').attr("content") || "",
      twitterLabel2: $('meta[name="twitter:label2"]').attr("content") || "",
      twitterData2: $('meta[name="twitter:data2"]').attr("content") || "",

      // Article tags
      articlePublisher: $('meta[property="article:publisher"]').attr("content") || "",
      articlePublishedTime: $('meta[property="article:published_time"]').attr("content") || "",
      articleModifiedTime: $('meta[property="article:modified_time"]').attr("content") || "",

      // Robots
      robots: $('meta[name="robots"]').attr("content") || "",

      // Extract favicon
      favicon:
        $('link[rel="icon"]').attr("href") ||
        $('link[rel="shortcut icon"]').attr("href") ||
        $('link[rel="apple-touch-icon"]').attr("href") ||
        "",

      // Get hostname
      hostname: new URL(fullUrl).hostname,

      headings,
      imagesWithoutAlt,
      imagesWithoutAltData, // Add the detailed image data
      totalImages,
      ...verificationTags,
    }

    let schemaData: any = {}
    $('script[type="application/ld+json"]').each((_, element) => {
      try {
        const jsonText = $(element).html()
        if (jsonText) {
          const schema = JSON.parse(jsonText)

          // Handle array of schemas
          const schemaArray = Array.isArray(schema) ? schema : [schema]

          // Find Course, Product, or other relevant schema types
          for (const item of schemaArray) {
            if (item["@type"] === "Course" || item["@type"] === "Product" || item["@type"] === "Organization") {
              schemaData = {
                schemaType: item["@type"] || "",
                schemaName: item.name || "",
                schemaDescription: item.description || "",
                schemaPriceCurrency: item.offers?.priceCurrency || item.offers?.lowPrice?.currency || "",
                schemaLowPrice: item.offers?.lowPrice || item.offers?.price || "",
                schemaHighPrice: item.offers?.highPrice || "",
                schemaOfferCount: item.offers?.offerCount || "",
                schemaRatingValue: item.aggregateRating?.ratingValue || "",
                schemaRatingCount: item.aggregateRating?.ratingCount || item.aggregateRating?.reviewCount || "",
              }
              break // Use first matching schema found
            }
          }
        }
      } catch (error) {
        console.log("[v0] Error parsing JSON-LD schema:", error)
      }
    })

    // Resolve relative URLs for images
    if (metaData.ogImage && !metaData.ogImage.startsWith("http")) {
      metaData.ogImage = new URL(metaData.ogImage, fullUrl).href
    }
    if (metaData.twitterImage && !metaData.twitterImage.startsWith("http")) {
      metaData.twitterImage = new URL(metaData.twitterImage, fullUrl).href
    }
    if (metaData.favicon && !metaData.favicon.startsWith("http")) {
      metaData.favicon = new URL(metaData.favicon, fullUrl).href
    }

    const finalData = {
      ...metaData,
      ...schemaData,
    }

    return NextResponse.json({ success: true, data: finalData })
  } catch (error) {
    console.error("Error fetching meta tags:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch meta tags" },
      { status: 500 },
    )
  }
}
