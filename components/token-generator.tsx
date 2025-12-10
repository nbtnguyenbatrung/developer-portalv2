"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info, Copy, Check } from "lucide-react"

export function TokenGenerator() {
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const generateToken = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/auth/token", {
        method: "POST",
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to generate token")
      }

      setToken(data.access_token)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  const copyToken = () => {
    if (token) {
      navigator.clipboard.writeText(token)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Access Token</CardTitle>
        <CardDescription>Generate an OAuth 2.0 access token using your client credentials</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {token && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Your Access Token</h3>
              <Button variant="ghost" size="sm" onClick={copyToken}>
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <div className="rounded-md bg-muted p-4">
              <p className="text-sm font-mono break-all">{token}</p>
            </div>
          </div>
        )}

        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Token Usage</AlertTitle>
          <AlertDescription>
            Use this token in the Authorization header of your API requests:
            <code className="block mt-2 text-sm">Authorization: Bearer {token || "YOUR_ACCESS_TOKEN"}</code>
          </AlertDescription>
        </Alert>
      </CardContent>
      <CardFooter>
        <Button onClick={generateToken} disabled={loading}>
          {loading ? "Generating..." : "Generate Token"}
        </Button>
      </CardFooter>
    </Card>
  )
}
