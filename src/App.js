import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import NewEmployee from "./routes/NewEmployee";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="home" element={<Home />} />
                <Route path="new-employee" element={<NewEmployee />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
