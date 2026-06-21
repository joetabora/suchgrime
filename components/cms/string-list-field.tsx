"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface StringListFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  hint?: string
}

export function StringListField({ label, value, onChange, placeholder, hint }: StringListFieldProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {hint && <p className="text-xs text-muted">{hint}</p>}
      <Input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export function parseCommaList(value: string): string[] {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
}

export function joinCommaList(values: string[] | null | undefined): string {
  return (values ?? []).join(", ")
}
