import { SessionPrompt } from "@/pages/Session";
import { MessageSquare } from "lucide-react";

interface PromptSelectionProps {
  prompts: SessionPrompt[];
  onSelect: (prompt: SessionPrompt) => void;
}

const PromptSelection = ({ prompts, onSelect }: PromptSelectionProps) => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center gradient-hero py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/60 backdrop-blur-sm rounded-full border border-border/50 mb-6">
              <MessageSquare className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                Step 1 of 3
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Choose Your Session Topic
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Select a prompt that matches what you'd like to practice today.
            </p>
          </div>

          {/* Prompt Cards - Horizontal Row */}
          <div className="grid md:grid-cols-3 gap-6">
            {prompts.map((prompt, index) => (
              <button
                key={prompt.id}
                onClick={() => onSelect(prompt)}
                className={`group text-left glass-card p-6 hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 animate-fade-in-up bg-${prompt.color}/30 hover:bg-${prompt.color}/50 border-2 border-transparent hover:border-primary/30`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Color Indicator */}
                <div className={`w-full h-2 rounded-full bg-${prompt.color} mb-6`} />
                
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {prompt.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {prompt.description}
                </p>

                {/* Hover indicator */}
                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Select this topic</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptSelection;
