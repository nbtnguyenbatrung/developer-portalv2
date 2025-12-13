"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, AlertTriangle, CheckCircle2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function SandboxControls() {
  const [isResetting, setIsResetting] = useState(false)
  const [lastReset, setLastReset] = useState<string | null>(null)
  const { toast } = useToast()

  const resetSandbox = async () => {
    setIsResetting(true)
    try {
      // In a real implementation, this would call the sandbox reset API
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const now = new Date().toISOString()
      setLastReset(now)

      toast({
        title: "Sandbox Reset Successfully",
        description: "All test data has been restored to its default state.",
        variant: "success",
      })
    } catch (error) {
      toast({
        title: "Reset Failed",
        description: "There was an error resetting the sandbox. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsResetting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sandbox Controls</CardTitle>
        <CardDescription>Manage your sandbox testing environment</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Environment Status</h3>
            <p className="text-sm text-muted-foreground">Current state of your sandbox</p>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300">
            <CheckCircle2 className="mr-1 h-3 w-3" /> Active
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Rate Limit</h3>
            <p className="text-sm text-muted-foreground">API request limit per hour</p>
          </div>
          <Badge variant="outline">100 requests/hour</Badge>
        </div>

        {lastReset && (
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Last Reset</h3>
              <p className="text-sm text-muted-foreground">When sandbox was last reset</p>
            </div>
            <span className="text-sm">{new Date(lastReset).toLocaleString()}</span>
          </div>
        )}

        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Reset Warning</AlertTitle>
          <AlertDescription>
            Resetting the sandbox will restore all test data to its default state and delete any custom data you've
            created.
          </AlertDescription>
        </Alert>
      </CardContent>
      <CardFooter>
        <Button onClick={resetSandbox} disabled={isResetting} className="w-full" variant="destructive">
          {isResetting ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Resetting Sandbox...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset Sandbox
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
