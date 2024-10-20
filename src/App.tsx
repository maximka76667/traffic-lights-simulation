import React, {
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./App.module.css";
import TrafficLightsContainer from "./components/TrafficLightsContainer/TrafficLightsContainer";
import { Image, KonvaNodeComponent, Layer, Shape, Stage } from "react-konva";
import roadImage from "./assets/road1.svg";
import useImages from "./hooks/useImages"; // Import the custom hook
import crossroad from "./assets/crossroad1.svg";
import carSVG from "./assets/SVG/car1.svg";
import blueCarSVG from "./assets/SVG/car3.svg";
import Konva from "konva";
import { TrafficLightState } from "./types";
import useCarMovement from "./hooks/useCarMovement";

const imageData = [
  { src: crossroad, x: 82, y: 131, scale: { x: 1, y: 1 } },
  { src: roadImage, x: 0, y: 300, scale: { x: 0.5, y: 0.5 } },
];

const carsImageData = [
  { src: carSVG, x: 335, y: 138, scale: { x: 0.8, y: 0.8 } },
  { src: blueCarSVG, x: 45, y: 110, scale: { x: 0.8, y: 0.8 } },
  { src: blueCarSVG, x: 115, y: 150, scale: { x: 0.8, y: 0.8 } },
];

function App() {
  const imageSources = imageData.map((image) => image.src); // Extract image sources
  const images = useImages(imageSources);

  const carsImagesSources = carsImageData.map((image) => image.src);
  const carsImages = useImages(carsImagesSources);

  const blueCarRef = useRef<Konva.Image>(null);
  const blueCarRef2 = useRef<Konva.Image>(null);

  const [state1, setState1] = useState<TrafficLightState>(
    TrafficLightState.Red
  );

  const [state2, setState2] = useState<TrafficLightState>(
    TrafficLightState.Red
  );
  const [isFirstCrossing, setIsFirstCrossing] = useState<boolean>(true);

  const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  useCarMovement({
    carRef: blueCarRef,
    state: state1,
    isFirstCrossing,
    setIsFirstCrossing,
  });
  useCarMovement({
    carRef: blueCarRef2,
    state: state1,
    isFirstCrossing: !isFirstCrossing,
    setIsFirstCrossing,
  });

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
    <div>
      <TrafficLightsContainer state1={state1} state2={state2} />
      <div className={styles["canvas-container"]}>
        <Stage width={window.innerWidth} height={500}>
          <Layer>
            {images.map((image, index) => {
              const { x, y, scale } = imageData[index];
              return (
                <Image
                  width={image.width}
                  height={image.height}
                  key={index}
                  // scale={scale}
                  image={image}
                  x={x}
                  y={y}
                />
              );
            })}
            {carsImages.map((carImage, index) => {
              const { x, y, scale } = carsImageData[index];
              return (
                <Image
                  key={index}
                  ref={index === 2 ? blueCarRef : blueCarRef2}
                  image={carImage}
                  x={x}
                  y={y}
                  scale={scale}
                />
              );
            })}
          </Layer>
        </Stage>
      </div>
    </div>
  );
}

export default App;
