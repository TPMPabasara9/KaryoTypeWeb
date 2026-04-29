import React, { useState, useEffect } from "react";
import UTIF from "utif";
import { Spinner } from "../components/Spinner";
import { ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

interface DetectedPoint {
  polygon: Array<[number, number]>;
  score: number;
  bbox: [number, number, number, number];
}

export function ExampleDemo() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [reportImage, setReportImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [detectedPoints, setDetectedPoints] = useState<DetectedPoint[]>([]);
  const [previewDimensions, setPreviewDimensions] = useState({ width: 0, height: 0 });
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleClickUploadArea = () => {
    fileInputRef.current?.click();
  };

const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];

  if (!file) return;

  console.log("Selected file:", file); // 🔍 debug

  // Clear previous results when new file is selected
  setResultImage(null);
  setReportImage(null);
  
  setSelectedFile(file);

  //IF not TIFF -> normal preview
  if(!file.name.toLowerCase().endsWith(".tif") &&
     !file.name.toLowerCase().endsWith(".tiff")){
      const url = URL.createObjectURL(file);
      setPreview(url);
      return;
     }

     //TIFF handeling
     const buffer = await file.arrayBuffer();
     const ifds = UTIF.decode(buffer);
     UTIF.decodeImage(buffer, ifds[0]);

      const rgba = UTIF.toRGBA8(ifds[0]);
      const canvas = document.createElement("canvas");
      canvas.width = ifds[0].width;
      canvas.height = ifds[0].height;

      const ctx = canvas.getContext("2d");
      const imageData = ctx?.createImageData(canvas.width, canvas.height);
      if (imageData && ctx) {
        imageData.data.set(rgba);
        ctx.putImageData(imageData, 0, 0);
      }

      const pngUrl = canvas.toDataURL("image/png");
      setPreview(pngUrl);



};



const drawPolygons = (imageElement: HTMLImageElement, points: DetectedPoint[]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = imageElement.width;
    canvas.height = imageElement.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Draw each polygon
    points.forEach((detection, index) => {
      const polygon = detection.polygon;
      if (polygon.length === 0) return;

      // Set stroke color and width
      ctx.strokeStyle = `hsl(${(index * 360) / points.length}, 100%, 50%)`;
      ctx.lineWidth = 2;
      ctx.fillStyle = `hsla(${(index * 360) / points.length}, 100%, 50%, 0.1)`;

      // Draw polygon
      ctx.beginPath();
      ctx.moveTo(polygon[0][0], polygon[0][1]);
      for (let i = 1; i < polygon.length; i++) {
        ctx.lineTo(polygon[i][0], polygon[i][1]);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Draw score label
      if (polygon.length > 0) {
        const labelX = polygon[0][0];
        const labelY = polygon[0][1] - 10;
        ctx.fillStyle = `hsl(${(index * 360) / points.length}, 100%, 50%)`;
        ctx.font = "12px Arial";
        ctx.fillText(`Score: ${detection.score.toFixed(2)}`, labelX, labelY);
      }
    });
  };

  const onsubmit = async () => {
    if (!selectedFile) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/predict/get_detectedPoints",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Detected points:", data);

      if (data.detections && data.detections.length > 0) {
        setDetectedPoints(data.detections);
        setResultImage(preview); // Display the preview with polygons

        // Draw polygons on canvas after image loads
        if (preview) {
          const img = new Image();
          img.onload = () => {
            setPreviewDimensions({ width: img.width, height: img.height });
            drawPolygons(img, data.detections);
          };
          img.src = preview;
        }
      } else {
        alert("No chromosomes detected");
        setDetectedPoints([]);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to detect chromosomes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const generateReport = async () => {
    if (!resultImage) {
      alert("Please run the analysis first");
      return;
    }

    try {
      // Convert blob URL back to blob
     
      
      // Create FormData with the blob as a File
      const formData = new FormData();
      formData.append( "image", selectedFile as File);

      setLoading(true);

      // Send to backend
      const classifyResponse = await fetch(
        "http://localhost:8000/api/predict/get_classifications",
        {
          method: "POST",
          body: formData,
        }
      );
      
      const reportBlob = await classifyResponse.blob();
      const reportUrl = URL.createObjectURL(reportBlob);
      setReportImage(reportUrl);
    } catch (error) {
      console.error("Error:", error);
    }finally{
      setLoading(false);
    }
  };

 useEffect(()=>{
  return ()=>{
    if(preview){
      URL.revokeObjectURL(preview);
    }
  }
 },[preview]);
 



 return (
  <div className="min-h-screen bg-gray-50 p-6">
        <Button
          variant="ghost"
          className="mb-8 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
    {/* Page Title */}
    <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
      Karyotyping Analysis Workflow
    </h1>

    {/* Main Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">

      {/* ================= Upload Panel ================= */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 flex flex-col">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
          Upload & Analysis
        </h2>
        <p className="text-gray-500 text-sm mb-4 text-center">
          Upload a high-resolution chromosome image
        </p>

        <div className="relative flex flex-col items-center justify-center w-full h-[320px] border-2 border-dashed border-blue-300 rounded-xl cursor-pointer bg-blue-50 hover:bg-blue-100 transition mb-4 overflow-hidden" onClick={handleClickUploadArea}>
          {
            loading && (
              <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-40">
                <Spinner />
              </div>
            )
          }
          { resultImage ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={resultImage}
                alt="Result"
                className="max-h-full max-w-full object-contain cursor-zoom-in hover:scale-[1.02] transition-transform"
              />
              {detectedPoints.length > 0 && (
                <canvas
                  ref={canvasRef}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-full max-w-full cursor-crosshair"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                  }}
                />
              )}
            </div>
          ): preview ? (
              <img
              src={preview}
              alt="Preview"
              className="max-h-full max-w-full object-contain cursor-zoom-in hover:scale-[1.02] transition-transform"
            />
          ) : (
            <div className="text-center px-4">
              <p className="text-sm font-semibold text-gray-700 mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500 uppercase">
                PNG, JPG, TIFF
              </p>
            </div>
          )}
     


          <input
            ref={fileInputRef}
            type="file"
            name="image"
            className="hidden"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
        

        {selectedFile && (
          <button
            onClick={onsubmit}
            className="mt-auto w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition shadow"
          >
            Run Analysis
          </button>
        )}
      </div>
      

   

      

      {/* ================= Karyotype Report ================= */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 flex flex-col">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Karyotype Report
        </h2>

        <div className="flex-1 h-[320px] border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 flex items-center justify-center overflow-auto">
          {reportImage ? (
            <img
              src={reportImage}
              alt="Report"
              className="max-h-full max-w-full object-contain cursor-zoom-in hover:scale-[1.02] transition-transform"
            />
          ) : (
            <p className="text-gray-400 italic">
              Report will appear here
            </p>
          )}
        </div>
        
        {selectedFile && (
          <button
            onClick={generateReport}
            className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition shadow"
          >
            Generate Report
          </button>
        )}
      </div>
    </div>
  </div>
    
  
);
}