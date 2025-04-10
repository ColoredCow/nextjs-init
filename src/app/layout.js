import { Nunito } from "next/font/google";
import "@/app/global.css";

const nunitoFont = Nunito({
  subsets: ["latin"],
  display: "swap",
});

const RootLayout = ({ children }) => {
  return (
    <html lang="en" className={nunitoFont.className}>
      <body className="antialiased">{children}</body>
    </html>
  );
};

export const metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || "ColoredCow",
  icons: {
    icon: process.env.NEXT_PUBLIC_APP_ICON_PATH || "/favicon.png",
  },
};

export default RootLayout;
