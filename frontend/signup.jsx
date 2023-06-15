import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBCheckbox,
  MDBIcon
}
from 'mdb-react-ui-kit';
import { Row,Col } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';

function Signup() {
    const[fnam,setFnam]=useState('')
    const[lnam,setLnam]=useState('')
    const[eml,setEml]=useState('')
    const[pss,setPss]=useState('')
    const[cpss,setCpss]=useState('')
    const Create=async()=>{
        await AXIOS.post('http://localhost:3000/signup',{fnam:fnam,lnam:lnam,eml:eml,pss:pss,cpss:cpss}).then((res)=>{
          console.log(res)
          console.log(res.data)
          console.log(res.data.msg)
        })
        alert("Registration Successful!")
        setFnam(" ")
        setLnam(" ")
        setEml(" ")
        setPss(" ")
        setCpss(" ")
    }
    const handleSignup = async () => {
      try {
        const response = await axios.post('http://localhost:3000/signup', {
          fnam,
          lnam,
          eml,
          pss,
          cpss
        });
        console.log(response);
        console.log(response.data);
        console.log(response.data.msg);
        alert('Registration Successful!');
        setFnam('');
        setLnam('');
        setEml('');
        setPss('');
        setCpss('');
      } catch (error) {
        console.error(error);
        alert('An error occurred during registration.');
      }
    };
    return (
      <MDBContainer fluid>
  
        <div className="p-5 bg-image" style={{backgroundImage: 'url(https://mdbootstrap.com/img/new/textures/full/171.jpg)', height: '300px'}}></div>
  
        <MDBCard className='mx-5 mb-5 p-5 shadow-5' style={{marginTop: '-100px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)'}}>
          <MDBCardBody className='p-5 text-center'>
  
            
            <Row className='justify-content-center'>
              <Col lg='6' >
                  <h2 className="fw-bold mt-4 mb-5">Sign up now</h2>
                  <Row className='justify-content-center'>
                      <Col lg='5'>
                      <MDBInput wrapperClass='mb-4' value={fnam} placeholder='First Name' id='form1' type='text' onChange={(e)=>setFnam(e.target.value)} style={{width:'15rem'}}/>
                      
                      </Col>
                      <Col lg='5'>
                      <MDBInput wrapperClass='mb-4' value={lnam} placeholder='Last Name' id='form1' type='text' onChange={(e)=>setLnam(e.target.value)} style={{width:'15rem'}}/>   
                      </Col>
                  </Row>
                  <Row className='justify-content-center'>
                     <Col lg='10'>
                         <MDBInput wrapperClass='mb-4' value={eml} placeholder='Email' id='form1' type='email' onChange={(e)=>setEml(e.target.value)} style={{width:'31rem'}}/>
                     </Col>
                   </Row>
                   <Row className='justify-content-center'>
                      <Col lg='5'>
                      <MDBInput wrapperClass='mb-4' value={pss} placeholder='Password' id='form1' type='password' onChange={(e)=>setPss(e.target.value)} style={{width:'15rem'}}/>
                      
                      </Col>
                      <Col lg='5'>
                      <MDBInput wrapperClass='mb-4' value={cpss} placeholder='Confirm Password' id='form1' type='password' onChange={(e)=>setCpss(e.target.value)} style={{width:'15rem'}}/>   
                      </Col>
                  </Row>
                  <div className='d-flex justify-content-center mb-4'>
                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
                  </div>
                  
  
                  <MDBBtn className='w-40 mt-2 mb-5' onClick={Create} size='md'>Sign Up</MDBBtn>
            
              </Col>
            </Row>
  
            {/* <MDBRow>
              <MDBCol col='3'>
                <MDBInput wrapperClass='mb-4' label='First name' id='form1' type='text'/>
              </MDBCol>
  
              <MDBCol col='6'>
                <MDBInput wrapperClass='mb-4' label='Last name' id='form1' type='text'/>
              </MDBCol>
            </MDBRow> */}
  
            {/* <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email'/>
            <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password'/> */}
  
            
  
            {/* <div className="text-center">
  
              <p>or sign up with:</p>
  
              <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='facebook-f' size="sm"/>
              </MDBBtn>
  
              <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='twitter' size="sm"/>
              </MDBBtn>
  
              <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='google' size="sm"/>
              </MDBBtn>
  
              <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='github' size="sm"/>
              </MDBBtn>
  
            </div>
               */}
          </MDBCardBody>
        </MDBCard>
  
      </MDBContainer>
    );
  }
  
  export default Signup;