import { Roboto, Open_Sans, Poppins, Lato, Raleway, Roboto_Slab } from "next/font/google";
import "./globals.css";

const font = Lato({ subsets: ["latin"], weight: ['400', '700', '900'] });

export const metadata = {
  title: "Smarty Cracks",
  description: "Add some spice to your crack climbing training.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
