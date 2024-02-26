import Loading from '@/components/Loading';
import { AuthContext } from '@/context/authContext'
import { GET_SQUADS } from '@/graphql/queries';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react'

type Props = {}

const Squads = (props: Props) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_SQUADS);

  console.log(data, loading, error);

  useEffect(() => {
    if (!user) router.replace("/");
  }, [user])

  if (loading) return <Loading />
  return (
    <div>Squads View</div>
  )
}

export default Squads