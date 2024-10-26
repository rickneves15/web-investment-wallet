import { PropsWithChildren } from 'react'

import { Loader2 } from 'lucide-react'

import { Button } from './ui/button'

type ButtonSubmitFormProps = PropsWithChildren & {
  disabled?: boolean
  isSubmitting?: boolean
}

export function ButtonSubmitForm({
  children,
  disabled = false,
  isSubmitting = false,
}: ButtonSubmitFormProps) {
  return (
    <Button
      type="submit"
      className="flex justify-between rounded-xl border border-blue-400 bg-blue-400 text-xs font-semibold leading-tight text-white hover:bg-blue-400/90"
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
