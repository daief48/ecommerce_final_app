import React from 'react';
import Layout from '../../componets/Layout/Layout';
import UserMenu from '../../componets/Layout/UserMenu';
import { useAuth } from '../../context/auth';
const Dashboard = () => {
    const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - Ecommerce App"}>
            <br /><br /><br /><br /><br />

      <div className="container p-3 m-3">
        <div className="row">
            <div className="col-md-3">
                <UserMenu/>
            </div>
            <div className="col-md-9">
                <div className="card w-75 p-3">
                    <h3>{auth?.user?.name}</h3>
                    <h3>{auth?.user?.email}</h3>
                    <h3>{auth?.user?.address}</h3>
                </div>
            </div>
        </div>
      </div>
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

    </Layout>
  )
}

export default Dashboard;
