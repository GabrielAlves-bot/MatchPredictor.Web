import type { IBottomMenuData } from "./types/BottomMenuData";

export const menuData: IBottomMenuData[] = [
    {
        id: "matches",
        icon: "calendar_today",
        label: "Partidas",
        destinationPath: "/Matches"

    },
    {
        id: "predictions",
        icon: "edit_note",
        label: "Palpites",
        destinationPath: "/Predictions"

    },
    {
        id: "standings",
        icon: "format_list_numbered",
        label: "Classificação",
        destinationPath: "/Standings"

    },
    {
        id: "profile",
        icon: "person",
        label: "Perfil",
        destinationPath: "/Profile"
    },
];