type Article = {
  title?: string
  description?: string
  url?: string
  image?: string
  source?: string
  published_at?: string
}

async function getNews() {

  const response = await fetch(
    "http://127.0.0.1:8000/food-news",
    {
      next: {
        revalidate: 1800
      }
    }
  )

  return response.json()
}

export default async function NewsPage() {

  const data = await getNews()

  const articles: Article[] =
    data.articles || []

  return (

    <div className="min-h-screen bg-[#f6f6f8] p-6">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div>

          <h1 className="text-5xl font-bold text-gray-900">
            Wellness Feed
          </h1>

          <p className="mt-3 text-lg text-gray-500">
            Food, nutrition and healthy lifestyle updates
          </p>

        </div>

        {/* GRID */}

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {articles.map(
            (article, index) => (

              <a
                key={index}
                href={article.url}
                target="_blank"
                className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >

                {article.image && (

                  <img
                    src={article.image}
                    alt={article.title}
                    className="h-56 w-full object-cover"
                  />

                )}

                <div className="p-5">

                  {article.source && (

                    <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700">
                      {article.source}
                    </span>

                  )}

                  <h2 className="mt-4 line-clamp-2 text-2xl font-semibold text-gray-900">
                    {article.title}
                  </h2>

                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-gray-500">
                    {article.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between">

                    <span className="text-sm text-gray-400">
                      Read article
                    </span>

                    <span className="text-lg text-violet-700">
                      →
                    </span>

                  </div>

                </div>

              </a>

            )
          )}

        </div>

      </div>

    </div>

  )
}