import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import GameModeChoice from "./components/gameModeChoice";
import ProfileSetup from "./components/ProfileSetup";
import CategorySelection from "./components/CategorySelection";
import PlayGround from "./components/PlayGround";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GameModeChoice />} />
          <Route path="/CategorySelection" element={<CategorySelection />} />
          <Route path="/ProfileSetup" element={<ProfileSetup />} />
          <Route path="/PlayGround" element={<PlayGround />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
