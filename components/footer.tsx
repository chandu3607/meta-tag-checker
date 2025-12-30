export function Footer() {
  return (
    <footer className="border-t border-[#1a1a1d] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            MetaTagsChecker — Free tool to preview and generate meta tags for SEO and social sharing.
          </p>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
              Privacy
            </a>
            <a href="/terms" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
              Terms
            </a>
            <a href="/cookies" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
