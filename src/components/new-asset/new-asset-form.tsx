'use client'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useNumberFormat } from '@react-input/number-format'
import { useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { CalendarIcon, Loader2, Plus } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { AssetLabelChartType } from '~/constant/asset-type'
import { formatCurrency, reaisToDecimal } from '~/lib/currency'
import { cn } from '~/lib/utils'
import { AssetType } from '~/schemas/asset'
import { createAsset } from '~/services/assets'
import {
  CreateAssetForm,
  createAssetFormSchema,
} from '~/services/schemas/assets/create-asset-form'

type NewAssetFormProps = {
  onNewAsset: () => void
}

export function NewAssetForm({ onNewAsset }: NewAssetFormProps) {
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()
  const inputRef = useNumberFormat({
    locales: 'pt-BR',
    currency: 'BRL',
    currencyDisplay: 'symbol',
    maximumFractionDigits: 2,
    format: 'currency',
  })

  const form = useForm<CreateAssetForm>({
    resolver: zodResolver(createAssetFormSchema),
    defaultValues: {
      name: '',
      purchaseDate: new Date(),
      quantity: '1',
      quote: '0.00',
      type: AssetType.ACTION,
    },
  })

  const inputQuantity = form.watch('quantity')
  const inputQuote = form.watch('quote')
  const total = Number(inputQuantity) * reaisToDecimal(inputQuote)

  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1
  const perPage = searchParams.get('perPage')
    ? Number(searchParams.get('perPage'))
    : 5
  const search = searchParams.get('search') ? searchParams.get('search') : null

  async function onSubmit(values: CreateAssetForm) {
    try {
      await createAsset(values)

      form.reset()
      queryClient.invalidateQueries({ queryKey: ['metrics', 'total-gross'] })
      queryClient.invalidateQueries({ queryKey: ['metrics', 'total-assets'] })
      queryClient.invalidateQueries({
        queryKey: ['metrics', 'total-total-monthly-transactions'],
      })
      queryClient.invalidateQueries({
        queryKey: ['assets', page, perPage, search],
      })
      onNewAsset()
      toast.success('Ativo criado com sucesso!')
    } catch (error) {
      console.error(error)
      toast.error('Ocorreu um erro ao criar o ativo!')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Ticker do ativo</FormLabel>
              <FormControl>
                <Input placeholder="Ticker do ativo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="purchaseDate"
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
          name="quote"
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

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Tipo</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(AssetLabelChartType).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
          <Button
            type="submit"
            className="flex justify-between rounded-xl border border-blue-400 bg-blue-400 text-xs font-semibold leading-tight text-white hover:bg-blue-400/90"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Plus className="size-4 bg-transparent" />
                Adicionar Ativo
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
