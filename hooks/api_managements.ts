import { DEFAULT_GET_OPTIONS } from "@/constants/API";
import { QueryOptions, useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const ORIGIN: string = 'https://api.themoviedb.org/3'

type FetchOptionsType = {
    method: string,
    headers: {
        accept: string,
        Authorization: string,
        [key: string]: string
    },
    [key: string]: string | object,
}

export function useFetch(endPoints: string, queryKey: string[], options: FetchOptionsType){

    return useQuery({
        queryKey: queryKey,
        queryFn: (async () => {
            return await fetch(`${ORIGIN}/${endPoints}`, options)
            .then((res) => res.json())
            .then((res) => {
                return res
            })
            .catch((err) => {
                console.log('fetch error', err)
            })
        })
    })

}

export function useInfiniteFetch(endPoints: string, queryKey: string[], options: FetchOptionsType){
    return useInfiniteQuery({
        queryKey: queryKey,
        initialPageParam: `${ORIGIN}/${endPoints}?page=1`,
        queryFn: ( async ({ pageParam }) => {
            return await fetch(pageParam, options)
                .then(res => res.json())
                .then(res => {
                    return res
                })
                .catch((err) => {
                    console.log('inifinie fetch error', err)
                })
        }),
        getNextPageParam: (last_page: {page: number, total_pages: number, [key: string]: string | Object}) => {
            if(last_page.page < Math.min(3, last_page.total_pages)){
                return `${ORIGIN}/${endPoints}?page=${last_page.page+1}`
            }
            return null
        }
    })
}

export function usePost(endPoints: string, data: {[key: string]: string | number | boolean | Object}, queryKey: string[], options: FetchOptionsType){
    
    return useMutation({
        mutationFn: (async () => {
             return await fetch(`${ORIGIN}/${endPoints}`, {...options, ...data})
                .then(res => {
                    return res.json()}
                )
                .then(res => {
                    return res
                })
                .catch(err => console.log('post error', err))
        }),
        mutationKey: queryKey
    })

}