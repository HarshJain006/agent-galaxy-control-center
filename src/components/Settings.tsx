
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings as SettingsIcon, User, Bell, Shield, Database, Globe, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function Settings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    profile: {
      companyName: "AgentHub Admin",
      email: "admin@agenthub.com",
      phone: "+1 234 567 8900",
      timezone: "UTC-8 (Pacific Time)",
    },
    notifications: {
      emailAlerts: true,
      pushNotifications: true,
      weeklyReports: true,
      systemUpdates: false,
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: "30",
      ipWhitelist: "",
      apiKeyRotation: true,
    },
    system: {
      autoBackup: true,
      backupFrequency: "daily",
      dataRetention: "12",
      maintenanceMode: false,
    }
  });

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile settings have been saved successfully.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notifications Updated",
      description: "Your notification preferences have been saved.",
    });
  };

  const handleSaveSecurity = () => {
    toast({
      title: "Security Updated",
      description: "Your security settings have been updated.",
    });
  };

  const handleSaveSystem = () => {
    toast({
      title: "System Settings Updated",
      description: "System configuration has been saved.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 flex items-center">
          <SettingsIcon className="w-8 h-8 mr-3 text-slate-600" />
          Settings
        </h1>
        <p className="text-slate-600 mt-2">Manage your account and system preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center">
            <User className="w-4 h-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Shield className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center">
            <Database className="w-4 h-4 mr-2" />
            System
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account details and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={settings.profile.companyName}
                    onChange={(e) => setSettings({
                      ...settings,
                      profile: { ...settings.profile, companyName: e.target.value }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.profile.email}
                    onChange={(e) => setSettings({
                      ...settings,
                      profile: { ...settings.profile, email: e.target.value }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={settings.profile.phone}
                    onChange={(e) => setSettings({
                      ...settings,
                      profile: { ...settings.profile, phone: e.target.value }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input
                    id="timezone"
                    value={settings.profile.timezone}
                    onChange={(e) => setSettings({
                      ...settings,
                      profile: { ...settings.profile, timezone: e.target.value }
                    })}
                  />
                </div>
              </div>
              <Button onClick={handleSaveProfile} className="w-full md:w-auto">
                <Save className="w-4 h-4 mr-2" />
                Save Profile
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how you receive alerts and updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Email Alerts</Label>
                  <p className="text-sm text-slate-600">Receive critical alerts via email</p>
                </div>
                <Switch
                  checked={settings.notifications.emailAlerts}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, emailAlerts: checked }
                  })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-slate-600">Get real-time notifications in your browser</p>
                </div>
                <Switch
                  checked={settings.notifications.pushNotifications}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, pushNotifications: checked }
                  })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Weekly Reports</Label>
                  <p className="text-sm text-slate-600">Receive weekly performance reports</p>
                </div>
                <Switch
                  checked={settings.notifications.weeklyReports}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, weeklyReports: checked }
                  })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>System Updates</Label>
                  <p className="text-sm text-slate-600">Get notified about system maintenance and updates</p>
                </div>
                <Switch
                  checked={settings.notifications.systemUpdates}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, systemUpdates: checked }
                  })}
                />
              </div>
              <Button onClick={handleSaveNotifications} className="w-full md:w-auto">
                <Save className="w-4 h-4 mr-2" />
                Save Notifications
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security and access controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-slate-600">Add an extra layer of security to your account</p>
                </div>
                <Switch
                  checked={settings.security.twoFactorAuth}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    security: { ...settings.security, twoFactorAuth: checked }
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={settings.security.sessionTimeout}
                  onChange={(e) => setSettings({
                    ...settings,
                    security: { ...settings.security, sessionTimeout: e.target.value }
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ipWhitelist">IP Whitelist (comma-separated)</Label>
                <Input
                  id="ipWhitelist"
                  placeholder="192.168.1.1, 10.0.0.1"
                  value={settings.security.ipWhitelist}
                  onChange={(e) => setSettings({
                    ...settings,
                    security: { ...settings.security, ipWhitelist: e.target.value }
                  })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Automatic API Key Rotation</Label>
                  <p className="text-sm text-slate-600">Automatically rotate API keys monthly</p>
                </div>
                <Switch
                  checked={settings.security.apiKeyRotation}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    security: { ...settings.security, apiKeyRotation: checked }
                  })}
                />
              </div>
              <Button onClick={handleSaveSecurity} className="w-full md:w-auto">
                <Save className="w-4 h-4 mr-2" />
                Save Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
              <CardDescription>Configure system-wide settings and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Automatic Backup</Label>
                  <p className="text-sm text-slate-600">Automatically backup system data</p>
                </div>
                <Switch
                  checked={settings.system.autoBackup}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    system: { ...settings.system, autoBackup: checked }
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="backupFrequency">Backup Frequency</Label>
                <Input
                  id="backupFrequency"
                  value={settings.system.backupFrequency}
                  onChange={(e) => setSettings({
                    ...settings,
                    system: { ...settings.system, backupFrequency: e.target.value }
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dataRetention">Data Retention (months)</Label>
                <Input
                  id="dataRetention"
                  type="number"
                  value={settings.system.dataRetention}
                  onChange={(e) => setSettings({
                    ...settings,
                    system: { ...settings.system, dataRetention: e.target.value }
                  })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Maintenance Mode</Label>
                  <p className="text-sm text-slate-600">Enable maintenance mode for system updates</p>
                </div>
                <Switch
                  checked={settings.system.maintenanceMode}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    system: { ...settings.system, maintenanceMode: checked }
                  })}
                />
              </div>
              <Button onClick={handleSaveSystem} className="w-full md:w-auto">
                <Save className="w-4 h-4 mr-2" />
                Save System Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
