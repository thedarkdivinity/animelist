
import React,{useRef, useState,useEffect} from 'react';
import {Form,Card,Alert,Container} from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import { Link,useHistory } from 'react-router-dom';
import { useAuth} from '../context/AuthContext';
import { Typography } from '@material-ui/core';
const Signup = () => {
    const emailRef=useRef()
    const passwordRef=useRef()
    const passwordConfirmRef=useRef()
    const [error,setError]=useState('')
    const [loading,setLoading]=useState(false);
    const { signup,currentUser}=useAuth()
    const history=useHistory()
    useEffect(()=>{
     if(currentUser){
       history.push('/')
     }
    },[currentUser])
  async function handleSubmit(e){
       e.preventDefault();
       if(passwordRef.current.value!==passwordConfirmRef.current.value){
        return setError('Passwords do not match')
       }
       try{
           setError('');
           setLoading(true);
     await signup(emailRef.current.value,passwordRef.current.value);
     history.push('/')
       }catch{
           setError('Failed to register');
       }
       setLoading(false);
       
   }

    return (
        <Container className="d-flex align-items-center justify-content-center"
        style={{
          minHeight:"100vh"
        }}
        >
        <div className="w-100" style={{maxWidth:'400px'}}>
       <Card>
       <Card.Body>
      <Typography variant="h4"
      style={{textAlign:"center"}}
      component="h4">Sign Up</Typography>
       {error && <Alert variant="danger">{error}</Alert>}
     
       <Form onSubmit={handleSubmit}>
       <Form.Group id="email">
       <Form.Label>Email</Form.Label>
       <Form.Control type="email" 
       style={{
        borderRadius:"9999px",
       }}
       
       ref={emailRef} required />
       </Form.Group>
       <Form.Group id="password">
       <Form.Label>Password</Form.Label>
       <Form.Control type="password" 
       style={{
        borderRadius:"9999px",
       }}
       ref={passwordRef} required />
       </Form.Group>
       <Form.Group id="password-confirm">
       <Form.Label>Password Confirmation</Form.Label>
       <Form.Control type="password" 
       style={{
        borderRadius:"9999px",
       }}
       ref={passwordConfirmRef} required />
       </Form.Group>
       
       <Button disabled={loading} fullWidth style={{
         marginTop:"20px",
         borderRadius:"9999px",
       }} variant="contained" type="submit" color="secondary">signup</Button>
       </Form>
       </Card.Body>
       
       </Card>
       <div className="w-100 text-center mt-2" >

       Already have an account?<Link to="/login" >Log In</Link> 
       </div>
       </div>
       </Container>
    )
}

export default Signup
