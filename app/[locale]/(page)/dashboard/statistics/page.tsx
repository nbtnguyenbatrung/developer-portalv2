"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for charts
const dailyData = [
  { date: "2023-05-01", calls: 1250, errors: 25, latency: 120 },
  { date: "2023-05-02", calls: 1320, errors: 32, latency: 115 },
  { date: "2023-05-03", calls: 1480, errors: 28, latency: 125 },
  { date: "2023-05-04", calls: 1530, errors: 23, latency: 110 },
  { date: "2023-05-05", calls: 1670, errors: 37, latency: 130 },
  { date: "2023-05-06", calls: 1750, errors: 35, latency: 125 },
  { date: "2023-05-07", calls: 1820, errors: 32, latency: 120 },
]

const weeklyData = [
  { date: "Week 1", calls: 8750, errors: 175, latency: 122 },
  { date: "Week 2", calls: 9230, errors: 193, latency: 118 },
  { date: "Week 3", calls: 9870, errors: 187, latency: 125 },
  { date: "Week 4", calls: 10350, errors: 205, latency: 130 },
]

const monthlyData = [
  { date: "Jan", calls: 35000, errors: 700, latency: 125 },
  { date: "Feb", calls: 38000, errors: 760, latency: 120 },
  { date: "Mar", calls: 42000, errors: 840, latency: 118 },
  { date: "Apr", calls: 46000, errors: 920, latency: 122 },
  { date: "May", calls: 51000, errors: 1020, latency: 128 },
]

const endpointData = [
  { name: "/accounts", calls: 5230, errors: 104, latency: 115 },
  { name: "/payments", calls: 4120, errors: 82, latency: 135 },
  { name: "/transactions", calls: 3850, errors: 77, latency: 125 },
  { name: "/analytics", calls: 2340, errors: 46, latency: 140 },
  { name: "/webhooks", calls: 1560, errors: 31, latency: 110 },
]

export default function StatisticsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Usage Statistics</h1>
        <p className="text-muted-foreground">Monitor your API usage, performance metrics, and error rates.</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Tabs defaultValue="daily" className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
            <TabsList>
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select API" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All APIs</SelectItem>
                <SelectItem value="accounts">Accounts API</SelectItem>
                <SelectItem value="payments">Payments API</SelectItem>
                <SelectItem value="transactions">Transactions API</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <TabsContent value="daily">
            <Card>
              <CardHeader>
                <CardTitle>API Usage - Daily</CardTitle>
                <CardDescription>Number of API calls over the past 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <APIUsageChart data={dailyData} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weekly">
            <Card>
              <CardHeader>
                <CardTitle>API Usage - Weekly</CardTitle>
                <CardDescription>Number of API calls over the past 4 weeks</CardDescription>
              </CardHeader>
              <CardContent>
                <APIUsageChart data={weeklyData} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monthly">
            <Card>
              <CardHeader>
                <CardTitle>API Usage - Monthly</CardTitle>
                <CardDescription>Number of API calls over the past 5 months</CardDescription>
              </CardHeader>
              <CardContent>
                <APIUsageChart data={monthlyData} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Error Rate</CardTitle>
            <CardDescription>Percentage of API calls resulting in errors</CardDescription>
          </CardHeader>
          <CardContent>
            <ErrorRateChart data={dailyData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Latency</CardTitle>
            <CardDescription>Average response time in milliseconds</CardDescription>
          </CardHeader>
          <CardContent>
            <LatencyChart data={dailyData} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Endpoint Usage</CardTitle>
          <CardDescription>API calls by endpoint</CardDescription>
        </CardHeader>
        <CardContent>
          <EndpointUsageChart data={endpointData} />
        </CardContent>
      </Card>
    </div>
  )
}

function APIUsageChart({ data }: { data: any[] }) {
  return (
    <ChartContainer
      config={{
        calls: {
          label: "API Calls",
          color: "hsl(var(--chart-1))",
        },
        errors: {
          label: "Errors",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line type="monotone" dataKey="calls" stroke="var(--color-calls)" name="API Calls" />
          <Line type="monotone" dataKey="errors" stroke="var(--color-errors)" name="Errors" />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

function ErrorRateChart({ data }: { data: any[] }) {
  // Calculate error rate percentage
  const errorRateData = data.map((item) => ({
    date: item.date,
    rate: ((item.errors / item.calls) * 100).toFixed(2),
  }))

  return (
    <ChartContainer
      config={{
        rate: {
          label: "Error Rate (%)",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[200px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={errorRateData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line type="monotone" dataKey="rate" stroke="var(--color-rate)" name="Error Rate (%)" />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

function LatencyChart({ data }: { data: any[] }) {
  return (
    <ChartContainer
      config={{
        latency: {
          label: "Latency (ms)",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[200px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line type="monotone" dataKey="latency" stroke="var(--color-latency)" name="Latency (ms)" />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

function EndpointUsageChart({ data }: { data: any[] }) {
  return (
    <ChartContainer
      config={{
        calls: {
          label: "API Calls",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="calls" fill="var(--color-calls)" name="API Calls" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
