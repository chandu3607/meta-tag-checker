"use client"

import { useLanguage } from "@/app/page"
import type { MetaData } from "@/app/page"
import { Heading1, Heading2, Heading3, AlertCircle, CheckCircle } from "lucide-react"

interface HeadingStructureProps {
  metaData: MetaData
}

export function HeadingStructure({ metaData }: HeadingStructureProps) {
  const { t } = useLanguage()

  const headings = metaData.headings || { h1: [], h2: [], h3: [] }
  const hasHeadings = headings.h1.length > 0 || headings.h2.length > 0 || headings.h3.length > 0

  return (
    <div className="bg-[#111113] border border-[#1a1a1d] rounded-lg p-6 space-y-6 hover:border-orange-400/30 transition-all duration-300">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
          {/* <Heading1 className="w-6 h-6 text-orange-400" /> */}
          {t("headingStructureTitle")}
        </h3>
        {hasHeadings && (
          <span className="px-3 py-1 bg-orange-400/10 text-orange-400 text-sm rounded-full">
            {headings.h1.length + headings.h2.length + headings.h3.length} {t("totalHeadings")}
          </span>
        )}
      </div>

      {!hasHeadings ? (
        <div className="text-center py-8">
          <AlertCircle className="w-12 h-12 text-gray-500 mx-auto mb-3" />
          <p className="text-gray-400">{t("noHeadingsFound")}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* H1 Headings */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heading1 className="w-5 h-5 text-orange-400" />
                <h4 className="text-base font-medium text-white">
                  H1 {t("headings")} ({headings.h1.length})
                </h4>
              </div>
              {headings.h1.length === 1 ? (
                <CheckCircle className="w-5 h-5 text-green-400" />
              ) : headings.h1.length === 0 ? (
                <AlertCircle className="w-5 h-5 text-red-400" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-400" />
              )}
            </div>
            {headings.h1.length === 0 ? (
              <div className="bg-red-400/5 border border-red-400/20 rounded-lg p-3">
                <p className="text-sm text-red-300">{t("noH1Found")}</p>
              </div>
            ) : headings.h1.length > 1 ? (
              <>
                <div className="bg-amber-400/5 border border-amber-400/20 rounded-lg p-3 mb-2">
                  <p className="text-sm text-amber-300">{t("multipleH1Warning")}</p>
                </div>
                <div className="space-y-2">
                  {headings.h1.map((heading, index) => (
                    <div
                      key={index}
                      className="bg-[#0a0a0b] border border-[#1a1a1d] rounded-lg p-3 hover:border-orange-400/30 transition-all duration-200"
                    >
                      <p className="text-sm text-gray-300 line-clamp-2">{heading}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-[#0a0a0b] border border-[#1a1a1d] rounded-lg p-3 hover:border-orange-400/30 transition-all duration-200">
                <p className="text-sm text-gray-300">{headings.h1[0]}</p>
              </div>
            )}
          </div>

          {/* H2 Headings */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Heading2 className="w-5 h-5 text-orange-400" />
              <h4 className="text-base font-medium text-white">
                H2 {t("headings")} ({headings.h2.length})
              </h4>
            </div>
            {headings.h2.length === 0 ? (
              <div className="bg-amber-400/5 border border-amber-400/20 rounded-lg p-3">
                <p className="text-sm text-amber-300">{t("noH2Found")}</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                {headings.h2.map((heading, index) => (
                  <div
                    key={index}
                    className="bg-[#0a0a0b] border border-[#1a1a1d] rounded-lg p-3 hover:border-orange-400/30 transition-all duration-200"
                  >
                    <p className="text-sm text-gray-300 line-clamp-2">{heading}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* H3 Headings */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Heading3 className="w-5 h-5 text-orange-400" />
              <h4 className="text-base font-medium text-white">
                H3 {t("headings")} ({headings.h3.length})
              </h4>
            </div>
            {headings.h3.length === 0 ? (
              <div className="text-sm text-gray-400 italic">{t("noH3Found")}</div>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                {headings.h3.map((heading, index) => (
                  <div
                    key={index}
                    className="bg-[#0a0a0b] border border-[#1a1a1d] rounded-lg p-3 hover:border-orange-400/30 transition-all duration-200"
                  >
                    <p className="text-sm text-gray-300 line-clamp-2">{heading}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
