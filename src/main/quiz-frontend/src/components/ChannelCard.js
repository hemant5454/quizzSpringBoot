import { useNavigate } from "react-router-dom";

function ChannelCard({ title, path }) {
    const navigate = useNavigate();

    return (
        <div className="card" onClick={() => navigate(path)}>
            <h3>{title}</h3>
        </div>
    );
}

export default ChannelCard;
