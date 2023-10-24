import React,{useEffect, useState} from "react";
import { json, useNavigate } from "react-router-dom";

const Signup = ()=>{
    const [name,setName] = useState("");
    const [password,setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
   
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth)
        navigate('/');
    })
    //sending data to backend through this function
    const collectData = async ()=>{
        // console.log(name,email,password);
        let result = await fetch('http://localhost:5000/signup',{
            method:'post',
            body:JSON.stringify({name,email,password}),
            headers:{
                'Content-Type':'application/json'  
            }
        });
        result = await result.json();
        console.log(result);
        localStorage.setItem('user',JSON.stringify(result.result));
        localStorage.setItem('token',JSON.stringify(result.auth));
        if(result.auth){
            navigate('/')
        }
    }
    return(
        <div  className="form">
            <h1>Register Yourself</h1>
            <form>
                <label htmlFor='name'>Enter Your Name:-  
                <input type='text' name='name' id='name'value={name} onChange={(e)=>setName(e.target.value)} autoComplete="name"></input></label>
                <label htmlFor='email'>Enter Your Email:-  
                <input type='email' name='email' id='email' value={email} onChange={(e)=>setEmail(e.target.value)} autoComplete="email"></input> </label>
                <label htmlFor='password'>Enter Your Password:-  
                <input type='password' name='password' id='password' value={password} onChange={(e)=>setPassword(e.target.value)} autoComplete="password"></input> </label>
                <button onClick={collectData} type='button'>Signup</button>
            </form>
            
        </div>
    )
}

export default Signup;