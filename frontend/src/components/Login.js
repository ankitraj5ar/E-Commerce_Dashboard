import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
const Login = ()=>{
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth)
        navigate('/');
    })
    //sending data to backend through this function
    const collectData = async ()=>{
        console.log(email,password);
        let result = await fetch('http://localhost:5000/login',{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        result = await result.json();
        if(result.auth){
            localStorage.setItem('user',JSON.stringify(result.user));
            localStorage.setItem('token',JSON.stringify(result.auth));
            navigate('/');
        }
        else{
            alert("Please Enter the correct information");
        }
    }
    return(
        <div className="form">
            <h1>Login</h1>
            <form>
                <label htmlFor='email'>Enter Your Email:-  
                    <input type='email' name='email' id='email' value={email} onChange={(e)=>setEmail(e.target.value)} autoComplete="email"></input>
                </label>

                <label htmlFor='password'>Enter Your Password:-  
                    <input type='password' name='password' id='password' value={password} onChange={(e)=>setPassword(e.target.value)} autoComplete="password"></input> 
                </label>

                <button onClick={collectData} type='button'>Login</button>
            </form>
        </div>
    )
}
export default Login;