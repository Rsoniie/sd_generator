
// // // import axios from "axios";
// // // import React, { useState } from "react";

// // // const HomePage = () => {
// // //   const [hldData, setHldData] = useState<string | null>(null);

// // //   const API_URL = import.meta.env.VITE_API_URL;

// // //   const handleWorkflow = () => {
// // //     alert("This feature is coming soon");
// // //   };

// // //   const handleHLD = async () => {
// // //     try {
// // //       const url = `${API_URL}/generate_hld`;
// // //       const prompt = localStorage.getItem("prompt");
// // //       if (!prompt) {
// // //         alert("No prompt found in local storage.");
// // //         return;
// // //       }

// // //       const response = await axios.post(
// // //         url,
// // //         { prompt },
// // //         {
// // //           headers: {
// // //             "Content-Type": "application/json",
// // //           },
// // //           responseType: "blob", // Expecting an SVG file
// // //         }
// // //       );

// // //       console.log("Response Status:", response.status);

// // //       const svgUrl = URL.createObjectURL(response.data);
// // //       setHldData(svgUrl); // Set the generated SVG URL
// // //     } catch (error) {
// // //       console.error("Error fetching SVG:", error);
// // //       alert("Failed to fetch HLD data.");
// // //     }
// // //   };

// // //   const handleLLD = () => {
// // //     alert(`This feature is coming soon ${API_URL}`);
// // //   };

// // //   const handleDownload = () => {
// // //     if (hldData) {
// // //       const link = document.createElement("a");
// // //       link.href = hldData;
// // //       link.download = "hld_diagram.svg"; // Save as SVG file
// // //       document.body.appendChild(link);
// // //       link.click();
// // //       document.body.removeChild(link);
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen flex bg-gray-100">
// // //       <div className="w-1/6 bg-gray-800 p-4">
// // //         <button
// // //           onClick={handleWorkflow}
// // //           className="w-full mb-4 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 focus:outline-none"
// // //         >
// // //           Workflow
// // //         </button>
// // //         <button
// // //           onClick={handleHLD}
// // //           className="w-full mb-4 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 focus:outline-none"
// // //         >
// // //           High-Level Design
// // //         </button>
// // //         <button
// // //           onClick={handleLLD}
// // //           className="w-full mb-4 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 focus:outline-none"
// // //         >
// // //           Low-Level Design
// // //         </button>
// // //       </div>
// // //       <div className="flex-1 p-8">
// // //         {hldData ? (
// // //           <div className="flex flex-col items-center">
// // //             <img src={hldData} alt="HLD Diagram" className="mb-4 max-w-full" />
// // //             <button
// // //               onClick={handleDownload}
// // //               className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
// // //             >
// // //               Download SVG
// // //             </button>
// // //           </div>
// // //         ) : (
// // //           <div className="text-center text-gray-700">
// // //             Please select a button to display an image.
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default HomePage;







// // src/pages/HomePage.tsx
// import React, { useState } from "react";
// import axios from "axios";
// import SvgViewer from "../components/Svgviewer"; // adjust path as needed

// const HomePage: React.FC = () => {
//   // Store the object URLs for HLD & LLD diagrams
//   const [hldData, setHldData] = useState<string | null>(null);
//   const [lldData, setLldData] = useState<string | null>(null);

//   // If using Vite, you can access env like: import.meta.env.VITE_API_URL
//   const API_URL = import.meta.env.VITE_API_URL;

//   // ----- Handlers -----

//   const handleWorkflow = () => {
//     alert("This feature is coming soon");
//   };

//   // Fetch HLD Diagram
//   const handleHLD = async () => {
//     try {
//       const prompt = localStorage.getItem("prompt");
//       if (!prompt) {
//         alert("No prompt found in local storage.");
//         return;
//       }

//       const response = await axios.post(
//         `${API_URL}/generate_hld`,
//         { prompt },
//         {
//           headers: { "Content-Type": "application/json" },
//           responseType: "blob", // expecting an SVG
//         }
//       );

//       const svgUrl = URL.createObjectURL(response.data);
//       setHldData(svgUrl);
//     } catch (error) {
//       console.error("Error fetching HLD data:", error);
//       alert("Failed to fetch HLD data.");
//     }
//   };

