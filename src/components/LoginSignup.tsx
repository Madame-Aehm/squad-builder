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

  const [inputValues, setInputValues] = useState({
    email: "",
    password: ""
  })

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // inputValues.current = { ...inputValues.current, [e.target.type]: e.target.value }
    setInputValues({ ...inputValues, [e.target.type]: e.target.value })
    e.target.type === "email" ? setEmailInvalid(false) : setPwInvalid(false);
  }

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setEmailInvalid(false);
    setPwInvalid(false);
    const valid = validateInputs(inputValues);
    if (!valid.password || !valid.email) {
      if (!valid.email) setEmailInvalid(true);
      if (!valid.password) setPwInvalid(true);
      return
    }
    try {
      await loginSignup({
        variables: {
          email: inputValues.email,
          password: inputValues.password
        }
      })
      setInputValues({ email: "", password: "" });
      setShowLogin(false);
    } catch(e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (data) {
      if (data.login) userAuthenticated(data.login);
      if (data.signup) userAuthenticated(data.signup);
    }
  }, [data]);

  useEffect(() => {
    console.log("error has changed")
    if (error) setErrorMessage(error.graphQLErrors[0].message);
  }, [error]);


  return (
    <Modal state={showLogin} setState={setShowLogin} title={loginScreen ? "Login" : "Signup"}>
      <div className='w-60'>
        <form 
          noValidate
          onSubmit={(e) => handleSubmit(e)}
          className='flex flex-col gap-2'>
          <input 
            value={inputValues.email}
            className={`rounded-md p-2 ${ emailInvalid ? "border-2 border-red-600" : "" }`}
            placeholder='email' 
            type='email' 
            onChange={(e) => handleChange(e)} />
          { emailInvalid && <small className='text-red-600 -mt-2'>Invalid Email</small> }

          <input 
          value={inputValues.password}
            className={`rounded-md p-2 ${ pwInvalid ? "border-2 border-red-600" : "" }`}
            placeholder='password' 
            type='password' 
            onChange={(e) => handleChange(e)} />
          { pwInvalid && <small className='text-red-600 -mt-2'>Password must be at least 6 characters</small> }

          <small className='text-red-600 text-center'>{ errorMessage }</small>
          { loading ? 
            <button className='p-2' disabled>Loading...</button> : 
            <button className='p-2' type='submit'>{ loginScreen ? "Login" : "Signup" }</button>
          }
        </form>
        <p className='text-center'>{ loginScreen? "No account? " : "Already signed up? " }
          <span 
            className='font-bold hover:cursor-pointer'
            onClick={() => setLoginScreen(!loginScreen)}>
              { loginScreen ? "Signup!" : "Login!" }
          </span>
        </p>
      </div>
    </Modal>
  )
}

export default LoginSignup