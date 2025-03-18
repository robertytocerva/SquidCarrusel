import React, { useRef, useEffect, useState } from "react";
import * as tmImage from "@teachablemachine/image";

const TeachableMachine = () => {
  const videoRef = useRef(null);
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    const loadModel = async () => {
      const URL = "https://teachablemachine.withgoogle.com/models/NWyGmo4sl/"; // Reemplázalo con la URL del modelo
      const modelURL = URL + "model.json";
      const metadataURL = URL + "metadata.json";
      
      const loadedModel = await tmImage.load(modelURL, metadataURL);
      setModel(loadedModel);
    };
    
    loadModel();
    startWebcam();
  }, []);

  const startWebcam = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    }
  };

  const predict = async () => {
    if (model && videoRef.current) {
      const predictions = await model.predict(videoRef.current);
      setPredictions(predictions);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Squid Carrusel</h1>
      <video ref={videoRef} autoPlay className="w-80 border rounded mb-4"></video>
      <button 
        onClick={predict} 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
        Predecir
      </button>
      <div className="mt-4">
        {predictions.map((p, index) => (
          <p key={index}>{p.className}: {(p.probability * 100).toFixed(2)}%</p>
        ))}
      </div>
    </div>
  );
};

export default TeachableMachine;
// cometario de prueba