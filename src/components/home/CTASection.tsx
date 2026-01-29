import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="relative max-w-4xl mx-auto">
          {/* Background Decorations */}
          <div className="absolute inset-0 bg-gradient-to-r from-talkify-mint via-talkify-lavender to-talkify-coral rounded-3xl opacity-50 blur-xl" />
          
          <div className="relative glass-card p-12 md:p-16 text-center overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-talkify-coral/20 rounded-full blur-2xl" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Start Your Journey Today</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                Ready to Transform Your
                <br />
                <span className="text-primary">Communication Skills?</span>
              </h2>

              <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
                Join thousands of university students improving their speaking confidence. 
                Your first session is completely free.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/session">
                  <Button variant="hero" size="xl">
                    Start Free Session
                    <ArrowRight className="w-5 h-5 ml-1" />
                  </Button>
                </Link>
          
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
