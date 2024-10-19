import React from "react";
import styles from "./TrafficLight.module.css";
import { TrafficLightState } from "../../types";

interface TrafficLightProps {
  state: TrafficLightState;
}

const TrafficLight = ({ state }: TrafficLightProps) => {
  return (
    <div className={styles["traffic-box"]}>
      <div
        className={`${styles.light} ${styles.red} ${
          state === TrafficLightState.Red ? styles.active : ""
        }`}
      ></div>
      <div
        className={`${styles.light} ${styles.yellow} ${
          state === TrafficLightState.Yellow ? styles.active : ""
        }`}
      ></div>
      <div
        className={`${styles.light} ${styles.green} ${
          state === TrafficLightState.Green ? styles.active : ""
        }`}
      ></div>
    </div>
  );
};

export default TrafficLight;
