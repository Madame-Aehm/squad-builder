type Inputs = {
  password: string
  email: string
}

const validateInputs = (inputs: Inputs) => {
  const emailRegEx = /\S+@\S+\.\S+/;
  const emailValid = emailRegEx.test(inputs.email);
  const pwValid = inputs.password.length > 5;
  return { email: emailValid, password: pwValid }
}

export default validateInputs