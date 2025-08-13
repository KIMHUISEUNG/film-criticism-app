import { notFound } from "next/navigation";
import { getFilm, getReviewsByFilm, addReview } from "@/lib/data";
import SubmitButton from "@/components/SubmitButton";
import type { Star } from "@/types";

interface Props { params: { id: string } }

export default async function FilmDetailPage({ params }: Props) {
  const filmId = Number(params.id);
  const film = await getFilm(filmId);
  if (!film) return notFound();
  const reviews = await getReviewsByFilm(filmId);

  async function createReview(formData: FormData) {
    "use server";
    const content = String(formData.get("content") || "").trim();
    const n = Number(formData.get("rating"));
    function isStar(v: number): v is Star { return Number.isInteger(v) && v >= 1 && v <= 5; }
    if (!content || !isStar(n)) return;
    await addReview({ filmId, author: "익명", content, rating: n });
  }

  const avg = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : "-";

  return (
    <div className="vstack" style={{gap:24}}>
      <article className="card vstack">
        <h2 style={{margin:"0 0 4px"}}>{film.title}</h2>
        <div style={{color:"#666"}}>평균 ★ {avg} / 5 · {reviews.length}개 리뷰</div>
        <p style={{marginTop:8}}>{film.overview}</p>
      </article>

      <section className="vstack" style={{gap:16}}>
        <h3 style={{margin:0}}>리뷰 작성</h3>
        <form action={createReview} className="vstack" style={{gap:8}}>
          <label className="vstack">
            <span>평점(1~5)</span>
            <input className="input" type="number" name="rating" min={1} max={5} required />
          </label>
          <label className="vstack">
            <span>내용</span>
            <textarea className="textarea" name="content" placeholder="좋았던 점을 적어주세요" required />
          </label>
          <SubmitButton>등록</SubmitButton>
        </form>
      </section>

      <section className="vstack" style={{gap:12}}>
        <h3 style={{margin:0}}>리뷰</h3>
        {reviews.length === 0 && <div>아직 리뷰가 없습니다.</div>}
        {reviews.map((r) => (
          <div key={r.id} className="card vstack" style={{gap:6}}>
            <div className="hstack" style={{justifyContent:"space-between"}}>
              <strong>★ {r.rating}</strong>
              <span style={{color:"#666"}}>{r.author}</span>
            </div>
            <p style={{margin:0, whiteSpace:"pre-wrap"}}>{r.content}</p>
          </div>
        ))}
      </section>
    </div>
  );
}