import { api } from './api'
import { GetAssetsByTypeResponse } from './schemas/metrics/get-assets-grouped-by-type'
import { GetMonthlyTransactionsResponse } from './schemas/metrics/get-monthly-transactions'
import { TotalAssetsResponse } from './schemas/metrics/get-total-assets'
import { TotalGrossResponse } from './schemas/metrics/get-total-gross'

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

export async function getAssetsByType(): Promise<GetAssetsByTypeResponse> {
  const response = await api.get<GetAssetsByTypeResponse>(
    '/metrics/assets-grouped-by-type',
  )

  return response.data
}
