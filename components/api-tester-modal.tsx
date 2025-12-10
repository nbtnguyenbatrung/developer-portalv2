"use client"

import { useState } from "react"
import { X, Send, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface APIEndpoint {
  id: string
  name: string
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  path: string
  description: string
}

interface APITesterModalProps {
  api: APIEndpoint | null
  isOpen: boolean
  onClose: () => void
}

export function APITesterModal({ api, isOpen, onClose }: APITesterModalProps) {
  const [authToken, setAuthToken] = useState("")
  const [requestBody, setRequestBody] = useState("")
  const [response, setResponse] = useState<{ status: number; data: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  if (!isOpen || !api) return null

  // Mock response based on method and endpoint
  const getMockResponse = () => {
    const mockResponses: { [key: string]: { status: number; data: object } } = {
      "GET-/payments": {
        status: 200,
        data: {
          data: [
            { id: "pay_123", amount: 10000, currency: "USD", status: "completed" },
            { id: "pay_124", amount: 25000, currency: "USD", status: "pending" },
          ],
          total: 100,
          limit: 10,
          offset: 0,
        },
      },
      "POST-/payments": {
        status: 201,
        data: { id: "pay_456", amount: 10000, status: "pending", created_at: new Date().toISOString() },
      },
      "GET-/payments/:id": {
        status: 200,
        data: { id: "pay_123", amount: 10000, currency: "USD", status: "completed", customer_id: "cust_123" },
      },
      "POST-/payments/:id/refund": {
        status: 200,
        data: { id: "refund_789", payment_id: "pay_123", amount: 10000, status: "processed" },
      },
      "POST-/tokens": {
        status: 201,
        data: { token: "tok_" + Math.random().toString(36).substring(7), expires_in: 3600 },
      },
      "POST-/tokens/validate": {
        status: 200,
        data: { valid: true, token_type: "bearer", expires_at: new Date().toISOString() },
      },
      "POST-/qr": {
        status: 201,
        data: { id: "qr_123", url: "https://api.example.com/qr/qr_123.png", type: "payment" },
      },
      "GET-/qr/:id": {
        status: 200,
        data: { id: "qr_123", url: "https://api.example.com/qr/qr_123.png", created_at: new Date().toISOString() },
      },
    }

    const key = `${api.method}-${api.path}`
    return mockResponses[key] || { status: 200, data: { message: "Success", path: api.path } }
  }

  const handleSendRequest = async () => {
    setIsLoading(true)
    // Simulate API call delay
    setTimeout(() => {
      const mockResponse = getMockResponse()
      setResponse({
        status: mockResponse.status,
        data: JSON.stringify(mockResponse.data, null, 2),
      })
      setIsLoading(false)
    }, 800)
  }

  const handleCopyResponse = () => {
    if (response) {
      navigator.clipboard.writeText(response.data)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-card">
          <div>
            <h2 className="text-xl font-bold text-foreground">Test API</h2>
            <p className="text-sm text-foreground/60 mt-1">{api.description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition text-foreground/60 hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Request Section */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Request</h3>

              {/* Method and Path */}
              <div className="flex gap-3 mb-4">
                <span
                  className={`text-xs font-mono font-bold px-3 py-2 rounded ${
                    api.method === "GET"
                      ? "bg-blue-500/20 text-blue-600 dark:text-blue-400"
                      : api.method === "POST"
                        ? "bg-green-500/20 text-green-600 dark:text-green-400"
                        : api.method === "PUT"
                          ? "bg-orange-500/20 text-orange-600 dark:text-orange-400"
                          : api.method === "DELETE"
                            ? "bg-red-500/20 text-red-600 dark:text-red-400"
                            : "bg-purple-500/20 text-purple-600 dark:text-purple-400"
                  }`}
                >
                  {api.method}
                </span>
                <input
                  type="text"
                  value={`https://api.example.com/v1${api.path}`}
                  readOnly
                  className="flex-1 px-4 py-2 rounded-lg bg-muted border border-border font-mono text-sm text-foreground"
                />
              </div>

              {/* Auth Token */}
              <div className="mb-4">
                <label className="text-sm text-foreground/70 font-medium mb-2 block">Authorization Token</label>
                <input
                  type="password"
                  value={authToken}
                  onChange={(e) => setAuthToken(e.target.value)}
                  placeholder="sk_live_xxxxxxxxxxxxx"
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-foreground/40"
                />
              </div>

              {/* Request Body - only show for POST/PUT/PATCH */}
              {["POST", "PUT", "PATCH"].includes(api.method) && (
                <div>
                  <label className="text-sm text-foreground/70 font-medium mb-2 block">Request Body (JSON)</label>
                  <textarea
                    value={requestBody}
                    onChange={(e) => setRequestBody(e.target.value)}
                    placeholder={`{\n  "amount": 10000,\n  "currency": "USD"\n}`}
                    className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-foreground/40 font-mono text-sm"
                    rows={6}
                  />
                </div>
              )}
            </div>

            {/* Response Section */}
            {response && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-foreground">Response</h3>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-mono font-bold px-3 py-1 rounded ${
                        response.status >= 200 && response.status < 300
                          ? "bg-green-500/20 text-green-600 dark:text-green-400"
                          : "bg-red-500/20 text-red-600 dark:text-red-400"
                      }`}
                    >
                      {response.status}
                    </span>
                    <Button variant="ghost" size="sm" onClick={handleCopyResponse} className="gap-2">
                      {copied ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                <pre className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground text-xs overflow-x-auto font-mono">
                  {response.data}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-card sticky bottom-0 flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={handleSendRequest} disabled={isLoading} className="gap-2">
            <Send className="w-4 h-4" />
            {isLoading ? "Sending..." : "Send Request"}
          </Button>
        </div>
      </div>
    </div>
  )
}
