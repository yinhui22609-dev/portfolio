"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function CaseTransition({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduced ? 0 : 0.32 }}>{children}</motion.div>;
}
