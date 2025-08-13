"use client";
import { useFormStatus } from "react-dom";
export default function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return <button className="btn" type="submit" disabled={pending}>{pending ? "등록 중..." : children}</button>;
}
