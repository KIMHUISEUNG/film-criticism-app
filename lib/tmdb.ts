const TMDB = "https://api.themoviedb.org/3";
const headers = { Authorization: `Bearer ${process.env.TMDB_KEY}` };

export async function getFilms() {
  const r = await fetch(`${TMDB}/movie/popular?language=ko-KR`, { headers, next:{ revalidate: 43200 } }); // 12h ISR
  const j = await r.json(); return j.results.map((x:any)=>({ id:x.id, title:x.title, overview:x.overview, voteAverage:x.vote_average, poster:x.poster_path }));
}

export async function getFilm(id:number){
  const r = await fetch(`${TMDB}/movie/${id}?language=ko-KR`, { headers, cache:"no-store" }); // SSR
  if(!r.ok) return undefined;
  const x = await r.json(); return { id:x.id, title:x.title, overview:x.overview, voteAverage:x.vote_average, poster:x.poster_path };
}
