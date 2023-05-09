import { notFound } from "next/navigation"

export default async function SitePagePage({
  params,
}: {
  params: {
    site: string
    slug: string
  }
}) {
  if (new Date()) {
    notFound()
  }

  return (
    <div>
      {params.site} || {params.slug}
    </div>
  )
}
