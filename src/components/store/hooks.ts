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

function useResolveMultipleChoices<T extends Stringable>({
  options,
  value,
  defaultValue,
}: {
  options: Options<T>
  value: Stringable
  defaultValue?: Stringable
}) {
  const resolvedOptions: Readonly<Option<T>[]> = useMemo(
    () =>
      options.map(
        option =>
          typeof option === 'object'
            ? option
            : { label: capitalCase(String(option)), value: option, icon: undefined } // display_name => Display Name
      ),
    [options]
  )

  // Ensure the value is one of the allowed values
  const stringValue = useMemo(() => {
    if (value && !resolvedOptions.some(option => String(option.value) === String(value))) {
      const v = defaultValue ?? resolvedOptions[0]?.value
      if (v === undefined || v === null) {
        return undefined
      }
      return String(v)
    }
    const final = value ?? defaultValue ?? resolvedOptions[0]?.value
    if (final === undefined || final === null) {
      return undefined
    }
    return String(final)
  }, [value, defaultValue, resolvedOptions])

  return { resolvedOptions, stringValue }
}

export { useIdTitle, useResolveMultipleChoices }
