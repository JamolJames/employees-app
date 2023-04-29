import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import BioUpdate from "./routes/BioUpdate";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/Home" element={<Home />} />
                <Route path="/employees/Bio_Update" element={<BioUpdate />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
