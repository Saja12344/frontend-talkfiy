import { Mic2, Eye, Gauge, Brain, TrendingUp, Shield } from "lucide-react";

const features = [
  {
    icon: <Mic2 className="w-7 h-7" />,
    title: "Voice Pattern Analysis",
    description: "Track your speaking pace, rhythm, and filler words like 'um' and 'uh' to improve vocal delivery.",
    color: "talkify-mint",
  },
  {
    icon: <Eye className="w-7 h-7" />,
    title: "Facial Expression Tracking",
    description: "Real-time analysis of your expressions and eye contact to build confident body language.",
    color: "talkify-coral",
  },
  {
    icon: <Gauge className="w-7 h-7" />,
    title: "Confidence Metrics",
    description: "Measure hesitation, voice stability, and speaking confidence with visual indicators.",
    color: "talkify-lavender",
  },
  {
    icon: <Brain className="w-7 h-7" />,
    title: "AI-Powered Insights",
    description: "Smart feedback focused on communication skills, not grammar or vocabulary correction.",
    color: "talkify-peach",
  },
  {
    icon: <TrendingUp className="w-7 h-7" />,
    title: "Visual Progress Timeline",
    description: "See exactly when and where improvements happen with timeline-based reports.",
    color: "talkify-sky",
  },
  {
    icon: <Shield className="w-7 h-7" />,
    title: "Privacy Protected",
    description: "Full control over your data with options to delete recordings anytime.",
    color: "talkify-rose",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Focus on How You Speak,
            <br />
            <span className="text-primary">Not What You Say</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Talkify analyzes your communication delivery, not language correctness. 
            Build speaking confidence with visual, actionable feedback.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group glass-card p-6 hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-14 h-14 rounded-2xl bg-${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-foreground">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
