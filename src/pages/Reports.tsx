import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Clock, TrendingUp, BarChart3, Calendar, ArrowRight } from "lucide-react";

// Mock past sessions
const pastSessions = [
  {
    id: "1",
    date: "2024-01-10",
    topic: "Introduce Yourself",
    duration: "3:45",
    score: 78,
    color: "talkify-mint",
  },
  {
    id: "2",
    date: "2024-01-08",
    topic: "Present an Idea",
    duration: "5:12",
    score: 72,
    color: "talkify-coral",
  },
  {
    id: "3",
    date: "2024-01-05",
    topic: "Job Interview",
    duration: "4:30",
    score: 65,
    color: "talkify-lavender",
  },
  {
    id: "4",
    date: "2024-01-02",
    topic: "Introduce Yourself",
    duration: "2:58",
    score: 58,
    color: "talkify-mint",
  },
];

const Reports = () => {
  const averageScore = Math.round(
    pastSessions.reduce((acc, s) => acc + s.score, 0) / pastSessions.length
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              My Reports
            </h1>
            <p className="text-muted-foreground">
              Track your communication progress over time
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-4 mb-10">
            <StatCard
              icon={<BarChart3 className="w-5 h-5" />}
              label="Average Score"
              value={`${averageScore}`}
              suffix="/100"
              color="bg-primary/10"
            />
            <StatCard
              icon={<Calendar className="w-5 h-5" />}
              label="Total Sessions"
              value={pastSessions.length.toString()}
              color="bg-talkify-mint"
            />
            <StatCard
              icon={<Clock className="w-5 h-5" />}
              label="Practice Time"
              value="16"
              suffix="min"
              color="bg-talkify-coral"
            />
            <StatCard
              icon={<TrendingUp className="w-5 h-5" />}
              label="Improvement"
              value="+20"
              suffix="%"
              color="bg-talkify-lavender"
            />
          </div>

          {/* Progress Chart Placeholder */}
          <div className="glass-card p-6 mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Progress Over Time
            </h2>
            <div className="h-48 flex items-end justify-between gap-2">
              {pastSessions.reverse().map((session, index) => (
                <div key={session.id} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className={`w-full rounded-t-lg bg-primary/80 transition-all hover:bg-primary`}
                    style={{ height: `${session.score * 1.8}px` }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {new Date(session.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Session History */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                Session History
              </h2>
              <Link to="/session">
                <Button>
                  New Session
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {pastSessions.map((session) => (
                <Link
                  key={session.id}
                  to="/report"
                  state={{ prompt: { title: session.topic, color: session.color } }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-${session.color} flex items-center justify-center`}>
                    <span className="font-bold text-foreground">{session.score}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{session.topic}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(session.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{session.duration}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const StatCard = ({
  icon,
  label,
  value,
  suffix,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  suffix?: string;
  color: string;
}) => (
  <div className={`glass-card p-5 ${color}`}>
    <div className="flex items-center gap-3 mb-3">
      <span className="text-primary">{icon}</span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
    <div className="text-3xl font-bold text-foreground">
      {value}
      {suffix && <span className="text-lg font-normal text-muted-foreground">{suffix}</span>}
    </div>
  </div>
);

export default Reports;
