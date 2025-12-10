"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Send } from "lucide-react"

const endpoints = [
  {
    method: "GET",
    path: "/v1/users",
    description: "List all users",
  },
  {
    method: "GET",
    path: "/v1/users/:id",
    description: "Get a specific user",
  },
  {
    method: "POST",
    path: "/v1/users",
    description: "Create a new user",
  },
  {
    method: "PUT",
    path: "/v1/users/:id",
    description: "Update a user",
  },
  {
    method: "DELETE",
    path: "/v1/users/:id",
    description: "Delete a user",
  },
]

export function APITester() {
  const [selectedEndpoint, setSelectedEndpoint] = useState(endpoints[0])
  const [apiKey, setApiKey] = useState("")
  const [requestBody, setRequestBody] = useState("{}")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)

  const sendRequest = async () => {
    setLoading(true)
    // Simulate API request
    setTimeout(() => {
      setResponse(
        JSON.stringify(
          {
            status: 200,
            message: "Success",
            data: { id: "example_id", created_at: new Date().toISOString() },
          },
          null,
          2,
        ),
      )
      setLoading(false)
    }, 1000)
  }

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "text-blue-600 dark:text-blue-400"
      case "POST":
        return "text-green-600 dark:text-green-400"
      case "PUT":
        return "text-yellow-600 dark:text-yellow-400"
      case "DELETE":
        return "text-red-600 dark:text-red-400"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="p-6 md:p-10 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">API Testing</h1>
        <p className="text-foreground/60">Test API endpoints directly in your browser</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Endpoints List */}
        <div className="lg:col-span-1">
          <Card className="p-4 border border-border">
            <h3 className="font-bold text-foreground mb-3">Available Endpoints</h3>
            <div className="space-y-2">
              {endpoints.map((endpoint, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedEndpoint(endpoint)}
                  className={`w-full text-left p-3 rounded-lg border-2 transition
                    ${
                      selectedEndpoint.path === endpoint.path
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/30"
                    }`}
                >
                  <div className={`text-xs font-bold ${getMethodColor(endpoint.method)}`}>{endpoint.method}</div>
                  <div className="text-sm text-foreground font-mono mt-1">{endpoint.path}</div>
                  <div className="text-xs text-foreground/60 mt-1">{endpoint.description}</div>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Request/Response Area */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-6 border border-border">
            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <span className={`text-xs font-bold px-2 py-1 rounded ${getMethodColor(selectedEndpoint.method)}`}>
                {selectedEndpoint.method}
              </span>
              {selectedEndpoint.path}
            </h3>

            <div className="space-y-4">
              {/* API Key */}
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-2">API Key</label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk_live_..."
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:border-primary"
                />
              </div>

              {/* Request Body */}
              {(selectedEndpoint.method === "POST" || selectedEndpoint.method === "PUT") && (
                <div>
                  <label className="block text-sm font-medium text-foreground/70 mb-2">Request Body</label>
                  <textarea
                    value={requestBody}
                    onChange={(e) => setRequestBody(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm font-mono focus:outline-none focus:border-primary h-24"
                  />
                </div>
              )}

              {/* Send Button */}
              <Button
                onClick={sendRequest}
                disabled={loading || !apiKey}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                {loading ? "Sending..." : "Send Request"}
              </Button>
            </div>
          </Card>

          {/* Response */}
          {response && (
            <Card className="p-6 border border-border bg-muted/30">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-foreground">Response</h4>
                <button
                  onClick={() => navigator.clipboard.writeText(response)}
                  className="text-foreground/60 hover:text-foreground"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <pre className="bg-background border border-border rounded-lg p-4 text-xs font-mono text-foreground overflow-auto max-h-48">
                {response}
              </pre>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
