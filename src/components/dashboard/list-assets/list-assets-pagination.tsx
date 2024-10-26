'use client'

import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '~/components/ui/pagination'
import { useQueryParams } from '~/hooks/use-query-params'
import { cn } from '~/lib/utils'
import { GenericPagination } from '~/services/schemas/generic-pagination'

type ListAssetsPaginationProps = GenericPagination

export function ListAssetsPagination({
  currentPage,
  lastPage,
  prev,
  next,
}: ListAssetsPaginationProps) {
  const { setQueryParams } = useQueryParams()

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === lastPage
  const hasPrev = !!prev
  const hasNext = !!next

  const handleFirst = () => {
    if (!isFirstPage) {
      setQueryParams('page', '1')
    }
  }

  const handlePrev = () => {
    if (hasPrev) {
      setQueryParams('page', `${currentPage - 1}`)
    }
  }

  const handleNext = () => {
    if (hasNext) {
      setQueryParams('page', `${currentPage + 1}`)
    }
  }

  const handleLast = () => {
    if (!isLastPage) {
      setQueryParams('page', `${lastPage}`)
    }
  }
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem onClick={handleFirst}>
          <PaginationLink
            href="#"
            className={cn(
              'rounded-bl-xl rounded-tl-xl',
              isFirstPage && 'cursor-not-allowed opacity-50',
            )}
          >
            <ChevronFirst className="size-4 bg-transparent" />
          </PaginationLink>
        </PaginationItem>

        <PaginationItem onClick={handlePrev}>
          <PaginationLink
            href="#"
            className={cn(!hasPrev && 'cursor-not-allowed opacity-50')}
          >
            <ChevronLeft className="size-4 bg-transparent" />
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink href="#" isActive>
            {currentPage}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem onClick={handleNext}>
          <PaginationLink
            href="#"
            className={cn(!hasNext && 'cursor-not-allowed opacity-50')}
          >
            <ChevronRight className="size-4 bg-transparent" />
          </PaginationLink>
        </PaginationItem>

        <PaginationItem onClick={handleLast}>
          <PaginationLink
            href="#"
            className={cn(
              'rounded-br-xl rounded-tr-xl',
              isLastPage && 'cursor-not-allowed opacity-50',
            )}
          >
            <ChevronLast className="size-4 bg-transparent" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