//   // Fetch LLD Diagram
//   const handleLLD = async () => {
//     try {
//       const prompt = localStorage.getItem("prompt");
//       if (!prompt) {
//         alert("No prompt found in local storage.");
//         return;
//       }

//       const response = await axios.post(
//         `${API_URL}/generate_lld`,
//         { prompt },
//         {
//           headers: { "Content-Type": "application/json" },
//           responseType: "blob",
//         }
//       );

//       const svgUrl = URL.createObjectURL(response.data);
//       setLldData(svgUrl);
//     } catch (error) {
//       console.error("Error fetching LLD data:", error);
//       alert("Failed to fetch LLD data.");
//     }
//   };

//   // Download either HLD or LLD
//   const handleDownload = (type: "HLD" | "LLD") => {
//     const data = type === "HLD" ? hldData : lldData;
//     if (!data) return;

//     const link = document.createElement("a");
//     link.href = data;
//     link.download = `${type.toLowerCase()}_diagram.svg`; // e.g. "hld_diagram.svg"
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   // ----- UI Layout -----
//   return (
//     <div className="min-h-screen flex bg-gray-100">
      
//       {/* Sidebar */}
//       <div className="w-1/6 bg-gray-800 p-4">
//         <button
//           onClick={handleWorkflow}
//           className="
//             w-full
//             mb-4
//             bg-gray-700
//             text-white
//             py-2
//             px-4
//             rounded
//             hover:bg-gray-600
//             focus:outline-none
//           "
//         >
//           Workflow
//         </button>

//         <button
//           onClick={handleHLD}
//           className="
//             w-full
//             mb-4
//             bg-gray-700
//             text-white
//             py-2
//             px-4
//             rounded
//             hover:bg-gray-600
//             focus:outline-none
//           "
//         >
//           High-Level Design
//         </button>

//         <button
//           onClick={handleLLD}
//           className="
//             w-full
//             mb-4
//             bg-gray-700
//             text-white
//             py-2
//             px-4
//             rounded
//             hover:bg-gray-600
//             focus:outline-none
//           "
//         >
//           Low-Level Design
//         </button>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-8 space-y-8">
        
//         {/* HLD Section */}
//         {hldData ? (
//           <div className="flex flex-col items-center">
//             {/* Scrollable & Zoomable Area */}
//             <div className="w-full h-[600px] mb-4">
//               <SvgViewer svgUrl={hldData} alt="HLD Diagram" />
//             </div>
//             <button
//               onClick={() => handleDownload("HLD")}
//               className="
//                 bg-blue-500
//                 text-white
//                 py-2
//                 px-4
//                 rounded
//                 hover:bg-blue-600
//                 focus:outline-none
//               "
//             >
//               Download HLD SVG
//             </button>
//           </div>
//         ) : (
//           <div className="text-center text-gray-700">HLD Diagram not loaded.</div>
//         )}

//         {/* LLD Section */}
//         {lldData ? (
//           <div className="flex flex-col items-center">
//             {/* Scrollable & Zoomable Area */}
//             <div className="w-full h-[600px] mb-4">
//               <SvgViewer svgUrl={lldData} alt="LLD Diagram" />
//             </div>
//             <button
//               onClick={() => handleDownload("LLD")}
//               className="
//                 bg-blue-500
//                 text-white
//                 py-2
//                 px-4
//                 rounded
//                 hover:bg-blue-600
//                 focus:outline-none
//               "
//             >
//               Download LLD SVG
//             </button>
//           </div>
//         ) : (
//           <div className="text-center text-gray-700">LLD Diagram not loaded.</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HomePage;



// src/pages/HomePage.tsx
import React, { useState } from "react";
import axios from "axios";
import SvgViewer from "../components/Svgviewer"; // Adjust path if needed

