interface MetaData {
  title: string
  description: string
  url: string
  siteName: string
  image: string
}

interface TwitterPreviewProps {
  metaData: MetaData
}

export function TwitterPreview({ metaData }: TwitterPreviewProps) {
  const displayTitle = metaData.title || "Page Title Goes Here"
  const displayDescription = metaData.description || "The Twitter card description. Make it concise and compelling."
  const displayDomain = metaData.siteName || "example.com"

  return (
    <div className="bg-black rounded-2xl overflow-hidden border border-[#2f3336] max-w-[500px]">
      <div className="w-full aspect-[2/1] bg-[#16181c] relative overflow-hidden">
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
      <div className="p-3 border-t border-[#2f3336]">
        <h3 className="text-[15px] font-normal text-[#e7e9ea] leading-tight mb-0.5 line-clamp-1">{displayTitle}</h3>
        <p className="text-[15px] text-[#71767b] leading-normal mb-3 line-clamp-1">{displayDescription}</p>
        <span className="text-[15px] text-[#71767b] flex items-center">
          <svg className="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
          {displayDomain}
        </span>
      </div>
    </div>
  )
}
