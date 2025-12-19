'use client'

import { FieldLabel } from '@/components/ui/field'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Info } from 'lucide-react'
import { useIdTitle } from './hooks'
import type { FormComponentProps, Prettify, StoreFieldPropsCommon } from './types'

type LabelProps<T, Form = false> = Prettify<
  Pick<
    StoreFieldPropsCommon<T, Form>,
    'state' | 'id' | 'title' | 'description' | 'descriptionVariant'
  > &
    FormComponentProps<typeof FieldLabel>
>

function StoreLabel<T, Form = false>({
  state,
  id,
  title,
  description,
  descriptionVariant = 'inline',
  ...labelProps
}: LabelProps<T, Form>) {
  const { fieldId, fieldTitle } = useIdTitle({ state, id, title })

  return (
    <FieldLabel htmlFor={fieldId} {...labelProps}>
      {fieldTitle}
      {descriptionVariant === 'tooltip' && description && (
        <Tooltip>
          <TooltipTrigger>
            <Info className="size-4 m-0.5 ml-auto" />
          </TooltipTrigger>
          <TooltipContent>{description}</TooltipContent>
        </Tooltip>
      )}
    </FieldLabel>
  )
}

export { StoreLabel, type LabelProps }
