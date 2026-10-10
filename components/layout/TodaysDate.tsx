import { connection } from "next/server";

export default async function TodaysDate() {
  await connection();
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });
  return <span className="text-xs text-neutral-500">{date}</span>;
}
