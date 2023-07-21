import React, { useEffect, useState } from 'react';
import Layout from '../../componets/Layout/Layout';
import AdminMenu from '../../componets/Layout/AdminMenu';
import toast from "react-hot-toast";
import axios from 'axios';
import { Link } from 'react-router-dom';
import PageLoad from '../../componets/PageLoad';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [pageload, setPageload] = useState(false);

    //get All Products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get("https://ecommerce-final-app-backend.onrender.com/api/v1/product/get-product");
            if(data){
              setProducts(data.products);
              setPageload(true);
            }

        } catch (error) {
            console.log(error);
            toast.error("Something went Wrong");
        }
    }
    useEffect(() => {
        getAllProducts();
    }, []);
    return (
        <Layout>
            <br /><br /><br /><br /><br />

        <div className="row w-100 m-3 p-3 " style={{height:"70vh"}}>
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 ">
            {pageload ? (
              <>
              <h1 className="text-center">All Products List</h1>
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <Link
                  key={p._id}
                  to={`/dashboard/admin/product/${p.slug}`}
                  className="product-link"
                >
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <img
                      src={`https://ecommerce-final-app-backend.onrender.com/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name} style={{height:"300px"}}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name.substring(0, 13)}</h5>
                      <p className="card-text">{p.description.substring(0, 60)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
              </>
            ):(<><PageLoad/></>)}
          </div>
        </div>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /> <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      </Layout>
    )
}

export default Products
