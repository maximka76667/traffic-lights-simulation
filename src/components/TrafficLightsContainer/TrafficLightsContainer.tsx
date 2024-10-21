import React, { Dispatch, useEffect, useState } from "react";
import TrafficLight from "../TrafficLight/TrafficLight";
import { TrafficLightState } from "../../types";
import styles from "./TrafficLightsContainer.module.css";
import { sleep } from "../../utils";

interface TrafficLightsContainerProps {
  state1: TrafficLightState;
  state2: TrafficLightState;
  setState1: Dispatch<React.SetStateAction<TrafficLightState>>;
  setState2: Dispatch<React.SetStateAction<TrafficLightState>>;
}

const TrafficLightsContainer = ({
  state1,
  state2,
  setState1,
  setState2,
}: TrafficLightsContainerProps) => {
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
    <div className={styles["traffic-lights-container"]}>
      <TrafficLight state={state1} />
      <TrafficLight state={state2} />
    </div>
  );
};

export default TrafficLightsContainer;
