import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import localFont from "next/font/local";
import Providers from "@/querys/QueryClientProvider";

export const metadata: Metadata = {
  title: "키친빌리지 지출 기록장",
  description: "지출을 간편하게 기록하세요!!",
};

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`trancy-ko ${pretendard.variable}`}>
      <body className="mb-[50px] mt-4 flex w-screen justify-center pt-[70px]">
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
