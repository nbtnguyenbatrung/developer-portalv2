import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TokenGenerator } from "@/components/token-generator"
import { SandboxControls } from "./components/sandbox-controls"
import { TestDataExplorer } from "./components/test-data-explorer"
import { SandboxConsole } from "./components/sandbox-console"

export const metadata: Metadata = {
  title: "Sandbox - NexusBank Developer Portal",
  description: "Test your integration with NexusBank APIs in a safe environment",
}

export default function SandboxPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Sandbox Environment</h1>
        <p className="text-xl text-muted-foreground">
          Test your integration with NexusBank APIs in a safe, isolated environment.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Getting Started</h2>
        <p className="text-muted-foreground">
          The sandbox environment is a replica of our production environment, but with simulated data. You can use it to
          test your integration without affecting real accounts or making real transactions.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <TestDataExplorer />
        </div>
        <div>
          <SandboxControls />
        </div>
      </div>

      <Tabs defaultValue="console" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="console">API Console</TabsTrigger>
          <TabsTrigger value="setup">Setup</TabsTrigger>
          <TabsTrigger value="limits">Rate Limits</TabsTrigger>
        </TabsList>

        <TabsContent value="console">
          <SandboxConsole />
        </TabsContent>

        <TabsContent value="setup">
          <Card>
            <CardHeader>
              <CardTitle>Sandbox Setup</CardTitle>
              <CardDescription>Configure your sandbox environment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">Sandbox API Key</Label>
                <div className="flex gap-2">
                  <Input id="api-key" value="sb_test_1234567890abcdef" readOnly />
                  <Button variant="outline">Copy</Button>
                </div>
                <p className="text-sm text-muted-foreground">Use this API key for all your sandbox API requests.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="base-url">Sandbox Base URL</Label>
                <div className="flex gap-2">
                  <Input id="base-url" value="https://sandbox-api.nexusbank.com" readOnly />
                  <Button variant="outline">Copy</Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  All API requests should be made to this base URL in the sandbox environment.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <Input id="webhook-url" placeholder="https://your-app.com/webhooks/nexusbank" />
                <p className="text-sm text-muted-foreground">Enter your webhook URL to receive event notifications.</p>
              </div>

              <Button>Save Configuration</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="limits">
          <Card>
            <CardHeader>
              <CardTitle>Rate Limits</CardTitle>
              <CardDescription>Understanding sandbox usage limits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Sandbox Rate Limits</h3>
                <p className="text-sm text-muted-foreground">
                  To ensure fair usage and system stability, the sandbox environment has the following rate limits:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>100 requests per hour per user</li>
                  <li>1,000 requests per day per user</li>
                  <li>Maximum of 10 concurrent requests</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Rate Limit Headers</h3>
                <p className="text-sm text-muted-foreground">
                  Each API response includes headers to help you track your rate limit usage:
                </p>
                <div className="bg-muted p-3 rounded-md">
                  <code className="text-xs">
                    X-RateLimit-Limit: 100
                    <br />
                    X-RateLimit-Remaining: 95
                    <br />
                    X-RateLimit-Reset: 1620000000
                  </code>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Exceeding Rate Limits</h3>
                <p className="text-sm text-muted-foreground">
                  If you exceed the rate limit, you'll receive a 429 Too Many Requests response with a Retry-After
                  header indicating when you can resume making requests.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Authentication</h2>
        <p className="text-muted-foreground">Generate a sandbox OAuth token to authenticate your API requests.</p>
        <TokenGenerator />
      </div>
    </div>
  )
}
