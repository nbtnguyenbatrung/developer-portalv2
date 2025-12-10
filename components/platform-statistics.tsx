"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Code, Server } from "lucide-react"

const platformData = [
  { month: "Jan", developers: 1200, apis: 45, transactions: 2.4 },
  { month: "Feb", developers: 1350, apis: 48, transactions: 2.7 },
  { month: "Mar", developers: 1500, apis: 52, transactions: 3.1 },
  { month: "Apr", developers: 1750, apis: 55, transactions: 3.5 },
  { month: "May", developers: 2100, apis: 60, transactions: 4.2 },
  { month: "Jun", developers: 2400, apis: 65, transactions: 5.0 },
]

const announcementData = [
  {
    title: "New Payment API Released",
    date: "June 15, 2023",
    description: "Our new Payment API v2.0 offers improved performance and additional features.",
    badge: "New Feature",
  },
  {
    title: "Upcoming Maintenance",
    date: "July 5, 2023",
    description: "Scheduled maintenance window from 2AM-4AM UTC. API service will remain available.",
    badge: "Maintenance",
  },
  {
    title: "SDK Updates",
    date: "June 10, 2023",
    description: "All SDKs have been updated to support the latest API features and improvements.",
    badge: "Update",
  },
]

export function PlatformStatistics() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Platform Overview</h2>
        <p className="text-muted-foreground">Key statistics and latest announcements</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Platform Growth</CardTitle>
            <CardDescription>Monthly statistics on platform usage and growth</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="chart" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="chart">Chart View</TabsTrigger>
                <TabsTrigger value="stats">Key Stats</TabsTrigger>
              </TabsList>
              <TabsContent value="chart">
                <ChartContainer
                  config={{
                    developers: {
                      label: "Developers",
                      color: "hsl(var(--chart-1))",
                    },
                    transactions: {
                      label: "Transactions (M)",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px] mt-4"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={platformData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="developers"
                        stroke="var(--color-developers)"
                        name="Developers"
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="transactions"
                        stroke="var(--color-transactions)"
                        name="Transactions (M)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </TabsContent>
              <TabsContent value="stats">
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Card>
                    <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                      <Users className="h-8 w-8 text-primary mb-2" />
                      <h3 className="text-2xl font-bold">2,400+</h3>
                      <p className="text-sm text-muted-foreground">Active Developers</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                      <Server className="h-8 w-8 text-primary mb-2" />
                      <h3 className="text-2xl font-bold">65+</h3>
                      <p className="text-sm text-muted-foreground">API Endpoints</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                      <Code className="h-8 w-8 text-primary mb-2" />
                      <h3 className="text-2xl font-bold">5</h3>
                      <p className="text-sm text-muted-foreground">SDK Languages</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                      <Clock className="h-8 w-8 text-primary mb-2" />
                      <h3 className="text-2xl font-bold">99.99%</h3>
                      <p className="text-sm text-muted-foreground">Uptime</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Latest Announcements</CardTitle>
            <CardDescription>Updates and news about our platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {announcementData.map((announcement, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{announcement.title}</h3>
                    <Badge variant="outline" className="ml-2">
                      {announcement.badge}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{announcement.description}</p>
                  <p className="text-xs text-muted-foreground">{announcement.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
