import { Link } from "react-router-dom";
import { Mic, Mail, Shield, FileText } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Mic className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Talkify</span>
            </Link>
            <p className="text-muted-foreground max-w-sm mb-4">
              Empowering university students to develop confident communication skills through AI-powered practice and visual feedback.
            </p>
            <div className="flex items-center gap-4">
              <a href="mailto:support@talkify.app" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/session" className="text-muted-foreground hover:text-primary transition-colors">
                  Start Session
                </Link>
              </li>
              <li>
                <Link to="/reports" className="text-muted-foreground hover:text-primary transition-colors">
                  My Reports
                </Link>
              </li>
              <li>
                <Link to="/subscription" className="text-muted-foreground hover:text-primary transition-colors">
                  Premium Plans
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-muted-foreground hover:text-primary transition-colors">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Talkify. All rights reserved.</p>
          <p className="mt-1">Built for university students. 🎓</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
