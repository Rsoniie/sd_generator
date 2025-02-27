// import axios from "axios";
// import React, { useState } from "react";

// const HomePage = () => {
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [hldData, sethldData] = useState("");

//   const API_URL = import.meta.env.VITE_API_URL;

//   const handleWorkflow = () => {

//     alert("This feature is comming soon");

//   };

//   const handleHLD = async() => {
//     const url = `${API_URL}/generate_hld`;
//     const prompt = localStorage.getItem("prompt");
//     const response = await axios.post(url,
//         {"prompt": prompt},
//         {
//             headers:{
//                 'Content-Type': 'application/json'
//             },
//             responseType: "blob"
//         }
//     )

//     console.log(response.status);

//     const svg_url = URL.createObjectURL(response.data);
//     sethldData(svg_url);




//   };

//   const handleLLD = () => {
//     alert(`This feature is comming soon ${API_URL}`);
//   };

//   const handleDownload = () => {
//     if (selectedImage) {
//       const link = document.createElement("a");
//       link.href = selectedImage;
//       link.download = "image.png";
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     }
//   };

//   return (
//     <div className="min-h-screen flex bg-gray-100">
//       <div className="w-1/6 bg-gray-800 p-4">
//         <button
//           onClick={handleWorkflow}
//           className="w-full mb-4 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 focus:outline-none"
//         >
//           Workflow
//         </button>
//         <button
//           onClick={handleHLD}
//           className="w-full mb-4 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 focus:outline-none"
//         >
//           High level design
//         </button>
//         <button
//           onClick={handleLLD}
//           className="w-full mb-4 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 focus:outline-none"
//         >
//           Low level design
//         </button>
//       </div>
//       <div className="flex-1 p-8">
//         {hldData && (
//           <div className="flex flex-col items-center">
//             <img src={selectedImage} alt="Selected" className="mb-4" />
            
//             <button
//               onClick={handleDownload}
//               className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
//             >
//               Download Image
//             </button>
//           </div>
//         ) : (
//           <div className="text-center text-gray-700">
//             Please select a button to display an image.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HomePage;





import axios from "axios";
import React, { useState } from "react";

const HomePage = () => {
  const [hldData, setHldData] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleWorkflow = () => {
    alert("This feature is coming soon");
  };

  const handleHLD = async () => {
    try {
      const url = `${API_URL}/generate_hld`;
      const prompt = localStorage.getItem("prompt");
      if (!prompt) {
        alert("No prompt found in local storage.");
        return;
      }

      const response = await axios.post(
        url,
        { prompt },
        {
          headers: {
            "Content-Type": "application/json",
          },
          responseType: "blob", // Expecting an SVG file
        }
      );

      console.log("Response Status:", response.status);

      const svgUrl = URL.createObjectURL(response.data);
      setHldData(svgUrl); // Set the generated SVG URL
    } catch (error) {
      console.error("Error fetching SVG:", error);
      alert("Failed to fetch HLD data.");
    }
  };

  const handleLLD = () => {
    alert(`This feature is coming soon ${API_URL}`);
  };

  const handleDownload = () => {
    if (hldData) {
      const link = document.createElement("a");
      link.href = hldData;
      link.download = "hld_diagram.svg"; // Save as SVG file
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="w-1/6 bg-gray-800 p-4">
        <button
          onClick={handleWorkflow}
          className="w-full mb-4 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 focus:outline-none"
        >
          Workflow
        </button>
        <button
          onClick={handleHLD}
          className="w-full mb-4 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 focus:outline-none"
        >
          High-Level Design
        </button>
        <button
          onClick={handleLLD}
          className="w-full mb-4 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 focus:outline-none"
        >
          Low-Level Design
        </button>
      </div>
      <div className="flex-1 p-8">
        {hldData ? (
          <div className="flex flex-col items-center">
            <img src={hldData} alt="HLD Diagram" className="mb-4 max-w-full" />
            <button
              onClick={handleDownload}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
            >
              Download SVG
            </button>
          </div>
        ) : (
          <div className="text-center text-gray-700">
            Please select a button to display an image.
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
