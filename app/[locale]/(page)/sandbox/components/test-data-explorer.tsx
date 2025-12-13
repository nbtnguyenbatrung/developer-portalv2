"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Copy, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock test data
const testAccounts = [
  {
    id: "acc_sandbox_001",
    name: "Test Checking",
    type: "checking",
    balance: 10000.0,
    currency: "EUR",
    status: "active",
    iban: "DE89370400440532013000",
    bic: "NEXUBANKXXX",
  },
  {
    id: "acc_sandbox_002",
    name: "Test Savings",
    type: "savings",
    balance: 50000.0,
    currency: "EUR",
    status: "active",
    iban: "DE89370400440532013001",
    bic: "NEXUBANKXXX",
  },
  {
    id: "acc_sandbox_003",
    name: "Test Business",
    type: "business",
    balance: 100000.0,
    currency: "EUR",
    status: "active",
    iban: "DE89370400440532013002",
    bic: "NEXUBANKXXX",
  },
  {
    id: "acc_sandbox_004",
    name: "Test Overdraft",
    type: "checking",
    balance: -500.0,
    currency: "EUR",
    status: "active",
    iban: "DE89370400440532013003",
    bic: "NEXUBANKXXX",
  },
  {
    id: "acc_sandbox_005",
    name: "Test Closed",
    type: "savings",
    balance: 0.0,
    currency: "EUR",
    status: "closed",
    iban: "DE89370400440532013004",
    bic: "NEXUBANKXXX",
  },
]

const testCustomers = [
  {
    id: "cus_sandbox_001",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+49123456789",
    status: "active",
  },
  {
    id: "cus_sandbox_002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+49987654321",
    status: "active",
  },
  {
    id: "cus_sandbox_003",
    name: "Acme Corp",
    email: "info@acmecorp.example.com",
    phone: "+49555123456",
    status: "active",
  },
]

const testScenarios = [
  {
    id: "scenario_001",
    name: "Successful Payment",
    description: "Create a successful payment between accounts",
    endpoint: "/v1/payments",
    method: "POST",
    requestBody: {
      source_account_id: "acc_sandbox_001",
      destination: {
        type: "iban",
        iban: "DE89370400440532013001",
        bic: "NEXUBANKXXX",
        name: "Jane Smith",
      },
      amount: 100.5,
      currency: "EUR",
      description: "Test payment",
    },
  },
  {
    id: "scenario_002",
    name: "Insufficient Funds",
    description: "Attempt a payment with insufficient funds",
    endpoint: "/v1/payments",
    method: "POST",
    requestBody: {
      source_account_id: "acc_sandbox_004",
      destination: {
        type: "iban",
        iban: "DE89370400440532013001",
        bic: "NEXUBANKXXX",
        name: "Jane Smith",
      },
      amount: 1000.0,
      currency: "EUR",
      description: "Payment with insufficient funds",
    },
  },
  {
    id: "scenario_003",
    name: "Invalid Recipient",
    description: "Attempt a payment to an invalid recipient",
    endpoint: "/v1/payments",
    method: "POST",
    requestBody: {
      source_account_id: "acc_sandbox_001",
      destination: {
        type: "iban",
        iban: "DE00000000000000000000",
        bic: "INVALIDBIC",
        name: "Invalid Recipient",
      },
      amount: 100.5,
      currency: "EUR",
      description: "Payment to invalid recipient",
    },
  },
]

export function TestDataExplorer() {
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const filteredAccounts = testAccounts.filter(
    (account) =>
      account.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredCustomers = testCustomers.filter(
    (customer) =>
      customer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredScenarios = testScenarios.filter(
    (scenario) =>
      scenario.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scenario.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scenario.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(JSON.stringify(text, null, 2))
    toast({
      title: "Copied to clipboard",
      description: message,
      duration: 3000,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Data Explorer</CardTitle>
        <CardDescription>Browse and use pre-configured test data for your sandbox environment</CardDescription>
        <div className="flex w-full max-w-sm items-center space-x-2 mt-4">
          <Input
            type="search"
            placeholder="Search test data..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button type="submit" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="accounts">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="accounts">Accounts</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="scenarios">Test Scenarios</TabsTrigger>
          </TabsList>

          <TabsContent value="accounts" className="mt-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAccounts.map((account) => (
                    <TableRow key={account.id}>
                      <TableCell className="font-mono text-xs">{account.id}</TableCell>
                      <TableCell>{account.name}</TableCell>
                      <TableCell>{account.type}</TableCell>
                      <TableCell>
                        {account.balance.toLocaleString("en-US", {
                          style: "currency",
                          currency: account.currency,
                        })}
                      </TableCell>
                      <TableCell>
                        <Badge variant={account.status === "active" ? "default" : "secondary"}>{account.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(account, `Account ID ${account.id} copied to clipboard`)}
                        >
                          <Copy className="h-4 w-4" />
                          <span className="sr-only">Copy</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="customers" className="mt-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-mono text-xs">{customer.id}</TableCell>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>
                        <Badge variant={customer.status === "active" ? "default" : "secondary"}>
                          {customer.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(customer, `Customer ID ${customer.id} copied to clipboard`)}
                        >
                          <Copy className="h-4 w-4" />
                          <span className="sr-only">Copy</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="scenarios" className="mt-4 space-y-4">
            {filteredScenarios.map((scenario) => (
              <Card key={scenario.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{scenario.name}</CardTitle>
                      <CardDescription>{scenario.description}</CardDescription>
                    </div>
                    <Badge variant="outline">{scenario.method}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <h4 className="text-sm font-medium">Endpoint</h4>
                      <code className="text-xs bg-muted p-1 rounded">{scenario.endpoint}</code>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Request Body</h4>
                      <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                        {JSON.stringify(scenario.requestBody, null, 2)}
                      </pre>
                    </div>
                  </div>
                </CardContent>
                <div className="flex justify-end p-4 pt-0 space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      copyToClipboard(scenario.requestBody, `${scenario.name} request body copied to clipboard`)
                    }
                  >
                    <Copy className="mr-2 h-3 w-3" />
                    Copy
                  </Button>
                  <Button size="sm">
                    <ExternalLink className="mr-2 h-3 w-3" />
                    Try in Console
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
