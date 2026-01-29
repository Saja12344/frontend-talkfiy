// import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { SessionPrompt } from "@/pages/Session";
// import { Mic, MicOff, Video, VideoOff, Square, Clock, AlertTriangle } from "lucide-react";


// interface SessionInterfaceProps {
//   prompt: SessionPrompt;
//   onComplete: () => void;
//   onBack: () => void;
// }

// const SessionInterface = ({ prompt, onComplete, onBack }: SessionInterfaceProps) => {
//   const navigate = useNavigate();
//   const videoRef = useRef<HTMLVideoElement>(null);

// const mediaRecorderRef = useRef<MediaRecorder | null>(null)
// const audioChunksRef = useRef<Blob[]>([])

//   const [isRecording, setIsRecording] = useState(false);
//   const [isMicOn, setIsMicOn] = useState(true);
//   const [isVideoOn, setIsVideoOn] = useState(true);
//   const [elapsedTime, setElapsedTime] = useState(0);
//   const [showWarning, setShowWarning] = useState(false);
// const [isAnalyzing, setIsAnalyzing] = useState(false)

//   // Initialize camera
//   useEffect(() => {
//     const initCamera = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//           audio: true,
//         });
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       } catch (error) {
//         console.error("Error accessing media devices:", error);
//       }
//     };
//     initCamera();

//     return () => {
//       // Cleanup stream on unmount
//       if (videoRef.current?.srcObject) {
//         const stream = videoRef.current.srcObject as MediaStream;
//         stream.getTracks().forEach(track => track.stop());
//       }
//     };
//   }
//   , []);

//   // Timer
//   useEffect(() => {
//   if (!isRecording) return

//   const interval = setInterval(() => {
//     setElapsedTime((t) => t + 1)
//   }, 1000)

//   return () => clearInterval(interval)
// }, [isRecording])


//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
//   };

// // Toggle recording
// // const toggleRecording = () => {
// //   if (isRecording) {
// //     setIsRecording(false)
// //     mediaRecorderRef.current?.stop()
// //   } else {
// //     setIsRecording(true)
// //     startRecording()
// //   }
// // }
// const toggleRecording = () => {
//   if (isRecording) {
//     setIsRecording(false)
//     mediaRecorderRef.current?.stop()
//   } else {
//     setElapsedTime(0)
//     setIsRecording(true)
//     startRecording()
//   }
// }

// // const toggleRecording = () => {
// //   if (isAnalyzing) return

// //   if (isRecording) {
// //     setIsRecording(false)
// //     setIsAnalyzing(true)
// //     mediaRecorderRef.current?.stop()
// //   } else {
// //     setElapsedTime(0)
// //     setIsRecording(true)
// //     startRecording()
// //   }
// // }



//   const toggleMic = () => {
//     setIsMicOn(!isMicOn);
//     if (videoRef.current?.srcObject) {
//       const stream = videoRef.current.srcObject as MediaStream;
//       stream.getAudioTracks().forEach(track => {
//         track.enabled = !isMicOn;
//       });
//     }
//   };

//   const toggleVideo = () => {
//     setIsVideoOn(!isVideoOn);
//     if (videoRef.current?.srcObject) {
//       const stream = videoRef.current.srcObject as MediaStream;
//       stream.getVideoTracks().forEach(track => {
//         track.enabled = !isVideoOn;
//       });
//     }
//   };
//   const startRecording = () => {
//   if (!videoRef.current?.srcObject) return

//   const stream = videoRef.current.srcObject as MediaStream
//   const mediaRecorder = new MediaRecorder(stream,{
//      mimeType: "audio/mp4",
//   })

//   audioChunksRef.current = []

//   mediaRecorder.ondataavailable = (event) => {
//     audioChunksRef.current.push(event.data)
//   }




// mediaRecorder.onstop = () => {
//   console.log("Recording stopped, audio ready")
// }

// // mediaRecorder.onstop = async () => {
// //   const audioBlob = new Blob(audioChunksRef.current, {
// //     type: "audio/webm",
// //   })

// //   try {
// //     await uploadAudio(audioBlob)
// //   } catch (e) {
// //     console.error("Upload failed", e)
// //     setIsAnalyzing(false)
// //   }
// // }

// // mediaRecorder.onstop = async () => {
// //   console.log("🛑 recorder stopped")

// //   const audioBlob = new Blob(audioChunksRef.current, {
// //     type: "audio/webm",
// //   })

// //   console.log("📦 audio blob size:", audioBlob.size)

// //   await uploadAudio(audioBlob)

// //   console.log("➡️ upload finished")
// // }

//   mediaRecorder.start()
//   mediaRecorderRef.current = mediaRecorder
// }

// // const uploadAudio = async (audio: Blob) => {
// //   const formData = new FormData()
// //   formData.append("audio", audio)

// //   const res = await fetch("http://localhost:4000/analyze", {
// //     method: "POST",
// //     body: formData,
// //   })

// //   const report = await res.json()

// //   navigate("/report", {
// //     state: {
// //       ...report,
// //       prompt,
// //       duration: elapsedTime,
// //     },
// //   })
// // }
// const uploadAudio = async (audio: Blob) => {
//   console.log("⬆️ uploading audio")

//   const formData = new FormData()
//   formData.append("audio", audio)

//   const res = await fetch("http://localhost:4000/analyze", {
//     method: "POST",
//     body: formData,
//   })

//   console.log("📡 response status:", res.status)

//   const report = await res.json()
//   console.log("📊 report:", report)

//   navigate("/report", {
//     state: {
//       ...report,
//       prompt,
//       duration: elapsedTime,
//     },
//   })
// }


//   return (
//     <div className="min-h-[calc(100vh-4rem)] bg-foreground/95 flex flex-col">
//       {/* Warning Modal */}
//       {showWarning && (
//         <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//           <div className="glass-card p-6 max-w-md text-center animate-scale-in">
//             <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/10 flex items-center justify-center">
//               <AlertTriangle className="w-8 h-8 text-destructive" />
//             </div>
//             <h3 className="text-xl font-semibold text-foreground mb-2">
//               Content Warning
//             </h3>
//             <p className="text-muted-foreground mb-6">
//               Please keep the conversation appropriate and respectful. Inappropriate language may result in account restrictions.
//             </p>
//             <Button onClick={() => setShowWarning(false)} className="w-full">
//               I Understand
//             </Button>
//           </div>
//         </div>
//       )}

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col items-center justify-center p-6">
//         {/* Session Info */}
//         <div className="text-center mb-8">
//           <div className={`inline-block px-4 py-1.5 rounded-full bg-${prompt.color}/20 text-sm font-medium text-background mb-2`}>
//             {prompt.title}
//           </div>
//           <div className="flex items-center justify-center gap-2 text-background/60">
//             <Clock className="w-4 h-4" />
//             <span className="font-mono text-lg">{formatTime(elapsedTime)}</span>
//           </div>
//         </div>

//         {/* Video Preview */}
//         <div className="relative w-full max-w-2xl aspect-video rounded-3xl overflow-hidden bg-background/10 mb-8">
//           <video
//             ref={videoRef}
//             autoPlay
//             muted
//             playsInline
//             className={`w-full h-full object-cover ${!isVideoOn ? "hidden" : ""}`}
//           />
//           {!isVideoOn && (
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="w-24 h-24 rounded-full bg-background/20 flex items-center justify-center">
//                 <VideoOff className="w-12 h-12 text-background/40" />
//               </div>
//             </div>
//           )}

//           {/* Recording Indicator */}
//           {isRecording && (
//             <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-session-recording rounded-full">
//               <div className="w-3 h-3 bg-background rounded-full animate-pulse" />
//               <span className="text-sm font-medium text-background">Recording</span>
//             </div>
//           )}

//           {/* Voice Waveform */}
//           {isRecording && isMicOn && (
//             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-end gap-1 h-8">
//               {[...Array(7)].map((_, i) => (
//                 <div
//                   key={i}
//                   className="voice-bar bg-talkify-mint"
//                   style={{ animationDelay: `${i * 0.1}s` }}
//                 />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Controls */}
//         <div className="flex items-center gap-4">
//           {/* Mic Toggle */}
//           <button
//             onClick={toggleMic}
//             className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
//               isMicOn
//                 ? "bg-background/20 text-background hover:bg-background/30"
//                 : "bg-destructive text-destructive-foreground"
//             }`}
//           >
//             {isMicOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
//           </button>

//           {/* Record/Stop Button */}
//           {/* <button
//             onClick={toggleRecording}
//             className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
//               isRecording
//                 ? "bg-session-recording recording-pulse"
//                 : "bg-primary hover:bg-primary/90"
//             }`}
//           > */}
//           <button
//   onClick={toggleRecording}
//   className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
//     isRecording
//       ? "bg-session-recording recording-pulse"
//       : "bg-primary hover:bg-primary/90"
//   }`}
// >
//   {isRecording ? (
//     <Square className="w-8 h-8 text-background fill-current" />
//   ) : (
//     <div className="w-8 h-8 rounded-full bg-background" />
//   )}
// </button>

//         <Button
//   className="mt-6 w-full max-w-xs"
//   disabled={isRecording || isAnalyzing || audioChunksRef.current.length === 0}
//   onClick={async () => {
//     setIsAnalyzing(true)

//     const audioBlob = new Blob(audioChunksRef.current, {
//   type: "audio/mp4",
//     })

//     try {
//       await uploadAudio(audioBlob)
//     } catch (e) {
//       console.error("Analysis failed", e)
//       setIsAnalyzing(false)
//     }
//   }}
// >
//   {isAnalyzing ? "Analyzing…" : "Finish Session"}
// </Button>


            
//             {/* {isRecording ? (
//               <Square className="w-8 h-8 text-background fill-current" />
//             ) : (
//               <div className="w-8 h-8 rounded-full bg-background" />
//             )}
//           </button> */}

//           {/* Video Toggle */}
//           <button
//             onClick={toggleVideo}
//             className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
//               isVideoOn
//                 ? "bg-background/20 text-background hover:bg-background/30"
//                 : "bg-destructive text-destructive-foreground"
//             }`}
//           >
//             {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
//           </button>
//         </div>

//         {/* Instructions */}
//         {/* <p className="text-background/50 text-sm mt-8 text-center max-w-md">
//           {isRecording
//             ? "Speak naturally about your topic. Click the red button when you're done."
//             : "Click the button above to start recording your session."} */}

//             <p className="text-background/50 text-sm mt-8 text-center max-w-md">
//   {isAnalyzing
//     ? "Analyzing your session… ⏳"
//     : isRecording
//     ? "Speak naturally about your topic. Click the red button when you're done."
//     : "Click the button above to start recording your session."}
// </p>

//       </div>
//     </div>
//   );
// };

// export default SessionInterface;



import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SessionPrompt } from "@/pages/Session";
import { Mic, MicOff, Video, VideoOff, Square, Clock, AlertTriangle } from "lucide-react";

