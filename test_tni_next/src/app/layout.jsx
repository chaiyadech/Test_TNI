import "./globals.css";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./_component/Navbar";
import Footer from "./_component/Footer";
import Provider from "./_component/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TNI TEST NEXTJS",
  description: "TNI TEST NEXTJS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Navbar />
          <main className="pt-20">{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}