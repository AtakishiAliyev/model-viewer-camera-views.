import "@google/model-viewer";
import glb from "./assets/demo.glb";

import { useState, useRef } from "react";

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

    model.current.cameraOrbit = `${azimuth}deg ${elevation}deg 1m`;
    model.current.fieldOfView = "45deg";
  };

  const handleButton = (e) => {
    annotationClicked(e.target);
  };

  return (
    <main>
      <model-viewer ref={model} src={glb} touch-action="pan-y" camera-controls>
        <button
          onClick={handleButton}
          className="view-button"
          slot="hotspot-0"
          data-position="-1.296 0.432 0.446"
          data-normal="-0.030 0.999 -0.002"
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
      </model-viewer>
    </main>
  );
}

export default App;

// {
//   "position": {
//       "x": -1.2960553082139825,
//       "y": 0.4318301377607727,
//       "z": 0.44639169280005814
//   },
//   "normal": {
//       "x": -0.03011840620190712,
//       "y": 0.9995442363126058,
//       "z": -0.002049698052532894
//   },
//   "uv": {
//       "u": 0.49218707888230995,
//       "v": 0.6039823192262876
//   }
// }

// {
//   "theta": 0,
//   "phi": 1.3089969389957472,
//   "radius": 6.656282620406839
// }

// {
//   "x": 0.00028434752782402484,
//   "y": 0.45026951533678605,
//   "z": -0.0007063063588431673
// }

// data-orbit="1.3089969389957472 6.656282620406839 0"
// data-target="0.00028434752782402484 0.45026951533678605 -0.0007063063588431673"