const HomePage: React.FC = () => {
  // Diagram data (URLs for fetched SVGs)
  const [hldData, setHldData] = useState<string | null>(null);
  const [lldData, setLldData] = useState<string | null>(null);

  // Loading states for each request
  const [loadingHLD, setLoadingHLD] = useState<boolean>(false);
  const [loadingLLD, setLoadingLLD] = useState<boolean>(false);

  // Environment variable (Vite style). Adjust if you're using something else.
  const API_URL = import.meta.env.VITE_API_URL;

  // Button Handlers

  const handleWorkflow = () => {
    alert("This feature is coming soon");
  };

  const handleHLD = async () => {
    try {
      setLoadingHLD(true); // Start loading
      const prompt = localStorage.getItem("prompt");
      if (!prompt) {
        alert("No prompt found in local storage.");
        return;
      }

      const response = await axios.post(
        `${API_URL}/generate_hld`,
        { prompt },
        {
          headers: { "Content-Type": "application/json" },
          responseType: "blob", // expecting SVG as a blob
        }
      );

      const svgUrl = URL.createObjectURL(response.data);
      setHldData(svgUrl);
    } catch (error) {
      console.error("Error fetching HLD data:", error);
      alert("Failed to fetch HLD data.");
    } finally {
      setLoadingHLD(false); // Stop loading
    }
  };

  const handleLLD = async () => {
    try {
      setLoadingLLD(true); // Start loading
      const prompt = localStorage.getItem("prompt");
      if (!prompt) {
        alert("No prompt found in local storage.");
        return;
      }

      const response = await axios.post(
        `${API_URL}/generate_lld`,
        { prompt },
        {
          headers: { "Content-Type": "application/json" },
          responseType: "blob",
        }
      );

      const svgUrl = URL.createObjectURL(response.data);
      setLldData(svgUrl);
    } catch (error) {
      console.error("Error fetching LLD data:", error);
      alert("Failed to fetch LLD data.");
    } finally {
      setLoadingLLD(false); // Stop loading
    }
  };

  const handleDownload = (type: "HLD" | "LLD") => {
    const data = type === "HLD" ? hldData : lldData;
    if (!data) return;

    const link = document.createElement("a");
    link.href = data;
    link.download = `${type.toLowerCase()}_diagram.svg`; // e.g. "hld_diagram.svg"
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <div className="w-1/6 bg-gray-800 p-4">
        <button
          onClick={handleWorkflow}
          className="
            w-full
            mb-4
            bg-gray-700
            text-white
            py-2
            px-4
            rounded
            hover:bg-gray-600
            focus:outline-none
          "
        >
          Workflow
        </button>
        <button
          onClick={handleHLD}
          className="
            w-full
            mb-4
            bg-gray-700
            text-white
            py-2
            px-4
            rounded
            hover:bg-gray-600
            focus:outline-none
          "
        >
          High-Level Design
        </button>
        <button
          onClick={handleLLD}
          className="
            w-full
            mb-4
            bg-gray-700
            text-white
            py-2
            px-4
            rounded
            hover:bg-gray-600
            focus:outline-none
          "
        >
          Low-Level Design
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 space-y-8">

        {/* HLD Section */}
        {loadingHLD ? (
          // Show loading message while fetching
          <div className="text-center text-gray-700">Loading HLD diagram...</div>
        ) : hldData ? (
          // Show viewer if HLD is fetched
          <div className="flex flex-col items-center">
            <div className="w-full h-[600px] mb-4">
              <SvgViewer svgUrl={hldData} alt="HLD Diagram" />
            </div>
            <button
              onClick={() => handleDownload("HLD")}
              className="
                bg-blue-500
                text-white
                py-2
                px-4
                rounded
                hover:bg-blue-600
                focus:outline-none
              "
            >
              Download HLD SVG
            </button>
          </div>
        ) : (
          // Fallback if not loading & no data yet
          <div className="text-center text-gray-700">HLD Diagram not loaded.</div>
        )}

        {/* LLD Section */}
        {loadingLLD ? (
          // Show loading message while fetching
          <div className="text-center text-gray-700">Loading LLD diagram...</div>
        ) : lldData ? (
          // Show viewer if LLD is fetched
          <div className="flex flex-col items-center">
            <div className="w-full h-[600px] mb-4">
              <SvgViewer svgUrl={lldData} alt="LLD Diagram" />
            </div>
            <button
              onClick={() => handleDownload("LLD")}
              className="
                bg-blue-500
                text-white
                py-2
                px-4
                rounded
                hover:bg-blue-600
                focus:outline-none
              "
            >
              Download LLD SVG
            </button>
          </div>
        ) : (
          // Fallback if not loading & no data yet
          <div className="text-center text-gray-700">LLD Diagram not loaded.</div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
