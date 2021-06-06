
import React,{useRef, useState,useEffect} from 'react';
import {Form,Card,Alert,Container} from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

import { Link,NavLink,useHistory} from 'react-router-dom';
import { useAuth} from '../context/AuthContext';
const Login = () => {


    const emailRef=useRef()
    const passwordRef=useRef()
 
    const [error,setError]=useState('')
    const [loading,setLoading]=useState(false);
    const {login,currentUser}=useAuth()
    const history=useHistory()
    useEffect(() => {
      if (currentUser) {
        history.push('/')
      }
    }, [currentUser])
    
  async function handleSubmit(e){
       e.preventDefault();
   
       try{
           setError('');
           setLoading(true);
     await login(emailRef.current.value,passwordRef.current.value);
     history.push('/');
       }catch{
           setError('Failed to Sign In');
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
       component="h4">Log In</Typography>
       {error && <Alert variant="danger">{error}</Alert>}
     
       <Form onSubmit={handleSubmit}>
       <Form.Group id="email">
       <Form.Label>Email</Form.Label>
       <Form.Control 
       style={{
         borderRadius:"9999px",
         marginTop:"10px",
       }}
       type="email" ref={emailRef} required />
       </Form.Group>
       <Form.Group id="password">
       <Form.Label>Password</Form.Label>
       <Form.Control
      
        type="password" 
        ref={passwordRef} 
        style={{
          borderRadius:"9999px",
          marginTop:"10px",
          
        }}
        required />
       </Form.Group>
       
       <Button disabled={loading} variant="contained" 
       style={{
         marginTop:"20px",
         borderRadius:'9999px',
       }}
       
       fullWidth color="secondary" type="submit">Login</Button>
       
       </Form>
       <div className="w-100 text-center mt-3" >
       <NavLink to="/forgot-password">Forgot Password</NavLink>
       </div>
       </Card.Body>
       
       </Card>
       <div className="w-100 text-center mt-2" >
       New here?<Link to="/signup">Sign Up</Link>
       </div>
       </div>
       </Container>
    )
}

export default Login
