'use client'

import { ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'

// IMPORT CÁC COMPONENTS SHADCN CHO DIALOG VÀ TABLE
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Button } from '@/components/ui/button'
import { Check, Copy, Info } from 'lucide-react'

const PlanDetailsDialog = ({ plan }: any) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-blue-500 hover:text-blue-700 p-0"
          title={`Xem chi tiết gói ${plan?.planName}`}
        >
          <Info className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Chi tiết gói: <span className="font-bold">{plan?.planName}</span>
          </DialogTitle>
          <DialogDescription>
            Các giới hạn và tính năng đi kèm của gói dịch vụ này.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Chỉ số</TableHead>
                <TableHead>Giới hạn/Tính năng</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* {details.length > 0 ? (
                details.map((item) => ( */}
              <TableRow key={plan?.id}>
                <TableCell className="font-medium">
                  {'Yêu cầu/Ngày (Daily Quota)'}
                </TableCell>
                <TableCell className="font-semibold text-right">
                  {`${plan?.quota}/ ${plan?.quotaPeriod}`}
                </TableCell>
              </TableRow>
              {/* ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={2}
                    className="text-center text-muted-foreground"
                  >
                    Không tìm thấy thông tin chi tiết cho gói này.
                  </TableCell>
                </TableRow>
              )} */}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// --- COMPONENT CELL CHO APP KEY (Giữ nguyên) ---
const AppKeyCell = ({
  value,
  originalKey,
}: {
  value: string
  originalKey: string
}) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 rounded-md p-3 font-mono text-lg">
      <span className="max-w-[500px] truncate font-medium">{value}</span>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleCopy(originalKey)}
        className="shrink-0 mt-2 sm:mt-0"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </Button>
    </div>
  )
}

// --- ĐỊNH NGHĨA CỘT ---
export const roleColumns: ColumnDef<any>[] = [
  {
    id: 'index',
    header: 'STT',
    cell: ({ row }) => {
      return row.index + 1
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'applicationName',
    header: 'Application Name',
  },
  {
    accessorKey: 'client_id',
    header: 'Application Key',

    cell: ({ row }) => {
      const fullAppKey = row.getValue('client_id') as string

      const displayKey =
        fullAppKey.length > 6
          ? fullAppKey.substring(0, 3) +
            '*'.repeat(fullAppKey.length - 6) +
            fullAppKey.substring(fullAppKey.length - 3)
          : fullAppKey
      return <AppKeyCell value={displayKey} originalKey={fullAppKey} />
    },
    filterFn: (row, id, value) => {
      return (row.getValue(id) as string)
        .toLowerCase()
        .includes((value as string).toLowerCase())
    },
  },
  {
    accessorKey: 'plan',
    header: 'Plan',
    // SỬA CỘT PLAN ĐỂ HIỂN THỊ ICON DIALOG
    cell: ({ row }) => {
      const plan = row.getValue('plan') as any
      return (
        <div className="flex items-center gap-2">
          <span
            className={`font-semibold text-sm ${
              plan?.planName?.includes('Plantinum')
                ? 'text-purple-600'
                : plan?.planName?.includes('Gold')
                ? 'text-yellow-600'
                : 'text-slate-600'
            }`}
          >
            {plan?.planName}
          </span>
          <PlanDetailsDialog plan={plan} />
        </div>
      )
    },
  },
]
