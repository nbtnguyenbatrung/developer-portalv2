"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const dailyData = [
  { date: "2023-05-01", calls: 12500, errors: 125 },
  { date: "2023-05-02", calls: 13200, errors: 132 },
  { date: "2023-05-03", calls: 14800, errors: 148 },
  { date: "2023-05-04", calls: 15300, errors: 153 },
  { date: "2023-05-05", calls: 16700, errors: 167 },
  { date: "2023-05-06", calls: 17500, errors: 175 },
  { date: "2023-05-07", calls: 18200, errors: 182 },
]

const weeklyData = [
  { date: "Week 1", calls: 87500, errors: 875 },
  { date: "Week 2", calls: 92300, errors: 923 },
  { date: "Week 3", calls: 98700, errors: 987 },
  { date: "Week 4", calls: 103500, errors: 1035 },
]

const monthlyData = [
  { date: "Jan", calls: 350000, errors: 3500 },
  { date: "Feb", calls: 380000, errors: 3800 },
  { date: "Mar", calls: 420000, errors: 4200 },
  { date: "Apr", calls: 460000, errors: 4600 },
  { date: "May", calls: 510000, errors: 5100 },
]

export function APIMetrics() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">API Metrics</h2>
        <p className="text-muted-foreground">Monitor your API usage and performance</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>API Usage</CardTitle>
          <CardDescription>Track your API calls and error rates</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="daily" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
            <TabsContent value="daily">
              <APIChart data={dailyData} />
            </TabsContent>
            <TabsContent value="weekly">
              <APIChart data={weeklyData} />
            </TabsContent>
            <TabsContent value="monthly">
              <APIChart data={monthlyData} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  )
}

function APIChart({ data }: { data: any[] }) {
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
      className="h-[300px] mt-4"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line type="monotone" dataKey="calls" stroke="var(--color-calls)" name="API Calls" />
          <Line type="monotone" dataKey="errors" stroke="var(--color-errors)" name="Errors" />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
