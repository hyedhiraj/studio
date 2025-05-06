
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings as SettingsIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl flex items-center justify-center">
          <SettingsIcon className="h-8 w-8 mr-2 text-accent" />
          Application Settings
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Configure your KaizenAI Assistant preferences.
        </p>
      </header>
      <Card className="w-full max-w-2xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>
            Manage your application settings and preferences here. (Functionality coming soon)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="azure-api-key">Azure OpenAI API Key</Label>
            <Input id="azure-api-key" type="password" placeholder="Enter your Azure OpenAI API Key" disabled />
            <p className="text-xs text-muted-foreground">
              Your API key is stored securely. This setting will be functional in a future update.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="azure-endpoint">Azure OpenAI Endpoint</Label>
            <Input id="azure-endpoint" type="text" placeholder="Enter your Azure OpenAI Endpoint URL" disabled />
             <p className="text-xs text-muted-foreground">
              The endpoint for your Azure OpenAI resource.
            </p>
          </div>
           <div className="flex items-center space-x-2">
            <Switch id="dark-mode-toggle" disabled />
            <Label htmlFor="dark-mode-toggle">Enable Dark Mode</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="email-notifications" checked disabled />
            <Label htmlFor="email-notifications">Email Notifications for Analysis Completion</Label>
          </div>
          <Button disabled className="w-full">Save Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
}
