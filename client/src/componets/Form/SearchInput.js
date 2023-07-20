import React from 'react'
import { useSearch } from "../../context/search";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const SearchInput = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();
    const hangleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const {data} = await axios.get(`http://localhost:8080/api/v1/product/search/${values.keyword}`);
            setValues({...values, results: data});
            navigate('/search');
        }catch(error){

        }
    }
    return (
        <div>
            <form className="d-flex" role="search" onSubmit={hangleSubmit}>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={values.keyword} onChange={(e) => setValues({ ...values, keyword: e.target.value })} style={{    width: "46vw",textalign: "center",fontsize: "21px",fontfamily: "system-ui"}}/>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>

        </div>
    )
}

export default SearchInput
