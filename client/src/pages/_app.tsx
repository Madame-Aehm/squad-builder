import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ApolloClient, InMemoryCache, ApolloProvider, gql, createHttpLink } from '@apollo/client';
import Layout from '@/components/Layout';
import { SquadContextProvider } from '@/context/squadContext';
import { AuthContextProvider } from '@/context/authContext';
import { setContext } from '@apollo/client/link/context';

export default function App({ Component, pageProps }: AppProps) {
  const httpLink = createHttpLink({
    // uri: 'https://fe-case-study.vercel.app/api/graphql',
    uri: "http://localhost:4000/graphql"
  });
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        ...headers,
        authorization: token ? `${token}` : "",
      }
    }
  });
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });
  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Squad Builder</title>
      </Head>
      <AuthContextProvider>
        <SquadContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SquadContextProvider>
      </AuthContextProvider>
    </ApolloProvider>
  )
}
