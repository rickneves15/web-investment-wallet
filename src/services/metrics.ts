import { GetMonthlyTransactionsResponse } from '~/services/schemas/metrics/get-monthly-transactions'
import { TotalAssetsResponse } from '~/services/schemas/get-total-assets'
import { TotalGrossResponse } from '~/services/schemas/metrics/get-total-gross'

import { api } from './api'

export async function getTotalGross(): Promise<TotalGrossResponse> {
  const response = await api.get<TotalGrossResponse>('/metrics/total-gross')

  return response.data
}

export async function getTotalAssets(): Promise<TotalAssetsResponse> {
  const response = await api.get<TotalAssetsResponse>('/metrics/total-assets')

  return response.data
}

export async function getMonthlyTransactions(): Promise<GetMonthlyTransactionsResponse> {
  const response = await api.get<GetMonthlyTransactionsResponse>(
    '/metrics/monthly-transactions',
  )

  return response.data
}
