import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mic, Camera, BarChart3, Shield, ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] gradient-hero overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-talkify-mint rounded-full blur-3xl opacity-40 floating-animation" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-talkify-lavender rounded-full blur-3xl opacity-40 floating-animation" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-talkify-coral rounded-full blur-3xl opacity-20" />
      </div>

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/60 backdrop-blur-sm rounded-full border border-border/50 mb-8 animate-fade-in">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse-soft" />
            <span className="text-sm font-medium text-muted-foreground">
              Communication Skills Development Platform
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-fade-in-up text-balance">
            Master Your{" "}
            <span className="text-primary">Communication</span>{" "}
            Confidence
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Develop powerful speaking skills through AI-powered analysis of your voice patterns, 
            facial expressions, and body language. Build confidence, not grammar.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <Link to="/session">
              <Button variant="hero" size="xl">
                Start Free Session
                <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
            </Link>
            
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <FeaturePill icon={<Mic className="w-4 h-4" />} text="Voice Analysis" />
            <FeaturePill icon={<Camera className="w-4 h-4" />} text="Expression Tracking" />
            <FeaturePill icon={<BarChart3 className="w-4 h-4" />} text="Visual Reports" />
            <FeaturePill icon={<Shield className="w-4 h-4" />} text="Privacy First" />
          </div>
        </div>

        {/* Voice Waveform Visualization */}
        <div className="mt-20 flex justify-center items-end gap-1.5 h-16 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="w-2 bg-primary/40 rounded-full wave-animation"
              style={{
                height: `${20 + Math.sin(i * 0.8) * 25 + Math.random() * 20}px`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturePill = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm rounded-full border border-border/50 shadow-soft">
    <span className="text-primary">{icon}</span>
    <span className="text-sm font-medium text-foreground">{text}</span>
  </div>
);

export default HeroSection;
