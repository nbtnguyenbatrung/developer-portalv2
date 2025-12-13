import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info, Shield, Key, RefreshCw } from "lucide-react"
import { TokenGenerator } from "@/components/token-generator"

export const metadata: Metadata = {
  title: "API Credentials - NexusBank Developer Portal",
  description: "Manage your API credentials for NexusBank",
}

export default function CredentialsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">API Credentials</h1>
        <p className="text-xl text-muted-foreground">Manage your API credentials and generate access tokens.</p>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Environment</AlertTitle>
        <AlertDescription>
          You are currently viewing credentials for the <strong>Sandbox</strong> environment.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Client Credentials
            </CardTitle>
            <CardDescription>Your OAuth 2.0 client credentials</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Client ID</h3>
                <Button variant="ghost" size="sm">
                  Copy
                </Button>
              </div>
              <div className="rounded-md bg-muted p-3">
                <p className="text-sm font-mono">{process.env.CLIENT_ID || "Not configured"}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Client Secret</h3>
                <Button variant="ghost" size="sm" disabled>
                  Copy
                </Button>
              </div>
              <div className="rounded-md bg-muted p-3">
                <p className="text-sm font-mono">••••••••••••••••</p>
              </div>
              <p className="text-xs text-muted-foreground">
                For security reasons, the client secret is not displayed in full.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Button variant="outline" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Rotate Client Secret
              </Button>
              <p className="text-xs text-muted-foreground">
                Rotating your client secret will invalidate the old secret. Make sure to update your applications.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Recommendations
            </CardTitle>
            <CardDescription>Best practices for managing your credentials</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <div className="rounded-full h-6 w-6 flex items-center justify-center bg-primary/10 text-primary shrink-0">
                  1
                </div>
                <p>Never expose your client secret in client-side code or public repositories.</p>
              </li>
              <li className="flex gap-2">
                <div className="rounded-full h-6 w-6 flex items-center justify-center bg-primary/10 text-primary shrink-0">
                  2
                </div>
                <p>Rotate your client secret regularly and after team member departures.</p>
              </li>
              <li className="flex gap-2">
                <div className="rounded-full h-6 w-6 flex items-center justify-center bg-primary/10 text-primary shrink-0">
                  3
                </div>
                <p>Store credentials in environment variables, not in your code.</p>
              </li>
              <li className="flex gap-2">
                <div className="rounded-full h-6 w-6 flex items-center justify-center bg-primary/10 text-primary shrink-0">
                  4
                </div>
                <p>Use a secure vault or secret manager in production environments.</p>
              </li>
              <li className="flex gap-2">
                <div className="rounded-full h-6 w-6 flex items-center justify-center bg-primary/10 text-primary shrink-0">
                  5
                </div>
                <p>Implement proper error handling for authentication failures.</p>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Access Tokens</h2>
        <p className="text-muted-foreground">Generate OAuth 2.0 access tokens using your client credentials.</p>
        <TokenGenerator />
      </div>
    </div>
  )
}
