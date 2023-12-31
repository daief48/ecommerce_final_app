import React, { useState } from 'react';
import Layout from '../componets/Layout/Layout';
import { useSearch } from '../context/search';
import { useNavigate } from 'react-router-dom';
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const Search = () => {
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  return (
    <Layout title={"Search results"}>
    <br /><br /><br /><br /><br />
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>{values?.results.length < 1 ? "No Products Found" : `Found ${values?.results.length}`}</h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`https://ecommerce-final-app-backend.onrender.com/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{ height: "300px" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> $ {p.price}</p>
                  <div className="d-flex">
                    <button className='btn btn-primary ms-1' onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                    <button class="btn btn-secondary ms-1" onClick={() => { setCart([...cart, p]); toast.success('Item Added to Cart.'); localStorage.setItem("cart", JSON.stringify([...cart, p])) }} style={{ color: "white", background: "#9f954a", border: "solid green 1px", padding: "4px", marginright: "23px" }}>ADD TO CART</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Search
