import { Metadata } from "next"

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
  icons: `${SITE_URL}/assets/logo.svg`,
  openGraph: {
    siteName: `${APP_NAME} - ${APP_SLOGAN}`,
    description: APP_DESCRIPTION,
    images: [`${SITE_URL}/assets/logo.svg`],
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} - ${APP_SLOGAN}`,
    description: APP_DESCRIPTION,
    images: [`${SITE_URL}/assets/logo.svg`],
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
    <html>
      <body>
        RootLayout:
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
