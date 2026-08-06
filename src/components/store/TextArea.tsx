'use client'

import { RenderWithUpdate } from 'juststore'
import { Field, FieldDescription } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'
import { StoreError } from './Error'
import { StoreLabel } from './Label'
import type {
  FormComponentProps,
  FormFieldProps,
  Prettify,
  StoreFieldPropsCommon,
  Stringable,
} from './types'

type TextAreaFieldProps<T extends Stringable, Form = false> = Prettify<
  StoreFieldPropsCommon<T, Form> & FormComponentProps<typeof Textarea>
>

function StoreFormTextAreaField<T extends Stringable>(
  props: FormFieldProps<TextAreaFieldProps<T, true>>
) {
  return <StoreTextAreaField<T, true> {...props} error={props.state.useError} />
}

function StoreTextAreaField<T extends Stringable, Form = false>({
  state,
  id,
  title,
  description,
  descriptionVariant = 'inline',
  required = false,
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
        required={required}
        {...labelProps}
      />
      <RenderWithUpdate state={state}>
        {(value, update) => (
          <Textarea
            id={id ?? state.field}
            required={Boolean(required)}
            value={value ?? ''}
            onChange={e => update(e.target.value as T)}
            {...props}
          />
        )}
      </RenderWithUpdate>
      {descriptionVariant === 'inline' && description && (
        <FieldDescription className="text-xs">{description}</FieldDescription>
      )}
      <StoreError error={error} />
    </Field>
  )
}

export { StoreFormTextAreaField, StoreTextAreaField, type TextAreaFieldProps }
