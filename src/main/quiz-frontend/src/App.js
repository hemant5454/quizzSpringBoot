import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ChannelDashboard from "./pages/ChannelDashboard";
import ShowQuestions from "./pages/ShowQuestions";
import CreateQuiz from "./pages/CreateQuiz";
import PlayQuiz from "./pages/PlayQuiz";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/channel/:channel" element={<ChannelDashboard />} />
                <Route path="/questions/:channel" element={<ShowQuestions />} />
                <Route path="/create-quiz/:channel" element={<CreateQuiz />} />
                <Route path="/play-quiz/:channel" element={<PlayQuiz />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
