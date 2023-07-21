import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";

import React from 'react'
import Spinner from "../Spinner";

export default function PrivateRoute(){
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();
    // default axios
    axios.defaults.headers.common["Authorization"] = auth?.token;

    useEffect(() => {
        const authcheck = async () =>{
            const res = await axios.get("https://ecommerce-final-app-backend.onrender.com/api/v1/auth/user-auth");

            if(res.data.ok){
                setOk(true);
            }else{
                setOk(false);
            }
        }
        if(auth?.token) authcheck();
    },[auth?.token]);

    return ok ? <Outlet/> : <Spinner/>;
}

