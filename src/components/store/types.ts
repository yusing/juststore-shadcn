/** biome-ignore-all lint/suspicious/noExplicitAny: <intended> */
import type { FormValueState, ValueState } from 'juststore'
import type { FieldLabel } from '@/components/ui/field'

type Stringable = string | number | undefined

type Option<T extends Stringable> = {
  label: React.ReactNode
  value: T
  icon?: React.ExoticComponent<React.ComponentProps<'svg'>>
}
type Options<T extends Stringable> = Readonly<T[] | Option<T>[]>

type DescriptionVariant = 'inline' | 'tooltip'

type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}
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
   * @default undefined
   * @default state.error // form state only
   */
  error?: () => string | undefined
}

export type {
  DefaultValue,
  DescriptionVariant,
  FormComponentProps,
  Option,
  Options,
  Prettify,
  StoreFieldPropsCommon,
}

export type { AnyBooleanCompatible, AnyStringCompatible, Stringable }
