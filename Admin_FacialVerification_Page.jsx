import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as faceapi from "face-api.js";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "/src/Firebase/firebase";

const Admin_FacialVerification_Page = () => {
  const [progress, setProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [status, setStatus] = useState("Initializing...");
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const navigate = useNavigate();

  const loadModels = async () => {
    const MODEL_URL = "/models";
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
    ]);
  };

  const stopStream = () => {
    const stream = streamRef.current;
    if (stream) stream.getTracks().forEach((track) => track.stop());
    videoRef.current.srcObject = null;
  };

  useEffect(() => {
    let progressInterval;
    let completeTimeout;

    const verifyFace = async () => {
      try {
        setStatus("Verifying...");
        await loadModels();

        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          streamRef.current = stream;
        }

        setStatus("Camera ready. Verifying...");

        progressInterval = setInterval(() => {
          setProgress((prev) => (prev < 100 ? prev + 2 : 100));
        }, 50);

        completeTimeout = setTimeout(async () => {
          const detection = await faceapi
            .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceDescriptor();

          if (!detection) {
            setStatus("No face detected. Please try again.");
            stopStream();
            return;
          }

          const embedding = Array.from(detection.descriptor);

          const auth = getAuth();
          const user = auth.currentUser;
          const userRef = doc(db, "adminUsers", user.uid);
          const userSnap = await getDoc(userRef);

          if (!userSnap.exists()) {
            setStatus("Face data not found in Firestore.");
            stopStream();
            return;
          }

          const storedDescriptor = userSnap.data().faceDescriptor;
          const distance = faceapi.euclideanDistance(embedding, storedDescriptor);
          const isVerified = distance < 0.5;

          stopStream();

          if (isVerified) {
            setScanComplete(true);
            setStatus("Verification successful!");
            setTimeout(() => {
              setFadeOut(true);
              setTimeout(() => navigate("/admin/chat"), 1000);
            }, 1500);
          } else {
            setStatus("Face not recognized. Please try again.");
          }
        }, 4000);
      } catch (err) {
        console.error("Verification error:", err);
        setStatus("Error during verification.");
        stopStream();
      }
    };

    verifyFace();

    return () => {
      clearInterval(progressInterval);
      clearTimeout(completeTimeout);
      stopStream();
    };
  }, [navigate]);

  return (
    <div className={`tracking-wider w-full px-20 mt-10 text-center transition-opacity duration-700 ${fadeOut ? "opacity-0" : "opacity-100"}`}>
      <h2 className="text-2xl font-bold">Facial Verification</h2>

      <p className="text-sm text-gray-600 mb-2">{status}</p>

      <div className="relative w-64 h-64 mx-auto mt-4 flex items-center justify-center">
        <div className="relative w-64 h-64 rounded-full overflow-hidden bg-white">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover aspect-square"
          />

          {!scanComplete && (
            <div className="absolute inset-0 animate-rotate-border">
              <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 256 256">
                <circle cx="128" cy="128" r="128" strokeWidth="10" stroke="lightGray" fill="none" />
                <circle
                  cx="128"
                  cy="128"
                  r="122"
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="766"
                  strokeDashoffset={`${766 - (progress / 100) * 766}`}
                  stroke="url(#gradientStroke)"
                  className="transition-all duration-500"
                />
                <defs>
                  <linearGradient id="gradientStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#1d4ed8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          )}

          {scanComplete && (
            <div className="absolute inset-0 flex items-center justify-center animate-check-appear">
              <svg className="w-full h-full" viewBox="0 0 256 256" fill="none">
                <circle cx="128" cy="128" r="128" fill="#1D4ED8" />
                <path d="M88 128l32 32 64-64" stroke="white" strokeWidth="16" strokeLinecap="round" />
              </svg>
            </div>
          )}
        </div>
      </div>

      <p className="text-sm text-black mt-10">
        {scanComplete ? (
          <>
            <br />
            <span className="text-lg font-bold text-black">Verification complete</span> 
            <br />
            Redirecting to chat...
          </>
        ) : (
          <>
            <br />
            <span className="text-lg font-bold text-black">Scanning your face</span> 
            <br />
            Keep your head up and align with the circle.
          </>
        )}
      </p>

      <style>
        {`
          @keyframes rotate-border {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .animate-rotate-border {
            animation: rotate-border 2s linear infinite;
          }

          @keyframes check-appear {
            0% { opacity: 0; transform: scale(0.5); }
            100% { opacity: 1; transform: scale(1); }
          }
          .animate-check-appear {
            animation: check-appear 0.6s ease-in-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default Admin_FacialVerification_Page;
