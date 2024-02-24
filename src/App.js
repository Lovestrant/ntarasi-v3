import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import GameModeChoice from "./components/gameModeChoice";
import ProfileSetup from "./components/ProfileSetup";
import CategorySelection from "./components/CategorySelection";
import PlayGround from "./components/PlayGround";
import SendInvite from "./components/SendInvite";
import AcceptInvite from "./components/AcceptInvite";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GameModeChoice />} />
          <Route path="/CategorySelection" element={<CategorySelection />} />
          <Route path="/ProfileSetup" element={<ProfileSetup />} />
          <Route path="/PlayGround" element={<PlayGround />} />
          <Route path="/SendInvite" element={<SendInvite />} />
          <Route path="/AcceptInvite" element={<AcceptInvite />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
