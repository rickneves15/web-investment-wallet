'use client'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useNumberFormat } from '@react-input/number-format'
import { format } from 'date-fns'
import { CalendarIcon, Plus } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '~/components/ui/button'
import { Calendar } from '~/components/ui/calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'
import { useInvalidateQueries } from '~/hooks/use-invalidate-queries'
import { formatCurrency, reaisToDecimal } from '~/lib/currency'
import { cn } from '~/lib/utils'
import { useListAssetsActions } from '~/providers/list-assets-actions-provider'
import { Asset } from '~/schemas/asset'
import { buyAsset } from '~/services/assets'
import {
  type BuyAssetForm,
  buyAssetFormSchema,
} from '~/services/schemas/assets/buy-asset-form'

import { ButtonSubmitForm } from '../../button-submit-form'

export function BuyAssetForm() {
  const { assetToBuy, onToggleBuyingModal, setAssetToBuy } =
    useListAssetsActions((state) => state)
  const { invalidate } = useInvalidateQueries()
  const asset = assetToBuy as Asset

  const form = useForm<BuyAssetForm>({
    resolver: zodResolver(buyAssetFormSchema),
    defaultValues: {
      assetId: asset?.id ?? null,
      date: new Date(),
      quantity: '1',
      unitPrice: String(asset?.quote) ?? '0.00',
    },
  })

  const inputQuantity = form.watch('quantity')
  const inputUnitPrice = form.watch('unitPrice')
  const total = Number(inputQuantity) * reaisToDecimal(inputUnitPrice)

  const inputRef = useNumberFormat({
    locales: 'pt-BR',
    currency: 'BRL',
    currencyDisplay: 'symbol',
    maximumFractionDigits: 2,
    format: 'currency',
  })

  async function onSubmit(values: BuyAssetForm) {
    try {
      await buyAsset(values)
      form.reset()
      await invalidate()
      toast.success('Ativo comprado com sucesso!')
    } catch (error) {
      console.error(error)
      toast.error('Ocorreu um erro ao criar o ativo!')
    } finally {
      onToggleBuyingModal()
      setAssetToBuy()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormItem>
          <FormLabel className="sr-only">Ticker do ativo</FormLabel>
          <FormControl>
            <Input
              placeholder="Ticker do ativo"
              disabled
              defaultValue={asset?.name}
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Data de compra</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'dd/MM/yyyy')
                        ) : (
                          <span>Escolha uma data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Quantidade</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Quantidade" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="unitPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Cotação</FormLabel>
              <FormControl>
                <Input placeholder="Cotação" {...field} ref={inputRef} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between gap-y-2">
          <span className="text-xs font-normal leading-tight text-gray-700">
            Total:{' '}
            {formatCurrency({
              amount: total,
            })}
          </span>

          <ButtonSubmitForm
            isSubmitting={form.formState.isSubmitting}
            disabled={form.formState.isSubmitting}
          >
            <Plus className="size-4 bg-transparent" />
            Adicionar Compra
          </ButtonSubmitForm>
        </div>
      </form>
    </Form>
  )
}
