'use client'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
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
import { cn } from '~/lib/utils'
import { useListAssetsActions } from '~/providers/list-assets-actions-provider'
import { Asset } from '~/schemas/asset'
import { sellAsset } from '~/services/assets'
import {
  type SellAssetForm,
  sellAssetFormSchema,
} from '~/services/schemas/assets/sell-asset-form'

import { ButtonSubmitForm } from '../../button-submit-form'

export function SellAssetForm() {
  const { assetToSell, setAssetToSell, onToggleSellingModal } =
    useListAssetsActions((state) => state)
  const { invalidate } = useInvalidateQueries()
  const asset = assetToSell as Asset

  const form = useForm<SellAssetForm>({
    resolver: zodResolver(sellAssetFormSchema),
    defaultValues: {
      assetId: asset?.id ?? null,
      date: new Date(),
      quantity: String(asset?.quantity) ?? '1',
    },
  })

  async function onSubmit(values: SellAssetForm) {
    try {
      await sellAsset(values)
      form.reset()
      await invalidate()
      toast.success('Ativo vendido com sucesso!')
    } catch (error) {
      console.error(error)
      toast.error('Ocorreu um erro ao criar o ativo!')
    } finally {
      onToggleSellingModal()
      setAssetToSell()
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
              <FormLabel className="sr-only">Data de venda</FormLabel>
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

        <ButtonSubmitForm
          isSubmitting={form.formState.isSubmitting}
          disabled={form.formState.isSubmitting}
          className="justify-self-end"
        >
          <Plus className="size-4 bg-transparent" />
          Adicionar Venda
        </ButtonSubmitForm>
      </form>
    </Form>
  )
}
