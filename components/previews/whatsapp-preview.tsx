interface MetaData {
  title: string
  description: string
  url: string
  siteName: string
  image: string
}

interface WhatsAppPreviewProps {
  metaData: MetaData
}

export function WhatsAppPreview({ metaData }: WhatsAppPreviewProps) {
  const displayTitle = metaData.title || "Page Title"
  const displayDescription = metaData.description || "Description appears here when you share the link on WhatsApp."
  const displayUrl = metaData.url || "example.com"

  // Extract domain from URL
  const domain = displayUrl.replace(/^https?:\/\//, "").split("/")[0]

  return (
    <div className="bg-[#0b141a] rounded-lg p-4 max-w-[360px]">
      <div className="bg-[#1f2c34] rounded-lg overflow-hidden">
        {/* Image */}
        <div className="w-full aspect-[1.91/1] bg-[#202c33] relative overflow-hidden">
          {metaData.image ? (
            <img src={metaData.image || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <svg className="w-12 h-12 text-[#667781]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

        {/* Content */}
        <div className="p-3 bg-[#1f2c34]">
          <h3 className="text-[15px] font-normal text-[#e9edef] leading-snug mb-1 line-clamp-2">{displayTitle}</h3>
          <p className="text-[13px] text-[#8696a0] leading-tight line-clamp-2 mb-2">{displayDescription}</p>
          <div className="flex items-center gap-1 text-[12px] text-[#8696a0]">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
            <span className="truncate">{domain}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
