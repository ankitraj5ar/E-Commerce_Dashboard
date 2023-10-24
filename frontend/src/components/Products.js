import React, { useEffect, useState } from "react";
import { json, Link } from "react-router-dom";

const Products = ()=>{
    const [products, setProducts] = useState([]);
    useEffect(()=>{
        getProducts();
    },[])
    const getProducts = async ()=>{
        let result = await fetch('http://localhost:5000/products',{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setProducts(result);
    }
    const deleteProduct = async(id)=>{
        let result = await fetch(`http://localhost:5000/product/${id}`,{
            method:'delete',
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = result.json();
        if(result){
            alert('Product is deleted ');
            getProducts();
        }
    }
    const searchHandle = async (e)=>{
        const key = e.target.value;
        if(key){
            let result = await fetch(`http://localhost:5000/search/${key}`,{
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            if(result)
                setProducts(result);
        }
        else{
            getProducts();
        }
    }
    return (
        <div className="all-products">
                <h1>All Products</h1>
                <input type='text' placeholder="Search Product" onChange={searchHandle}></input>
                <ul>
                    <li>S. No. </li>
                    <li>Name </li>
                    <li>Price</li>
                    <li>Category</li>
                    <li>Operation</li>
                </ul>
                {products.length>0?
                    products.map((item,index)=>
                        <ul className='product-header' key={item._id}>
                        <li>{index+1} </li>
                        <li>{item.name} </li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li><button  onClick={()=>deleteProduct(item._id)}>Delete</button>
                        <Link to={'/update/'+item._id}>Update</Link>
                        </li>
                        
                        </ul>
                    ) 
                    :
                    <h2>No product available</h2>
                   
                }
        </div>
    )
}
export default Products;