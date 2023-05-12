import { Metadata } from "next"

import "../css/main.css"
import Providers from "./provider"

const APP_NAME = "Tic Tac Toe"
const APP_SLOGAN = ""
const APP_DESCRIPTION = ""
const SITE_URL = ""

export const metadata: Metadata = {
  title: `${APP_NAME} - ${APP_SLOGAN}`,
  description: APP_DESCRIPTION,
  applicationName: APP_NAME,
  generator: APP_NAME,
  keywords: ["blockchain", "ethereum", "web3", "dapp", "crypto"],
  themeColor: "#ffffff",
  icons: `${SITE_URL}/favicons/favicon.svg`,
  openGraph: {
    siteName: `${APP_NAME} - ${APP_SLOGAN}`,
    description: APP_DESCRIPTION,
    images: [`${SITE_URL}/favicons/favicon.svg`],
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} - ${APP_SLOGAN}`,
    description: APP_DESCRIPTION,
    images: [`${SITE_URL}/favicons/favicon.svg`],
    site: "@_ticTacToe",
    creator: "@_ticTacToe",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
