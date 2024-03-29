"use client"

import qs from 'query-string'
import { X ,SearchIcon } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'


export const Search = ()=>{
    const [value,setValue] = useState('')
    const router = useRouter()

    const onClear =()=>{
        setValue('')
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>)=>{

        e.preventDefault();
        if (!value) return ;

        const url = qs.stringifyUrl({
            url : '/search',
            query : {term : value} },
            { skipEmptyString : true}
        )

        router.push(url)
    }
    return (
   
       <form
       onSubmit={onSubmit}
       className='relative w-full lg:w-[400px] flex items-center'
       >
        <Input
        value = {value}
        onChange={(e)=>setValue(e.target.value)}
        placeholder='Search'
        className='rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0'
        />
        {value && (
            <X className='absolute top-2.5 right-14 h-5 w-5 text-muted-foreground hover:opacity-75 transition cursor-pointer' onClick={onClear}/>
        )}
             <Button type='submit'
             variant={'secondary'}
             className='rounded-l-none'
             size={'sm'}
             >
                <SearchIcon className='h-5 w-5 text-muted-foreground'/>
             </Button>
       </form>
       
    )
}