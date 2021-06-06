
import React,{useRef, useState} from 'react';
import {Form,Card,Button,Alert,Container} from 'react-bootstrap';
import { Link,NavLink } from 'react-router-dom';
import { useAuth} from '../context/AuthContext';
const Forgotpassword = () => {
    const emailRef=useRef()
  
 
    const [error,setError]=useState('')
    const [message,setMessage]=useState('')
    const [loading,setLoading]=useState(false);
    const {resetPassword}=useAuth()
  
  async function handleSubmit(e){
       e.preventDefault();
   
       try{
           setError('');
           setLoading(true);
     await resetPassword(emailRef.current.value);
     setMessage('Check your mail for further instructions');  
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
       <h2 className="text-center mb-4"> Password Reset</h2>
       {error && <Alert variant="danger">{error}</Alert>}
       {message && <Alert variant="success">{message}</Alert>}
       <Form onSubmit={handleSubmit}>
       <Form.Group id="email">
       <Form.Label>Email</Form.Label>
       <Form.Control type="email" ref={emailRef} required />
       </Form.Group>
      
       
       <Button disabled={loading} className="w-100 mt-3 mb-3" type="submit">Reset Password</Button>
       </Form>
       <div className="w-100 text-center mt-3" >
       <NavLink to="/login">Login</NavLink>
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

export default Forgotpassword
