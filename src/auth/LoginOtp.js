import React from 'react'
import { useState } from 'react'
import Layout from '../components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import '../styles/AuthStyles.css'
import { useAuth } from '../components/context/auth';
import './login.css'

const LoginOtp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [auth, setAuth] = useAuth();
    const [number, setNumber] = useState("");
    const [status, setStatus] = useState(false);
    const [code, setCode] = useState("");
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            // const action = status ? 'sendOtp' : `verifyOtp`;
            const action = status ? `${process.env.REACT_APP_API}/api/v1/auth/login/sendOtp` : `${process.env.REACT_APP_API}/api/v1/auth/login/verifyOtp?phone=${number}&code=${code}`;
            const phone = number;

            console.log("Number *********", phone, status);
            const queryParams = status
                ? {}
                : {
                    number: number,
                    code: code,
                };

            const res = await axios.post(action, {
                phone,
                code,
                params: queryParams
            });



            if (status === false) {
                if (res && res.data.success) {
                    toast.success(res.data && res.data.message);
                    setAuth({
                        ...auth,
                        user: res.data.user,
                        token: res.data.token
                    });

                    localStorage.setItem('auth', JSON.stringify(res.data));
                    navigate(location.state || "/");
                }

                else {
                    toast.error(res.data.message);
                }
            }

            toast.success('otp sent succesffuly on your phone please verify !');



        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Handle 401 Unauthorized error
                toast.error("Your number is wrong Please Enter Corrrect Number"); // Display a custom error message
                setStatus(false);
            }
            else if (error.response && error.response.status === 400) {
                // Handle other errors
                setStatus(true);
                toast.error("Wrong Otp Please Enter Correct Otp"); // Display a generic error message
            }
        }



    }



    return (
        <>
            <Layout title={'register'}>
                <div className="form-container d-flex p-2">
                    <h1>Login Using Otp</h1>
                    <form onSubmit={submitHandler}>

                        <div className="mb-3">
                            {
                                !status ? (<input type="text" className="form-control" id="exampleInputphone" value={number} placeholder='Enter Your phone Number' onChange={(e) => {
                                    setNumber(e.target.value)
                                }} />) : <input type="text" className="form-control" id="exampleInputphone" value={code} placeholder='Enter Your Otp' onChange={(e) => {
                                    setCode(e.target.value)
                                }} />
                            }


                        </div>

                        {
                            !status ? (<button type="submit" onClick={() => setStatus(true)} className="btn btn-primary">Send Otp</button>) :
                                (
                                    <button type="submit" onClick={() => setStatus(false)} className="btn btn-primary">Verify</button>
                                )
                        }
                    </form>
                </div >


            </Layout >
        </>
    )
}

export default LoginOtp

