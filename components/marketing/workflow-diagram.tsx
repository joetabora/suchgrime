"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { springGentle, staggerDelay } from "@/components/marketing/motion"

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
  default: "border-white/12 bg-surface/80 text-text",
  accent: "border-purple/35 bg-purple/10 text-purple-bright",
  muted: "border-white/8 bg-white/[0.02] text-muted line-through decoration-purple/30",
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
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={staggerDelay(i)}
            className={cn(
              "rounded-sm border px-4 py-2.5 font-mono text-[11px] uppercase tracking-wider",
              variantStyles[node.variant ?? "default"],
            )}
          >
            {node.label}
          </motion.div>
          {i < normalized.length - 1 && (
            <motion.span
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ ...springGentle, delay: i * 0.08 + 0.1 }}
              style={{ transformOrigin: isHorizontal ? "left center" : "center top" }}
              className={cn(
                "shrink-0 font-display text-purple/50",
                isHorizontal ? "text-base" : "rotate-90 text-base",
              )}
              aria-hidden="true"
            >
              →
            </motion.span>
          )}
        </div>
      ))}
    </div>
  )
}
