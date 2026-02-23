import React, { useState, useEffect, use } from "react";
import UTIF from "utif";
import { Spinner } from "../components/Spinner";

export function ExampleDemo() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [reportImage, setReportImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


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
        "http://127.0.0.1:8000/api/predict/get_detections",
        {
          method: "POST",
          body: formData,
        }
      );
      
      const imageBlob = await response.blob();
      const imageUrl = URL.createObjectURL(imageBlob);
      setResultImage(imageUrl);
    } catch (error) {
      console.error("Error:", error);
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

        <label className="flex flex-col items-center justify-center w-full h-[320px] border-2 border-dashed border-blue-300 rounded-xl cursor-pointer bg-blue-50 hover:bg-blue-100 transition mb-4 overflow-hidden">
          { resultImage ? (
            <img
              src={resultImage}
              alt="Result"
              className="max-h-full max-w-full object-contain cursor-zoom-in hover:scale-[1.02] transition-transform"
            />
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
          {
            loading && (
              <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
                <Spinner />
              </div>
            )
          }
     


          <input
            type="file"
            name="image"
            className="hidden"
            onChange={handleFileChange}
            accept="image/*"
          />
        </label>
        

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