"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { CodeBlock } from "@/components/code-block"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AlertTriangle, Bell, Check, Copy, Edit, Loader2, Plus, RefreshCw, Trash2, Webhook } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Mock webhook data
const mockWebhooks = [
  {
    id: "wh_1",
    name: "Payment Notifications",
    url: "https://example.com/webhooks/payments",
    events: ["payment.created", "payment.completed", "payment.failed"],
    active: true,
    created: "2023-04-15T10:30:00Z",
    secret: "whsec_1234567890abcdef",
  },
  {
    id: "wh_2",
    name: "Account Updates",
    url: "https://example.com/webhooks/accounts",
    events: ["account.created", "account.updated"],
    active: true,
    created: "2023-05-20T14:45:00Z",
    secret: "whsec_abcdef1234567890",
  },
  {
    id: "wh_3",
    name: "Transaction Alerts",
    url: "https://example.com/webhooks/transactions",
    events: ["transaction.created"],
    active: false,
    created: "2023-03-10T09:15:00Z",
    secret: "whsec_0987654321abcdef",
  },
]

// Available webhook events
const availableEvents = [
  { id: "payment.created", label: "Payment Created", category: "payments" },
  { id: "payment.completed", label: "Payment Completed", category: "payments" },
  { id: "payment.failed", label: "Payment Failed", category: "payments" },
  { id: "account.created", label: "Account Created", category: "accounts" },
  { id: "account.updated", label: "Account Updated", category: "accounts" },
  { id: "account.closed", label: "Account Closed", category: "accounts" },
  { id: "transaction.created", label: "Transaction Created", category: "transactions" },
  { id: "customer.created", label: "Customer Created", category: "customers" },
  { id: "customer.updated", label: "Customer Updated", category: "customers" },
]

