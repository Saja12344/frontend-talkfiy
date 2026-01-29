import { useState } from "react";
import Header from "@/components/layout/Header";
import PromptSelection from "@/components/session/PromptSelection";
import PreparationScreen from "@/components/session/PreparationScreen";
import SessionInterface from "@/components/session/SessionInterface";
import PermissionsRequest from "@/components/session/PermissionsRequest";

export type SessionStep = "permissions" | "prompts" | "preparation" | "session" | "complete";

export interface SessionPrompt {
  id: string;
  title: string;
  description: string;
  color: string;
  talkingPoints: string[];
}

const sessionPrompts: SessionPrompt[] = [
  {
    id: "introduce",
    title: "Introduce Yourself",
    description: "Practice your personal introduction and make a great first impression",
    color: "talkify-mint",
    talkingPoints: [
      "Your name and background",
      "Your hobbies and interests",
      "Your goals and aspirations",
      "What makes you unique",
    ],
  },
  {
    id: "present",
    title: "Present an Idea",
    description: "Practice pitching a concept or explaining a topic you're passionate about",
    color: "talkify-coral",
    talkingPoints: [
      "What is the main idea?",
      "Why is it important?",
      "Who benefits from it?",
      "What are the next steps?",
    ],
  },
  {
    id: "interview",
    title: "Job Interview",
    description: "Practice answering common interview questions with confidence",
    color: "talkify-lavender",
    talkingPoints: [
      "Your relevant experience",
      "Your strengths and skills",
      "Why this opportunity?",
      "Your career goals",
    ],
  },
];

const Session = () => {
  const [step, setStep] = useState<SessionStep>("permissions");
  const [selectedPrompt, setSelectedPrompt] = useState<SessionPrompt | null>(null);
  const [hasPermissions, setHasPermissions] = useState(false);

  const handlePermissionsGranted = () => {
    setHasPermissions(true);
    setStep("prompts");
  };

  const handlePromptSelect = (prompt: SessionPrompt) => {
    setSelectedPrompt(prompt);
    setStep("preparation");
  };

  const handleStartSession = () => {
    setStep("session");
  };

  const handleSessionComplete = () => {
    setStep("complete");
  };

  const handleBack = () => {
    if (step === "preparation") {
      setStep("prompts");
    } else if (step === "session") {
      setStep("preparation");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {step === "permissions" && (
          <PermissionsRequest onPermissionsGranted={handlePermissionsGranted} />
        )}
        {step === "prompts" && (
          <PromptSelection prompts={sessionPrompts} onSelect={handlePromptSelect} />
        )}
        {step === "preparation" && selectedPrompt && (
          <PreparationScreen
            prompt={selectedPrompt}
            onStart={handleStartSession}
            onBack={handleBack}
          />
        )}
        {step === "session" && selectedPrompt && (
          <SessionInterface
            prompt={selectedPrompt}
            onComplete={handleSessionComplete}
            onBack={handleBack}
          />
        )}
      </main>
    </div>
  );
};

export default Session;
