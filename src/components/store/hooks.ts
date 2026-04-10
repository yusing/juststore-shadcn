'use client'

import { capitalCase } from 'change-case'
import { useMemo } from 'react'
import type { Option, Options, Stringable } from './types'

function useIdTitle({
  state,
  id,
  title,
}: {
  state: { readonly field: string }
  id?: string
  title?: string
}) {
  const fieldId = useMemo(() => id ?? state.field, [id, state.field])
  const fieldTitle = useMemo(() => (title ? title : capitalCase(fieldId)), [title, fieldId])
  return { fieldId, fieldTitle }
}

function resolvePrimitiveOption<T extends Stringable>(
  primitive: T | undefined,
  capitalizePrimitiveOptions: boolean
): Option<T> {
  if (primitive == null) {
    return { label: 'None', value: primitive, icon: undefined }
  }
  const label = capitalizePrimitiveOptions ? capitalCase(String(primitive)) : String(primitive)
  return { label, value: primitive, icon: undefined }
}

function useResolveMultipleChoices<T extends Stringable>({
  options,
  value,
  defaultValue,
  /** When false, primitive option values keep raw string labels (no title-casing). */
  capitalizePrimitiveOptions = true,
}: {
  options: Options<T>
  value: Stringable
  defaultValue?: Stringable
  capitalizePrimitiveOptions?: boolean
}) {
  const resolvedOptions: Readonly<Option<T>[]> = useMemo(
    () =>
      options.map(option =>
        typeof option === 'object'
          ? option
          : resolvePrimitiveOption(option, capitalizePrimitiveOptions)
      ),
    [options, capitalizePrimitiveOptions]
  )

  // Ensure the value is one of the allowed values
  const stringValue = useMemo(() => {
    if (value && !resolvedOptions.some(option => String(option.value) === String(value))) {
      const v = defaultValue ?? resolvedOptions[0]?.value
      if (v === undefined || v === null) {
        return ''
      }
      return String(v)
    }
    const final = value ?? defaultValue ?? resolvedOptions[0]?.value
    if (final === undefined || final === null) {
      return ''
    }
    return String(final)
  }, [value, defaultValue, resolvedOptions])

  return { resolvedOptions, stringValue }
}

export { useIdTitle, useResolveMultipleChoices }
