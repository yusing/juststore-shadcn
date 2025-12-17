'use client'

import { Field } from '@/components/ui/field'
import { Switch } from '@/components/ui/switch'
import { useMemo } from 'react'
import { StoreError } from './Error'
import { StoreFieldContent } from './FieldContent'
import type { DefaultValue, FormComponentProps, Prettify, StoreFieldPropsCommon } from './types'

type SwitchFieldProps<T extends boolean | undefined, Form = false> = Prettify<
  StoreFieldPropsCommon<T, Form> &
    FormComponentProps<typeof Switch> &
    DefaultValue<boolean> & {
      labelPlacement?: 'left' | 'right'
    }
>

function StoreFormSwitchField<T extends boolean | undefined>(props: SwitchFieldProps<T, true>) {
  return <StoreSwitchField<T, true> {...props} error={props.state.useError} />
}

function StoreSwitchField<T extends boolean | undefined, Form = false>({
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
}: SwitchFieldProps<T, Form>) {
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
          <Switch
            id={fieldId}
            defaultChecked={defaultValue}
            checked={Boolean(value)}
            onCheckedChange={checked => update(checked as T)}
            {...props}
          />
        )}
      </state.Render>
      {labelPlacement === 'right' && label}
      <StoreError error={error} />
    </Field>
  )
}

export { StoreFormSwitchField, StoreSwitchField, type SwitchFieldProps }
