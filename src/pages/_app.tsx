import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import Layout from '@/components/Layout';

export default function App({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: 'https://fe-case-study.vercel.app/api/graphql',
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Squad Builder</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  )
}
