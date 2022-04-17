import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
// import { isLoggedIn } from "../../utils/Auth";
import MainLayout from "../layout/MainLayout";

export default function Login(props) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();

    const loginUser = data => {
        axios.post(process.env.REACT_APP_BACKEND_API + "auth/login", data)
            .then((res) => {
                console.log('response', res.data.token);
                localStorage.setItem("auth", res.data.token)
                toast.success("User Logged In!")
                navigate(`/`);
            }).catch(err => {
                console.log('Error ', err.response);
                toast.error(err.response.data.message)
            })
    }

    useEffect(() => {
        const token = localStorage.getItem('auth');
        if (token && token !== "") {
            navigate('/')
        }
    })


    return <>
        <MainLayout>
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-4 border p-3">
                        <h1 className="text-center">Login</h1>
                        <form onSubmit={handleSubmit(loginUser)}>

                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">
                                    Email address
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    {...register("email", { required: true })}
                                />
                                {errors.email &&
                                    <div className="form-text text-danger">
                                        Email is required!
                                    </div>
                                }
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    {...register("password", { required: true })}
                                />
                                {errors.password &&
                                    <div className="form-text text-danger">
                                        Password is required!
                                    </div>
                                }
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </form>

                    </div>
                </div>
            </div>


        </MainLayout>


    </>
}