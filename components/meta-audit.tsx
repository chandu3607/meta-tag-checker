"use client"

import { useLanguage } from "@/app/page"
import type { MetaData } from "@/app/page"
import { CheckCircle, AlertCircle, XCircle, AlertTriangle } from "lucide-react"

interface MetaAuditProps {
  metaData: MetaData
}

export function MetaAudit({ metaData }: MetaAuditProps) {
  const { t } = useLanguage()

  // Audit logic
  const issues: { type: "error" | "warning" | "success"; message: string }[] = []
  let score = 100

  // Title checks
  if (!metaData.title) {
    issues.push({ type: "error", message: t("auditTitleMissing") })
    score -= 15
  } else if (metaData.title.length < 30) {
    issues.push({ type: "warning", message: t("auditTitleTooShort") })
    score -= 5
  } else if (metaData.title.length > 60) {
    issues.push({ type: "warning", message: t("auditTitleTooLong") })
    score -= 5
  } else {
    issues.push({ type: "success", message: t("auditTitleGood") })
  }

  // Description checks
  if (!metaData.description) {
    issues.push({ type: "error", message: t("auditDescriptionMissing") })
    score -= 15
  } else if (metaData.description.length < 50) {
    issues.push({ type: "warning", message: t("auditDescriptionTooShort") })
    score -= 5
  } else if (metaData.description.length > 160) {
    issues.push({ type: "warning", message: t("auditDescriptionTooLong") })
    score -= 5
  } else {
    issues.push({ type: "success", message: t("auditDescriptionGood") })
  }

  // Image checks
  if (!metaData.image) {
    issues.push({ type: "error", message: t("auditImageMissing") })
    score -= 10
  } else {
    issues.push({ type: "success", message: t("auditImageGood") })
  }

  // URL checks
  if (!metaData.url) {
    issues.push({ type: "warning", message: t("auditUrlMissing") })
    score -= 5
  } else {
    issues.push({ type: "success", message: t("auditUrlGood") })
  }

  // Keywords check
  if (!metaData.keywords) {
    issues.push({ type: "warning", message: t("auditKeywordsMissing") })
    score -= 5
  } else {
    issues.push({ type: "success", message: t("auditKeywordsGood") })
  }

  // Open Graph checks
  if (metaData.ogType) {
    issues.push({ type: "success", message: t("auditOgTypeGood") })
  } else {
    issues.push({ type: "warning", message: t("auditOgTypeMissing") })
    score -= 3
  }

  // Twitter Card checks
  if (metaData.twitterCard) {
    issues.push({ type: "success", message: t("auditTwitterCardGood") })
  } else {
    issues.push({ type: "warning", message: t("auditTwitterCardMissing") })
    score -= 3
  }

  // Schema.org checks
  if (metaData.schemaType && metaData.schemaName) {
    issues.push({ type: "success", message: t("auditSchemaGood") })
  } else {
    issues.push({ type: "warning", message: t("auditSchemaMissing") })
    score -= 5
  }

  // Robots check
  if (metaData.robots.includes("noindex")) {
    issues.push({ type: "warning", message: t("auditRobotsNoIndex") })
    score -= 5
  }

  // Heading structure checks
  if (metaData.headings) {
    if (metaData.headings.h1.length === 0) {
      issues.push({ type: "error", message: t("auditH1Missing") })
      score -= 10
    } else if (metaData.headings.h1.length > 1) {
      issues.push({ type: "warning", message: t("auditMultipleH1") })
      score -= 5
    } else {
      issues.push({ type: "success", message: t("auditH1Good") })
    }

    if (metaData.headings.h2.length === 0) {
      issues.push({ type: "warning", message: t("auditH2Missing") })
      score -= 3
    } else {
      issues.push({ type: "success", message: t("auditH2Good") })
    }
  }

  // Missing alt text checks
  if (metaData.totalImages !== undefined && metaData.imagesWithoutAlt !== undefined) {
    if (metaData.totalImages > 0) {
      if (metaData.imagesWithoutAlt > 0) {
        issues.push({
          type: "error",
          message: t("auditAltMissing").replace("{count}", metaData.imagesWithoutAlt.toString()),
        })
        score -= Math.min(metaData.imagesWithoutAlt * 2, 15) // Max 15 points deduction
      } else {
        issues.push({ type: "success", message: t("auditAltGood") })
      }
    }
  }

  // Site verification checks
  const hasVerification =
    metaData.googleVerification ||
    metaData.facebookVerification ||
    metaData.pinterestVerification ||
    metaData.bingVerification
  if (hasVerification) {
    issues.push({ type: "success", message: t("auditVerificationGood") })
  } else {
    issues.push({ type: "warning", message: t("auditVerificationMissing") })
    score -= 3
  }

  // Calculate health status
  const getHealthStatus = () => {
    if (score >= 90) return { label: t("auditHealthExcellent"), color: "text-green-400", bg: "bg-green-400/10" }
    if (score >= 70) return { label: t("auditHealthGood"), color: "text-orange-400", bg: "bg-orange-400/10" }
    if (score >= 50) return { label: t("auditHealthFair"), color: "text-amber-400", bg: "bg-amber-400/10" }
    return { label: t("auditHealthPoor"), color: "text-red-400", bg: "bg-red-400/10" }
  }

  const healthStatus = getHealthStatus()

  const errorCount = issues.filter((i) => i.type === "error").length
  const warningCount = issues.filter((i) => i.type === "warning").length
  const successCount = issues.filter((i) => i.type === "success").length

  return (
    <div className="bg-[#111113] border border-[#1a1a1d] rounded-lg p-6 space-y-6 hover:border-orange-400/30 transition-all duration-300">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">{t("auditTitle")}</h3>
        <div
          className={`px-4 py-2 rounded-full ${healthStatus.bg} ${healthStatus.color} font-medium flex items-center gap-2`}
        >
          <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
          {healthStatus.label}
        </div>
      </div>

      {/* Health Score */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">{t("auditHealthScore")}</span>
          <span className={`text-2xl font-bold ${healthStatus.color}`}>{score}/100</span>
        </div>
        <div className="w-full h-3 bg-[#1a1a1d] rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r from-orange-400 to-amber-500 rounded-full transition-all duration-500 ease-out`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#0a0a0b] border border-red-400/20 rounded-lg p-4 hover:border-red-400/50 transition-all duration-200">
          <div className="flex items-center gap-2 mb-1">
            <XCircle className="w-4 h-4 text-red-400" />
            <span className="text-sm text-gray-400">{t("auditErrors")}</span>
          </div>
          <p className="text-2xl font-bold text-red-400">{errorCount}</p>
        </div>
        <div className="bg-[#0a0a0b] border border-amber-400/20 rounded-lg p-4 hover:border-amber-400/50 transition-all duration-200">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-gray-400">{t("auditWarnings")}</span>
          </div>
          <p className="text-2xl font-bold text-amber-400">{warningCount}</p>
        </div>
        <div className="bg-[#0a0a0b] border border-green-400/20 rounded-lg p-4 hover:border-green-400/50 transition-all duration-200">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-400">{t("auditSuccess")}</span>
          </div>
          <p className="text-2xl font-bold text-green-400">{successCount}</p>
        </div>
      </div>

      {/* Issues List */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider">{t("auditIssuesFound")}</h4>
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {issues.map((issue, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 p-3 rounded-lg transition-all duration-200 hover:scale-[1.02] ${
                issue.type === "error"
                  ? "bg-red-400/5 border border-red-400/20 hover:border-red-400/40"
                  : issue.type === "warning"
                    ? "bg-amber-400/5 border border-amber-400/20 hover:border-amber-400/40"
                    : "bg-green-400/5 border border-green-400/20 hover:border-green-400/40"
              }`}
            >
              {issue.type === "error" ? (
                <XCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
              ) : issue.type === "warning" ? (
                <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
              ) : (
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              )}
              <p
                className={`text-sm ${
                  issue.type === "error"
                    ? "text-red-300"
                    : issue.type === "warning"
                      ? "text-amber-300"
                      : "text-green-300"
                }`}
              >
                {issue.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
