'use client'

import { Suspense, useEffect, useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

import { BuyAsset } from '~/components/assets/buy-asset'
import { DeleteAsset } from '~/components/assets/delete-asset'
import { NewAsset } from '~/components/assets/new-asset'
import { SellAsset } from '~/components/assets/sell-asset'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { useQueryParams } from '~/hooks/use-query-params'
import { getAssets } from '~/services/assets'
import { GetAssetsResponse } from '~/services/schemas/assets/get-assets'

import { ListAssetsFilters } from './list-assets-filters'
import { ListAssetsItem } from './list-assets-item'
import { ListAssetsPagination } from './list-assets-pagination'
import { SkeletonListAssets } from './skeleton-list-assets'

export function ListAssets() {
  const searchParams = useSearchParams()
  const { setQueryParams } = useQueryParams()
  const router = useRouter()
  const pathname = usePathname()

  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1
  const perPage = searchParams.get('perPage')
    ? Number(searchParams.get('perPage'))
    : 5
  const [search, setSearch] = useState(searchParams.get('search') ?? '')

  const { data: assets, isLoading } = useQuery({
    queryKey: ['assets', page, perPage, search],
    queryFn: () =>
      getAssets({
        page,
        perPage,
        search: search ?? null,
      }),
    placeholderData: (previousData) => previousData,
  })

  const { data, ...pagination } = assets ?? ({} as GetAssetsResponse)

  const handlePerPage = (perPage: string) => {
    setQueryParams('perPage', perPage)
  }

  useEffect(() => {
    setQueryParams('search', search ?? '')
  }, [pathname, router, search, setQueryParams])

  return (
    <>
      <BuyAsset />
      <SellAsset />
      <DeleteAsset />
      <Card className="col-span-full xl:col-span-7">
        <CardHeader className="flex flex-row items-center justify-between px-4">
          <CardTitle className="text-xl font-bold leading-3 text-gray-500">
            Lista de ativos
          </CardTitle>
          <NewAsset />
        </CardHeader>
        <CardContent className="flex flex-col gap-y-4 px-4">
          <ListAssetsFilters search={search} onSearch={setSearch} />

          {isLoading && !data && <SkeletonListAssets />}

          {data && (
            <>
              <div className="flex flex-col gap-y-10">
                <Suspense
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  /* @ts-ignore */
                  key={page + perPage + filter}
                  fallback={<SkeletonListAssets />}
                >
                  {data?.map((asset) => (
                    <ListAssetsItem key={asset.id} asset={asset} />
                  ))}
                </Suspense>
                <div className="flex flex-1 items-center justify-between">
                  <span className="text-xs font-normal leading-tight text-zinc-800/75">
                    Mostrando{' '}
                    <span className="font-bold">{data.length} resultado.</span>
                  </span>

                  <div className="flex items-center gap-x-5">
                    <ListAssetsPagination {...pagination} />

                    <Select
                      onValueChange={handlePerPage}
                      defaultValue={String(perPage)}
                      value={String(perPage)}
                    >
                      <SelectTrigger className="w-16">
                        <SelectValue placeholder="Resultados por página" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </>
  )
}
