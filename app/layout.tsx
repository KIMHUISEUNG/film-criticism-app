import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "영화 리뷰",
  description: "Next.js 영화 리뷰 스타터 (films 네이밍)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <header className="main hstack" style={{justifyContent:"space-between"}}>
          <h1 style={{margin:0}}>🎬 영화 리뷰</h1>
          <nav className="hstack">
            <a href="/films" className="btn">영화 목록</a>
          </nav>
        </header>
        <main className="main">{children}</main>
        <footer className="main" style={{paddingTop:0,color:"#666"}}>© {new Date().getFullYear()} Films</footer>
      </body>
    </html>
  );
}