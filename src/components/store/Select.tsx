'use client'

import { Field, FieldDescription } from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useMemo } from 'react'
import { StoreError } from './Error'
import { useResolveMultipleChoices } from './hooks'
import { StoreLabel } from './Label'
import type {
  DefaultValue,
  FormComponentProps,
  Options,
  Prettify,
  StoreFieldPropsCommon,
  Stringable
} from './types'

type SelectFieldProps<T extends Stringable, Form = false> = Prettify<
  StoreFieldPropsCommon<T, Form> & {
    options: Options
  } & FormComponentProps<typeof SelectValue> &
    DefaultValue<T>
>

function StoreFormSelectField<T extends Stringable>(props: SelectFieldProps<T, true>) {
  return <StoreSelectField {...props} error={props.state.useError} />
}

function StoreSelectField<T extends Stringable>({
  state,
  id,
  title,
  description,
  descriptionVariant = 'inline',
  labelProps,
  error,
  options,
  defaultValue,
  orientation = 'vertical',
  placeholder,
  ...props
}: SelectFieldProps<T>) {
  const fieldId = useMemo(() => id ?? state.field, [id, state.field])

  const [value, setValue] = state.useState()
  const { resolvedOptions, stringValue } = useResolveMultipleChoices({
    options,
    value,
    defaultValue
  })

  return (
    <Field orientation={orientation}>
      <StoreLabel
        state={state}
        id={id}
        title={title}
        description={description}
        descriptionVariant={descriptionVariant}
        {...labelProps}
      />
      <Select value={stringValue} onValueChange={v => setValue(v as T)}>
        <SelectTrigger id={fieldId} className={props.className}>
          <SelectValue placeholder={placeholder ?? defaultValue} {...props} />
        </SelectTrigger>
        <SelectContent>
          {resolvedOptions.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.icon && <option.icon className="size-4" />}
              <span className="flex-1">{option.label}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {descriptionVariant === 'inline' && description && (
        <FieldDescription>{description}</FieldDescription>
      )}
      <StoreError error={error} />
    </Field>
  )
}

export { StoreFormSelectField, StoreSelectField, type SelectFieldProps }
