import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import toast from "react-hot-toast";
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import { cartContext, useCart } from '../components/context/cartContext'
import { useCategories } from '../components/context/categoryContext';
import './../styles/homePage.css'
const HomePage = () => {
    const [product, setProduct] = useState([]);

    const [categories] = useCategories();
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const [cart, setCart] = useCart();


    const navigate = useNavigate();

    const checkCart = async (p, id) => {
        try {
            const myCart = [...cart];
            let check = -1;
            if (myCart) {
                check = myCart.findIndex((item) => item._id === id);
            }

            if (check === -1) {
                setCart([...cart, p]);
                localStorage.setItem('cart', JSON.stringify([...cart]));
                toast.success("Product added in cart successfully");
            }

            else {
                toast.error("Product is already in cart go and check");
            }

        }
        catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        totalCount();
    }, []);

    const GetAllProduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
            console.log(data?.product)
            if (data?.success) {
                setProduct(data.product);
            }
            else {
                toast.error(data?.message);
            }
        } catch (err) {
            console.log(err);
            toast.error('Something Went wWrong ');
        }
    }

    //get filterd product
    const filterProduct = async () => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filters`, {
                checked,
                radio,
            });
            setProduct(data?.products);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!checked.length || !radio.length) GetAllProduct();
    }, [checked.length, radio.length]);


    useEffect(() => {
        if (checked.length || radio.length) filterProduct();

    }, [checked, radio]);


    const totalCount = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`);

            if (data?.success) {
                setTotal(data.total);

            }
            else {
                toast.error(data.message);
            }
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong");
        }
    }

    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page]);



    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProduct([...product, ...data?.product]);
        } catch (err) {
            setLoading(false);
            console.log(err);
            toast.error('Something went wrong here');
        }
    }


    const FilterHandler = (value, id) => {
        console.log(value, id);
        let all = [...checked];

        if (value) {
            all.push(id);
        }
        else {
            all = all.filter(c => c !== id);
        }

        setChecked(all);
        console.log(all);
    };

    return (
        <Layout title={"All Product-Best Offers"}>
            {/* banner image */}
            <div className='banner-wrapper'>
                <img
                    src="/images/banner.jpg"
                    className="banner-img"
                    alt="bannerimage"
                    width={"100%"}
                />
            </div>

            {/* banner image */}

            <div className='row mt-3'>
                <div className='col-md-3'>

                    <h4 className='text-center'>Filter By Price</h4>
                    <div className='d-flex flex-column'>
                        {
                            <Radio.Group onChange={(e) => { setRadio(e.target.value) }}>
                                {
                                    Prices.map(e => (
                                        <div key={e._id}>
                                            <Radio value={e.array}>{e.name}</Radio>
                                        </div>
                                    ))
                                }
                            </Radio.Group>
                        }
                    </div>


                    <h4 className='text-center mt-5'>Filter by category</h4>
                    <div className='d-flex flex-column p-3'>
                        {
                            categories?.map((e) => (
                                <Checkbox key={e._id} onChange={(t) => FilterHandler(t.target.checked, e._id)} className="py-1">
                                    {e.name}
                                </Checkbox>
                            ))
                        }
                    </div>
                    <div className='d-flex flex-column'>
                        <button className='btn btn-danger' onClick={() => window.location.reload(true)}>Reset Filters</button>
                        {/* <button className='btn btn-danger' onClick={() => resetFilter()}>Reset Filters</button> */}

                    </div>
                </div>
                <div className='col-md-9'>
                    <h1 className='text-center'>All Product</h1>
                    <div className="d-flex flex-wrap">
                        {
                            product?.map((p) => (

                                <div className="card m-2" key={p._id} style={{ width: '18rem' }} >

                                    <img className="card-img-top" src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} alt={p.name} />

                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.price}</p>
                                        <p className="card-text">{p.description.substring(0, 60)}...</p>
                                        <button className='btn btn-primary ms-1' onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                        <button className='btn btn-primary ms-1' onClick={() => {
                                            checkCart(p, p._id)

                                            // toast.success("Product added in cart successfully")
                                        }}>ADD TO CART</button>
                                    </div>

                                </div>
                            ))
                        }
                    </div>
                    <div className="m-2 p-3">
                        {product && product.length < total && (
                            <button
                                className="btn btn-secondary"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1);
                                }}
                            >{loading ? "Loading" : "LoadMore"}
                            </button>
                        )}
                    </div>
                    <div>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default HomePage



