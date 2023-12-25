import React, { ChangeEvent, useContext, useEffect, useRef, useState } from 'react'
import Modal from './Modal';
import { LOGIN, SIGNUP } from '@/graphql/mutations';
import validateInputs from '@/utils/validateInputs';
import { useMutation } from '@apollo/client';
import { AuthUser } from '@/@types';
import { AuthContext } from '@/context/authContext';

type Props = {
  showLogin: boolean
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>
}

type Result = {
  signup?: AuthUser
  login?: AuthUser
}

function LoginSignup({ showLogin, setShowLogin }: Props) {
  const { userAuthenticated } = useContext(AuthContext);

  const [loginScreen, setLoginScreen] = useState(true);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [pwInvalid, setPwInvalid] = useState(false);

  const mutation = loginScreen ? LOGIN : SIGNUP;
  const [loginSignup, { data, loading, error }] = useMutation<Result>(mutation);

  const inputValues = useRef({
    email: "",
    password: ""
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    inputValues.current = { ...inputValues.current, [e.target.type]: e.target.value }
    e.target.type === "email" ? setEmailInvalid(false) : setPwInvalid(false);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailInvalid(false);
    setPwInvalid(false);
    const valid = validateInputs(inputValues.current);
    if (!valid.password || !valid.email) {
      if (!valid.email) setEmailInvalid(true);
      if (!valid.password) setPwInvalid(true);
      return
    }
    loginSignup({
      variables: {
        email: inputValues.current.email,
        password: inputValues.current.password
      }
    })
  }

  console.log(data, error, loading)

  useEffect(() => {
    if (data) {
      if (data.login) userAuthenticated(data.login);
      if (data.signup) userAuthenticated(data.signup);
    }
  }, [data])

  return (
    <Modal state={showLogin} setState={setShowLogin} title={loginScreen ? "Login" : "Signup"}>
      <form 
        noValidate
        onSubmit={(e) => handleSubmit(e)}
        className='flex flex-col gap-2 w-60'>
        <input 
          className={`rounded-md p-2 ${ emailInvalid ? "border-2 border-red-600" : "" }`}
          placeholder='email' 
          type='email' 
          onChange={(e) => handleChange(e)} />
        { emailInvalid && <small className='text-red-600 -mt-2'>Invalid Email</small> }

        <input 
          className={`rounded-md p-2 ${ pwInvalid ? "border-2 border-red-600" : "" }`}
          placeholder='password' 
          type='password' 
          onChange={(e) => handleChange(e)} />
        { pwInvalid && <small className='text-red-600 -mt-2'>Password must be at least 6 characters</small> }

        <button type='submit'>{ loginScreen ? "Login" : "Signup" }</button>
      </form>
      <p className='text-center'>{ loginScreen? "No account? " : "Already signed up? " }
        <span 
          className='font-bold hover:cursor-pointer'
          onClick={() => setLoginScreen(!loginScreen)}>
            { loginScreen ? "Signup!" : "Login!" }
        </span>
      </p>
    </Modal>
  )
}

export default LoginSignup