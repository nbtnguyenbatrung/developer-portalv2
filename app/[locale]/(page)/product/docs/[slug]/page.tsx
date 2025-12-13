import { readMarkdownFile } from '@/app/_helper/utils/ultils'
import { DocViewer } from '@/components/doc-viewer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Payments API - Napas Developer Portal',
  description: 'Documentation for the Napas Payments API',
}

export default function PaymentsApiPage() {

  return <DocViewer />
}
