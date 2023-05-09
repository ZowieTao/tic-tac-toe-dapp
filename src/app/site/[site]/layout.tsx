export default async function SiteLayout({
  children,
  params,
}: {
  children?: React.ReactNode
  params: {
    site: string
    slug?: string
    tag?: string
  }
}) {
  return (
    <>
      <div>{children}</div>
      <div>{params.site}</div>
      <div>{params.slug}</div>
      <div>{params.tag}</div>
    </>
  )
}
