import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Sparkles,
  Upload,
  Video,
  BarChart3,
  Lightbulb,
  GraduationCap,
  CalendarDays,
  FileText,
  Bell,
  Mic,
  Camera,
  Play,
  Clock,
  Star,
  ChevronRight,
  User,
  BookOpen,
} from "lucide-react";

// --- Classmate Workshops Data ---
const classmateWorkshops = [
  {
    id: "cw1",
    title: "Elevator Pitch Challenge",
    description: "Present your 60-second pitch and get AI-powered feedback on delivery, confidence, and clarity.",
    participants: 4,
    maxParticipants: 6,
    status: "open" as "open" | "starting-soon" | "full",
    color: "talkify-mint",
    features: ["Real-time AI analysis", "Group summary", "Individual scores"],
  },
  {
    id: "cw2",
    title: "Team Debate Workshop",
    description: "Practice persuasive speaking in a structured debate format with AI moderation.",
    participants: 6,
    maxParticipants: 8,
    status: "starting-soon" as const,
    color: "talkify-coral",
    features: ["Tone analysis", "Pacing feedback", "Body language tips"],
  },
  {
    id: "cw3",
    title: "Story Telling Circle",
    description: "Share a personal story and receive feedback on engagement, emotion, and structure.",
    participants: 3,
    maxParticipants: 5,
    status: "open" as const,
    color: "talkify-lavender",
    features: ["Expression tracking", "Confidence score", "Improvement plan"],
  },
];

// --- Expert Workshops Data ---
const expertWorkshops = [
  {
    id: "ew1",
    name: "Mastering Public Speaking",
    expert: "Dr. Sarah Al-Harbi",
    background: "Communication professor at King Saud University with 15+ years of coaching executives and students.",
    avatar: "S",
    rating: 4.9,
    sessions: 120,
    color: "talkify-mint",
    upcoming: ["Feb 12, 2026 – 4:00 PM", "Feb 19, 2026 – 4:00 PM"],
    resources: ["Vocal Warm-Up Guide (PDF)", "Body Language Cheat Sheet"],
  },
  {
    id: "ew2",
    name: "Interview Confidence Bootcamp",
    expert: "Prof. Ahmed Al-Dosari",
    background: "HR consultant and career coach specializing in interview preparation for Saudi graduates.",
    avatar: "A",
    rating: 4.8,
    sessions: 85,
    color: "talkify-coral",
    upcoming: ["Feb 14, 2026 – 2:00 PM", "Feb 21, 2026 – 2:00 PM"],
    resources: ["Top 20 Interview Questions", "STAR Method Template"],
  },
  {
    id: "ew3",
    name: "Presentation Design & Delivery",
    expert: "Eng. Noura Al-Fahad",
    background: "TEDx speaker and presentation design expert. Trained 500+ students across Saudi universities.",
    avatar: "N",
    rating: 4.7,
    sessions: 64,
    color: "talkify-lavender",
    upcoming: ["Feb 15, 2026 – 6:00 PM", "Feb 22, 2026 – 6:00 PM"],
    resources: ["Slide Design Principles", "Storytelling Framework"],
  },
];

const statusMap = {
  open: { label: "Open", className: "bg-primary/10 text-primary border-primary/20" },
  "starting-soon": { label: "Starting Soon", className: "bg-session-paused/20 text-foreground border-session-paused/30" },
  full: { label: "Full", className: "bg-muted text-muted-foreground border-border" },
};

