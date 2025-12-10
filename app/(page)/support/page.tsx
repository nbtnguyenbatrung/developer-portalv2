import { Calendar } from "@/components/ui/calendar"
import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, LifeBuoy, BookOpen, FileText, Mail, Video, ArrowRight, Users, ExternalLink } from "lucide-react"

export const metadata: Metadata = {
  title: "Support & Community - NexusBank Developer Portal",
  description: "Get help and connect with other developers using NexusBank APIs",
}

export default function SupportPage() {
  return (
    <div className="container py-8 space-y-8">
      <div className="space-y-4">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Support & Community</h1>
        <p className="text-xl text-muted-foreground">Get help and connect with other developers using NexusBank APIs</p>
      </div>

      <Tabs defaultValue="support" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="support">Support</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="support" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LifeBuoy className="h-5 w-5 text-primary" />
                  Technical Support
                </CardTitle>
                <CardDescription>Get help with API integration issues</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Our technical support team is available to help you with any API integration issues you may encounter.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">
                      24/7
                    </Badge>
                    <div>
                      <h3 className="text-sm font-medium">Critical Issues</h3>
                      <p className="text-xs text-muted-foreground">
                        For production outages and critical issues, we provide 24/7 support with a 1-hour response time.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">
                      Business Hours
                    </Badge>
                    <div>
                      <h3 className="text-sm font-medium">Standard Support</h3>
                      <p className="text-xs text-muted-foreground">
                        For non-critical issues, we provide support during business hours (9 AM - 5 PM CET) with a
                        24-hour response time.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Open Support Ticket
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Documentation
                </CardTitle>
                <CardDescription>Comprehensive guides and API reference</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Our documentation provides detailed guides, API reference, and code examples to help you integrate
                  with NexusBank APIs.
                </p>
                <div className="space-y-2">
                  <Link href="/docs/quick-start" className="flex items-center justify-between text-sm hover:underline">
                    <span>Quick Start Guide</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/docs/api" className="flex items-center justify-between text-sm hover:underline">
                    <span>API Reference</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/docs/authentication"
                    className="flex items-center justify-between text-sm hover:underline"
                  >
                    <span>Authentication Guide</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/docs/webhooks" className="flex items-center justify-between text-sm hover:underline">
                    <span>Webhooks Guide</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/docs">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Browse Documentation
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Email Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Email our support team directly for assistance with your integration.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <a href="mailto:api-support@nexusbank.com">
                    <Mail className="mr-2 h-4 w-4" />
                    api-support@nexusbank.com
                  </a>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-primary" />
                  Video Tutorials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Watch step-by-step video tutorials on how to integrate with our APIs.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Video className="mr-2 h-4 w-4" />
                  Watch Tutorials
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Sample Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Download sample projects and code snippets for common integration scenarios.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  Browse Samples
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Support SLA</CardTitle>
              <CardDescription>Our commitment to providing timely support</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-border">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium">Issue Severity</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">Description</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">Response Time</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">Resolution Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="px-4 py-2 text-sm">
                        <Badge variant="destructive">Critical</Badge>
                      </td>
                      <td className="px-4 py-2 text-sm">Production outage, service unavailable</td>
                      <td className="px-4 py-2 text-sm">1 hour</td>
                      <td className="px-4 py-2 text-sm">4 hours</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm">
                        <Badge variant="default">High</Badge>
                      </td>
                      <td className="px-4 py-2 text-sm">Service degradation, major feature unavailable</td>
                      <td className="px-4 py-2 text-sm">4 hours</td>
                      <td className="px-4 py-2 text-sm">8 hours</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm">
                        <Badge variant="secondary">Medium</Badge>
                      </td>
                      <td className="px-4 py-2 text-sm">Minor feature unavailable, workaround exists</td>
                      <td className="px-4 py-2 text-sm">8 hours</td>
                      <td className="px-4 py-2 text-sm">24 hours</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm">
                        <Badge variant="outline">Low</Badge>
                      </td>
                      <td className="px-4 py-2 text-sm">General questions, feature requests</td>
                      <td className="px-4 py-2 text-sm">24 hours</td>
                      <td className="px-4 py-2 text-sm">48 hours</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="community" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Developer Forum
                </CardTitle>
                <CardDescription>Connect with other developers and share knowledge</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Join our developer community to ask questions, share your experiences, and learn from other
                  developers.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Active discussions</span>
                    <Badge>124</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Community members</span>
                    <Badge>3,542</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Average response time</span>
                    <Badge variant="outline">2 hours</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit Developer Forum
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Community Events
                </CardTitle>
                <CardDescription>Join webinars, workshops, and meetups</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Participate in our community events to learn about new features, best practices, and connect with
                  other developers.
                </p>
                <div className="space-y-4">
                  <div className="rounded-md border p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium">API Integration Workshop</h3>
                        <p className="text-xs text-muted-foreground mt-1">May 15, 2023 • 2:00 PM CET</p>
                      </div>
                      <Badge>Upcoming</Badge>
                    </div>
                  </div>
                  <div className="rounded-md border p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium">Webhooks Deep Dive</h3>
                        <p className="text-xs text-muted-foreground mt-1">May 22, 2023 • 3:00 PM CET</p>
                      </div>
                      <Badge>Upcoming</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Calendar className="mr-2 h-4 w-4" />
                  View All Events
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Community Guidelines</CardTitle>
              <CardDescription>Help us maintain a positive and productive community</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Be Respectful</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Treat others with respect. No personal attacks, harassment, or discriminatory language.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Stay On Topic</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Keep discussions relevant to NexusBank APIs and developer topics.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium">No Sensitive Data</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Never share API keys, credentials, or sensitive data in community forums.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Help Others</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Share your knowledge and help other developers when you can.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Quick answers to common questions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">How do I get an API key?</h3>
                <p className="text-sm text-muted-foreground">
                  You can generate API keys in the Developer Dashboard under the API Keys section. You'll need to create
                  an account and verify your email address first.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">What are the rate limits for the API?</h3>
                <p className="text-sm text-muted-foreground">
                  Free tier accounts have a limit of 100 requests per hour. Premium accounts have higher limits based on
                  the subscription plan. You can view your current rate limits in the Developer Dashboard.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">How do I reset my sandbox environment?</h3>
                <p className="text-sm text-muted-foreground">
                  You can reset your sandbox environment by going to the Sandbox section in the Developer Dashboard and
                  clicking the "Reset Sandbox" button. This will restore all test data to its default state.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">How do I set up webhooks?</h3>
                <p className="text-sm text-muted-foreground">
                  You can configure webhooks in the Developer Dashboard under the Webhooks section. You'll need to
                  provide a URL where we can send event notifications, and select which events you want to receive.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">What authentication methods are supported?</h3>
                <p className="text-sm text-muted-foreground">
                  We support API key authentication for most endpoints, and OAuth 2.0 for user-specific operations. See
                  our Authentication Guide for detailed instructions.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">How do I report a bug or security issue?</h3>
                <p className="text-sm text-muted-foreground">
                  For general bugs, please open a support ticket. For security issues, please email
                  security@nexusbank.com with details of the vulnerability.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/docs/faq">
                  <BookOpen className="mr-2 h-4 w-4" />
                  View Full FAQ
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
