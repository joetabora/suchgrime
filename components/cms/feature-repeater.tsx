"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface RepeaterProps {
  label: string
  values: string[]
  onChange: (values: string[]) => void
  placeholder?: string
}

export function FeatureRepeater({ label, values, onChange, placeholder }: RepeaterProps) {
  function updateItem(index: number, value: string) {
    const next = [...values]
    next[index] = value
    onChange(next)
  }

  function addItem() {
    onChange([...values, ""])
  }

  function removeItem(index: number) {
    onChange(values.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <Button type="button" variant="outline" size="sm" onClick={addItem}>
          Add
        </Button>
      </div>
      {values.length === 0 && (
        <p className="text-sm text-muted">No items yet.</p>
      )}
      {values.map((value, index) => (
        <div key={index} className="flex gap-2">
          <Input
            value={value}
            placeholder={placeholder}
            onChange={(e) => updateItem(index, e.target.value)}
          />
          <Button type="button" variant="ghost" size="sm" onClick={() => removeItem(index)}>
            Remove
          </Button>
        </div>
      ))}
    </div>
  )
}
