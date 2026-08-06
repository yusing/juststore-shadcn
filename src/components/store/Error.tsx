"use client";

import { FieldError } from "@/components/ui/field";
import type { FieldErrorFn } from "./types";

type ErrorProps = { error?: FieldErrorFn };

function StoreError({ error }: ErrorProps) {
  const message = error?.();
  if (!message) return null;
  return <FieldError className="text-xs">{message}</FieldError>;
}

export { StoreError, type ErrorProps };
