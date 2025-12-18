'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Field } from '@/components/ui/field'
import { useMemo } from 'react'
import { StoreError } from './Error'
import { StoreFieldContent } from './FieldContent'
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
  descriptionVariant = 'tooltip',
  labelProps,
  labelPlacement = 'left',
  error,
  ...props
}: CheckboxFieldProps<T, Form>) {
  const fieldId = useMemo(() => id ?? state.field, [id, state.field])
  const label = (
    <StoreFieldContent
      state={state}
      id={id}
      title={title}
      description={description}
      descriptionVariant={descriptionVariant}
      {...labelProps}
    />
  )
  return (
    <Field orientation="horizontal" className="w-auto shrink-0">
      {labelPlacement === 'left' && label}
      <state.Render>
        {(value, update) => (
          <Checkbox
            id={fieldId}
            defaultChecked={defaultValue}
            checked={Boolean(value)}
            onCheckedChange={checked =>
              update((checked === 'indeterminate' ? undefined : checked) as T)
            }
            aria-checked={value ? 'true' : 'false'}
            {...props}
          />
        )}
      </state.Render>
      {labelPlacement === 'right' && label}
      <StoreError error={error} />
    </Field>
  )
}

export { StoreCheckboxField, StoreFormCheckboxField, type CheckboxFieldProps }
