import { useSignIn } from "react-auth-kit";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Button } from 'semantic-ui-react';

export default function Login() {
    const [error, setError] = useState("")
    const signIn = useSignIn()
  
    const onSubmit = async values => {
      console.log("Values: ", values)
      setError("")
  
      try {
        const response = await axios.post(
          "https://61f0bb51e386270017fe1e53.mockapi.io/loginInfo",
          values
        )
  
        signIn({
          token: response.data.token,
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: { email: values.email }
        })
      } catch (err) {
        if (err && err instanceof AxiosError) setError(err.response?.data.message)
        else if (err && err instanceof Error) setError(err.message)
  
        console.log("Error: ", err)
      }
    }
  
    const formik = useFormik({
      initialValues: {
        email: "",
        password: ""
      },
      onSubmit
    })
  
    return (
      <div className="container">
        <div className="inner-container">
          <form onSubmit={formik.handleSubmit}>
            <h2>Welcome Back!</h2>
            <p className="error-text">{error}</p>
            <div className="input-wrapper">
              <input
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder="Email"
                clearonescape="true"
                size="large"
                type="email"
              />
            </div>
            <div className="input-wrapper">
              <input 
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder="Password"
                clearonescape="true"
                size="large"
                type="password"
              />
            </div>
            <div className="input-wrapper">
              <Button size="large" kind="primary">
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  }
  
  