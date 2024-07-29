import React, { useEffect, useState } from 'react';
import Header from './Header';
import PageData from './PageData';
import { Pagination } from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { EDIT__PAGE } from '../redux/reduccer/rootPage';

const Layout = () => {
    const [max, setMax] = useState(() => {
        axios.get(`https://zfakecooking.vercel.app/cooking`).then((res) => {
            const number = res.data.length/18;
            setMax(Math.ceil(number));
        });
    });
    const [data, setData] = useState([]);
    const page = useSelector((state) => state.page.page);
    const dispatch = useDispatch();
    const [search, setSearch] = useState("")

    const handleChange = (event, value) => {
        dispatch(EDIT__PAGE(value));
    }; 

    const setLoot = (Children) => {
        setSearch(Children)
    }

    useEffect(() => {
        if(search){
            axios.get(`https://zfakecooking.vercel.app/cooking?_page=${page}&_limit=18&q=${search}&_sort=id&_order=desc`).then((res) => {
                setData(res.data)
            })
        }else{
            axios.get(`https://zfakecooking.vercel.app/cooking?_page=${page}&_limit=18&_sort=id&_order=desc`).then((res) => {
                setData(res.data)
            })
        }
    },[page, search])
    return (
        <div style={{width: "100%", height: "100%"}}>
            <Header setLoot={setLoot}/>
            {data.length === 0 ? <h2 style={{display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 400, fontSize: "20px", textAlign: "center"}}>Không có công thức nào!</h2> :
                <>
                    <PageData data={data}/>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "70px"}}>
                        <Pagination count={max} page={page} variant="outlined" color="primary" onChange={handleChange} defaultPage={6} siblingCount={0}/>
                    </div>
                </>
            }
        </div>
    );
};

export default Layout;