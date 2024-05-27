import "@google/model-viewer";
import glb from "./assets/demo.glb";
import { useRef } from "react";

function App() {
    const model = useRef();

    const handleButtonClick = (event) => {
        const button = event.currentTarget;

        // Model Viewer referansını al
        const modelViewer = model.current;

        // Kameranın hedef ve yörünge bilgilerini ayarla
        const dataPosition = button.getAttribute("data-position");
        const dataNormal = button.getAttribute("data-normal");

        if (dataPosition && dataNormal) {
            const [x, y, z] = dataPosition.split(" ").map(Number);
            const [nx, ny, nz] = dataNormal.split(" ").map(Number);

            // Kameranın hedefini belirle
            const cameraTarget = `${x}m ${y}m ${z}m`;

            // Kameranın yörüngesini hesapla
            const theta = Math.atan2(nz, nx) * (180 / Math.PI);
            const phi = Math.acos(ny) * (180 / Math.PI);
            const radius = 0.3; // Daha fazla yakınlaştırma mesafesi

            const cameraOrbit = `${theta}deg ${phi}deg ${radius}m`;

            // Yakınlaştırma efektini uygulamak için animasyonu tetikleyin
            modelViewer.setAttribute("camera-orbit", cameraOrbit);
            modelViewer.setAttribute("camera-target", cameraTarget);
        }
    };

    return (
        <main>
            <model-viewer
                ref={model}
                src={glb}
                touch-action="pan-y"
                camera-controls
                interaction-prompt="none"
                interaction-prompt-threshold="0"
                transition-duration="2000" // Geçiş süresini 2 saniye olarak ayarla
            >
                <button
                    onClick={handleButtonClick}
                    className="view-button"
                    slot="hotspot-0"
                    data-position="-1.296 0.432 0.446"
                    data-normal="-0.030 0.999 -0.002"
                >
                    Another Point 0
                </button>
                <button
                    onClick={handleButtonClick}
                    className="view-button"
                    slot="hotspot-1"
                    data-position="-1.0240239884458082 0.519962803333998 -0.19448315183883186"
                    data-normal="-0.2826295846295447 0.3146844378930346 0.906142495659527"
                >
                    Another Point 1
                </button>
                <button
                    onClick={handleButtonClick}
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