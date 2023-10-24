import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = ()=>{
    const [pname, setPname] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const params = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        getProductDetail();
    },[])

    const getProductDetail = async ()=>{
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setPname(result.name)
        setCategory(result.category)
        setCompany(result.company)
        setPrice(result.price)
    }
    const updateProduct = async ()=>{
       console.log(pname,price,category,company);
       let result = await fetch(`http://localhost:5000/product/${params.id}`,{
       method:'put',
       body:JSON.stringify({name:pname,price,category,company}),
       headers:{
       'Content-Type':'application/json',
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
       }
       });
       result = result.json();
       navigate('/')
    }
    return(
        <div className="form">
             <h1>Update Product</h1>
             <form>
                <label htmlFor='name'>Product Name:-  
                <input type='text' name='pname' id='pname'value={pname} onChange={(e)=>setPname(e.target.value)} autoComplete="pname"></input>
                </label>
                <label htmlFor='price'>Product Price:-  
                <input type='text' name='price' id='price' value={price} onChange={(e)=>setPrice(e.target.value)} autoComplete="price"></input> 
                </label>
                <label htmlFor='category'>Product Category:-  
                <input type='text' name='category' id='category' value={category} onChange={(e)=>setCategory(e.target.value)} autoComplete="category"></input>
                </label>
                <label htmlFor='company'>Product Company:-  
                <input type='text' name='comapany' id='comapany' value={company} onChange={(e)=>setCompany(e.target.value)} autoComplete="comapany"></input>
                </label>
                <button onClick={updateProduct} type='button'>Update Product</button>
             </form>
        </div>
       
    )
}

export default UpdateProduct;