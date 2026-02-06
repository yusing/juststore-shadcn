'use client'

import { useMemo } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldDescription } from '@/components/ui/field'
import { StoreError } from './Error'
import { StoreLabel } from './Label'
import type { DefaultValue, FormComponentProps, Prettify, StoreFieldPropsCommon } from './types'

type CheckboxFieldProps<T extends boolean | undefined, Form = false> = Prettify<
  StoreFieldPropsCommon<T, Form> &
    FormComponentProps<typeof Checkbox> &
    DefaultValue<boolean> & {
      labelPlacement?: 'left' | 'right'
    }
>

function StoreFormCheckboxField<T extends boolean | undefined>(props: CheckboxFieldProps<T, true>) {
  return <StoreCheckboxField<T, true> {...props} error={props.state.useError} />
}

function StoreCheckboxField<T extends boolean | undefined, Form = false>({
  state,
  defaultValue,
  id,
  title,
  description,
  descriptionVariant = 'inline',
  required = false,
  labelProps,
  labelPlacement = 'left',
  error,
  ...props
}: CheckboxFieldProps<T, Form>) {
  const fieldId = useMemo(() => id ?? state.field, [id, state.field])
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
    <Field orientation="vertical" className="w-auto shrink-0">
      <div className="flex items-center gap-2">
        {labelPlacement === 'left' && label}
        <state.Render>
          {(value, update) => (
            <Checkbox
              id={fieldId}
              defaultChecked={defaultValue}
              checked={Boolean(value)}
              onCheckedChange={checked => update(checked as T)}
              aria-checked={value ? 'true' : 'false'}
              {...props}
            />
          )}
        </state.Render>
        {labelPlacement === 'right' && label}
      </div>
      {descriptionVariant === 'inline' && description && (
        <FieldDescription className="text-xs">{description}</FieldDescription>
      )}
      <StoreError error={error} />
    </Field>
  )
}

export { StoreCheckboxField, StoreFormCheckboxField, type CheckboxFieldProps }
