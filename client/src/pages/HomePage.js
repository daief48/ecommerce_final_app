import React, { useState, useEffect } from 'react';
import Layout from '../componets/Layout/Layout';
import axios from 'axios';
import toast from "react-hot-toast";
import { Checkbox, Radio } from 'antd';
import { Prices } from '../componets/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from "../context/cart";
import Spinner from '../componets/Spinner';
import PageLoad from '../componets/PageLoad';
import Carsour from '../componets/Carsour';

const HomePage = () => {
  const [cart, setCart] = useCart()
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [pageLoad, setPageLoad] = useState(false);
  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("https://ecommerce-final-app-backend.onrender.com/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://ecommerce-final-app-backend.onrender.com/api/v1/product/product-list/${page}`);
      if (data) {
        setLoading(false);
        setProducts(data.products);
        setPageLoad(true);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // getTotal Count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("https://ecommerce-final-app-backend.onrender.com/api/v1/product/product-count");
      setTotal(data?.total);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://ecommerce-final-app-backend.onrender.com/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  // filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter(c => c !== id);
    }
    setChecked(all);
  }
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("https://ecommerce-final-app-backend.onrender.com/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
     {pageLoad ? (<>

      <Layout title={"ALl Products - Best offers "}>
          <Carsour />
          <br />
          <br />
          <div className="container-fluid">
            <hr style={{ background: '#060000', height: 14, border: 'dashed', color: '#ff0505', marginTop: 0 }} />

          </div>
          <div className="allbody mt-3 ">
            <div className="filter mt-5">
              <h4 className="text-center">Filter By Category</h4>
              <div className="filter-list">
                {categories?.map((c) => (
                  <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                    {c.name}
                  </Checkbox>
                ))}
              </div>
              <h4 className="text-center mt-4">Filter By Price</h4>
              <div className="filter-list">
                <Radio.Group onChange={e => setRadio(e.target.value)}>
                  {Prices?.map(p => (
                    <div key={p._id}>
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
              <div className="filter-list mt-4">
                <button className="btn btn-danger" onClick={() => window.location.reload()}>RESET FILTERS</button>
              </div>
            </div>
            <div className="products ">
              <h1 className="text-center">All Products</h1>
              <div className="d-flex flex-wrap">
                {products?.map((p) => (
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <img
                      src={`https://ecommerce-final-app-backend.onrender.com/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name} style={{ height: "300px" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text ">
                        {p.description.substring(0, 60)}...
                      </p>
                      <p className="card-text">${p.price}</p>
                      <div className="product-btn">
                        <button className=' ' onClick={() => navigate(`/product/${p.slug}`)} style={{ color: "white", background: "green", border: "solid green 1px", padding: "4px", marginright: "3px" }}>More Details</button>
                        <button className='' onClick={() => { setCart([...cart, p]); toast.success('Item Added to Cart.'); localStorage.setItem("cart", JSON.stringify([...cart, p])) }} style={{ color: "white", background: "#9f954a", border: "solid green 1px", padding: "4px", marginright: "23px" }}>ADD TO CART</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="m-2 p-3">
                {products && products.length < total && (
                  <button className='btn btn-warning' onClick={(e) => { e.preventDefault(); setPage(page + 1) }}>
                    {loading ? "Lading" : "Loadmore"}
                  </button>
                )}
              </div>
            </div>
          </div>
      </Layout>
     </>):(<PageLoad/>)}

    </>
  )
}

export default HomePage
