import Link from "next/link";
import { getFilms } from "@/lib/data";
import FilmCard from "@/components/FilmCard";

export default async function FilmsPage() {
  const films = await getFilms();
  return (
    <section className="vstack" style={{gap:24}}>
      <h2 style={{margin:0}}>인기 영화</h2>
      <div className="grid">
        {films.map((f) => (
          <Link key={f.id} href={`/films/${f.id}`}>
            <FilmCard film={f} />
          </Link>
        ))}
      </div>
    </section>
  );
}