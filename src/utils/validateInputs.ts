type Inputs = {
  password: string
  email: string
}

const validateInputs = (inputs: Inputs) => {
  const emailRegEx = /\S+@\S+\.\S{2,}/;
  // const emailRegEx = /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}$/;
  const emailValid = emailRegEx.test(inputs.email);
  const pwValid = inputs.password.length > 5;
  return { email: emailValid, password: pwValid }
}

export default validateInputs