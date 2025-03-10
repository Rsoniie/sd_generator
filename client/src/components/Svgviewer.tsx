
import React from "react";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchContentRef,
} from "react-zoom-pan-pinch";

interface SvgViewerProps {
  svgUrl: string;
  alt?: string;
}

const SvgViewer: React.FC<SvgViewerProps> = ({ svgUrl, alt = "SVG Diagram" }) => {
  return (
    <div
      className="
        w-full
        h-full
        border
        border-gray-300
        rounded
        overflow-auto
      "
    >

      <TransformWrapper
        initialScale={1}
        initialPositionX={0}
        initialPositionY={0}
      >
        {(ref: ReactZoomPanPinchContentRef) => {
          const { zoomIn, zoomOut, resetTransform } = ref;
          return (
            <>
              {/* Zoom Controls */}
              <div className="flex space-x-2 p-2 bg-gray-200">
                <button
                  onClick={() => zoomIn()}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Zoom In
                </button>
                <button
                  onClick={() => zoomOut()}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Zoom Out
                </button>
                <button
                  onClick={() => resetTransform()}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Reset
                </button>
              </div>
              <TransformComponent wrapperClass="w-full h-full">
                <img src={svgUrl} alt={alt} />
              </TransformComponent>
            </>
          );
        }}
      </TransformWrapper>
    </div>
  );
};

export default SvgViewer;

