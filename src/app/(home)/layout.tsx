export default async function HomeLayout({
  children,
}: {
  children?: React.ReactNode
}) {
  return (
    <div>
      home layout:
      <div
        style={{
          margin: "10px",
        }}
      >
        {children}
      </div>
    </div>
  )
}
