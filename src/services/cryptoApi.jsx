import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
    'accept': 'application/json'
}

const baseUrl = 'https://api.coingecko.com/api/v3'

const createRequest = (url) => ({ url, headers: cryptoApiHeaders })

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getGlobal: builder.query({
            query: () => createRequest('/global')
        }),
        getEthGas: builder.query({
            query: () => createRequest('/simple/price?ids=gas&vs_currencies=eth'),
        }),
        getCoins: builder.query({
            query: () => createRequest('coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false'),
        }),
        getCoinData: builder.query({
            query: () => createRequest('coins/${id}'),
        })
    })
})

export const {
    useGetGlobalQuery, useGetEthGasQuery, useGetCoinsQuery, useGetCoinDataQuery
} = cryptoApi;