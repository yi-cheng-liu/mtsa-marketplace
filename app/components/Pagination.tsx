'use client'

import Pagination from '@mui/material/Pagination'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useCallback } from 'react'
import qs from 'query-string'
import { SafeItem } from '../types'

export const ITEMS_PER_PAGE = 7

export interface PaginationParams {
  items: SafeItem[]
  totalItemsCount: number
}

const CustomPagination: React.FC<PaginationParams> = ({
  items, 
  totalItemsCount
}) => {
  const router = useRouter()
  const params = useSearchParams()

  const [page, setPage] = useState(1)
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)

    let currentQuery = {}

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      page: value
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery
      },
      { skipNull: true, skipEmptyString: true }
    )

    router.push(url)
  }

  let count = Math.ceil(totalItemsCount / ITEMS_PER_PAGE)

  return (
    <div className="flex items-center justify-center p-6">
      {totalItemsCount}
      {page} of {count}
      <Pagination
        count={count}
        boundaryCount={3}
        page={page}
        onChange={handleChange}
      />
    </div>
  )
}

export default CustomPagination
