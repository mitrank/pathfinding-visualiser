import { useState } from "react";
import DynamicGrid from "./components/DynamicGrid";
import Header from "./components/Header";

function App() {
  const [isStartVisualise, setIsStartVisualise] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      <Header setIsStartVisualise={setIsStartVisualise} />
      <DynamicGrid
        isStartVisualise={isStartVisualise}
        setIsStartVisualise={setIsStartVisualise}
      />
    </div>
  );
}

export default App;
