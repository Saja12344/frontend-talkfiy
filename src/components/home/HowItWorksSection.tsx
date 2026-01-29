import { Mic, MessageSquare, BarChart3, TrendingUp } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Choose Your Topic",
    description: "Select from three curated prompts designed to help you practice different communication scenarios.",
  },
  {
    step: "02",
    icon: <Mic className="w-6 h-6" />,
    title: "Prepare & Practice",
    description: "Review talking points to help you focus, then start your AI-powered speaking session.",
  },
  {
    step: "03",
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Get Visual Feedback",
    description: "Receive a timeline-based report showing exactly when and where to improve your delivery.",
  },
  {
    step: "04",
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Track Progress",
    description: "Monitor your confidence growth over time with detailed visual analytics.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-talkify-lavender text-secondary-foreground text-sm font-semibold rounded-full mb-4">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Simple Steps to{" "}
            <span className="text-primary">Better Communication</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Our streamlined process helps you practice and improve with every session.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.step}
              className="relative animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[calc(50%+40px)] w-[calc(100%-80px)] h-0.5 bg-border" />
              )}

              <div className="text-center">
                {/* Step Number */}
                <div className="relative inline-flex">
                  <div className="w-24 h-24 rounded-3xl bg-card border border-border flex items-center justify-center shadow-card mb-6">
                    <span className="text-primary">{step.icon}</span>
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground text-sm font-bold rounded-full flex items-center justify-center">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
