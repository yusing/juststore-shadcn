'use client'

import { capitalCase } from 'change-case'
import { useMemo } from 'react'
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from '@/components/ui/combobox'
import { Field, FieldDescription } from '@/components/ui/field'
import { StoreError } from './Error'
import { StoreLabel } from './Label'
import type {
  DefaultValue,
  FormComponentProps,
  Option,
  Options,
  Prettify,
  StoreFieldPropsCommon,
  Stringable,
} from './types'

type MultiSelectFieldProps<T extends Stringable, Form = false> = Prettify<
  StoreFieldPropsCommon<T[], Form> & {
    options: Options<T>
  } & FormComponentProps<typeof ComboboxChipsInput> &
    DefaultValue<ReadonlyArray<T>>
>

function StoreFormMultiSelectField<T extends Stringable>(props: MultiSelectFieldProps<T, true>) {
  return <StoreMultiSelectField<T, true> {...props} error={props.state.useError} />
}

function StoreMultiSelectField<T extends Stringable, Form = false>({
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
  className,
  ...props
}: MultiSelectFieldProps<T, Form>) {
  const resolvedOptions: Readonly<Option<T>[]> = useMemo(
    () =>
      options.map(option =>
        typeof option === 'object'
          ? option
          : { label: capitalCase(String(option)), value: option, icon: undefined }
      ),
    [options]
  )

  const stringValues = state.useCompute(value =>
    value ? value.map(v => String(v)) : (defaultValue?.map(v => String(v)) ?? [])
  )
  const stringOptions = useMemo(() => resolvedOptions.map(o => String(o.value)), [resolvedOptions])

  const handleValueChange = (newValue: string[]) => {
    if (!newValue.length) {
      return
    }
    const indexes = newValue.map(v => stringOptions.findIndex(sv => sv === v))
    const changed = indexes.map(i => resolvedOptions[i]!.value)
    state.set(changed)
  }

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
      <Combobox
        multiple
        value={stringValues}
        onValueChange={handleValueChange}
        items={resolvedOptions}
      >
        <ComboboxChips>
          <ComboboxValue>
            {stringValues.map((v, index) => {
              const option = resolvedOptions[index]!
              return (
                <ComboboxChip key={v}>
                  {option?.icon && <option.icon className="size-3" />}
                  <span>{option ? option.label : capitalCase(String(v))}</span>
                </ComboboxChip>
              )
            })}
          </ComboboxValue>
          {/* FIXME: this is a workaround, somehow the placeholder is showing even if there are values */}
          <ComboboxChipsInput
            placeholder={!stringValues.length ? placeholder : undefined}
            className={className}
            {...props}
          />
        </ComboboxChips>
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item: Option<T>) => (
              <ComboboxItem key={String(item.value)} value={String(item.value)}>
                {item.icon && <item.icon className="size-4" />}
                <span className="flex-1">{item.label}</span>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      {descriptionVariant === 'inline' && description && (
        <FieldDescription className="text-xs">{description}</FieldDescription>
      )}
      <StoreError error={error} />
    </Field>
  )
}

export { StoreFormMultiSelectField, StoreMultiSelectField, type MultiSelectFieldProps }
