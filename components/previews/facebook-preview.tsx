interface MetaData {
  title: string
  description: string
  url: string
  siteName: string
  image: string
}

interface FacebookPreviewProps {
  metaData: MetaData
}

export function FacebookPreview({ metaData }: FacebookPreviewProps) {
  const displayTitle = metaData.title || "Page Title Goes Here"
  const displayDescription =
    metaData.description ||
    "The Open Graph description appears here. This text should be engaging and summarize the page content."
  const displayDomain = metaData.siteName || "example.com"

  return (
    <div className="bg-white rounded-lg overflow-hidden border border-[#dddfe2] max-w-[500px]">
      <div className="w-full aspect-[1.91/1] bg-[#f0f2f5] relative overflow-hidden">
        {metaData.image ? (
          <img src={metaData.image || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm text-gray-400 mt-2">1200 × 630 recommended</span>
          </div>
        )}
      </div>
      <div className="p-3 bg-[#f0f2f5] border-t border-[#dddfe2]">
        <span className="block text-xs text-[#606770] uppercase tracking-wide mb-1">{displayDomain}</span>
        <h3 className="text-base font-semibold text-[#1d2129] leading-tight mb-1 line-clamp-2">{displayTitle}</h3>
        <p className="text-sm text-[#606770] leading-normal line-clamp-2 m-0">{displayDescription}</p>
      </div>
    </div>
  )
}
