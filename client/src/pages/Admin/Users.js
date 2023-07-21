import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import Layout from '../../componets/Layout/Layout';
import AdminMenu from '../../componets/Layout/AdminMenu';
import { Select } from "antd";
import PageLoad from "../../componets/PageLoad";
const { Option } = Select;

const Users = () => {

  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const [pageload, setPageload] = useState(false);

  const getOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/auth/getalluser");
      setOrders(data);
      setPageload(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Dashboard - Create Product"}>
        <br /><br /><br /><br /><br />

      <div className="row w-100 m-3 p-3 container" style={{height:"70vh"}}>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            {pageload ? (
              <>
              <h1 className="text-center">All Users</h1>
            <div className="row d-flex justify-content-center">
              {orders.map((o, i) => (
                <>
                  
                  {o.role === 0 ? (<div className=" col-md-7">
                    <div className="card mt-3">
                      <div className="card-body">
                        <div className="card-title"><h1>{o.name}</h1></div>
                        <div className="card-text"><p>Eamil : {o.email}</p></div>
                        <div className="card-text"><p>Phone : {o.phone}</p></div>
                        <div className="card-text"><p>Address : {o.address}</p></div>
                        <div className="card-text"><p>User : {o.role === 1 ? "Admin" : "User"}</p></div>
                        <div className="card-text">
                        </div>
                      </div>
                    </div>
                  </div>): (<></>)}
                </>
                ))}

            </div>
              </>
            ): (<PageLoad/>)}
          </div>
        </div>
      </div>
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

    </Layout>
  );
};

export default Users;
{/* <>{orders.map((o,i) => (<><h1>{o.name}</h1></>))}</> */ }


