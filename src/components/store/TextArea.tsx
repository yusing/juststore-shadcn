'use client'

import { Field, FieldDescription } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'
import { StoreError } from './Error'
import { StoreLabel } from './Label'
import type { FormComponentProps, Prettify, StoreFieldPropsCommon, Stringable } from './types'

type TextAreaFieldProps<T extends Stringable, Form = false> = Prettify<
  StoreFieldPropsCommon<T, Form> & FormComponentProps<typeof Textarea>
>

function StoreFormTextAreaField<T extends Stringable>(props: TextAreaFieldProps<T, true>) {
  return <StoreTextAreaField<T, true> {...props} error={props.state.useError} />
}

function StoreTextAreaField<T extends Stringable, Form = false>({
  state,
  id,
  title,
  description,
  descriptionVariant = 'inline',
  orientation = 'vertical',
  labelProps,
  error,
  ...props
}: TextAreaFieldProps<T, Form>) {
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
      <state.Render>
        {(value, update) => (
          <Textarea
            id={id ?? state.field}
            value={value ?? ''}
            onChange={e => update(e.target.value as T)}
            {...props}
          />
        )}
      </state.Render>
      {descriptionVariant === 'inline' && description && (
        <FieldDescription className="text-xs">{description}</FieldDescription>
      )}
      <StoreError error={error} />
    </Field>
  )
}

export { StoreFormTextAreaField, StoreTextAreaField, type TextAreaFieldProps }
