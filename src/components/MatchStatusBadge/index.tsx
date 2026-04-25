import { MatchStatus } from "../../enums/MatchStatus";
import { getMatchStatusLabel } from "../../helpers/MatchStatusLabel";
import EventIcon from '@mui/icons-material/Event';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

import "./styles.css";

interface IProps {
    matchStatus: MatchStatus
}

export function MatchStatusBadge({ matchStatus }: IProps) {
    let IconComponent: React.ElementType;
    let modifier: string;

    const text = getMatchStatusLabel(matchStatus);

    switch (matchStatus) {
        case MatchStatus.Scheduled:
            IconComponent = EventIcon;
            modifier = "scheduled";
            break;
        case MatchStatus.Finished:
            IconComponent = CheckCircleIcon;
            modifier = "finished";
            break;
        case MatchStatus.Cancelled:
            IconComponent = CancelIcon;
            modifier = "cancelled";
            break;
        case MatchStatus.InProgress:
            IconComponent = PlayCircleIcon;
            modifier = "inProgress";
            break;
        default:
            return null;
    }

    return (
        <div className={`match-card__status-badge match-card__status-badge--${modifier}`}>
            <IconComponent />
            <span className="match-card__status-text">{text}</span>
        </div>
    );
}