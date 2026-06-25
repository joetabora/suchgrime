"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { staggerDelay } from "@/components/marketing/motion"

export interface WorkflowNode {
  label: string
  variant?: "default" | "accent" | "muted"
}

interface WorkflowDiagramProps {
  nodes: readonly (WorkflowNode | string)[] | WorkflowNode[] | string[]
  className?: string
  direction?: "horizontal" | "vertical"
}

function normalizeNodes(nodes: readonly (WorkflowNode | string)[] | WorkflowNode[] | string[]): WorkflowNode[] {
  return nodes.map((node) =>
    typeof node === "string" ? { label: node, variant: "default" } : node,
  )
}

const variantStyles = {
  default: "border-white/12 bg-surface text-text",
  accent: "border-parlor-accent/50 bg-parlor-accent/10 text-parlor-accent",
  muted: "border-white/10 bg-bg text-muted line-through decoration-parlor-accent/30",
}

export function WorkflowDiagram({
  nodes,
  className,
  direction = "horizontal",
}: WorkflowDiagramProps) {
  const normalized = normalizeNodes(nodes)
  const isHorizontal = direction === "horizontal"

  return (
    <div
      className={cn(
        "flex gap-3",
        isHorizontal ? "flex-row flex-wrap items-center" : "flex-col items-stretch",
        className,
      )}
    >
      {normalized.map((node, i) => (
        <div
          key={`${node.label}-${i}`}
          className={cn(
            "flex items-center gap-2",
            isHorizontal ? "flex-row" : "flex-col",
          )}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={staggerDelay(i)}
            className={cn(
              "border px-4 py-2.5 font-mono text-[11px] uppercase tracking-wider",
              variantStyles[node.variant ?? "default"],
            )}
          >
            {node.label}
          </motion.div>
          {i < normalized.length - 1 && (
            <span
              className={cn(
                "shrink-0 font-display text-parlor-accent/50",
                isHorizontal ? "text-base" : "rotate-90 text-base",
              )}
              aria-hidden="true"
            >
              →
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
