async function SiteIndexPage({
  params,
}: {
  params: {
    site: string
  }
}) {
  return <div>{params.site}</div>
}

export default SiteIndexPage
