"use client"

import { useLanguage } from "@/app/page"
import type { MetaData } from "@/app/page"
import { Shield, CheckCircle, XCircle } from "lucide-react"

interface SiteVerificationProps {
  metaData: MetaData
}

export function SiteVerification({ metaData }: SiteVerificationProps) {
  const { t } = useLanguage()

  const verifications = [
    {
      name: "Google",
      value: metaData.googleVerification,
      icon: "🔍",
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      borderColor: "border-blue-400/20",
    },
    {
      name: "Facebook",
      value: metaData.facebookVerification,
      icon: "👤",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      name: "Pinterest",
      value: metaData.pinterestVerification,
      icon: "📌",
      color: "text-red-400",
      bgColor: "bg-red-400/10",
      borderColor: "border-red-400/20",
    },
    {
      name: "Bing",
      value: metaData.bingVerification,
      icon: "🅱️",
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      borderColor: "border-green-400/20",
    },
  ]

  const verifiedCount = verifications.filter((v) => v.value).length
  const totalCount = verifications.length

  return (
    <div className="bg-[#111113] border border-[#1a1a1d] rounded-lg p-6 space-y-6 hover:border-orange-400/30 transition-all duration-300">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
          <Shield className="w-6 h-6 text-orange-400" />
          {t("siteVerificationTitle")}
        </h3>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            verifiedCount === 0
              ? "bg-red-400/10 text-red-400"
              : verifiedCount < totalCount
                ? "bg-amber-400/10 text-amber-400"
                : "bg-green-400/10 text-green-400"
          }`}
        >
          {verifiedCount}/{totalCount} {t("verified")}
        </span>
      </div>

      <div className="space-y-4">
        {/* Verification Cards */}
        {verifications.map((verification, index) => (
          <div
            key={index}
            className={`bg-[#0a0a0b] border rounded-lg p-4 transition-all duration-200 hover:scale-[1.02] ${
              verification.value
                ? "border-green-400/20 hover:border-green-400/50"
                : "border-[#1a1a1d] hover:border-orange-400/30"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className={`text-2xl ${verification.bgColor} p-2 rounded-lg`}>{verification.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-base font-medium text-white">{verification.name}</h4>
                    {verification.value ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-gray-500" />
                    )}
                  </div>
                  {verification.value ? (
                    <div className="space-y-1">
                      <p className="text-xs text-green-400 font-medium">{t("verificationFound")}</p>
                      <code className="block text-xs text-gray-400 bg-[#111113] border border-green-400/20 rounded px-2 py-1 break-all">
                        {verification.value}
                      </code>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-500">{t("verificationNotFound")}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div
        className={`p-4 rounded-lg border ${
          verifiedCount === 0
            ? "bg-red-400/5 border-red-400/20"
            : verifiedCount < totalCount
              ? "bg-amber-400/5 border-amber-400/20"
              : "bg-green-400/5 border-green-400/20"
        }`}
      >
        <p
          className={`text-sm ${
            verifiedCount === 0 ? "text-red-300" : verifiedCount < totalCount ? "text-amber-300" : "text-green-300"
          }`}
        >
          {verifiedCount === 0
            ? t("noVerificationFound")
            : verifiedCount < totalCount
              ? t("someVerificationFound")
              : t("allVerificationFound")}
        </p>
      </div>
    </div>
  )
}
