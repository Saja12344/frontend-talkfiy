import { useLocation, useNavigate, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Clock,
  Mic2,
  Eye,
  Gauge,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Play,
} from "lucide-react";

// real data

const Report = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const {
  prompt,
  durationLabel,
  metrics,
  timeline,
} = location.state || {}


  if (!metrics || !timeline) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">
          Analyzing your session… ⏳
        </p>
      </div>
    )
  }


  const getTypeColor = (type: string) => {
    switch (type) {
      case "filler":
        return "bg-talkify-coral";
      case "pace":
        return "bg-talkify-sky";
      case "eyeContact":
        return "bg-talkify-mint";
      case "confidence":
        return "bg-primary";
      case "expressions":
        return "bg-talkify-lavender";
      default:
        return "bg-muted";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "filler":
        return <AlertCircle className="w-4 h-4" />;
      case "pace":
        return <Gauge className="w-4 h-4" />;
      case "eyeContact":
        return <Eye className="w-4 h-4" />;
      case "confidence":
        return <TrendingUp className="w-4 h-4" />;
      case "expressions":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Mic2 className="w-4 h-4" />;
    }
  };
const getTip = () => {
  if (metrics.fillers > 3) {
    return "Try pausing instead of using filler words like 'um' or 'aa'. Silence shows confidence."
  }

  if (metrics.pace < 50) {
    return "Your speaking pace was slow. Try slightly speeding up to sound more confident."
  }

  if (metrics.expressions < 40) {
    return "Try forming complete ideas with verbs to make your speech more meaningful."
  }

  if (metrics.confidence < 50) {
    return "Practice speaking longer sentences to build confidence."
  }

  return "Great job! Keep practicing to maintain consistency."
}

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Session Report
            </h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
  {durationLabel}
              </span>
              {prompt && (
                <span className={`px-3 py-1 rounded-full bg-${prompt.color}/30 text-sm font-medium`}>
                  {prompt.title}
                </span>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Report Section */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overall Score */}
              <div className="glass-card p-8">
                <h2 className="text-xl font-semibold text-foreground mb-6">
                  Overall Performance
                </h2>
                <div className="flex items-center justify-center mb-8">
                  <div className="relative w-48 h-48">
                    <svg className="w-full h-full -rotate-90">
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        fill="none"
                        stroke="hsl(var(--muted))"
                        strokeWidth="12"
                      />
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray={`${metrics.overallScore * 5.5} 1000`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-5xl font-bold text-foreground">
                        {metrics.overallScore}
                      </span>
                      <span className="text-sm text-muted-foreground">out of 100</span>
                    </div>
                  </div>
                </div>

                {/* Metric Bars */}
                <div className="space-y-4">
                  <MetricBar
                    label="Confidence"
                    value={metrics.confidence}
                    color="bg-primary"
                  />
                  <MetricBar
                    label="Speaking Pace"
                    value={metrics.pace}
                    color="bg-talkify-sky"
                  />
                  <MetricBar
                    label="Filler Words"
                    value={metrics.fillers}
                    color="bg-talkify-coral"
                    inverted
                  />
                  <MetricBar
                    label="Eye Contact"
                    value={metrics.eyeContact}
                    color="bg-talkify-mint"
                  />
                  <MetricBar
                    label="Facial Expressions"
                    value={metrics.expressions}
                    color="bg-talkify-lavender"
                  />
                </div>
              </div>

              {/* Timeline */}
              <div className="glass-card p-8">
                <h2 className="text-xl font-semibold text-foreground mb-6">
                  Session Timeline
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Visual breakdown of key moments during your session
                </p>

                {/* Timeline Bar */}
                <div className="relative mb-8">
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    {timeline.map((item, index) => {
                      const timeInSeconds = item.time.split(":").reduce((acc, t, i) => 
                        acc + parseInt(t) * (i === 0 ? 60 : 1), 0
                      );
                      const totalSeconds = 225; // 3:45
                      const position = (timeInSeconds / totalSeconds) * 100;
                      
                      return (
                        <div
                          key={index}
                          className={`absolute top-0 w-3 h-3 rounded-full ${getTypeColor(item.type)} cursor-pointer hover:scale-150 transition-transform`}
                          style={{ left: `${position}%` }}
                          title={`${item.time} - ${item.description}`}
                        />
                      );
                    })}
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>0:00</span>
                    <span>{durationLabel}</span>
                  </div>
                </div>

                {/* Timeline Events */}
                <div className="space-y-3">
                  {timeline.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors group cursor-pointer"
                    >
                      <div className={`w-10 h-10 rounded-lg ${getTypeColor(item.type)} flex items-center justify-center text-foreground`}>
                        {getTypeIcon(item.type)}
                      </div>
                      <div className="flex-1">
                        <span className="text-sm font-medium text-foreground">
                          {item.description}
                        </span>
                      </div>
                      <span className="font-mono text-sm text-muted-foreground">
                        {item.time}
                      </span>
                      <Play className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="glass-card p-6">
                <h3 className="font-semibold text-foreground mb-4">Actions</h3>
                <div className="space-y-3">
                  <Link to="/session">
                    <Button variant="default" className="w-full">
                      Start New Session
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full">
                    Download Report
                  </Button>
                  <Button variant="ghost" className="w-full text-muted-foreground">
                    Share Results
                  </Button>
                </div>
              </div>

              {/* Legend */}
              <div className="glass-card p-6">
                <h3 className="font-semibold text-foreground mb-4">Legend</h3>
                <div className="space-y-3">
                  <LegendItem color="bg-talkify-coral" label="Filler Words" />
                  <LegendItem color="bg-talkify-sky" label="Speaking Pace" />
                  <LegendItem color="bg-talkify-mint" label="Eye Contact" />
                  <LegendItem color="bg-primary" label="Confidence" />
                  <LegendItem color="bg-talkify-lavender" label="Expressions" />
                </div>
              </div>

              {/* Tips */}
              <div className="glass-card p-6 bg-talkify-mint/20">
                <h3 className="font-semibold text-foreground mb-3">💡 Improvement Tip</h3>
                <p className="text-sm text-muted-foreground">
                  {getTip()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const MetricBar = ({
  label,
  value,
  color,
  inverted = false,
}: {
  label: string;
  value: number;
  color: string;
  inverted?: boolean;
}) => (
  <div>
    <div className="flex justify-between mb-2">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <span className="text-sm text-muted-foreground">
        {inverted ? `${100 - value}% reduction needed` : `${value}%`}
      </span>
    </div>
    <div className="h-2 bg-muted rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-500 ${color}`}
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

const LegendItem = ({ color, label }: { color: string; label: string }) => (
  <div className="flex items-center gap-3">
    <div className={`w-4 h-4 rounded-full ${color}`} />
    <span className="text-sm text-muted-foreground">{label}</span>
  </div>
);

export default Report;
