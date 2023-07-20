import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import toast from "react-hot-toast";
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/cart';
import { Badge } from 'antd';
const Header = () => {
    const [auth, setAuth] = useAuth();
    const [cart] = useCart();
    const categories = useCategory();

    const handleLogout = () => {
        setAuth({
            ...auth, user: null, token: ""
        })
        localStorage.removeItem("auth");
        toast.success("Logout Successfully");

    }
    return (
        <div>
            <>
                <nav className="navbar navbar-expand-lg container-fluid" style={{ background: "rgb(232 225 137)", padding: "4px", position: "fixed", top: "0", zIndex: "1" }}>
                    <div className="container-fluid">
                        <Link to="/" className="navbar-brand" href="#">
                            <div className="logo" style={{ display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "cursive" }}>
                                <img src="/major.png" alt="" srcset="" style={{ height: "84px" }} />
                                <h1 style={{ fontSize: 37, margin: 17, fontWeight: "bolder" }}>Major</h1>

                            </div>
                        </Link>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">

                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><g id="feBar0" fill="none" fill-rule="evenodd" stroke="none" stroke-width="1"><g id="feBar1" fill="currentColor"><path id="feBar2" d="M3 16h18v2H3v-2Zm0-5h18v2H3v-2Zm0-5h18v2H3V6Z" /></g></g></svg>
                            
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <div className="m-auto">
                                <SearchInput />
                            </div>

                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink to="/" className="nav-link " >Home</NavLink>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link
                                        className="nav-link dropdown-toggle"
                                        to={"/categories"}
                                        data-bs-toggle="dropdown"
                                    >
                                        Categories
                                    </Link>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link className="dropdown-item" to={"/categories"}>
                                                All Categories
                                            </Link>
                                        </li>
                                        {categories?.map((c) => (
                                            <li>
                                                <Link
                                                    className="dropdown-item"
                                                    to={`/category/${c.slug}`}
                                                >
                                                    {c.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>

                                {!auth.user ? (
                                    <>
                                        <li className="nav-item">
                                            <NavLink to="/register" className="nav-link" >Register</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/login" className="nav-link" >Login</NavLink>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className="nav-item dropdown">
                                            <NavLink
                                                className="nav-link dropdown-toggle"
                                                href="#"
                                                role="button"
                                                data-bs-toggle="dropdown"
                                                style={{ border: "none" }}
                                            >
                                                {auth?.user?.name}
                                            </NavLink>
                                            <ul className="dropdown-menu">
                                                <li>
                                                    <NavLink
                                                        to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"
                                                            }`}
                                                        className="dropdown-item"
                                                    >
                                                        Dashboard
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                        onClick={handleLogout}
                                                        to="/login"
                                                        className="dropdown-item"
                                                    >
                                                        Logout
                                                    </NavLink>
                                                </li>
                                            </ul>
                                        </li>
                                    </>
                                )}
                                <li className="nav-item">
                                    <Badge count={cart?.length} showZero>
                                        <NavLink to="/cart" className="nav-link" style={{ fontSize: "27px" }} >🛍️</NavLink>
                                    </Badge>
                                </li>
                            </ul>

                        </div>
                    </div>

                </nav>

            </>
        </div>

    )
}

export default Header
