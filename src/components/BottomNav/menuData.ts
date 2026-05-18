import type { IBottomMenuData } from "./types/BottomMenuData";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EditNoteIcon from "@mui/icons-material/EditNote";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";

export const menuData: IBottomMenuData[] = [
  {
    id: "matches",
    icon: CalendarTodayIcon,
    label: "Partidas",
    destinationPath: "/Matches",
  },
  {
    id: "predictions",
    icon: EditNoteIcon,
    label: "Palpites",
    destinationPath: "/Predictions",
  },
  {
    id: "standings",
    icon: FormatListNumberedIcon,
    label: "Classificação",
    destinationPath: "/Standings",
  },
];