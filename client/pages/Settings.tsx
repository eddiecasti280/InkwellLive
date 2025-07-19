import { ThemeToggle } from "../components/ui/theme-toggle";
import { Card, CardContent } from "../components/ui/card";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import { useState, useEffect } from "react";

export default function Settings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  useEffect(() => {
    document.title = "Inkwell | Settings";
  }, []);

  return (
    <div className="min-h-screen bg-cream-50 py-12 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 text-warm-900">Settings</h1>
      <div className="w-full max-w-xl space-y-8">
        {/* Theme Section */}
        <Card className="bg-white border-warm-200">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-warm-800 mb-1">Theme</h2>
              <p className="text-warm-600 text-sm">Choose your preferred appearance.</p>
            </div>
            <ThemeToggle />
          </CardContent>
        </Card>
        {/* Notification Preferences */}
        <Card className="bg-white border-warm-200">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-warm-800 mb-4">Notifications</h2>
            <div className="flex items-center justify-between mb-4">
              <Label htmlFor="email-notifications" className="text-warm-700">Email Notifications</Label>
              <Switch
                id="email-notifications"
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="push-notifications" className="text-warm-700">Push Notifications</Label>
              <Switch
                id="push-notifications"
                checked={pushNotifications}
                onCheckedChange={setPushNotifications}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 