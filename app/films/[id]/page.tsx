import Image from "next/image";
import { notFound } from "next/navigation";
import { getFilm } from "@/lib/tmdb";

interface Props { params: { id: string } }

export default async function FilmDetailPage({ params }: Props) {
  const id = Number(params.id);
  const film = await getFilm(id);
  if (!film) return notFound();

  return (
    <div className="vstack" style={{gap:24}}>
      <article className="hstack" style={{gap:24, alignItems:"flex-start"}}>
        <div className="img">
          <Image
            src={film.poster ? `https://image.tmdb.org/t/p/w500${film.poster}` : "/favicon.ico"}
            alt={film.title}
            width={400}
            height={600}
          />
        </div>
        <div className="vstack" style={{gap:8}}>
          <h2 style={{margin:"0 0 4px"}}>{film.title}</h2>
          <div style={{color:"#666"}}>TMDB ★ {film.voteAverage} / 10</div>
          <p style={{marginTop:8, whiteSpace:"pre-wrap"}}>{film.overview}</p>
        </div>
      </article>
    </div>
  );
}