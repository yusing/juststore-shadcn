'use client'

import { useMemo } from 'react'
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'
import { StoreError } from './Error'
import { useResolveMultipleChoices } from './hooks'
import { StoreLabel } from './Label'
import type {
  DefaultValue,
  FormComponentProps,
  Options,
  Prettify,
  StoreFieldPropsCommon,
  Stringable,
} from './types'

type RadioFieldProps<T extends Stringable, Form = false> = Prettify<
  Omit<StoreFieldPropsCommon<T, Form>, 'orientation'> &
    FormComponentProps<typeof RadioGroup> &
    DefaultValue<T> & {
      options: Options<T>
      labelPlacement?: 'left' | 'right'
    }
>

function StoreFormRadioField<T extends Stringable>(props: RadioFieldProps<T, true>) {
  return <StoreRadioField<T, true> {...props} error={props.state.useError} />
}

function StoreRadioField<T extends Stringable, Form = false>({
  state,
  id,
  title,
  description,
  descriptionVariant = 'inline',
  required = false,
  error,
  options,
  defaultValue,
  labelProps,
  labelPlacement = 'left',
  className,
  ...props
}: RadioFieldProps<T, Form>) {
  const fieldId = useMemo(() => id ?? state.field, [id, state.field])

  const [value, setValue] = state.useState()

  const { resolvedOptions, stringValue } = useResolveMultipleChoices({
    options,
    value,
    defaultValue,
  })

  const label = (
    <StoreLabel
      state={state}
      id={id}
      title={title}
      description={description}
      descriptionVariant={descriptionVariant}
      required={required}
      {...labelProps}
    />
  )

  return (
    <Field orientation="vertical">
      <div className="flex flex-col items-start gap-2">
        {labelPlacement === 'left' && label}
        <RadioGroup
          className={cn('flex flex-col', className)}
          value={stringValue}
          onValueChange={v => setValue(v as T)}
          {...props}
        >
          {resolvedOptions.map(option => (
            <Field key={option.value} orientation="horizontal">
              <RadioGroupItem value={String(option.value)} id={`${fieldId}-${option.value}`} />
              <FieldLabel htmlFor={`${fieldId}-${option.value}`} className="font-medium">
                {option.icon && <option.icon className="size-4" />}
                {option.label}
              </FieldLabel>
            </Field>
          ))}
        </RadioGroup>
        {labelPlacement === 'right' && label}
      </div>
      {descriptionVariant === 'inline' && description && (
        <FieldDescription className="text-xs">{description}</FieldDescription>
      )}
      <StoreError error={error} />
    </Field>
  )
}

export { StoreFormRadioField, StoreRadioField, type RadioFieldProps }
