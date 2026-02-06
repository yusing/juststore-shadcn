'use client'

import { useMemo } from 'react'
import { Field, FieldDescription } from '@/components/ui/field'
import { Switch } from '@/components/ui/switch'
import { StoreError } from './Error'
import { StoreLabel } from './Label'
import type { DefaultValue, FormComponentProps, Prettify, StoreFieldPropsCommon } from './types'

type SwitchFieldProps<T extends boolean | undefined, Form = false> = Prettify<
  Omit<StoreFieldPropsCommon<T, Form>, 'orientation'> &
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
  descriptionVariant = 'inline',
  required = false,
  labelProps,
  labelPlacement = 'left',
  error,
  ...props
}: SwitchFieldProps<T, Form>) {
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
      </div>
      {descriptionVariant === 'inline' && description && (
        <FieldDescription className="text-xs">{description}</FieldDescription>
      )}
      <StoreError error={error} />
    </Field>
  )
}

export { StoreFormSwitchField, StoreSwitchField, type SwitchFieldProps }
