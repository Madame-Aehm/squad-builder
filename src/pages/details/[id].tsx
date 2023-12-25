import { FullPersonFetchResult, Person } from '@/@types';
import Error from '@/components/Error';
import Loading from '@/components/Loading';
import { GET_PERSON } from '@/graphql/queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'



function Details() {
  const params = useParams();
  const { data, error, loading } = useQuery<FullPersonFetchResult>(GET_PERSON, { variables: { id: Number(params?.id) } });
  const [errorMessage, setErrorMessage] = useState("");
  console.log(data, error, loading);

  useEffect(() => {
    if (error) setErrorMessage(error.message);
    if (data?.person === null) setErrorMessage("No character with that ID");
  }, [error, data])

  return loading ? <Loading /> : (
    <div>
      
      { (data && data.person) && (
        <>
          <h1>Details about { data.person.name }</h1>

        </>
      ) }
    
      { errorMessage && <Error message={ errorMessage } /> }
    </div>
  )
}

export default Details