import { Dispatch, RefObject, useEffect } from "react";
import { TrafficLightState } from "../types";
import Konva from "konva";

interface useCarMovementProps {
  carRef: RefObject<Konva.Image>;
  state: TrafficLightState;
  isFirstCrossing: boolean;
  setIsFirstCrossing: Dispatch<React.SetStateAction<boolean>>;
}

const useCarMovement = ({
  carRef,
  state,
  isFirstCrossing,
  setIsFirstCrossing,
}: useCarMovementProps) => {
  function crossRoad(ref: RefObject<Konva.Image>) {
    if (ref.current) {
      ref.current.to({
        x: 420,
        y: 325,
        duration: 1,
        onFinish: () => {
          setIsFirstCrossing((prev) => !prev);
        },
      });
    }
  }

  function approachCrossroad(ref: RefObject<Konva.Image>) {
    if (ref.current) {
      ref.current.to({
        x: 115,
        y: 150,
        duration: 1,
      });
    }
  }

  useEffect(() => {
    if (state === TrafficLightState.Green) {
      if (isFirstCrossing) {
        crossRoad(carRef);
      } else {
        approachCrossroad(carRef);
      }
    }
  }, [carRef, state, isFirstCrossing]); // Added `carRef.current` and `state` as dependencies
};

export default useCarMovement;
