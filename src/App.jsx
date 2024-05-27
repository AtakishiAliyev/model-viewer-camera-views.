import { useRef } from "react";
import "@google/model-viewer";
import glb from "./assets/demo.glb";

function App() {
  const model = useRef();

  const annotationClicked = (annotation) => {
    const dataset = annotation.dataset;
    const targetPosition = dataset.position.split(" ").map(Number);
    const normalVector = dataset.normal.split(" ").map(Number);

    // Set the camera target based on the position of the annotation
    model.current.cameraTarget = `${targetPosition[0]}m ${targetPosition[1]}m ${targetPosition[2]}m`;

    // Calculate the camera orbit angles using the normal vector
    const azimuth =
      Math.atan2(normalVector[2], normalVector[0]) * (180 / Math.PI);
    const elevation = Math.asin(normalVector[1]) * (180 / Math.PI);

    // Set a smaller radius value for closer zoom
    const closerZoomRadius = 0.2; // Adjust this value to control how close the zoom is

    model.current.cameraOrbit = `${azimuth}deg ${elevation}deg ${closerZoomRadius}m`;
    model.current.fieldOfView = "45deg";
  };

  const handleButton = (e) => {
    annotationClicked(e.target);
  };

  return (
    <main>
      <model-viewer
        ref={model}
        src={glb}
        touch-action="pan-y"
        camera-controls
        field-of-view="45deg"
        min-field-of-view="25deg"
        max-field-of-view="45deg"
        interpolation-decay="200"
        min-camera-orbit="auto auto 40%"
      >
        <button
          onClick={handleButton}
          className="view-button"
          slot="hotspot-0"
          data-position="-0.09916310941123264 0.7996048093193944 -0.5609200215894207"
          data-normal="-0.00037559329829801836 0.34042594420144645 0.940271256310767"
        >
          Another Point 0
        </button>
        <button
          onClick={handleButton}
          className="view-button"
          slot="hotspot-1"
          data-position="-1.0240239884458082 0.519962803333998 -0.19448315183883186"
          data-normal="-0.2826295846295447 0.3146844378930346 0.906142495659527"
        >
          Another Point 1
        </button>
        <button
          onClick={handleButton}
          className="view-button"
          slot="hotspot-2"
          data-position="1.2 0.5 -0.8"
          data-normal="0.1 0.9 0.1"
        >
          Another Point 2
        </button>
        <button
          onClick={handleButton}
          className="view-button"
          slot="hotspot-3"
          data-position="0.8188320487793729 0.4295735849775249 0.05403621774045279"
          data-normal="0 0.8839126703352922 0.4676519979864655"
        >
          Another Point 3
        </button>
      </model-viewer>
    </main>
  );
}

export default App;
