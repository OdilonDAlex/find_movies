import { QueryOptions, useQuery, useQueryClient } from "@tanstack/react-query";

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

export default function useFetch(endPoints: string, queryKey: string[], options: FetchOptionsType){

    console.log(`${ORIGIN}/${endPoints}`)
    const data = useQuery({
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

    return data
}
