import "./App.css";
import { MainGrid } from "./components/MainGrid";
import { BottomUp } from "./components/BottomUp";

function App() {
  return (
    <div className="sectionContainer">
      <div className="section">
        <h1>Welcome To Your Art Gallery</h1>
        <BottomUp />
      </div>
      <div className="section">
        <h1>Absolute Order and the Pursuit of Universality</h1>
        <MainGrid />
      </div>
    </div>
  );
}

export default App;
