import { Dispatch, RefObject, useEffect } from "react";
import { TrafficLightState } from "../types";
import Konva from "konva";

interface useCarMovementProps {
  carRefs: RefObject<Konva.Image>[];
  state: TrafficLightState;
  isFirstCrossing: boolean;
  setIsFirstCrossing: Dispatch<React.SetStateAction<boolean>>;
}

const CAR_POSITIONS = {
  prepare: { x: 115, y: 150 },
  finish: { x: 420, y: 325 },
};

const useCarMovement = ({ carRefs, state }: useCarMovementProps) => {
  function crossRoad(ref: RefObject<Konva.Image>, i: number) {
    if (ref.current) {
      ref.current.to({
        ...CAR_POSITIONS.finish,
        duration: 3 + (i + 1) * 1,
        onFinish: () => {
          if (ref.current) {
            ref.current.to({
              x: CAR_POSITIONS.prepare.x - (i + 1) * 70,
              y: CAR_POSITIONS.prepare.y - (i + 1) * 40,
              duration: 0,
            });
          }

          const carToShift = carRefs.shift();
          if (carToShift) carRefs.push(carToShift);
        },
      });
    }
  }

  function approachCrossroad(ref: RefObject<Konva.Image>, i: number) {
    if (ref.current) {
      ref.current.to({
        x: CAR_POSITIONS.prepare.x + (i - 2) * 50,
        y: CAR_POSITIONS.prepare.y + (i - 2) * 50,
        duration: 2.3,
      });
    }
  }

  useEffect(() => {
    if (state === TrafficLightState.Green) {
      for (let i = 0; i < 2; i++) {
        crossRoad(carRefs[i], i);
      }

      for (let i = 2; i < carRefs.length; i++) {
        approachCrossroad(carRefs[i], i);
      }
    }
  }, [carRefs, state]);
};

export default useCarMovement;
