import ChannelCard from "../components/ChannelCard";

function Home() {
    return (
        <div className="container">
            <h2>Select Channel</h2>

            <ChannelCard title="Education" path="/channel/education" />
            <ChannelCard title="Poem" path="/channel/poem" />
        </div>
    );
}

export default Home;
