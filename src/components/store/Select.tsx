'use client'

import { capitalCase } from 'change-case'
import { useMemo } from 'react'
import { Field, FieldDescription } from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { StoreError } from './Error'
import { useResolveMultipleChoices } from './hooks'
import { StoreLabel } from './Label'
import type {
  DefaultValue,
  FormComponentProps,
  FormFieldProps,
  Option,
  Options,
  Prettify,
  StoreFieldPropsCommon,
  Stringable,
} from './types'

type SelectFieldProps<T extends Stringable, Form = false> = Prettify<
  StoreFieldPropsCommon<T, Form> & {
    options: Options<T>
  } & FormComponentProps<typeof SelectValue> &
    DefaultValue<T> & {
      capitalizeSelectItems?: boolean
    }
>

function StoreFormSelectField<T extends Stringable>(
  props: FormFieldProps<SelectFieldProps<T, true>>
) {
  return <StoreSelectField<T, true> {...props} error={props.state.useError} />
}

function StoreSelectField<T extends Stringable, Form = false>({
  state,
  id,
  title,
  description,
  descriptionVariant = 'inline',
  required = false,
  labelProps,
  error,
  options,
  defaultValue,
  orientation = 'vertical',
  placeholder,
  capitalizeSelectItems = true,
  className,
  ...props
}: SelectFieldProps<T, Form>) {
  const fieldId = useMemo(() => id ?? state.field, [id, state.field])

  const [value, setValue] = state.useState()
  const { resolvedOptions, stringValue } = useResolveMultipleChoices({
    options,
    value,
    defaultValue,
    capitalizePrimitiveOptions: capitalizeSelectItems,
  })

  // Base UI resolves the trigger's text from `items`; without it the raw value is shown.
  const items = useMemo(
    () =>
      resolvedOptions.map(option => ({
        value: option.value == null ? option.value : String(option.value),
        label: optionLabel(option, capitalizeSelectItems),
      })),
    [resolvedOptions, capitalizeSelectItems]
  )

  return (
    <Field orientation={orientation}>
      <StoreLabel
        state={state}
        id={id}
        title={title}
        description={description}
        descriptionVariant={descriptionVariant}
        required={required}
        {...labelProps}
      />
      {/* `name` keeps Base UI's hidden validation input positioned in place, so a `required`
          violation anchors its bubble to the trigger instead of the viewport corner. */}
      <Select
        name={fieldId}
        required={Boolean(required)}
        items={items}
        value={stringValue}
        onValueChange={v => setValue(v as T)}
      >
        <SelectTrigger id={fieldId} className={className}>
          <SelectValue placeholder={placeholderValue(placeholder, defaultValue)} {...props} />
        </SelectTrigger>
        <SelectContent>
          {resolvedOptions.map(option => (
            <SelectItem
              key={option.value}
              value={option.value == null ? option.value : String(option.value)}
            >
              {option.icon && <option.icon className="size-4" />}
              <span className="flex-1">{optionLabel(option, capitalizeSelectItems)}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {descriptionVariant === 'inline' && description && (
        <FieldDescription className="text-xs">{description}</FieldDescription>
      )}
      <StoreError error={error} />
    </Field>
  )
}

function optionLabel<T extends Stringable>(option: Option<T>, capitalize: boolean) {
  if (capitalize && (typeof option.label === 'string' || typeof option.label === 'number')) {
    return capitalCase(String(option.label))
  }
  return option.label
}

function placeholderValue(placeholder: React.ReactNode | undefined, defaultValue: Stringable) {
  if (placeholder) return placeholder
  if (defaultValue) return String(defaultValue)
  return undefined
}

export { StoreFormSelectField, StoreSelectField, type SelectFieldProps }
