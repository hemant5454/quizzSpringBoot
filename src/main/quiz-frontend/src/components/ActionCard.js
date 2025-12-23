import { useNavigate } from "react-router-dom";

function ActionCard({ title, path }) {
    const navigate = useNavigate();

    return (
        <div className="card" onClick={() => navigate(path)}>
            <h4>{title}</h4>
        </div>
    );
}

export default ActionCard;
