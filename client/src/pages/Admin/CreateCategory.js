import React from 'react'
import Layout from '../../componets/Layout/Layout'
import AdminMenu from '../../componets/Layout/AdminMenu';
import { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import axios from 'axios';
import { Modal } from "antd";
import CategoryForm from '../../componets/Form/CategoryForm';
import PageLoad from '../../componets/PageLoad';
const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");
    const [pageload, setPageload] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post('http://localhost:8080/api/v1/category/create-category', {
                name,
            });

            if (data?.success) {
                toast.success(`${name} is created`);
            } else {
                // toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            // toast.error("Something went wrong in input form");
        }
    }
    // get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("http://localhost:8080/api/v1/category/get-category");
            if (data?.success) {
                setCategories(data?.category);
                getAllCategory();
                setPageload(true);
            }
        } catch (error) {
            console.log(error);
            // toast.error("Something went wrong in getting category");
        }
    }
    useEffect(() => {
        getAllCategory();
    }, []);

    //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        // toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

   //delete category
   const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success(`category is deleted`);

        getAllCategory();
      } else {
        // toast.error(data.message);
      }
    } catch (error) {
    //   toast.error("Somtihing went wrong");
    }
  };
    return (
        <Layout title={"Dashboard - Create Category"}>
            <br /><br /><br /><br /><br />

            <div className="row w-100 m-3 p-3 container" style={{height:"70vh"}}>
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9 w-100">
                        {pageload ? (
                            <>
                            <h1>Manage Category</h1>
                        <div className="p-3 w-100">
                            <CategoryForm
                                handleSubmit={handleSubmit}
                                value={name}
                                setValue={setName}
                            />
                        </div>
                        <div className='w-100'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className="col">Name</th>
                                        <th className="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map((c) => (
                                        <>
                                            <tr>
                                                <td key={c._id}>{c.name}</td>
                                                <td className='d-flex'>
                                                    <button className='btn btn-primary ms-2' onClick={() => { setVisible(true); setUpdatedName(c.name) ;setSelected(c)}} >Edit</button>
                                                    <button className='btn btn-danger ms-2' onClick={()=>handleDelete(c._id)}>Delete</button>
                                                </td>
                                            </tr>
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Modal onCancel={() => setVisible(false)} footer={null} visible={visible}>
                            <CategoryForm
                                value={updatedName}
                                setValue={setUpdatedName}
                                handleSubmit={handleUpdate} />
                        </Modal>
                            </>
                        ): (<><PageLoad/></>)}
                </div>
            </div>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

        </Layout>
    )
}

export default CreateCategory
