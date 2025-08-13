import { Film } from "@/types";

export default function FilmCard({ film }: { film: Film }) {
  return (
    <div className="card vstack">
      <strong>{film.title}</strong>
      <span style={{color:"#666", fontSize:14}}>★ {film.voteAverage} / 10</span>
      <p style={{margin:0,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical"}}>
        {film.overview}
      </p>
    </div>
  );
}