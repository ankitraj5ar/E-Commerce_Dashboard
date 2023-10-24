import React, { useState } from "react";

const AddProduct = ()=>{
    const [pname, setPname] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);
     
    const AddProduct = async ()=>{
        if(!pname || !price || !category || !company){
            setError(true)
            return false;
        }
        
        
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        console.log(userId);
        let result = await fetch('http://localhost:5000/add',{
            method:'post',
            body:JSON.stringify({name:pname,price,category,userId,company}),
            headers:{
                'Content-Type':'application/json',
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        console.log(result); 
    }
    return(
        <div className="form">
             <h1>Add Product</h1>
             <form>
                <label htmlFor='name'>Product Name:-  
                <input type='text' name='pname' id='pname'value={pname} onChange={(e)=>setPname(e.target.value)} autoComplete="pname"></input>
                {error&& !pname && <span className="error-message">Enter valid name </span>}
                </label>
                
                <label htmlFor='price'>Product Price:-  
                <input type='text' name='price' id='price' value={price} onChange={(e)=>setPrice(e.target.value)} autoComplete="price"></input> 
                {error&& !price && <span className="error-message">Enter valid price </span>}
                </label>
                <label htmlFor='category'>Product Category:-  
                <input type='text' name='category' id='category' value={category} onChange={(e)=>setCategory(e.target.value)} autoComplete="category"></input>
                {error&& !category && <span className="error-message">Enter valid category </span>}
                </label>
                <label htmlFor='company'>Product Company:-  
                <input type='text' name='comapany' id='comapany' value={company} onChange={(e)=>setCompany(e.target.value)} autoComplete="comapany"></input>
                {error&& !company && <span className="error-message">Enter valid company name </span>}
                </label>
                <button onClick={AddProduct} type='button'>Add Product</button>
             </form>
        </div>
       
    )
}
export default AddProduct;