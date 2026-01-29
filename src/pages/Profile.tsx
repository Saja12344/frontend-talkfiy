import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  User,
  Calendar,
  GraduationCap,
  Shield,
  Trash2,
  ToggleLeft,
  ToggleRight,
  AlertTriangle,
  Save,
} from "lucide-react";
import { toast } from "sonner";

// Saudi Universities List
const saudiUniversities = [
  "King Saud University",
  "King Abdulaziz University",
  "King Fahd University of Petroleum & Minerals",
  "King Abdullah University of Science and Technology",
  "Princess Nourah bint Abdulrahman University",
  "Imam Abdulrahman Bin Faisal University",
  "Umm Al-Qura University",
  "Islamic University of Madinah",
  "King Khalid University",
  "Qassim University",
  "Taibah University",
  "Taif University",
  "Jazan University",
  "Najran University",
  "University of Ha'il",
  "University of Tabuk",
  "Al-Jouf University",
  "Prince Sattam Bin Abdulaziz University",
  "Shaqra University",
  "Saudi Electronic University",
  "Prince Sultan University",
  "Alfaisal University",
  "Effat University",
  "Dar Al Uloom University",
  "Other",
];

const Profile = () => {
  const [birthDate, setBirthDate] = useState("");
  const [university, setUniversity] = useState("");
  const [storeRecordings, setStoreRecordings] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Calculate age and check if under 18
  const calculateAge = (dateString: string) => {
    if (!dateString) return null;
    const today = new Date();
    const birth = new Date(dateString);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const age = calculateAge(birthDate);
  const isMinor = age !== null && age < 18;

  const handleSave = () => {
    toast.success("Profile saved successfully!");
  };

  const handleDeleteData = () => {
    // In production, this would call an API to delete user data
    toast.success("All your data has been deleted.");
    setShowDeleteConfirm(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Profile Settings
              </h1>
              <p className="text-muted-foreground">
                Manage your account and privacy preferences
              </p>
            </div>

            {/* Profile Form */}
            <div className="space-y-6">
              {/* Personal Info */}
              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Personal Information
                  </h2>
                </div>

                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                      placeholder="Enter your name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Birth Date - Age Verification */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                    />
                    {isMinor && (
                      <div className="mt-3 p-3 rounded-lg bg-session-paused/20 border border-session-paused/30">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="w-5 h-5 text-session-paused shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              Age Restriction Notice
                            </p>
                            <p className="text-sm text-muted-foreground">
                              As you're under 18, group sessions and live features are disabled for your safety.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* University Selection */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <GraduationCap className="w-4 h-4 inline mr-2" />
                      University
                    </label>
                    <select
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                    >
                      <option value="">Select your university</option>
                      {saudiUniversities.map((uni) => (
                        <option key={uni} value={uni}>
                          {uni}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Privacy Settings */}
              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-talkify-lavender flex items-center justify-center">
                    <Shield className="w-5 h-5 text-foreground" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Privacy & Data
                  </h2>
                </div>

                <div className="space-y-6">
                  {/* Store Recordings Toggle */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                    <div>
                      <h3 className="font-medium text-foreground">Store Recordings</h3>
                      <p className="text-sm text-muted-foreground">
                        Allow Talkify to store your session recordings for review
                      </p>
                    </div>
                    <button
                      onClick={() => setStoreRecordings(!storeRecordings)}
                      className="text-primary"
                    >
                      {storeRecordings ? (
                        <ToggleRight className="w-10 h-10" />
                      ) : (
                        <ToggleLeft className="w-10 h-10 text-muted-foreground" />
                      )}
                    </button>
                  </div>

                  {/* Delete All Data */}
                  <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/20">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0">
                        <Trash2 className="w-5 h-5 text-destructive" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground mb-1">
                          Right to Be Forgotten
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Delete all your stored data, recordings, and reports. This action cannot be undone.
                        </p>
                        <Button
                          variant="destructive"
                          onClick={() => setShowDeleteConfirm(true)}
                        >
                          Delete All My Data
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <Button onClick={handleSave} className="w-full" size="lg">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card p-6 max-w-md animate-scale-in">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
            <h3 className="text-xl font-semibold text-foreground text-center mb-2">
              Delete All Data?
            </h3>
            <p className="text-muted-foreground text-center mb-6">
              This will permanently delete all your recordings, reports, and profile data. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={handleDeleteData}
              >
                Delete Everything
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
