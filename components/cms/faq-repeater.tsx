"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { PseoFaq } from "@/lib/pseo/types"

interface FaqRepeaterProps {
  values: PseoFaq[]
  onChange: (values: PseoFaq[]) => void
}

export function FaqRepeater({ values, onChange }: FaqRepeaterProps) {
  function updateItem(index: number, field: keyof PseoFaq, value: string) {
    const next = [...values]
    next[index] = { ...next[index], [field]: value }
    onChange(next)
  }

  function addItem() {
    onChange([...values, { q: "", a: "" }])
  }

  function removeItem(index: number) {
    onChange(values.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>FAQs</Label>
        <Button type="button" variant="outline" size="sm" onClick={addItem}>
          Add FAQ
        </Button>
      </div>
      {values.length === 0 && <p className="text-sm text-muted">No FAQs yet.</p>}
      {values.map((faq, index) => (
        <div key={index} className="space-y-2 rounded border border-white/10 p-4">
          <Input
            value={faq.q}
            placeholder="Question"
            onChange={(e) => updateItem(index, "q", e.target.value)}
          />
          <Textarea
            value={faq.a}
            placeholder="Answer"
            onChange={(e) => updateItem(index, "a", e.target.value)}
          />
          <Button type="button" variant="ghost" size="sm" onClick={() => removeItem(index)}>
            Remove FAQ
          </Button>
        </div>
      ))}
    </div>
  )
}
