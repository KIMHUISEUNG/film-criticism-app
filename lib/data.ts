import { Film, Review, NewReview } from "@/types";

let FILMS: Film[] = [
  { id: 1, title: "Inception", overview: "꿈과 현실을 넘나드는 팀의 잠입 작전.", voteAverage: 8.8 },
  { id: 2, title: "Interstellar", overview: "인류의 미래를 위한 우주 항해.", voteAverage: 8.6 },
  { id: 3, title: "The Dark Knight", overview: "배트맨과 조커의 대결.", voteAverage: 9.0 },
];

let REVIEWS: Review[] = [
  { id: 1, filmId: 1, author: "Alice", rating: 5, content: "마지막까지 몰입감 최고" },
  { id: 2, filmId: 2, author: "Bob", rating: 4, content: "과학적 상상력이 인상적" },
];

export async function getFilms(): Promise<Film[]> { return FILMS; }
export async function getFilm(id: number): Promise<Film | undefined> { return FILMS.find(f => f.id === id); }
export async function getReviewsByFilm(filmId: number): Promise<Review[]> { return REVIEWS.filter(r => r.filmId === filmId).sort((a,b)=>b.id-a.id); }
export async function addReview(review: NewReview): Promise<Review> {
  const id = REVIEWS.length ? Math.max(...REVIEWS.map(r=>r.id)) + 1 : 1;
  const created: Review = { id, ...review };
  REVIEWS.push(created);
  return created;
}
