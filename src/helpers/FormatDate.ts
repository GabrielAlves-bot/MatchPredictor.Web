export function formatMatchDate(dateString : string) {
  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, "0");

  const month = date.toLocaleString("pt-BR", { month: "short" })
    .toUpperCase()
    .replace(".", ""); // remove ponto do "jun."

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day} ${month} · ${hours}:${minutes}`;
}