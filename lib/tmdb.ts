const TMDB = "https://api.themoviedb.org/3";

const headers = { Authorization: `Bearer ${process.env.TMDB_KEY}` };

type RawFilm = {
  id:number; title:string; overview:string; vote_average:number; poster_path:string|null;
};

export async function getFilms() {
  try {
    const r = await fetch(`${TMDB}/movie/popular?language=ko-KR`, { headers, next:{ revalidate: 43200 } });
    if(!r.ok) {
      console.error("TMDB popular fetch failed", r.status, await r.text());
      console.warn("API 키가 유효한지, .env.local에 v4 Read Access Token을 확인하세요.");
      return [];
    }
    const j = await r.json();
    return (j.results as RawFilm[]).map(x=>({ id:x.id, title:x.title, overview:x.overview, voteAverage:x.vote_average, poster:x.poster_path }));
  } catch (err) {
    console.error("TMDB popular fetch error", err);
    return [];
  }
}

export async function getFilm(id:number){
  try {
    const r = await fetch(`${TMDB}/movie/${id}?language=ko-KR`, { headers, cache:"no-store" });
    if(!r.ok) {
      console.error("TMDB film fetch failed", r.status, await r.text());
      console.warn("API 키가 유효한지, .env.local에 v4 Read Access Token을 Bearer 없이 넣었는지 확인하세요.");
      return undefined;
    }
    const x = (await r.json()) as RawFilm;
    return { id:x.id, title:x.title, overview:x.overview, voteAverage:x.vote_average, poster:x.poster_path };
  } catch (err) {
    console.error("TMDB film fetch error", err);
    return undefined;
  }
}
