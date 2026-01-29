import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Camera, CheckCircle2, AlertCircle, Shield } from "lucide-react";

interface PermissionsRequestProps {
  onPermissionsGranted: () => void;
}

const PermissionsRequest = ({ onPermissionsGranted }: PermissionsRequestProps) => {
  const [micPermission, setMicPermission] = useState<"pending" | "granted" | "denied">("pending");
  const [cameraPermission, setCameraPermission] = useState<"pending" | "granted" | "denied">("pending");
  const [isRequesting, setIsRequesting] = useState(false);

  const requestPermissions = async () => {
    setIsRequesting(true);

    try {
      // Request microphone
      const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStream.getTracks().forEach(track => track.stop());
      setMicPermission("granted");

      // Request camera
      const cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraPermission("granted");

      // Both granted
      setTimeout(() => {
        onPermissionsGranted();
      }, 500);
    } catch (error) {
      console.error("Permission error:", error);
      // Try individual permissions
      try {
        const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        micStream.getTracks().forEach(track => track.stop());
        setMicPermission("granted");
      } catch {
        setMicPermission("denied");
      }

      try {
        const cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
        cameraStream.getTracks().forEach(track => track.stop());
        setCameraPermission("granted");
      } catch {
        setCameraPermission("denied");
      }
    } finally {
      setIsRequesting(false);
    }
  };

  const canProceed = micPermission === "granted" && cameraPermission === "granted";

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center gradient-hero">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto">
          <div className="glass-card p-8 md:p-10 text-center animate-scale-in">
            {/* Icon */}
            <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-primary/10 flex items-center justify-center">
              <Shield className="w-10 h-10 text-primary" />
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Enable Permissions
            </h1>
            <p className="text-muted-foreground mb-8">
              Talkify needs access to your microphone and camera to analyze your communication skills.
            </p>

            {/* Permission Items */}
            <div className="space-y-4 mb-8">
              <PermissionItem
                icon={<Mic className="w-5 h-5" />}
                title="Microphone Access"
                description="For voice pattern and filler word analysis"
                status={micPermission}
              />
              <PermissionItem
                icon={<Camera className="w-5 h-5" />}
                title="Camera Access"
                description="For facial expression and eye contact tracking"
                status={cameraPermission}
              />
            </div>

            {/* Action Button */}
            {!canProceed ? (
              <Button
                onClick={requestPermissions}
                disabled={isRequesting}
                variant="hero"
                size="xl"
                className="w-full"
              >
                {isRequesting ? "Requesting Access..." : "Grant Permissions"}
              </Button>
            ) : (
              <Button
                onClick={onPermissionsGranted}
                variant="hero"
                size="xl"
                className="w-full"
              >
                Continue to Session
              </Button>
            )}

            {/* Privacy Note */}
            <p className="text-xs text-muted-foreground mt-6">
              Your privacy is protected. Recordings can be deleted anytime from your profile settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PermissionItem = ({
  icon,
  title,
  description,
  status,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  status: "pending" | "granted" | "denied";
}) => (
  <div className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${
    status === "granted"
      ? "bg-talkify-mint/50 border-primary/30"
      : status === "denied"
      ? "bg-destructive/10 border-destructive/30"
      : "bg-muted border-border"
  }`}>
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
      status === "granted"
        ? "bg-primary text-primary-foreground"
        : status === "denied"
        ? "bg-destructive text-destructive-foreground"
        : "bg-muted-foreground/20 text-muted-foreground"
    }`}>
      {icon}
    </div>
    <div className="flex-1 text-left">
      <h4 className="font-semibold text-foreground">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    {status === "granted" && <CheckCircle2 className="w-6 h-6 text-primary" />}
    {status === "denied" && <AlertCircle className="w-6 h-6 text-destructive" />}
  </div>
);

export default PermissionsRequest;
