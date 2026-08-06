'use client'

import { Eye, EyeOff } from 'lucide-react'
import { RenderWithUpdate } from 'juststore'
import { type ComponentProps, type HTMLInputTypeAttribute, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Field, FieldDescription } from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { StoreError } from './Error'
import { StoreLabel } from './Label'
import type {
  FormComponentProps,
  FormFieldProps,
  Prettify,
  StoreFieldPropsCommon,
  Stringable,
} from './types'

type InputFieldProps<T extends Stringable, Form = false> = Prettify<
  StoreFieldPropsCommon<T, Form> & {
    addons?: Partial<ComponentProps<typeof InputGroupAddon>>[]
  } & FormComponentProps<typeof InputGroupInput>
>

function StoreFormInputField<T extends Stringable>(props: FormFieldProps<InputFieldProps<T, true>>) {
  return <StoreInputField<T, true> {...props} error={props.state.useError} />
}

function convertInputValue<T>(value: T | undefined, type: HTMLInputTypeAttribute | undefined) {
  if (value == null) return undefined
  if (type === 'number') {
    if (value === '') return undefined
    const n = Number(value)
    if (Number.isNaN(n)) return undefined
    return n
  }
  // Keep '' as '': returning undefined deletes the key from the store, so consumers
  // reading the submitted snapshot would see `undefined` instead of an empty string.
  return String(value)
}

type StoreInputControlProps<T extends Stringable> = Omit<
  ComponentProps<typeof InputGroupInput>,
  'value' | 'onChange'
> & {
  value: T | undefined
  update: (value: T) => void
}

function StoreInputControl<T extends Stringable>({
  value,
  update,
  onBlur,
  ...props
}: StoreInputControlProps<T>) {
  // A number input round-trips through Number(), which collapses text that is a valid
  // prefix but not yet a valid number ('1.', '-', '1e', '0.50'). Hold that raw text until
  // it agrees with the stored value again, so typing is not clobbered mid-edit.
  const [draft, setDraft] = useState<string | null>(null)
  const isNumber = props.type === 'number'

  return (
    <InputGroupInput
      {...props}
      value={(isNumber ? draft : null) ?? String(value ?? '')}
      onChange={e => {
        const raw = e.target.value
        const converted = convertInputValue(raw, props.type)
        if (isNumber) setDraft(String(converted ?? '') === raw ? null : raw)
        update(converted as T)
      }}
      onBlur={e => {
        setDraft(null)
        onBlur?.(e)
      }}
    />
  )
}

function StoreInputField<T extends Stringable, Form = false>({
  state,
  id,
  title,
  description,
  descriptionVariant = 'inline',
  required = false,
  orientation = 'vertical',
  labelProps,
  error,
  addons = [],
  ...props
}: InputFieldProps<T, Form>) {
  const fieldId = useMemo(() => id ?? state.field, [id, state.field])
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
      <InputGroup>
        <RenderWithUpdate state={state}>
          {(value, update) => (
            <StoreInputControl<T>
              id={fieldId}
              required={Boolean(required)}
              value={value as T | undefined}
              update={update}
              {...props}
            />
          )}
        </RenderWithUpdate>
        {addons.map((addonProps, index) => (
          <InputGroupAddon key={index} {...addonProps} />
        ))}
      </InputGroup>
      {descriptionVariant === 'inline' && description && (
        <FieldDescription className="text-xs">{description}</FieldDescription>
      )}
      <StoreError error={error} />
    </Field>
  )
}

type PasswordFieldProps<T extends Stringable, Form = false> = StoreFieldPropsCommon<T, Form> &
  Omit<ComponentProps<typeof StoreInputField<T, Form>>, 'value' | 'onChange' | 'type'>

function StoreFormPasswordField<T extends Stringable>(
  props: FormFieldProps<PasswordFieldProps<T, true>>
) {
  return <StorePasswordField<T, true> {...props} error={props.state.useError} />
}

function StorePasswordField<T extends Stringable, Form = false>({
  ...props
}: PasswordFieldProps<T, Form>) {
  const [isVisible, setIsVisible] = useState(false)
  return (
    <StoreInputField<T, Form>
      type={isVisible ? 'text' : 'password'}
      {...props}
      addons={[
        {
          align: 'inline-end',
          children: (
            <Button
              aria-hidden
              type="button"
              variant={'ghost'}
              size={'icon'}
              className="opacity-70 hover:opacity-100 size-8"
              onClick={() => setIsVisible(!isVisible)}
            >
              {isVisible ? <EyeOff /> : <Eye />}
            </Button>
          ),
        },
      ]}
    />
  )
}

export {
  StoreFormInputField,
  StoreFormPasswordField,
  StoreInputField,
  StorePasswordField,
  type InputFieldProps,
  type PasswordFieldProps,
}
