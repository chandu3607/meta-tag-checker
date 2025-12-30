export function SEOContent() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#21262d]">
      <div className="max-w-4xl mx-auto">
        {/* What are Meta Tags */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">
            What are <span className="text-orange-400">Meta Tags</span>?
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-4">
            Meta tags are snippets of text and image content that provide a summary of your webpage. They don't appear
            on the page itself but exist in the page's HTML code, specifically in the{" "}
            <code className="text-orange-400 bg-[#161b22] px-2 py-1 rounded">{"<head>"}</code> section.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed">
            Search engines like Google use meta tags to understand what your page is about, while social media platforms
            use them to generate rich previews when your content is shared. With MetaTagsChecker, you can preview, edit,
            and generate these essential tags instantly.
          </p>
        </div>

        {/* SEO Importance */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">
            Do Meta Tags Affect <span className="text-orange-400">SEO Rankings</span>?
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-6">
            The SEO community agrees: the most important meta tag for ranking is your{" "}
            <strong className="text-white">title tag</strong>. While other meta tags don't directly affect rankings,
            they play a crucial role in click-through rates and social engagement.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="bg-[#0d1117]/50 border border-[#21262d] rounded-lg p-5 transition-all duration-300 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/10 hover:scale-105">
              <div className="flex items-center gap-3 mb-3">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="font-semibold text-white">Title Tag</h3>
              </div>
              <p className="text-sm text-gray-400">
                Very Important — The second most important factor for on-page SEO, only behind high-quality content.
              </p>
            </div>
            <div className="bg-[#0d1117]/50 border border-[#21262d] rounded-lg p-5 transition-all duration-300 hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-500/10 hover:scale-105">
              <div className="flex items-center gap-3 mb-3">
                <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="font-semibold text-white">Description</h3>
              </div>
              <p className="text-sm text-gray-400">
                Moderately Important — Doesn't affect rankings but significantly impacts click-through rates from search
                results.
              </p>
            </div>
            <div className="bg-[#0d1117]/50 border border-[#21262d] rounded-lg p-5 transition-all duration-300 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/10 hover:scale-105">
              <div className="flex items-center gap-3 mb-3">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <h3 className="font-semibold text-white">OG Image</h3>
              </div>
              <p className="text-sm text-gray-400">
                Important for Social — A compelling image dramatically increases engagement when your content is shared
                on social media.
              </p>
            </div>
            <div className="bg-[#0d1117]/50 border border-[#21262d] rounded-lg p-5 transition-all duration-300 hover:border-gray-500/30 hover:shadow-lg hover:shadow-gray-500/10 hover:scale-105">
              <div className="flex items-center gap-3 mb-3">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                  />
                </svg>
                <h3 className="font-semibold text-white">Keywords</h3>
              </div>
              <p className="text-sm text-gray-400">
                No Longer Relevant — Google officially stopped using meta keywords for ranking in 2009. Focus on content
                instead.
              </p>
            </div>
          </div>
        </div>

        {/* Title Tag Tips */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">
            Crafting the Perfect <span className="text-orange-400">Title Tag</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-6">
            Your title tag appears in multiple places: Google search results, browser tabs, social media shares, and
            when other sites link to you. Here's how to make it count:
          </p>
          <ul className="space-y-4">
            {[
              {
                num: "01",
                title: "Keep it under 60 characters",
                desc: "Google typically displays the first 50-60 characters. Anything longer gets truncated with an ellipsis.",
              },
              {
                num: "02",
                title: "Put keywords first",
                desc: "Front-load your most important keywords. Users scan from left to right, and search engines give more weight to earlier words.",
              },
              {
                num: "03",
                title: "Include your brand",
                desc: 'Add your brand name at the end (e.g., "Page Title | Brand Name") to build recognition and trust.',
              },
              {
                num: "04",
                title: "Make it compelling",
                desc: "Write for humans, not just search engines. A clickable title drives more traffic than a keyword-stuffed one.",
              },
            ].map((tip) => (
              <li key={tip.num} className="flex items-start gap-4 group">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400 font-bold text-lg group-hover:scale-110 transition-transform duration-200">
                  {tip.num}
                </span>
                <div>
                  <h4 className="font-semibold text-white mb-1 group-hover:text-orange-400 transition-colors">
                    {tip.title}
                  </h4>
                  <p className="text-gray-400">{tip.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Meta Description Tips */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">
            Writing Effective <span className="text-orange-400">Meta Descriptions</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-6">
            While meta descriptions don't directly impact rankings, they're your pitch to searchers. A well-crafted
            description can significantly boost your click-through rate.
          </p>
          <div className="bg-[#0d1117]/50 border border-[#21262d] rounded-lg p-6 transition-all duration-300 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/10">
            <h4 className="font-semibold text-white mb-4">Best Practices:</h4>
            <ul className="space-y-3 text-gray-400">
              {[
                "Keep it between 150-160 characters to avoid truncation",
                "Include a clear call-to-action (Learn more, Get started, Discover)",
                "Match the search intent — answer what users are looking for",
                "Make each page's description unique",
                "Include your target keyword naturally (it appears bold in search results)",
              ].map((practice, i) => (
                <li key={i} className="flex items-center gap-3 hover:text-white transition-colors duration-200">
                  <svg
                    className="w-5 h-5 text-orange-400 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {practice}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Open Graph Section */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-6">
            Open Graph & <span className="text-orange-400">Social Media</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-6">
            Open Graph meta tags control how your content appears when shared on Facebook, LinkedIn, and other
            platforms. Twitter has its own set of tags called Twitter Cards.
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h4 className="font-semibold text-white mb-3">Recommended OG Image Size</h4>
              <p className="text-gray-400 mb-2">
                <strong className="text-orange-400">1200 × 630 pixels</strong> — This ratio works well across most
                platforms.
              </p>
              <p className="text-sm text-gray-500">
                Keep important content in the center as some platforms may crop the edges.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Essential OG Tags</h4>
              <ul className="text-gray-400 space-y-1 text-sm">
                <li>
                  <code className="text-orange-400">og:title</code> — The title of your content
                </li>
                <li>
                  <code className="text-orange-400">og:description</code> — A brief description
                </li>
                <li>
                  <code className="text-orange-400">og:image</code> — URL to your preview image
                </li>
                <li>
                  <code className="text-orange-400">og:url</code> — The canonical URL
                </li>
                <li>
                  <code className="text-orange-400">og:type</code> — Type of content (website, article, etc.)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
