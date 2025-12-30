interface MetaData {
  title: string
  description: string
  url: string
  siteName: string
  image: string
}

interface LinkedInPreviewProps {
  metaData: MetaData
}

export function LinkedInPreview({ metaData }: LinkedInPreviewProps) {
  const displayTitle = metaData.title || "Page Title Goes Here"
  const displayDomain = metaData.siteName || "example.com"

  return (
    <div className="bg-white rounded-lg overflow-hidden border border-[#d6d6d7] max-w-[500px]">
      <div className="w-full aspect-[1.91/1] bg-[#f3f2f0] relative overflow-hidden">
        {metaData.image ? (
          <img src={metaData.image || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-14 h-14 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="p-3 bg-white">
        <h3 className="text-sm font-semibold text-[#000000e6] leading-tight mb-1 line-clamp-2">{displayTitle}</h3>
        <span className="text-xs text-[#00000099]">{displayDomain}</span>
      </div>
    </div>
  )
}
