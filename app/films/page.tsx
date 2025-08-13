import Link from "next/link";
import Image from "next/image";
import { getFilms } from "@/lib/tmdb";
import FilmCard from "@/components/FilmCard";

export default async function FilmsPage() {
  const films = await getFilms();
  return (
    <section className="vstack" style={{gap:24}}>
      <h2 style={{margin:0}}>인기 영화</h2>
      <div className="grid">
        {films.map((f) => (
          <Link key={f.id} href={`/films/${f.id}`}>
            {/* 썸네일 + 간략 정보 */}
            <div className="vstack" style={{gap:8}}>
              <div className="img">
                <Image
                  src={f.poster ? `https://image.tmdb.org/t/p/w342${f.poster}` : "/favicon.ico"}
                  alt={f.title}
                  width={342}
                  height={513}
                  priority
                />
              </div>
              <FilmCard film={f} minimal />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}