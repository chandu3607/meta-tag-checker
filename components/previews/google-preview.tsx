interface MetaData {
  title: string
  description: string
  url: string
  siteName: string
  image: string
}

interface GooglePreviewProps {
  metaData: MetaData
}

export function GooglePreview({ metaData }: GooglePreviewProps) {
  const displayTitle = metaData.title || "Page Title - Site Name"
  const displayDescription =
    metaData.description ||
    "This is the meta description that will appear in Google search results. It should be compelling and informative."
  const displayUrl = metaData.url || "https://example.com"
  const displaySiteName = metaData.siteName || "example.com"

  return (
    <div className="bg-white p-4 sm:p-5 rounded-lg max-w-[600px]">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
            />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-900">{displaySiteName}</span>
          <span className="text-xs text-gray-500">{displayUrl}</span>
        </div>
      </div>
      <h3 className="text-xl text-[#1a0dab] hover:underline cursor-pointer leading-tight mb-1">{displayTitle}</h3>
      <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{displayDescription}</p>
    </div>
  )
}
