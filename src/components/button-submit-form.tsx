import { PropsWithChildren } from 'react'

import { Loader2 } from 'lucide-react'

import { Button } from './ui/button'
import { cn } from '~/lib/utils'

type ButtonSubmitFormProps = PropsWithChildren & {
  disabled?: boolean
  isSubmitting?: boolean
  className?: string
}

export function ButtonSubmitForm({
  children,
  disabled = false,
  isSubmitting = false,
  className,
}: ButtonSubmitFormProps) {
  return (
    <Button
      type="submit"
      className={cn("flex justify-between rounded-xl border border-blue-400 bg-blue-400 text-xs font-semibold leading-tight text-white hover:bg-blue-400/90", cla)}
      disabled={disabled}
    >
      {isSubmitting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Enviando...
        </>
      ) : (
        <>{children}</>
      )}
    </Button>
  )
}
