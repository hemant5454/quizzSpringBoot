function ChannelSelector({ setChannel }) {
    return (
        <div>
            <h3>Select Channel</h3>

            <button onClick={() => setChannel("Education")}>Education</button>
            <button onClick={() => setChannel("Poem")}>Poem</button>
        </div>
    );
}

export default ChannelSelector;
