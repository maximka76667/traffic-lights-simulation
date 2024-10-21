import React, {
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./App.module.css";
import TrafficLightsContainer from "./components/TrafficLightsContainer/TrafficLightsContainer";
import {
  Image,
  KonvaNodeComponent,
  Layer,
  Shape,
  Stage,
  Text,
} from "react-konva";
import roadImage from "./assets/road1.svg";
import useImages from "./hooks/useImages"; // Import the custom hook
import crossroad from "./assets/crossroad1.svg";
import carSVG from "./assets/SVG/car1.svg";
import blueCarSVG from "./assets/SVG/car3.svg";
import Konva from "konva";
import { TrafficLightState } from "./types";
import useCarMovement from "./hooks/useCarMovement";
import human1 from "./assets/human1.svg";
import human2 from "./assets/human2.svg";

const imageData = [
  { src: crossroad, x: 82, y: 131 },
  { src: roadImage, x: 0, y: 300 },
];

function App() {
  const imageSources = imageData.map((image) => image.src); // Extract image sources
  const images = useImages(imageSources);

  const blueCarRef = useRef<Konva.Image>(null);
  const blueCarRef2 = useRef<Konva.Image>(null);
  const blueCarRef3 = useRef<Konva.Image>(null);

  const carsImageData = [
    { src: carSVG, x: 335, y: 138, scale: { x: 0.8, y: 0.8 } },
    {
      ref: blueCarRef3,
      src: blueCarSVG,
      x: 45 - 70,
      y: 110 - 40,
      scale: { x: 0.8, y: 0.8 },
    },
    {
      ref: blueCarRef2,
      src: blueCarSVG,
      x: 45,
      y: 110,
      scale: { x: 0.8, y: 0.8 },
    },
    {
      ref: blueCarRef,
      src: blueCarSVG,
      x: 115,
      y: 150,
      scale: { x: 0.8, y: 0.8 },
    },
  ];

  const carsImagesSources = carsImageData.map((image) => image.src);
  const carsImages = useImages(carsImagesSources);

  const [state1, setState1] = useState<TrafficLightState>(
    TrafficLightState.Red
  );

  const [state2, setState2] = useState<TrafficLightState>(
    TrafficLightState.Red
  );
  const [isFirstCrossing, setIsFirstCrossing] = useState<boolean>(true);
  const [crossroadQueue, setCrossroadQueue] = useState<
    RefObject<Konva.Image>[]
  >([blueCarRef, blueCarRef2, blueCarRef3]);

  useCarMovement({
    carRefs: crossroadQueue,
    state: state1,
    isFirstCrossing: !isFirstCrossing,
    setIsFirstCrossing,
  });

  return (
    <div>
      <TrafficLightsContainer
        state1={state1}
        state2={state2}
        setState1={setState1}
        setState2={setState2}
      />
      <div className={styles["canvas-container"]}>
        <Stage width={window.innerWidth} height={500}>
          <Layer>
            {images.map((image, index) => {
              const { x, y } = imageData[index];
              return (
                <Image
                  width={image.width}
                  height={image.height}
                  key={index}
                  image={image}
                  x={x}
                  y={y}
                />
              );
            })}
            {carsImages.map((carImage, index) => {
              const { x, y, scale, ref } = carsImageData[index];
              return (
                <Image
                  key={index}
                  ref={ref}
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
