"use client";

import { useMemo } from "react";
import { Field, FieldDescription } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StoreError } from "./Error";
import { useResolveMultipleChoices } from "./hooks";
import { StoreLabel } from "./Label";
import type {
  DefaultValue,
  FormComponentProps,
  FormFieldProps,
  Options,
  Prettify,
  StoreFieldPropsCommon,
  Stringable,
} from "./types";

type SelectFieldProps<T extends Stringable, Form = false> = Prettify<
  StoreFieldPropsCommon<T, Form> & {
    options: Options<T>;
  } & FormComponentProps<typeof SelectValue> &
    DefaultValue<T> & {
      capitalizeSelectItems?: boolean;
    }
>;

function StoreFormSelectField<T extends Stringable>(
  props: FormFieldProps<SelectFieldProps<T, true>>,
) {
  return <StoreSelectField<T, true> {...props} error={props.state.useError} />;
}

function StoreSelectField<T extends Stringable, Form = false>({
  state,
  id,
  title,
  description,
  descriptionVariant = "inline",
  required = false,
  labelProps,
  error,
  options,
  defaultValue,
  orientation = "vertical",
  placeholder,
  capitalizeSelectItems = true,
  className,
  ...props
}: SelectFieldProps<T, Form>) {
  const fieldId = useMemo(() => id ?? state.field, [id, state.field]);

  const [value, setValue] = state.useState();
  const { resolvedOptions } = useResolveMultipleChoices({
    options,
    value,
    defaultValue,
    capitalizePrimitiveOptions: capitalizeSelectItems,
  });
  const labelByStringValue = useMemo(
    () =>
      resolvedOptions.reduce(
        (agg, option) => {
          agg[option.value != null ? String(option.value) : ""] = option.label;
          return agg;
        },
        {} as Record<string, React.ReactNode>,
      ),
    [resolvedOptions],
  );

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
      {/* `name` keeps Base UI's hidden validation input positioned in place, so a `required`
          violation anchors its bubble to the trigger instead of the viewport corner. */}
      <Select
        name={fieldId}
        required={Boolean(required)}
        items={labelByStringValue}
        value={value}
        onValueChange={(v) => setValue(v as T)}
      >
        <SelectTrigger id={fieldId} className={className}>
          <SelectValue placeholder={placeholderValue(placeholder, defaultValue)} {...props} />
        </SelectTrigger>
        <SelectContent>
          {resolvedOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.icon && <option.icon className="size-4" />}
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {descriptionVariant === "inline" && description && (
        <FieldDescription className="text-xs">{description}</FieldDescription>
      )}
      <StoreError error={error} />
    </Field>
  );
}

function placeholderValue(placeholder: React.ReactNode | undefined, defaultValue: Stringable) {
  if (placeholder) return placeholder;
  if (defaultValue != null) return String(defaultValue);
  return defaultValue;
}

export { StoreFormSelectField, StoreSelectField, type SelectFieldProps };
