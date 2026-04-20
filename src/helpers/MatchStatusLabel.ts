import { MatchStatus } from "../enums/MatchStatus";

export function getMatchStatusLabel(status: MatchStatus): string {
  switch (status) {
    case MatchStatus.Scheduled:
      return "Agendado";
    case MatchStatus.InProgress:
      return "Em andamento";
    case MatchStatus.Finished:
      return "Finalizado";
    case MatchStatus.Cancelled:
      return "Cancelado";
    default:
      return "Desconhecido";
  }
}