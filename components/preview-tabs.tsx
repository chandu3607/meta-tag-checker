"use client"

import { useState } from "react"
import { GooglePreview } from "./previews/google-preview"
import { FacebookPreview } from "./previews/facebook-preview"
import { TwitterPreview } from "./previews/twitter-preview"
import { LinkedInPreview } from "./previews/linkedin-preview"
import { SlackPreview } from "./previews/slack-preview"
import { WhatsAppPreview } from "./previews/whatsapp-preview"
import { useLanguage } from "@/app/page"

interface MetaData {
  title: string
  description: string
  url: string
  siteName: string
  image: string
  twitterCard: string
  twitterSite: string
}

interface PreviewTabsProps {
  metaData: MetaData
}

export function PreviewTabs({ metaData }: PreviewTabsProps) {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("google")

  const tabs = [
    { id: "google", label: t("google") },
    { id: "facebook", label: t("facebook") },
    { id: "twitter", label: t("twitter") },
    { id: "linkedin", label: t("linkedin") },
    // { id: "slack", label: t("slack") },
    { id: "whatsapp", label: "WhatsApp" },
  ]

  return (
    <div className="bg-[#0d1117]/50 backdrop-blur-sm border border-[#21262d] rounded-lg p-6 transition-all duration-300 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/10">
      <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
        <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
        Live Previews
      </h3>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-[#21262d] pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === tab.id
                ? "text-orange-400 bg-orange-400/10 border border-orange-400 shadow-lg shadow-orange-500/20 scale-105"
                : "text-gray-400 border border-transparent hover:text-white hover:bg-[#161b22] hover:scale-105 hover:border-orange-500/30"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Preview Containers */}
      <div className="min-h-[300px]">
        {activeTab === "google" && <GooglePreview metaData={metaData} />}
        {activeTab === "facebook" && <FacebookPreview metaData={metaData} />}
        {activeTab === "twitter" && <TwitterPreview metaData={metaData} />}
        {activeTab === "linkedin" && <LinkedInPreview metaData={metaData} />}
        {/* {activeTab === "slack" && <SlackPreview metaData={metaData} />} */}
        {activeTab === "whatsapp" && <WhatsAppPreview metaData={metaData} />}
      </div>
    </div>
  )
}
