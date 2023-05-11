export default async function HomeLayout({
  children,
}: {
  children?: React.ReactNode
}) {
  return (
    <div>
      <div>{children}</div>
    </div>
  )
}
