import ICONS from "../../constants/Icons";
import { MatchStatus } from "../../enums/MatchStatus";
import { getMatchStatusLabel } from "../../helpers/MatchStatusLabel";
import "./styles.css";

interface IProps {
    matchStatus: MatchStatus
}

export function MatchStatusBadge({ matchStatus }: IProps) {
    let icon;
    let modifier;

    let text = getMatchStatusLabel(matchStatus);;

    switch (matchStatus) {
        case MatchStatus.Scheduled:
            icon = ICONS.event;
            modifier = "scheduled"
            break;
        case MatchStatus.Finished:
            icon = ICONS.check;
            modifier = "finished"
            break;
        case MatchStatus.Cancelled:
            icon = ICONS.cancel;
            modifier = "cancelled"
            break;
        case MatchStatus.InProgress:
            icon = ICONS.play;
            modifier = "inProgress"
            break;
        default:
            return null;
    }

    return (
    <div className={`match-card__status-badge match-card__status-badge--${modifier}`}>
            <span className="material-symbols-outlined">{icon}</span>
            <span className="match-card__status-text">{text}</span>
        </div>
    );
}