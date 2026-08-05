/** biome-ignore-all lint/suspicious/noExplicitAny: <intended> */
import type { FormValueState, ValueState } from 'juststore'
import type { FieldLabel } from '@/components/ui/field'

type Stringable = string | number | undefined

type Option<T extends Stringable> = {
  label: React.ReactNode
  value: T | undefined
  icon?: React.ExoticComponent<React.ComponentProps<'svg'>>
}
type Options<T extends Stringable> = Readonly<T[] | (T | undefined)[] | Option<T>[]>

type DescriptionVariant = 'inline' | 'tooltip'

type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

/** Resolves the current error message, or `undefined` when the field is valid. */
type FieldErrorFn = () => string | undefined

/**
 * Public props of a `StoreForm*` wrapper: the field props with `error` closed off.
 *
 * `error` stays writable on the underlying field props so the wrapper can bind it
 * to `state.useError`, but callers cannot pass one — form errors are owned by the
 * form state.
 *
 * Written as an intersection rather than `Omit<Props, 'error'>` on purpose: `Omit`
 * is a `Pick` in disguise, and inference through it fails, collapsing each field's
 * value generic to its constraint at the call site.
 */
type FormFieldProps<Props> = Props & {
  /** @deprecated A form field takes its error from the form state. Use a `fieldConfigs`
   * validator, or `state.setError(...)` for server/imperative failures. */
  error?: never
}
type DefaultValue<T> = { defaultValue?: T }

type AnyStringCompatible = string | number | undefined
type AnyBooleanCompatible = boolean | undefined

type FormComponentProps<
  Component extends keyof React.JSX.IntrinsicElements | React.JSXElementConstructor<any>,
> = Omit<
  React.ComponentProps<Component>,
  | 'id'
  | 'title'
  | 'description'
  | 'error'
  | 'value'
  | 'checked'
  | 'onChange'
  | 'onValueChange'
  | 'onCheckedChange'
  | 'setValue'
  | 'defaultValue'
  | 'defaultChecked'
>

type StoreFieldPropsCommon<T, Form = false> = {
  state: Form extends true ? FormValueState<T> : ValueState<T>
  /** Field id
   * @default state.field
   */
  id?: string
  /** Field title
   * @default toTitleCase(state.field)
   */
  title?: string
  /** Field description
   * @default undefined
   */
  description?: React.ReactNode
  /** Field description variant
   * @default 'inline'
   */
  descriptionVariant?: DescriptionVariant
  /** Required field
   * @default false
   */
  required?: boolean
  /** Field orientation
   * @default 'vertical'
   * @default 'horizontal' // checkbox and radio only
   */
  orientation?: 'horizontal' | 'vertical'
  /** Field label props
   * @default undefined
   */
  labelProps?: React.ComponentProps<typeof FieldLabel>
  /** Field error
   *
   * Not part of the `StoreForm*` public surface — those wrappers bind it to
   * `state.useError`. See {@link FormFieldProps}.
   * @default undefined
   */
  error?: FieldErrorFn
}

export type {
  DefaultValue,
  DescriptionVariant,
  FieldErrorFn,
  FormComponentProps,
  FormFieldProps,
  Option,
  Options,
  Prettify,
  StoreFieldPropsCommon,
}

export type { AnyBooleanCompatible, AnyStringCompatible, Stringable }