const Workshops = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedExpert, setSelectedExpert] = useState<string | null>(null);
  const [reminders, setReminders] = useState<Set<string>>(new Set());

  const toggleReminder = (workshopId: string) => {
    setReminders((prev) => {
      const next = new Set(prev);
      if (next.has(workshopId)) next.delete(workshopId);
      else next.add(workshopId);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-16">
        {/* Hero */}
        <section className="gradient-hero py-12">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 mb-4">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Collaborative Learning</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Workshops</h1>
            <p className="text-muted-foreground text-lg">
              Practice with classmates using AI-driven analysis or book sessions with expert coaches.
            </p>
          </div>
        </section>

        {/* Tabs */}
        <section className="container mx-auto px-4 -mt-6">
          <Tabs defaultValue="classmate" className="w-full max-w-5xl mx-auto">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 h-12 rounded-xl bg-muted/80 backdrop-blur-sm mb-8">
              <TabsTrigger value="classmate" className="rounded-lg text-sm font-semibold data-[state=active]:bg-card data-[state=active]:shadow-soft gap-2">
                <Sparkles className="w-4 h-4" />
                Classmate
              </TabsTrigger>
              <TabsTrigger value="expert" className="rounded-lg text-sm font-semibold data-[state=active]:bg-card data-[state=active]:shadow-soft gap-2">
                <GraduationCap className="w-4 h-4" />
                Expert
              </TabsTrigger>
            </TabsList>

            {/* ========== CLASSMATE TAB ========== */}
            <TabsContent value="classmate" className="animate-fade-in">
              {/* Feature pills */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {[
                  { icon: Upload, label: "Upload Presentation" },
                  { icon: Video, label: "Live Recording" },
                  { icon: BarChart3, label: "Real-time Analysis" },
                  { icon: Lightbulb, label: "Improvement Tips" },
                ].map((f) => (
                  <div key={f.label} className="flex items-center gap-2 bg-card border border-border/60 rounded-full px-4 py-2 shadow-soft text-sm text-foreground">
                    <f.icon className="w-4 h-4 text-primary" />
                    {f.label}
                  </div>
                ))}
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {classmateWorkshops.map((ws) => {
                  const status = statusMap[ws.status];
                  return (
                    <Card key={ws.id} className="glass-card overflow-hidden hover:shadow-elevated transition-shadow duration-300 flex flex-col">
                      {/* Color bar */}
                      <div className={`h-1.5 bg-${ws.color}`} />
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg">{ws.title}</CardTitle>
                          <Badge variant="outline" className={status.className + " text-xs"}>
                            {status.label}
                          </Badge>
                        </div>
                        <CardDescription className="text-sm">{ws.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1 space-y-4">
                        {/* Participants */}
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span>
                            {ws.participants}/{ws.maxParticipants} participants
                          </span>
                        </div>
                        {/* AI features */}
                        <div className="space-y-1.5">
                          {ws.features.map((f) => (
                            <div key={f} className="flex items-center gap-2 text-sm text-foreground">
                              <Sparkles className="w-3.5 h-3.5 text-primary" />
                              {f}
                            </div>
                          ))}
                        </div>
                        {/* Tools */}
                        <div className="flex gap-2 pt-1">
                          <div className="flex items-center gap-1 text-xs bg-muted rounded-full px-2.5 py-1 text-muted-foreground">
                            <Mic className="w-3 h-3" /> Mic
                          </div>
                          <div className="flex items-center gap-1 text-xs bg-muted rounded-full px-2.5 py-1 text-muted-foreground">
                            <Camera className="w-3 h-3" /> Camera
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full gap-2" disabled={ws.status === "full"}>
                          <Play className="w-4 h-4" />
                          Join Workshop
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>

              {/* Group Feedback Preview */}
              <Card className="glass-card mt-8">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    How AI Group Feedback Works
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {[
                      { label: "Clarity", icon: Lightbulb, value: "Individual + Group" },
                      { label: "Speed", icon: Clock, value: "Words per minute" },
                      { label: "Tone", icon: Mic, value: "Vocal variation" },
                      { label: "Body Language", icon: Camera, value: "Posture & gestures" },
                      { label: "Confidence", icon: Star, value: "Hesitation score" },
                    ].map((m) => (
                      <div key={m.label} className="flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-muted/50">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <m.icon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-semibold text-sm text-foreground">{m.label}</span>
                        <span className="text-xs text-muted-foreground">{m.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ========== EXPERT TAB ========== */}
            <TabsContent value="expert" className="animate-fade-in">
              <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
                {/* Expert Cards */}
                <div className="space-y-6">
                  {expertWorkshops.map((ew) => (
                    <Card
                      key={ew.id}
                      className={`glass-card overflow-hidden hover:shadow-elevated transition-shadow duration-300 ${
                        selectedExpert === ew.id ? "ring-2 ring-primary/40" : ""
                      }`}
                    >
                      <div className={`h-1.5 bg-${ew.color}`} />
                      <CardHeader className="pb-3">
                        <div className="flex items-start gap-4">
                          {/* Avatar */}
                          <div className={`w-14 h-14 rounded-2xl bg-${ew.color} flex items-center justify-center text-xl font-bold text-foreground shrink-0`}>
                            {ew.avatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-lg">{ew.name}</CardTitle>
                            <p className="text-sm font-medium text-primary mt-0.5">{ew.expert}</p>
                            <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Star className="w-3.5 h-3.5 text-session-paused fill-session-paused" /> {ew.rating}
                              </span>
                              <span>{ew.sessions} sessions</span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Background */}
                        <div className="flex items-start gap-2 text-sm text-muted-foreground">
                          <BookOpen className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                          <span>{ew.background}</span>
                        </div>

                        {/* Upcoming Sessions */}
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                            <CalendarDays className="w-4 h-4 text-primary" /> Upcoming Sessions
                          </h4>
                          {ew.upcoming.map((date) => (
                            <div key={date} className="flex items-center justify-between bg-muted/50 rounded-lg px-3 py-2 text-sm">
                              <span className="text-foreground">{date}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 text-xs"
                                onClick={() => setSelectedExpert(ew.id)}
                              >
                                Book
                              </Button>
                            </div>
                          ))}
                        </div>

                        {/* Resources */}
                        <div className="space-y-1.5">
                          <h4 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                            <FileText className="w-4 h-4 text-primary" /> Resources
                          </h4>
                          {ew.resources.map((r) => (
                            <div key={r} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                              <ChevronRight className="w-3.5 h-3.5" />
                              {r}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex gap-3">
                        <Button className="flex-1 gap-2" onClick={() => setSelectedExpert(ew.id)}>
                          <CalendarDays className="w-4 h-4" /> Book Session
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className={reminders.has(ew.id) ? "text-primary border-primary/40" : ""}
                          onClick={() => toggleReminder(ew.id)}
                        >
                          <Bell className={`w-4 h-4 ${reminders.has(ew.id) ? "fill-primary" : ""}`} />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>

                {/* Sidebar Calendar */}
                <div className="space-y-4">
                  <Card className="glass-card sticky top-20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <CalendarDays className="w-4 h-4 text-primary" />
                        Pick a Date
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-xl"
                      />
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" disabled={!selectedExpert}>
                        {selectedExpert ? "Confirm Booking" : "Select a workshop first"}
                      </Button>
                    </CardFooter>
                  </Card>

                  {/* Reminder info */}
                  {reminders.size > 0 && (
                    <Card className="glass-card animate-fade-in">
                      <CardContent className="pt-4">
                        <div className="flex items-center gap-2 text-sm text-primary font-medium">
                          <Bell className="w-4 h-4 fill-primary" />
                          {reminders.size} reminder{reminders.size > 1 ? "s" : ""} set
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          You'll be notified before your booked sessions.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Workshops;
