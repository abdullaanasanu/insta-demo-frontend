import MainLayout from "../layout/MainLayout";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function SignUp(props) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    let navigate = useNavigate();

    const registerUser = (data) => {
        console.log('data -> ', process.env.REACT_APP_BACKEND_API);
        axios.post(process.env.REACT_APP_BACKEND_API + "auth/register", data)
        .then((res) => {
            console.log('response',res);
            toast.success("User Registered!")
            navigate(`/login`);
        }).catch(err => {
            console.log('Error ',err);
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
                        <h1 className="text-center">Sign Up</h1>
                        <form onSubmit={handleSubmit(registerUser)}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    {...register("fullName", { required: true })}
                                />
                                {errors.fullName &&
                                    <div className="form-text text-danger">
                                        Full Name is required!
                                    </div>
                                }

                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    {...register("username", { required: true })}
                                />
                                {errors.username &&
                                    <div className="form-text text-danger">
                                        Username is required!
                                    </div>
                                }
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">
                                    Email address
                                </label>
                                <input
                                    type="email"
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