import ActionCard from "../components/ActionCard";
import { useParams } from "react-router-dom";

function ChannelDashboard() {
    const { channel } = useParams();

    return (
        <div className="container">
            <h2>{channel.toUpperCase()} Channel</h2>

            <ActionCard title="Show Questions" path={`/questions/${channel}`} />
            <ActionCard title="Create Quiz" path={`/create-quiz/${channel}`} />
            <ActionCard title="Play Quiz" path={`/play-quiz/${channel}`} />
        </div>
    );
}

export default ChannelDashboard;
