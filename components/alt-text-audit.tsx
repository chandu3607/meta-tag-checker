"use client"

import { useLanguage } from "@/app/page"
import type { MetaData } from "@/app/page"
import { ImageIcon, AlertTriangle, CheckCircle, XCircle, ExternalLink } from "lucide-react"
import { useState } from "react"

interface AltTextAuditProps {
  metaData: MetaData
}

export function AltTextAudit({ metaData }: AltTextAuditProps) {
  const { t } = useLanguage()
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())

  const totalImages = metaData.totalImages || 0
  const imagesWithoutAlt = metaData.imagesWithoutAlt || 0
  const imagesWithoutAltData = metaData.imagesWithoutAltData || []
  const imagesWithAlt = totalImages - imagesWithoutAlt
  const altPercentage = totalImages > 0 ? Math.round((imagesWithAlt / totalImages) * 100) : 0

  const getStatus = () => {
    if (totalImages === 0) return { icon: AlertTriangle, color: "text-gray-400", label: t("noImagesFound") }
    if (imagesWithoutAlt === 0) return { icon: CheckCircle, color: "text-green-400", label: t("allImagesHaveAlt") }
    if (imagesWithoutAlt < totalImages / 2)
      return { icon: AlertTriangle, color: "text-amber-400", label: t("someImagesMissingAlt") }
    return { icon: XCircle, color: "text-red-400", label: t("manyImagesMissingAlt") }
  }

  const status = getStatus()
  const StatusIcon = status.icon

  const handleImageError = (src: string) => {
    setImageErrors(new Set(imageErrors).add(src))
  }

  return (
    <div className="bg-[#111113] border border-[#1a1a1d] rounded-lg p-6 space-y-6 hover:border-orange-400/30 transition-all duration-300">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
          <ImageIcon className="w-6 h-6 text-orange-400" />
          {t("altTextAuditTitle")}
        </h3>
        <StatusIcon className={`w-6 h-6 ${status.color}`} />
      </div>

      {totalImages === 0 ? (
        <div className="text-center py-8">
          <ImageIcon className="w-12 h-12 text-gray-500 mx-auto mb-3" />
          <p className="text-gray-400">{t("noImagesAnalyzed")}</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">{t("altTextCoverage")}</span>
              <span className={`text-xl font-bold ${status.color}`}>{altPercentage}%</span>
            </div>
            <div className="w-full h-3 bg-[#1a1a1d] rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  altPercentage === 100
                    ? "bg-gradient-to-r from-green-400 to-green-500"
                    : altPercentage >= 50
                      ? "bg-gradient-to-r from-amber-400 to-amber-500"
                      : "bg-gradient-to-r from-red-400 to-red-500"
                }`}
                style={{ width: `${altPercentage}%` }}
              />
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#0a0a0b] border border-[#1a1a1d] rounded-lg p-4 hover:border-orange-400/30 transition-all duration-200">
              <div className="flex items-center gap-2 mb-2">
                <ImageIcon className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-400">{t("totalImages")}</span>
              </div>
              <p className="text-2xl font-bold text-white">{totalImages}</p>
            </div>
            <div
              className={`bg-[#0a0a0b] border rounded-lg p-4 transition-all duration-200 ${
                imagesWithoutAlt === 0
                  ? "border-green-400/20 hover:border-green-400/50"
                  : "border-red-400/20 hover:border-red-400/50"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <XCircle className={`w-4 h-4 ${imagesWithoutAlt === 0 ? "text-green-400" : "text-red-400"}`} />
                <span className="text-sm text-gray-400">{t("missingAlt")}</span>
              </div>
              <p className={`text-2xl font-bold ${imagesWithoutAlt === 0 ? "text-green-400" : "text-red-400"}`}>
                {imagesWithoutAlt}
              </p>
            </div>
          </div>

          {imagesWithoutAltData.length > 0 && (
            <div className="bg-[#0a0a0b] border border-red-400/20 rounded-lg p-4">
              <h4 className="text-sm font-medium text-red-400 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                {t("imagesMissingAltTitle")} ({imagesWithoutAltData.length})
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
                {imagesWithoutAltData.map((img, index) => (
                  <div
                    key={index}
                    className="bg-[#111113] border border-[#1a1a1d] rounded-lg p-2 hover:border-orange-400/30 hover:shadow-lg hover:shadow-orange-400/10 transition-all duration-200 group"
                  >
                    <div className="aspect-video bg-[#1a1a1d] rounded overflow-hidden mb-2 flex items-center justify-center">
                      {!imageErrors.has(img.src) ? (
                        <img
                          src={img.src || "/placeholder.svg"}
                          alt=""
                          onError={() => handleImageError(img.src)}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <ImageIcon className="w-8 h-8 text-gray-600" />
                      )}
                    </div>
                    <a
                      href={img.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-gray-400 hover:text-orange-400 transition-colors truncate group"
                      title={img.src}
                    >
                      <ExternalLink className="w-3 h-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="truncate">{new URL(img.src).pathname.split("/").pop() || "image"}</span>
                    </a>
                  </div>
                ))}
              </div>
              {imagesWithoutAltData.length > 0 && (
                <p className="text-xs text-gray-500 mt-3 text-center">
                  {t("totalMissingAlt")}:{" "}
                  <span className="text-red-400 font-semibold">{imagesWithoutAltData.length}</span> {t("images")}
                </p>
              )}
            </div>
          )}

          {/* Status Message */}
          <div
            className={`p-4 rounded-lg border ${
              imagesWithoutAlt === 0
                ? "bg-green-400/5 border-green-400/20"
                : imagesWithoutAlt < totalImages / 2
                  ? "bg-amber-400/5 border-amber-400/20"
                  : "bg-red-400/5 border-red-400/20"
            }`}
          >
            <p className={`text-sm ${status.color}`}>{status.label}</p>
            {imagesWithoutAlt > 0 && (
              <p className="text-xs text-gray-400 mt-2">
                {t("altTextRecommendation").replace("{count}", imagesWithoutAlt.toString())}
              </p>
            )}
          </div>

          {/* Best Practices */}
          <div className="bg-[#0a0a0b] border border-[#1a1a1d] rounded-lg p-4">
            <h4 className="text-sm font-medium text-white mb-3">{t("altTextBestPractices")}</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-orange-400 mt-0.5">•</span>
                <span>{t("altTextTip1")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 mt-0.5">•</span>
                <span>{t("altTextTip2")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 mt-0.5">•</span>
                <span>{t("altTextTip3")}</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
