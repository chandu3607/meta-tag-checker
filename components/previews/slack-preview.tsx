interface MetaData {
  title: string
  description: string
  url: string
  siteName: string
  image: string
}

interface SlackPreviewProps {
  metaData: MetaData
}

export function SlackPreview({ metaData }: SlackPreviewProps) {
  const displayTitle = metaData.title || "Page Title Goes Here"
  const displayDescription =
    metaData.description || "The meta description will appear here. Slack shows a preview when you share links."
  const displaySiteName = metaData.siteName || "Example"

  return (
    <div className="bg-white rounded-lg border border-[#e0e0e0] max-w-[500px] overflow-hidden flex">
      <div className="w-1 bg-[#1264a3] flex-shrink-0" />
      <div className="p-3 flex-1">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-4 rounded flex items-center justify-center bg-gray-100">
            <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
              />
            </svg>
          </div>
          <span className="text-sm font-bold text-[#1d1c1d]">{displaySiteName}</span>
        </div>
        <h3 className="text-sm font-bold text-[#1264a3] hover:underline cursor-pointer mb-1 line-clamp-2">
          {displayTitle}
        </h3>
        <p className="text-sm text-[#616061] leading-normal mb-2 line-clamp-2">{displayDescription}</p>
        {metaData.image && (
          <div className="rounded overflow-hidden border border-[#e0e0e0]">
            <img
              src={metaData.image || "/placeholder.svg"}
              alt="Preview"
              className="w-full max-h-[200px] object-cover"
            />
          </div>
        )}
        {!metaData.image && (
          <div className="rounded overflow-hidden border border-[#e0e0e0] aspect-video bg-[#f8f8f8] flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    </div>
  )
}
