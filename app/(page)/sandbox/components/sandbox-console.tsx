"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/code-block"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

export function SandboxConsole() {
  const [method, setMethod] = useState("GET")
  const [url, setUrl] = useState("https://sandbox-api.nexusbank.com/v1/accounts")
  const [requestBody, setRequestBody] = useState("")
  const [response, setResponse] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [responseStatus, setResponseStatus] = useState<number | null>(null)
  const { toast } = useToast()

  const handleSendRequest = async () => {
    setIsLoading(true)
    setResponse(null)
    setResponseStatus(null)

    try {
      // In a real implementation, this would make an actual API call
      // For demo purposes, we'll simulate responses based on the URL and method
      await new Promise((resolve) => setTimeout(resolve, 1500))

      let mockResponse
      let status = 200

      if (url.includes("/accounts")) {
        mockResponse = {
          data: [
            {
              id: "acc_sandbox_001",
              name: "Test Checking",
              type: "checking",
              currency: "EUR",
              balance: 10000.0,
              available_balance: 10000.0,
              status: "active",
              created_at: "2023-01-01T00:00:00Z",
              _links: {
                self: "/v1/accounts/acc_sandbox_001",
                transactions: "/v1/accounts/acc_sandbox_001/transactions",
              },
            },
            {
              id: "acc_sandbox_002",
              name: "Test Savings",
              type: "savings",
              currency: "EUR",
              balance: 50000.0,
              available_balance: 50000.0,
              status: "active",
              created_at: "2023-01-01T00:00:00Z",
              _links: {
                self: "/v1/accounts/acc_sandbox_002",
                transactions: "/v1/accounts/acc_sandbox_002/transactions",
              },
            },
          ],
          meta: {
            page: 1,
            limit: 10,
            total: 5,
            pages: 1,
          },
          _links: {
            self: "/v1/accounts?page=1&limit=10",
            first: "/v1/accounts?page=1&limit=10",
            last: "/v1/accounts?page=1&limit=10",
          },
        }
      } else if (url.includes("/payments") && method === "POST") {
        try {
          const body = requestBody ? JSON.parse(requestBody) : {}

          if (body.source_account_id === "acc_sandbox_004") {
            mockResponse = {
              error: {
                code: "insufficient_funds",
                message: "The source account has insufficient funds for this transfer",
              },
            }
            status = 400
          } else if (body.destination?.iban === "DE00000000000000000000") {
            mockResponse = {
              error: {
                code: "invalid_recipient",
                message: "The recipient details are invalid or incomplete",
              },
            }
            status = 400
          } else {
            mockResponse = {
              id: "pmt_sandbox_" + Math.random().toString(36).substring(2, 10),
              source_account_id: body.source_account_id || "acc_sandbox_001",
              destination: body.destination || {
                type: "iban",
                iban: "DE89370400440532013001",
                bic: "NEXUBANKXXX",
                name: "Jane Smith",
              },
              amount: body.amount || 100.5,
              currency: body.currency || "EUR",
              description: body.description || "Test payment",
              status: "pending",
              created_at: new Date().toISOString(),
              _links: {
                self: "/v1/payments/pmt_sandbox_123",
              },
            }
            status = 201
          }
        } catch (e) {
          mockResponse = {
            error: {
              code: "invalid_request",
              message: "Invalid JSON in request body",
            },
          }
          status = 400
        }
      } else if (url.includes("/transactions")) {
        mockResponse = {
          data: [
            {
              id: "txn_sandbox_001",
              account_id: "acc_sandbox_001",
              amount: -100.5,
              currency: "EUR",
              description: "Payment to Jane Smith",
              type: "payment",
              status: "completed",
              created_at: "2023-05-01T10:30:00Z",
            },
            {
              id: "txn_sandbox_002",
              account_id: "acc_sandbox_001",
              amount: 1500.0,
              currency: "EUR",
              description: "Salary deposit",
              type: "deposit",
              status: "completed",
              created_at: "2023-05-01T09:15:00Z",
            },
          ],
          meta: {
            page: 1,
            limit: 10,
            total: 2,
            pages: 1,
          },
        }
      } else {
        mockResponse = {
          error: {
            code: "not_found",
            message: "The requested resource was not found",
          },
        }
        status = 404
      }

      setResponse(mockResponse)
      setResponseStatus(status)

      if (status >= 400) {
        toast({
          title: `Error ${status}`,
          description: mockResponse.error?.message || "An error occurred",
          variant: "destructive",
        })
      } else {
        toast({
          title: `Success ${status}`,
          description: "Request completed successfully",
          variant: "success",
        })
      }
    } catch (error) {
      console.error("Error sending request:", error)
      toast({
        title: "Request Failed",
        description: "There was an error processing your request",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>API Console</CardTitle>
          <CardDescription>Test API requests directly in your browser</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/3 space-y-2">
              <Label htmlFor="request-method">Method</Label>
              <Select value={method} onValueChange={setMethod}>
                <SelectTrigger id="request-method">
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GET">GET</SelectItem>
                  <SelectItem value="POST">POST</SelectItem>
                  <SelectItem value="PUT">PUT</SelectItem>
                  <SelectItem value="DELETE">DELETE</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full md:w-2/3 space-y-2">
              <Label htmlFor="request-url">URL</Label>
              <Input id="request-url" value={url} onChange={(e) => setUrl(e.target.value)} />
            </div>
          </div>

          <Tabs defaultValue="body" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="body">Body</TabsTrigger>
              <TabsTrigger value="headers">Headers</TabsTrigger>
              <TabsTrigger value="auth">Auth</TabsTrigger>
            </TabsList>

            <TabsContent value="body" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="request-body">Request Body (JSON)</Label>
                <textarea
                  id="request-body"
                  className="min-h-[200px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 font-mono"
                  placeholder={`{\n  "key": "value"\n}`}
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                />
              </div>
            </TabsContent>

            <TabsContent value="headers" className="space-y-4">
              <div className="space-y-2">
                <Label>Headers</Label>
                <div className="rounded-md border">
                  <div className="flex items-center p-2 border-b">
                    <Input
                      className="w-1/3 border-0 focus-visible:ring-0"
                      placeholder="Content-Type"
                      value="Content-Type"
                      readOnly
                    />
                    <Input
                      className="w-2/3 border-0 focus-visible:ring-0"
                      placeholder="application/json"
                      value="application/json"
                      readOnly
                    />
                  </div>
                  <div className="flex items-center p-2 border-b">
                    <Input
                      className="w-1/3 border-0 focus-visible:ring-0"
                      placeholder="Authorization"
                      value="Authorization"
                      readOnly
                    />
                    <Input
                      className="w-2/3 border-0 focus-visible:ring-0"
                      placeholder="Bearer {token}"
                      value="Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
                      readOnly
                    />
                  </div>
                  <div className="flex items-center p-2">
                    <Input className="w-1/3 border-0 focus-visible:ring-0" placeholder="Header name" />
                    <Input className="w-2/3 border-0 focus-visible:ring-0" placeholder="Header value" />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="auth" className="space-y-4">
              <div className="space-y-2">
                <Label>Authentication</Label>
                <div className="rounded-md border p-4">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="auth-bearer" name="auth-type" checked readOnly />
                      <Label htmlFor="auth-bearer">Bearer Token</Label>
                    </div>
                    <Input placeholder="Bearer token" value="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..." readOnly />
                    <p className="text-xs text-muted-foreground">
                      Token is automatically included from your sandbox credentials
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <Button onClick={handleSendRequest} disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending Request...
              </>
            ) : (
              "Send Request"
            )}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Response</CardTitle>
          <CardDescription>
            {responseStatus
              ? `Status: ${responseStatus} ${responseStatus < 400 ? "✓" : "✗"}`
              : "Send a request to see the response"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-[300px]">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : response ? (
            <CodeBlock language="json" code={JSON.stringify(response, null, 2)} />
          ) : (
            <div className="flex items-center justify-center h-[300px] text-muted-foreground">
              No response yet. Send a request to see the response.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
