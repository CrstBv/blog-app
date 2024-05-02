"use client"
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { useRouter, useSearchParams } from 'next/navigation'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils'
import Image from 'next/image'

const Search = ({placeholder = "Search title ..."}: {placeholder?: string}) => {
    const [query, setQuery] = useState('')
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const delayDebonce = setTimeout(() => {
            let newUrl = ''
            if(query) {
                newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: 'query',
                    value: query,
                })
            } else {
                newUrl = removeKeysFromQuery({
                    params: searchParams.toString(),
                    keysToRemove: ['query'],
            })
        }
        router.push(newUrl, {scroll: false})
    }, 300)
    return () => clearTimeout(delayDebonce)
    }, [query, searchParams, router])

  return (
    <div className='flex justify-center min-h-[44px] w-full overflow-hidden rounded-full px-3 py-1 '>
        <Image
        src="/assets/icons/search.svg"
        width={18}
        height={18}
        alt="search"
        className='bg-cyan-100 rounded-full w-auto h-auto'
        />
        <Input 
        name='search'
        type='text'
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
        className='border-0 outline-offset-1 placeholder:text-current focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0'
        />
    </div>
  )
}

export default Search