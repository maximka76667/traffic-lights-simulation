import React, { useEffect, useState } from "react";
import TrafficLight from "../TrafficLight/TrafficLight";
import { TrafficLightState } from "../../types";
import styles from "./TrafficLightsContainer.module.css";

interface TrafficLightsContainerProps {
  state1: TrafficLightState;
  state2: TrafficLightState;
}

const TrafficLightsContainer = ({
  state1,
  state2,
}: TrafficLightsContainerProps) => {
  return (
    <div className={styles["traffic-lights-container"]}>
      <TrafficLight state={state1} />
      <TrafficLight state={state2} />
    </div>
  );
};

export default TrafficLightsContainer;
