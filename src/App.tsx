import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import TrafficLight from "./components/TrafficLight/TrafficLight";
import { TrafficLightState } from "./types";

function App() {
  const [state1, setState1] = useState<TrafficLightState>(
    TrafficLightState.Red
  );
  const [state2, setState2] = useState<TrafficLightState>(
    TrafficLightState.Red
  );

  const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  useEffect(() => {
    const initiateTraffic = async () => {
      while (true) {
        // Start with both lights at Red
        setState1(TrafficLightState.Red);
        setState2(TrafficLightState.Red);
        await sleep(2000); // Both stay red for 2 seconds

        // Light 1 turns Green, Light 2 stays Red
        setState1(TrafficLightState.Green);
        setState2(TrafficLightState.Red);
        await sleep(2000); // Wait for 2 seconds

        // Light 1 turns Yellow, Light 2 stays Red
        setState1(TrafficLightState.Yellow);
        setState2(TrafficLightState.Red);
        await sleep(1000); // Wait for 1 second

        // Both lights at Red
        setState1(TrafficLightState.Red);
        setState2(TrafficLightState.Red);
        await sleep(2000);

        // Light 1 turns Red, Light 2 turns Green
        setState1(TrafficLightState.Red);
        setState2(TrafficLightState.Green);
        await sleep(2000); // Wait for 2 seconds

        // Light 2 turns Yellow, Light 1 stays Red
        setState1(TrafficLightState.Red);
        setState2(TrafficLightState.Yellow);
        await sleep(1000); // Wait for 1 second
      }
    };

    initiateTraffic();
  }, []);

  return (
    <div className={styles.app}>
      <TrafficLight state={state1} />
      <TrafficLight state={state2} />
    </div>
  );
}

export default App;
