"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

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
  default: "border-white/15 bg-surface/80 text-text",
  accent: "border-purple/40 bg-purple/10 text-purple-bright",
  muted: "border-white/10 bg-white/[0.02] text-muted",
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
        "flex gap-2",
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
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className={cn(
              "rounded-md border px-4 py-2.5 font-mono text-xs uppercase tracking-wider backdrop-blur-sm",
              variantStyles[node.variant ?? "default"],
            )}
          >
            {node.label}
          </motion.div>
          {i < normalized.length - 1 && (
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.1 + 0.15 }}
              style={{ transformOrigin: isHorizontal ? "left center" : "center top" }}
              className={cn(
                "shrink-0 text-purple/60",
                isHorizontal ? "text-lg" : "rotate-90 text-lg",
              )}
              aria-hidden="true"
            >
              →
            </motion.div>
          )}
        </div>
      ))}
    </div>
  )
}
