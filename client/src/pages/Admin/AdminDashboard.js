import React, { useState } from 'react';
import Layout from '../../componets/Layout/Layout';
import AdminMenu from '../../componets/Layout/AdminMenu';
import { useAuth } from '../../context/auth';
const AdminDashboard = () => {
    const [auth] = useAuth();
    const [pageload, setPageload] = useState(false);
  return (
    <Layout title={"Dashbord"}>
    <br /><br /><br /><br /><br />
      <div className="container m-3 p-3" style={{marginBottom:"40px"}}>
        <div className="row">
            <div className="col-md-3">
                <AdminMenu/>
            </div>
            <div className="col-md-9">
            <div className="card w-75 p-3">
                <h3>Admin Name : {auth?.user?.name}</h3>
                <h3>Admin Eamil : {auth?.user?.email}</h3>
                <h3>Admin Contact : {auth?.user?.phone}</h3>
            </div>
            </div>
        </div>
      </div>
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

    </Layout>
  )
}

export default AdminDashboard
