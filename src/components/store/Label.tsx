'use client'

import { IconInfoCircle } from '@tabler/icons-react'
import { FieldLabel } from '@/components/ui/field'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { useIdTitle } from './hooks'
import type { FormComponentProps, Prettify, StoreFieldPropsCommon } from './types'

type LabelProps<T, Form = false> = Prettify<
  Pick<
    StoreFieldPropsCommon<T, Form>,
    'state' | 'id' | 'title' | 'description' | 'descriptionVariant' | 'required'
  > &
    FormComponentProps<typeof FieldLabel>
>

function StoreLabel<T, Form = false>({
  state,
  id,
  title,
  description,
  descriptionVariant = 'inline',
  className,
  required,
  ...labelProps
}: LabelProps<T, Form>) {
  const { fieldId, fieldTitle } = useIdTitle({ state, id, title })

  return (
    <FieldLabel
      htmlFor={fieldId}
      className={cn('flex justify-between gap-2', className)}
      {...labelProps}
    >
      <span className="flex items-center gap-1">
        {fieldTitle}
        {required && <span className="text-red-500">*</span>}
      </span>
      {descriptionVariant === 'tooltip' && description && (
        <Tooltip>
          <TooltipTrigger>
            <IconInfoCircle className="size-4" />
          </TooltipTrigger>
          <TooltipContent className="min-w-fit">{description}</TooltipContent>
        </Tooltip>
      )}
    </FieldLabel>
  )
}

export { StoreLabel, type LabelProps }
