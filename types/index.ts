export type Film = { id:number; title:string; overview:string; voteAverage:number; poster:string|null };
export type Star = 1|2|3|4|5;
export type Review = { id:number; filmId:number; author:string; rating:Star; content:string };
export type NewReview = Omit<Review,"id">;
