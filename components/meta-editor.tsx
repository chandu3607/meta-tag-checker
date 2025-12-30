"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { MetaData } from "@/app/page"
import { useLanguage } from "@/app/page"

interface MetaEditorProps {
  metaData: MetaData
  setMetaData: (data: MetaData) => void
}

export function MetaEditor({ metaData, setMetaData }: MetaEditorProps) {
  const { t } = useLanguage()
  const [titleCount, setTitleCount] = useState(0)
  const [descCount, setDescCount] = useState(0)
  const [imagePreview, setImagePreview] = useState("")
  const [activeSection, setActiveSection] = useState<"basic" | "advanced" | "schema">("basic")

  useEffect(() => {
    setTitleCount(metaData.title.length)
  }, [metaData.title])

  useEffect(() => {
    setDescCount(metaData.description.length)
  }, [metaData.description])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setImagePreview(result)
        setMetaData({ ...metaData, image: result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setImagePreview(result)
        setMetaData({ ...metaData, image: result })
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImagePreview("")
    setMetaData({ ...metaData, image: "" })
  }

  return (
    <div className="bg-[#0d1117]/50 backdrop-blur-sm border border-[#21262d] rounded-lg p-6 transition-all duration-300 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/10">
      <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
        <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
        {t("metaEditor")}
      </h3>

      <div className="flex gap-2 mb-6 border-b border-[#21262d] pb-2">
        <button
          onClick={() => setActiveSection("basic")}
          className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-all duration-300 hover:scale-105 ${
            activeSection === "basic"
              ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg shadow-orange-500/30"
              : "text-gray-400 hover:text-white hover:bg-[#161b22]"
          }`}
        >
          {t("basicMeta")}
        </button>
        <button
          onClick={() => setActiveSection("advanced")}
          className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-all duration-300 hover:scale-105 ${
            activeSection === "advanced"
              ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg shadow-orange-500/30"
              : "text-gray-400 hover:text-white hover:bg-[#161b22]"
          }`}
        >
          {t("advancedTags")}
        </button>
        <button
          onClick={() => setActiveSection("schema")}
          className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-all duration-300 hover:scale-105 ${
            activeSection === "schema"
              ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg shadow-orange-500/30"
              : "text-gray-400 hover:text-white hover:bg-[#161b22]"
          }`}
        >
          {t("schemaOrg")}
        </button>
      </div>

      {activeSection === "basic" && (
        <div className="space-y-5">
          {/* Title */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="meta-title" className="text-sm font-medium text-gray-300">
                {t("title")}
              </label>
              <span className={`text-xs ${titleCount > 60 ? "text-yellow-400" : "text-gray-500"}`}>
                {titleCount} / 60
              </span>
            </div>
            <input
              type="text"
              id="meta-title"
              value={metaData.title}
              onChange={(e) => setMetaData({ ...metaData, title: e.target.value })}
              placeholder={t("titlePlaceholder")}
              maxLength={100}
              className="w-full px-4 py-2.5 bg-[#0a0a0b] border border-[#21262d] rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 hover:border-orange-500/30 hover:shadow-md hover:shadow-orange-500/5"
            />
          </div>

          {/* Description */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="meta-description" className="text-sm font-medium text-gray-300">
                {t("description")}
              </label>
              <span className={`text-xs ${descCount > 160 ? "text-yellow-400" : "text-gray-500"}`}>
                {descCount} / 160
              </span>
            </div>
            <textarea
              id="meta-description"
              value={metaData.description}
              onChange={(e) => setMetaData({ ...metaData, description: e.target.value })}
              placeholder={t("descriptionPlaceholder")}
              maxLength={300}
              rows={3}
              className="w-full px-4 py-2.5 bg-[#0a0a0b] border border-[#21262d] rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 resize-none transition-all duration-200 hover:border-orange-500/30 hover:shadow-md hover:shadow-orange-500/5"
            />
          </div>

          {/* Keywords */}
          <div>
            <label htmlFor="meta-keywords" className="text-sm font-medium text-gray-300 block mb-2">
              {t("keywords")}
            </label>
            <input
              type="text"
              id="meta-keywords"
              value={metaData.keywords}
              onChange={(e) => setMetaData({ ...metaData, keywords: e.target.value })}
              placeholder={t("keywordsPlaceholder")}
              className="w-full px-4 py-2.5 bg-[#0a0a0b] border border-[#21262d] rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 hover:border-orange-500/30 hover:shadow-md hover:shadow-orange-500/5"
            />
          </div>

          {/* URL */}
          <div>
            <label htmlFor="meta-url" className="text-sm font-medium text-gray-300 block mb-2">
              {t("urlLabel")}
            </label>
            <input
              type="text"
              id="meta-url"
              value={metaData.url}
              onChange={(e) => setMetaData({ ...metaData, url: e.target.value })}
              placeholder="https://example.com/page"
              className="w-full px-4 py-2.5 bg-[#0a0a0b] border border-[#21262d] rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 hover:border-orange-500/30 hover:shadow-md hover:shadow-orange-500/5"
            />
          </div>

          {/* Site Name */}
          <div>
            <label htmlFor="meta-sitename" className="text-sm font-medium text-gray-300 block mb-2">
              {t("siteName")}
            </label>
            <input
              type="text"
              id="meta-sitename"
              value={metaData.siteName}
              onChange={(e) => setMetaData({ ...metaData, siteName: e.target.value })}
              placeholder={t("siteNamePlaceholder")}
              className="w-full px-4 py-2.5 bg-[#0a0a0b] border border-[#21262d] rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 hover:border-orange-500/30 hover:shadow-md hover:shadow-orange-500/5"
            />
          </div>

          {/* Robots */}
          <div>
            <label htmlFor="meta-robots" className="text-sm font-medium text-gray-300 block mb-2">
              {t("robots")}
            </label>
            <input
              type="text"
              id="meta-robots"
              value={metaData.robots}
              onChange={(e) => setMetaData({ ...metaData, robots: e.target.value })}
              placeholder="index, follow"
              className="w-full px-4 py-2.5 bg-[#0a0a0b] border border-[#21262d] rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 hover:border-orange-500/30 hover:shadow-md hover:shadow-orange-500/5"
            />
          </div>
        </div>
      )}

      {activeSection === "advanced" && (
        <div className="space-y-5">
          {/* OG Type */}
          <div>
            <label htmlFor="og-type" className="text-sm font-medium text-gray-300 block mb-2">
              {t("ogType")}
            </label>
            <select
              id="og-type"
              value={metaData.ogType}
              onChange={(e) => setMetaData({ ...metaData, ogType: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#0a0a0b] border border-[#21262d] rounded-lg text-white focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 hover:border-orange-500/30 cursor-pointer"
            >
              <option value="website">Website</option>
              <option value="article">Article</option>
              <option value="product">Product</option>
              <option value="profile">Profile</option>
            </select>
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="meta-image" className="text-sm font-medium text-gray-300 block mb-2">
              {t("imageURL")}
              <span className="text-gray-500 font-normal ml-2">1200×630 recommended</span>
            </label>
            <input
              type="text"
              id="meta-image"
              value={metaData.image}
              onChange={(e) => setMetaData({ ...metaData, image: e.target.value })}
              placeholder={t("imageURLPlaceholder")}
              className="w-full px-4 py-2.5 bg-[#0a0a0b] border border-[#21262d] rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 hover:border-orange-500/30 hover:shadow-md hover:shadow-orange-500/5"
            />
          </div>

          {/* Image Upload */}
          <div>
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => document.getElementById("image-upload")?.click()}
              className="border-2 border-dashed border-[#21262d] rounded-lg p-6 text-center cursor-pointer hover:border-orange-500/50 hover:bg-gradient-to-br hover:from-orange-500/5 hover:to-amber-500/5 transition-all duration-300 group"
            >
              <svg
                className="w-10 h-10 mx-auto text-gray-500 mb-2 transition-all duration-300 group-hover:scale-125 group-hover:text-orange-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-sm text-gray-500 group-hover:text-orange-400 transition-colors">
                Drag & drop an image or click to upload
              </p>
              <input type="file" id="image-upload" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </div>
            {imagePreview && (
              <div className="mt-3">
                <img src={imagePreview || "/placeholder.svg"} className="w-full rounded-lg" alt="Preview" />
                <button
                  onClick={removeImage}
                  className="text-sm text-red-400 mt-2 hover:underline hover:text-red-300 transition-all duration-200 hover:scale-105"
                >
                  Remove image
                </button>
              </div>
            )}
          </div>

          {/* Image Dimensions */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="image-width" className="text-sm font-medium text-gray-300 block mb-2">
                {t("imageWidth")}
              </label>
              <input
                type="text"
                id="image-width"
                value={metaData.imageWidth}
                onChange={(e) => setMetaData({ ...metaData, imageWidth: e.target.value })}
                placeholder="1280"
                className="w-full px-4 py-2.5 bg-[#0a0a0b] border border-[#21262d] rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 hover:border-orange-500/30"
              />
            </div>
            <div>
              <label htmlFor="image-height" className="text-sm font-medium text-gray-300 block mb-2">
                {t("imageHeight")}
              </label>
              <input
                type="text"
                id="image-height"
                value={metaData.imageHeight}
                onChange={(e) => setMetaData({ ...metaData, imageHeight: e.target.value })}
                placeholder="720"
                className="w-full px-4 py-2.5 bg-[#0a0a0b] border border-[#21262d] rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 hover:border-orange-500/30"
              />
            </div>
          </div>

          {/* Image Type */}
          <div>
            <label htmlFor="image-type" className="text-sm font-medium text-gray-300 block mb-2">
              {t("imageType")}
            </label>
            <input
              type="text"
              id="image-type"
              value={metaData.imageType}
              onChange={(e) => setMetaData({ ...metaData, imageType: e.target.value })}
              placeholder="image/webp"
              className="w-full px-4 py-2.5 bg-[#0a0a0b] border border-[#21262d] rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 hover:border-orange-500/30"
            />
          </div>

          {/* Twitter Card Type */}
          <div>
            <label htmlFor="twitter-card" className="text-sm font-medium text-gray-300 block mb-2">
              {t("twitterCard")}
            </label>
            <select
              id="twitter-card"
              value={metaData.twitterCard}
              onChange={(e) => setMetaData({ ...metaData, twitterCard: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#0a0a0b] border border-[#21262d] rounded-lg text-white focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 hover:border-orange-500/30 cursor-pointer"
            >
              <option value="summary_large_image">Summary Large Image</option>
              <option value="summary">Summary</option>
              <option value="player">Player</option>
              <option value="app">App</option>
            </select>
          </div>

          {/* Twitter Handle */}
          <div>
            <label htmlFor="twitter-site" className="text-sm font-medium text-gray-300 block mb-2">
              {t("twitterSite")}
            </label>
            <input
              type="text"
              id="twitter-site"
              value={metaData.twitterSite}
              onChange={(e) => setMetaData({ ...metaData, twitterSite: e.target.value })}
              placeholder="@yourusername"
              className="w-full px-4 py-2.5 bg-[#0a0a0b] border border-[#21262d] rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 hover:border-orange-500/30"
            />
          </div>

          {/* Twitter Custom Labels */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="twitter-label2" className="text-sm font-medium text-gray-300 block mb-2">
                {t("twitterLabel2")}
              </label>
              <input
                type="text"
                id="twitter-label2"
                value={metaData.twitterLabel2}
                onChange={(e) => setMetaData({ ...metaData, twitterLabel2: e.target.value })}
                placeholder="Est. reading time"
                className="w-full px-4 py-2.5 bg-[#0a0a0b] border border-[#21262d] rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 hover:border-orange-500/30"
              />
            </div>
            <div>
              <label htmlFor="twitter-data2" className="text-sm font-medium text-gray-300 block mb-2">
                {t("twitterData2")}
              </label>
              <input
                type="text"
                id="twitter-data2"
                value={metaData.twitterData2}
                onChange={(e) => setMetaData({ ...metaData, twitterData2: e.target.value })}
                placeholder="12 Minutes"
                className="w-full px-4 py-2.5 bg-[#0a0a0b] border border-[#21262d] rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 hover:border-orange-500/30"
              />
            </div>
          </div>

          {/* Article Publisher */}
          <div>
            <label htmlFor="article-publisher" className="text-sm font-medium text-gray-300 block mb-2">
              {t("articlePublisher")}
            </label>
            <input
              type="text"
              id="article-publisher"
              value={metaData.articlePublisher}
              onChange={(e) => setMetaData({ ...metaData, articlePublisher: e.target.value })}
              placeholder="https://facebook.com/yourpage"
              className="w-full px-4 py-2.5 bg-[#0a0a0b] border border-[#21262d] rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 hover:border-orange-500/30"
            />
          </div>

          {/* Article Times */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="article-published" className="text-sm font-medium text-gray-300 block mb-2">
                {t("articlePublished")}
              </label>
              <input
                type="datetime-local"
                id="article-published"
                value={metaData.articlePublishedTime}
                onChange={(e) => setMetaData({ ...metaData, articlePublishedTime: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#0a0a0b] border border-[#21262d] rounded-lg text-white focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 hover:border-orange-500/30"
              />
            </div>
            <div>
              <label htmlFor="article-modified" className="text-sm font-medium text-gray-300 block mb-2">
                {t("articleModified")}
              </label>
              <input
                type="datetime-local"
                id="article-modified"
                value={metaData.articleModifiedTime}
                onChange={(e) => setMetaData({ ...metaData, articleModifiedTime: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#0a0a0b] border border-[#21262d] rounded-lg text-white focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 hover:border-orange-500/30"
              />
            </div>
          </div>
        </div>
      )}

      {activeSection === "schema" && (
        <div className="space-y-5">
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 mb-4">
            <p className="text-sm text-orange-300 flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Schema.org structured data helps search engines understand your content better.
            </p>
          </div>

          {/* Schema Type */}
          <div>
            <label htmlFor="schema-type" className="text-sm font-medium text-gray-300 block mb-2">
              {t("schemaType")}
            </label>
            <select
              id="schema-type"
              value={metaData.schemaType}
              onChange={(e) => setMetaData({ ...metaData, schemaType: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#0a0a0b] border border-[#21262d] rounded-lg text-white focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 hover:border-orange-500/30 cursor-pointer"
            >
              <option value="Course">Course</option>
              <option value="Product">Product</option>
              <option value="Article">Article</option>
              <option value="Organization">Organization</option>
              <option value="LocalBusiness">Local Business</option>
              <option value="Event">Event</option>
              <option value="Recipe">Recipe</option>
              <option value="ItemList">Item List</option>
            </select>
          </div>

          {/* Schema Name */}
          <div>
            <label htmlFor="schema-name" className="text-sm font-medium text-gray-300 block mb-2">
              {t("schemaName")}
            </label>
            <input
              type="text"
              id="schema-name"
              value={metaData.schemaName}
              onChange={(e) => setMetaData({ ...metaData, schemaName: e.target.value })}
              placeholder={t("schemaNamePlaceholder")}
              className="w-full px-4 py-2.5 bg-[#0a0a0b] border border-[#21262d] rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 hover:border-orange-500/30"
            />
          </div>

          {/* Schema Description */}
          <div>
            <label htmlFor="schema-description" className="text-sm font-medium text-gray-300 block mb-2">
              {t("schemaDescription")}
            </label>
            <textarea
              id="schema-description"
              value={metaData.schemaDescription}
              onChange={(e) => setMetaData({ ...metaData, schemaDescription: e.target.value })}
              placeholder={t("schemaDescriptionPlaceholder")}
              rows={3}
              className="w-full px-4 py-2.5 bg-[#0a0a0b] border border-[#21262d] rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 resize-none transition-all duration-200 hover:border-orange-500/30"
            />
          </div>

          {/* Pricing Fields */}
          {(metaData.schemaType === "Course" ||
            metaData.schemaType === "Product" ||
            metaData.schemaType === "Event" ||
            metaData.schemaType === "Recipe") && (
            <>
              <h4 className="text-md font-semibold text-white mt-6 mb-3 border-t border-[#21262d] pt-4">
                {t("offerDetails")}
              </h4>

              {/* Price Currency */}
              <div>
                <label htmlFor="schema-currency" className="text-sm font-medium text-gray-300 block mb-2">
                  {t("schemaCurrency")}
                </label>
                <input
                  type="text"
                  id="schema-currency"
                  value={metaData.schemaPriceCurrency}
                  onChange={(e) => setMetaData({ ...metaData, schemaPriceCurrency: e.target.value })}
                  placeholder="INR, USD, EUR"
                  className="w-full px-4 py-2.5 bg-[#0a0a0b] border border-[#21262d] rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 hover:border-orange-500/30"
                />
              </div>

              {/* Price Range */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="schema-low-price" className="text-sm font-medium text-gray-300 block mb-2">
                    {t("schemaLowPrice")}
                  </label>
                  <input
                    type="text"
                    id="schema-low-price"
                    value={metaData.schemaLowPrice}
                    onChange={(e) => setMetaData({ ...metaData, schemaLowPrice: e.target.value })}
                    placeholder="30000"
                    className="w-full px-4 py-2.5 bg-[#0a0a0b] border border-[#21262d] rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 hover:border-orange-500/30"
                  />
                </div>
                <div>
                  <label htmlFor="schema-high-price" className="text-sm font-medium text-gray-300 block mb-2">
                    {t("schemaHighPrice")}
                  </label>
                  <input
                    type="text"
                    id="schema-high-price"
                    value={metaData.schemaHighPrice}
                    onChange={(e) => setMetaData({ ...metaData, schemaHighPrice: e.target.value })}
                    placeholder="89999"
                    className="w-full px-4 py-2.5 bg-[#0a0a0b] border border-[#21262d] rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 hover:border-orange-500/30"
                  />
                </div>
              </div>

              {/* Offer Count */}
              <div>
                <label htmlFor="schema-offer-count" className="text-sm font-medium text-gray-300 block mb-2">
                  {t("schemaOfferCount")}
                </label>
                <input
                  type="text"
                  id="schema-offer-count"
                  value={metaData.schemaOfferCount}
                  onChange={(e) => setMetaData({ ...metaData, schemaOfferCount: e.target.value })}
                  placeholder="3"
                  className="w-full px-4 py-2.5 bg-[#0a0a0b] border border-[#21262d] rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 hover:border-orange-500/30"
                />
              </div>
            </>
          )}

          {/* Rating Fields */}
          {(metaData.schemaType === "Course" ||
            metaData.schemaType === "Product" ||
            metaData.schemaType === "LocalBusiness" ||
            metaData.schemaType === "Recipe" ||
            metaData.schemaType === "Organization") && (
            <>
              <h4 className="text-md font-semibold text-white mt-6 mb-3 border-t border-[#21262d] pt-4">
                {t("aggregateRating")}
              </h4>

              {/* Rating */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="schema-rating-value" className="text-sm font-medium text-gray-300 block mb-2">
                    {t("schemaRatingValue")}
                  </label>
                  <input
                    type="text"
                    id="schema-rating-value"
                    value={metaData.schemaRatingValue}
                    onChange={(e) => setMetaData({ ...metaData, schemaRatingValue: e.target.value })}
                    placeholder="4.7"
                    className="w-full px-4 py-2.5 bg-[#0a0a0b] border border-[#21262d] rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 hover:border-orange-500/30"
                  />
                </div>
                <div>
                  <label htmlFor="schema-rating-count" className="text-sm font-medium text-gray-300 block mb-2">
                    {t("schemaRatingCount")}
                  </label>
                  <input
                    type="text"
                    id="schema-rating-count"
                    value={metaData.schemaRatingCount}
                    onChange={(e) => setMetaData({ ...metaData, schemaRatingCount: e.target.value })}
                    placeholder="921"
                    className="w-full px-4 py-2.5 bg-[#0a0a0b] border border-[#21262d] rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 hover:border-orange-500/30"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
