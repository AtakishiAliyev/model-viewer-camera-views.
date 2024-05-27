import { useRef } from "react";
import "@google/model-viewer";
import glb from "./assets/plan.glb";

function App() {
  const model = useRef();

  const annotationClicked = (annotation) => {
    const dataset = annotation.dataset;
    const targetPosition = dataset.position.split(" ").map(Number);

    // Set the camera target based on the position of the annotation
    model.current.cameraTarget = `${targetPosition[0]}m ${targetPosition[1]}m ${targetPosition[2]}m`;

    // Azimuth set to 0 degrees and elevation set to -90 degrees for top-down view
    const azimuth = 90;
    const elevation = -90;

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
          data-position="-12.777097501936979 0.914399988949301 1.6188225699929064"
          data-normal="0 1 2.2204460492503126e-16"
        >
          Another Point 0
        </button>
        <button
          onClick={handleButton}
          className="view-button"
          slot="hotspot-1"
          data-position="-7.5554233193333316 0.7619999907910819 0.017164107034066678"
          data-normal="0 1 2.2204460492503126e-16"
        >
          Another Point 1
        </button>
        <button
          onClick={handleButton}
          className="view-button"
          slot="hotspot-2"
          data-position="-2.3225168659977475 0.003968749952036443 -0.11374872954327753"
          data-normal="0 1 2.220446049250313e-16"
        >
          Another Point 2
        </button>
        <button
          onClick={handleButton}
          className="view-button"
          slot="hotspot-3"
          data-position="-2.794254458350233 0.5587999932467945 -5.664913798683839"
          data-normal="0 1 2.2204460492503126e-16"
        >
          Another Point 3
        </button>
      </model-viewer>
    </main>
  );
}

export default App;