const EN_FILLERS = [
  "um",
  "uh",
  "like",
  "you know",
  "actually",
  "basically",
  "so",
  "erm",
  "like",
  "you know",
  "aa",
  "اا",
  "امم",
  "مم",
  "mm",
];

function countEnglishFillers(text: string) {
  const lower = text.toLowerCase();
  let total = 0;

  EN_FILLERS.forEach((word) => {
    const regex = new RegExp(`\\b${word}\\b`, "gi");
    const matches = lower.match(regex);
    if (matches) total += matches.length;
  });

  return total;
}

interface SessionInterfaceProps {
  prompt: SessionPrompt;
  onComplete: () => void;
  onBack: () => void;
}

const getSpeechRecognition = () => {
  const w = window as any;
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
};

const SessionInterface = ({ prompt }: SessionInterfaceProps) => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isRecording, setIsRecording] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // ✅ transcript الحقيقي
  const [transcript, setTranscript] = useState("");
  const transcriptRef = useRef("");
  const recognitionRef = useRef<any>(null);

  // Initialize camera
  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    };

    initCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Timer
  useEffect(() => {
    if (!isRecording) return;
    const interval = setInterval(() => setElapsedTime((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // ✅ بدء Speech-to-Text داخل المتصفح
  const startSTT = () => {
    const SR = getSpeechRecognition();
    if (!SR) {
      alert("Speech Recognition غير مدعوم في هذا المتصفح. استخدمي Chrome/Edge.");
      return;
    }

    transcriptRef.current = "";
    setTranscript("");

    const rec = new SR();
    rec.lang = "en-US"; // تقدرين تغيرينها "ar-SA" أو خليها حسب لغتك
    rec.continuous = true;
    rec.interimResults = true;

    rec.onresult = (event: any) => {
      let full = "";
      for (let i = 0; i < event.results.length; i++) {
        full += event.results[i][0].transcript + " ";
      }
      transcriptRef.current = full.trim();
      setTranscript(transcriptRef.current);
    };

    rec.onerror = (e: any) => {
      console.error("STT error:", e);
    };

    rec.onend = () => {
      // لو توقف تلقائيًا أثناء التسجيل، نحاول نرجعه
      if (isRecording) {
        try {
          rec.start();
        } catch {}
      }
    };

    try {
      rec.start();
      recognitionRef.current = rec;
    } catch (e) {
      console.error("Failed to start recognition:", e);
    }
  };

  const stopSTT = () => {
    try {
      recognitionRef.current?.stop();
    } catch {}
  };

  // Toggle recording (UI recording mode فقط)
  const toggleRecording = () => {
    if (isAnalyzing) return;

    if (isRecording) {
      setIsRecording(false);
      stopSTT();
    } else {
      setElapsedTime(0);
      setIsRecording(true);
      startSTT();
    }
  };

  const toggleMic = () => {
    setIsMicOn(!isMicOn);
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getAudioTracks().forEach((track) => (track.enabled = !isMicOn));
    }
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getVideoTracks().forEach((track) => (track.enabled = !isVideoOn));
    }
  };

  // ✅ إرسال النص للباك إند للتحليل
  const uploadTranscript = async (text: string) => {
    const res = await fetch("https://talkify-backend-aeqd.onrender.com/analyze-text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, duration: elapsedTime }),
    });

    if (!res.ok) {
      const msg = await res.text().catch(() => "");
      throw new Error(`Analyze failed: ${res.status} ${msg}`);
    }

    return res.json();
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-foreground/95 flex flex-col">
      {showWarning && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card p-6 max-w-md text-center animate-scale-in">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Content Warning</h3>
            <p className="text-muted-foreground mb-6">
              Please keep the conversation appropriate and respectful.
            </p>
            <Button onClick={() => setShowWarning(false)} className="w-full">
              I Understand
            </Button>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="text-center mb-8">
          <div className={`inline-block px-4 py-1.5 rounded-full bg-${prompt.color}/20 text-sm font-medium text-background mb-2`}>
            {prompt.title}
          </div>
          <div className="flex items-center justify-center gap-2 text-background/60">
            <Clock className="w-4 h-4" />
            <span className="font-mono text-lg">{formatTime(elapsedTime)}</span>
          </div>
        </div>

        <div className="relative w-full max-w-2xl aspect-video rounded-3xl overflow-hidden bg-background/10 mb-6">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className={`w-full h-full object-cover ${!isVideoOn ? "hidden" : ""}`}
          />
          {!isVideoOn && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-background/20 flex items-center justify-center">
                <VideoOff className="w-12 h-12 text-background/40" />
              </div>
            </div>
          )}

          {isRecording && (
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-session-recording rounded-full">
              <div className="w-3 h-3 bg-background rounded-full animate-pulse" />
              <span className="text-sm font-medium text-background">Recording</span>
            </div>
          )}
        </div>

        {/* ✅ عرض سريع للنص (اختياري – يساعدك تتأكدي أنه يشتغل) */}
        <div className="w-full max-w-2xl mb-6">
          <div className="bg-background/10 rounded-2xl p-4 text-background/70 text-sm">
            <div className="mb-2 font-semibold text-background/80">Live Transcript</div>
            <div className="min-h-[48px]">
              {transcript ? transcript : <span className="text-background/40">Start recording to capture text…</span>}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleMic}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
              isMicOn ? "bg-background/20 text-background hover:bg-background/30" : "bg-destructive text-destructive-foreground"
            }`}
          >
            {isMicOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
          </button>

          <button
            disabled={isAnalyzing}
            onClick={toggleRecording}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
              isRecording ? "bg-session-recording recording-pulse" : "bg-primary hover:bg-primary/90"
            } ${isAnalyzing ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isRecording ? (
              <Square className="w-8 h-8 text-background fill-current" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-background" />
            )}
          </button>

          <button
            onClick={toggleVideo}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
              isVideoOn ? "bg-background/20 text-background hover:bg-background/30" : "bg-destructive text-destructive-foreground"
            }`}
          >
            {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
          </button>
        </div>

       <Button
  className="mt-6 w-full max-w-xs"
  disabled={isRecording || isAnalyzing || transcript.trim().length < 5}
 onClick={async () => {
  try {
    setIsAnalyzing(true);

    const report = await uploadTranscript(transcript);

    navigate("/report", {
      state: {
        ...report,
        prompt,
        durationLabel: formatTime(elapsedTime),
      },
    });
  } catch (e) {
    console.error(e);
    setIsAnalyzing(false);
  }



  }}
>
  Finish Session
</Button>


        <p className="text-background/50 text-sm mt-6 text-center max-w-md">
          {isAnalyzing
            ? "Analyzing your session… ⏳"
            : isRecording
            ? "Speak naturally. Stop when you're done, then press Finish Session."
            : "Press the middle button to start capturing your speech as text."}
        </p>
      </div>
    </div>
  );
};

export default SessionInterface;
