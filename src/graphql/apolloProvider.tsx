import { PropsWithChildren, useMemo } from 'react'
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  from,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = new HttpLink({
  uri: 'https://fe-case-study.vercel.app/api/graphql',
})

export const ApolloProviderWrapper = ({ children }: PropsWithChildren) => {
  const client = useMemo(() => {
    const authMiddleware = setContext(async (operation, { headers }) => {

      return {
        headers: {
          ...headers,
          authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJlbWlseUBlbWFpbC5jb20iLCJjcmVhdGVkQXQiOiIyMDIzLTEyLTIwVDEzOjUzOjE3LjI5MFoiLCJpYXQiOjE3MDMyMzg4NjgsImV4cCI6MTcwNTg2ODYxNH0.MHtjz7uMCyIQvSqKayXFctAyHOw8SF10M5x7RtFzfQs`,
        },
      }
    })

    return new ApolloClient({
      link: from([authMiddleware, httpLink]),
      cache: new InMemoryCache(),
    })
  }, [])

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
