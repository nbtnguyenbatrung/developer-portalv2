"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface DocumentSystem {
  id: string
  name: string
  docs: Array<{ id: string; title: string }>
}

interface DocSelectorModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  systems: DocumentSystem[]
  onSelect: (system: DocumentSystem, docId: string) => void
}

export function DocSelectorModal({ open, onOpenChange, systems, onSelect }: DocSelectorModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Select Documentation</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {systems.map((system) => (
            <div key={system.id}>
              <h3 className="text-sm font-semibold text-foreground mb-3">{system.name}</h3>
              <div className="space-y-2">
                {system.docs.map((doc) => (
                  <Button
                    key={doc.id}
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    onClick={() => {
                      onSelect(system, doc.id)
                      onOpenChange(false)
                    }}
                  >
                    {doc.title}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
