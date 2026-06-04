import type { IBottomMenuData } from "./types/BottomMenuData";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EditNoteIcon from "@mui/icons-material/EditNote";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import RuleIcon from "@mui/icons-material/Rule";

export const menuData: IBottomMenuData[] = [
  {
    id: "predictions",
    icon: EditNoteIcon,
    label: "Palpites",
    destinationPath: "/My-Guesses",
  },
  {
    id: "matches",
    icon: CalendarTodayIcon,
    label: "Resultados",
    destinationPath: "/Matches",
  },
  {
    id: "standings",
    icon: FormatListNumberedIcon,
    label: "Classificação",
    destinationPath: "/Standings",
  },
  {
    id: "rules",
    icon: RuleIcon,
    label: "Regras",
    destinationPath: "/Settings",
  },
];