export default function WebhooksPage() {
  const [webhooks, setWebhooks] = useState(mockWebhooks)
  const [showNewWebhookDialog, setShowNewWebhookDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [webhookToDelete, setWebhookToDelete] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [newWebhook, setNewWebhook] = useState({
    name: "",
    url: "",
    events: [] as string[],
  })
  const [selectedWebhook, setSelectedWebhook] = useState<string | null>(null)
  const { toast } = useToast()

  const handleCreateWebhook = () => {
    setIsLoading(true)

    // Validate form
    if (!newWebhook.name || !newWebhook.url || newWebhook.events.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields and select at least one event.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // In a real app, this would make an API call to create a new webhook
    setTimeout(() => {
      const webhookId = `wh_${Math.random().toString(36).substring(2, 10)}`
      const secret = `whsec_${Math.random().toString(36).substring(2, 15)}`

      const createdWebhook = {
        id: webhookId,
        name: newWebhook.name,
        url: newWebhook.url,
        events: newWebhook.events,
        active: true,
        created: new Date().toISOString(),
        secret,
      }

      setWebhooks([...webhooks, createdWebhook])
      setNewWebhook({
        name: "",
        url: "",
        events: [],
      })
      setShowNewWebhookDialog(false)
      setIsLoading(false)

      toast({
        title: "Webhook Created",
        description: "Your webhook has been created successfully.",
      })

      // Select the newly created webhook
      setSelectedWebhook(webhookId)
    }, 1000)
  }

  const handleToggleWebhook = (id: string, active: boolean) => {
    setWebhooks(webhooks.map((webhook) => (webhook.id === id ? { ...webhook, active } : webhook)))

    toast({
      title: active ? "Webhook Activated" : "Webhook Deactivated",
      description: `Webhook ${active ? "activated" : "deactivated"} successfully.`,
    })
  }

  const handleDeleteWebhook = () => {
    if (!webhookToDelete) return

    setIsLoading(true)

    // In a real app, this would make an API call to delete the webhook
    setTimeout(() => {
      setWebhooks(webhooks.filter((webhook) => webhook.id !== webhookToDelete))
      setWebhookToDelete(null)
      setShowDeleteDialog(false)
      setIsLoading(false)

      if (selectedWebhook === webhookToDelete) {
        setSelectedWebhook(null)
      }

      toast({
        title: "Webhook Deleted",
        description: "Your webhook has been deleted successfully.",
      })
    }, 1000)
  }

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: message,
    })
  }

  const regenerateSecret = (id: string) => {
    const newSecret = `whsec_${Math.random().toString(36).substring(2, 15)}`

    setWebhooks(webhooks.map((webhook) => (webhook.id === id ? { ...webhook, secret: newSecret } : webhook)))

    toast({
      title: "Secret Regenerated",
      description: "Your webhook secret has been regenerated successfully.",
    })
  }

  const selectedWebhookData = webhooks.find((webhook) => webhook.id === selectedWebhook)

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Webhooks</h1>
        <p className="text-muted-foreground">
          Manage webhooks to receive real-time notifications for events in your NexusBank account.
        </p>
      </div>

      <div className="flex justify-between items-center">
        <Tabs defaultValue="active" className="w-full">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="active">Active Webhooks</TabsTrigger>
              <TabsTrigger value="inactive">Inactive Webhooks</TabsTrigger>
            </TabsList>
            <Dialog open={showNewWebhookDialog} onOpenChange={setShowNewWebhookDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Webhook
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create New Webhook</DialogTitle>
                  <DialogDescription>
                    Create a new webhook to receive real-time notifications for events in your NexusBank account.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="webhook-name">Webhook Name</Label>
                    <Input
                      id="webhook-name"
                      placeholder="Payment Notifications"
                      value={newWebhook.name}
                      onChange={(e) => setNewWebhook({ ...newWebhook, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="webhook-url">Endpoint URL</Label>
                    <Input
                      id="webhook-url"
                      placeholder="https://example.com/webhooks/nexusbank"
                      value={newWebhook.url}
                      onChange={(e) => setNewWebhook({ ...newWebhook, url: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">
                      This URL will receive HTTP POST requests for the events you select.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Events to Subscribe</Label>
                    <div className="border rounded-md p-4 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        {availableEvents.map((event) => (
                          <div key={event.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={event.id}
                              checked={newWebhook.events.includes(event.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setNewWebhook({
                                    ...newWebhook,
                                    events: [...newWebhook.events, event.id],
                                  })
                                } else {
                                  setNewWebhook({
                                    ...newWebhook,
                                    events: newWebhook.events.filter((e) => e !== event.id),
                                  })
                                }
                              }}
                            />
                            <Label htmlFor={event.id} className="text-sm">
                              {event.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowNewWebhookDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateWebhook} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Webhook"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid md:grid-cols-[300px_1fr] gap-6 mt-6">
            <div className="space-y-4">
              <TabsContent value="active" className="m-0">
                {webhooks.filter((webhook) => webhook.active).length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Webhook className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No Active Webhooks</h3>
                      <p className="text-sm text-muted-foreground mb-4">You don't have any active webhooks yet.</p>
                      <Button onClick={() => setShowNewWebhookDialog(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Webhook
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-2">
                    {webhooks
                      .filter((webhook) => webhook.active)
                      .map((webhook) => (
                        <Card
                          key={webhook.id}
                          className={`cursor-pointer hover:bg-accent/50 transition-colors ${
                            selectedWebhook === webhook.id ? "border-primary" : ""
                          }`}
                          onClick={() => setSelectedWebhook(webhook.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div className="space-y-1">
                                <h3 className="font-medium">{webhook.name}</h3>
                                <p className="text-xs text-muted-foreground truncate max-w-[200px]">{webhook.url}</p>
                                <div className="flex items-center gap-2">
                                  <Badge
                                    variant="outline"
                                    className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300"
                                  >
                                    <Check className="mr-1 h-3 w-3" /> Active
                                  </Badge>
                                  <Badge variant="outline">{webhook.events.length} events</Badge>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="inactive" className="m-0">
                {webhooks.filter((webhook) => !webhook.active).length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Webhook className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No Inactive Webhooks</h3>
                      <p className="text-sm text-muted-foreground">You don't have any inactive webhooks.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-2">
                    {webhooks
                      .filter((webhook) => !webhook.active)
                      .map((webhook) => (
                        <Card
                          key={webhook.id}
                          className={`cursor-pointer hover:bg-accent/50 transition-colors ${
                            selectedWebhook === webhook.id ? "border-primary" : ""
                          }`}
                          onClick={() => setSelectedWebhook(webhook.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div className="space-y-1">
                                <h3 className="font-medium">{webhook.name}</h3>
                                <p className="text-xs text-muted-foreground truncate max-w-[200px]">{webhook.url}</p>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline">Inactive</Badge>
                                  <Badge variant="outline">{webhook.events.length} events</Badge>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                )}
              </TabsContent>
            </div>

            {selectedWebhookData ? (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{selectedWebhookData.name}</CardTitle>
                      <CardDescription>Webhook Details</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={selectedWebhookData.active}
                        onCheckedChange={(checked) => handleToggleWebhook(selectedWebhookData.id, checked)}
                      />
                      <span className="text-sm">{selectedWebhookData.active ? "Active" : "Inactive"}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Endpoint URL</Label>
                    <div className="flex items-center gap-2">
                      <Input value={selectedWebhookData.url} readOnly />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(selectedWebhookData.url, "URL copied to clipboard")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Webhook Secret</Label>
                    <div className="flex items-center gap-2">
                      <Input type="password" value={selectedWebhookData.secret} readOnly className="font-mono" />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(selectedWebhookData.secret, "Secret copied to clipboard")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-muted-foreground">Used to verify webhook signatures</p>
                      <Button variant="outline" size="sm" onClick={() => regenerateSecret(selectedWebhookData.id)}>
                        <RefreshCw className="mr-2 h-3 w-3" />
                        Regenerate
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Subscribed Events</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedWebhookData.events.map((eventId) => {
                        const event = availableEvents.find((e) => e.id === eventId)
                        return (
                          <Badge key={eventId} variant="outline" className="justify-start">
                            {event?.label || eventId}
                          </Badge>
                        )
                      })}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Created At</Label>
                    <p className="text-sm">{new Date(selectedWebhookData.created).toLocaleString()}</p>
                  </div>

                  <Alert>
                    <Bell className="h-4 w-4" />
                    <AlertTitle>Testing Your Webhook</AlertTitle>
                    <AlertDescription>
                      You can test your webhook by sending a test event to your endpoint.
                    </AlertDescription>
                  </Alert>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setSelectedWebhook(null)}>
                      Close
                    </Button>
                    <div className="space-x-2">
                      <Button variant="outline">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          setWebhookToDelete(selectedWebhookData.id)
                          setShowDeleteDialog(true)
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Webhook className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No Webhook Selected</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Select a webhook from the list to view its details.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </Tabs>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Webhook Security</CardTitle>
          <CardDescription>Best practices for securing your webhooks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Verifying Webhook Signatures</h3>
            <p className="text-sm text-muted-foreground">
              To ensure the webhook requests are coming from NexusBank, you should verify the signature included in each
              request.
            </p>
            <CodeBlock
              language="javascript"
              code={`const crypto = require('crypto');

// Express.js example
app.post('/webhooks/nexusbank', express.raw({type: 'application/json'}), (req, res) => {
  const signature = req.headers['x-nexusbank-signature'];
  const webhookSecret = 'YOUR_WEBHOOK_SECRET';
  
  // Create HMAC
  const hmac = crypto.createHmac('sha256', webhookSecret);
  const digest = hmac.update(req.body).digest('hex');
  
  // Compare signatures
  if (signature === digest) {
    // Signature is valid, process the webhook
    const payload = JSON.parse(req.body);
    console.log('Webhook received:', payload);
    res.status(200).send('Webhook received');
  } else {
    // Invalid signature
    console.error('Invalid webhook signature');
    res.status(401).send('Invalid signature');
  }
});`}
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Webhook Retry Policy</h3>
            <p className="text-sm text-muted-foreground">
              If your endpoint returns a non-2xx response code, we'll retry the webhook delivery with an exponential
              backoff:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>1st retry: 5 minutes after the initial attempt</li>
              <li>2nd retry: 30 minutes after the 1st retry</li>
              <li>3rd retry: 2 hours after the 2nd retry</li>
              <li>4th retry: 5 hours after the 3rd retry</li>
              <li>5th retry: 10 hours after the 4th retry</li>
            </ul>
            <p className="text-sm text-muted-foreground">
              After the 5th retry, the webhook will be marked as failed and will not be retried again.
            </p>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Webhook</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this webhook? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                Deleting this webhook will immediately stop all event notifications being sent to the endpoint URL.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteWebhook} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Webhook"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
