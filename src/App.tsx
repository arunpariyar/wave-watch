import { useEffect } from "react";
import "./App.css";
import { fetchWeather, getLocation } from "./api/api";

function App() {
  useEffect(() => {
    // fetchWeather();
    getLocation("Berlin").then((result) => {
      fetchWeather(result).then((result) => {
        console.log(result);
      });
    });
  });
  return (
    <div>
      <div>
        <input type="text" />
        <button>Check Surf Forecase</button>
      </div>
    </div>
  );
}

export default App;
