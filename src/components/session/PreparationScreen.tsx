import { Button } from "@/components/ui/button";
import { SessionPrompt } from "@/pages/Session";
import { ArrowLeft, ArrowRight, Lightbulb, CheckCircle } from "lucide-react";

interface PreparationScreenProps {
  prompt: SessionPrompt;
  onStart: () => void;
  onBack: () => void;
}

const PreparationScreen = ({ prompt, onStart, onBack }: PreparationScreenProps) => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center gradient-hero py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors animate-fade-in"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to topics</span>
          </button>

          <div className="glass-card p-8 md:p-10 animate-scale-in">
            {/* Step Indicator */}
            <div className="flex items-center gap-2 mb-6">
              <div className={`h-2 w-20 rounded-full bg-${prompt.color}`} />
              <span className="text-sm font-medium text-muted-foreground">
                Step 2 of 3 • Preparation
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {prompt.title}
            </h1>
            <p className="text-muted-foreground mb-8">
              {prompt.description}
            </p>

            {/* Talking Points */}
            <div className="bg-muted/50 rounded-2xl p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-talkify-peach flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-foreground" />
                </div>
                <h3 className="font-semibold text-foreground">Talking Points</h3>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                Consider covering these topics during your session:
              </p>

              <ul className="space-y-3">
                {prompt.talkingPoints.map((point, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tips */}
            <div className="bg-talkify-sky/30 rounded-2xl p-5 mb-8">
              <h4 className="font-semibold text-foreground mb-2">💡 Quick Tips</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Speak naturally, as if talking to a friend</li>
                <li>• Focus on confidence, not perfection</li>
                <li>• Make eye contact with the camera</li>
                <li>• Take pauses when you need to think</li>
              </ul>
            </div>

            {/* Action Button */}
            <Button
              onClick={onStart}
              variant="hero"
              size="xl"
              className="w-full"
            >
              I'm Ready to Start
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreparationScreen;
