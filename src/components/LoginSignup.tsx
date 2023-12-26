import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import Modal from './Modal';
import { LOGIN, SIGNUP } from '@/graphql/mutations';
import validateInputs from '@/utils/validateInputs';
import { useMutation } from '@apollo/client';
import { AuthContext } from '@/context/authContext';
import { AuthUser } from '@/@types/auth';
import Input from './Input';
import Form from './Form';

type Props = {
  showLogin: boolean
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>
  setShowSubmitSquad?: React.Dispatch<React.SetStateAction<boolean>>
}

type Result = {
  signup?: AuthUser
  login?: AuthUser
}

function LoginSignup({ showLogin, setShowLogin, setShowSubmitSquad }: Props) {
  const { userAuthenticated } = useContext(AuthContext);

  const [loginScreen, setLoginScreen] = useState(true);

  const [validation, setValidation] = useState({
    email: true,
    password: true
  })

  const mutation = loginScreen ? LOGIN : SIGNUP;
  const [loginSignup, { data, loading, error }] = useMutation<Result>(mutation);

  const [inputValues, setInputValues] = useState({
    email: "",
    password: ""
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValues({ ...inputValues, [e.target.type]: e.target.value })
    e.target.type === "email" ? setValidation({ ...validation, email: true })
    : setValidation({ ...validation, password: true });
  }

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setValidation({ email: true, password: true });
    const valid = validateInputs(inputValues);
    if (!valid.password || !valid.email) {
      setValidation(valid);
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
      if (setShowSubmitSquad) {
        setShowSubmitSquad(true);
      }
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
    if (error) setErrorMessage(error.graphQLErrors[0].message);
  }, [error]);


  return (
    <Modal state={showLogin} setState={setShowLogin} title={loginScreen ? "Login" : "Signup"}>
      <div className='w-60'>
        <Form
          handleSubmit={handleSubmit}
          errorMessage={errorMessage}
          loading={loading}
          submit={ loginScreen ? "Login" : "Signup" }
        >
          <Input 
              value={inputValues.email}
              placeholder={"email"}
              type={"email"}
              handleChange={handleChange}
              validation={validation.email}
              message='Invalid Email'
            />

            <Input
              value={inputValues.password} 
              placeholder={"password"}
              type={"password"}
              handleChange={handleChange}
              validation={validation.password}
              message='Password must be at least 6 characters'
            />
        </Form>

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