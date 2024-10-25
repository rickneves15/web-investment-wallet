type formatCurrencyProps = {
  amount: number
  locale?: string
  currency?: string
}
export function formatCurrency({
  amount,
  locale = 'pt-BR',
  currency = 'BRL',
}: formatCurrencyProps): string {
  try {
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    })
    return formatter.format(amount)
  } catch (error) {
    console.error('Error formatting currency:', error)
    return ''
  }
}
