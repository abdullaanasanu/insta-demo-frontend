import { useState } from "react"
import UploadImage from "../uploads/UploadImage";
import { Controller, useForm } from "react-hook-form";
import 'antd/dist/antd.css';
import axios from "axios";
import toast from "react-hot-toast";

export default function CreateFeed(props) {
    const [tab, setTab] = useState("image");
    const { control, register, handleSubmit, watch, reset, formState: { errors } } = useForm();

    const createPost = (data) => {
        const token = localStorage.getItem("auth")
        console.log('data -> ', data);
        axios.post(process.env.REACT_APP_BACKEND_API + "post/create", {
            ...data, 
            contentType: tab
        },{
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then((res) => {
                console.log('response', res.data);
                toast.success("You created a new post!")
                reset()
            }).catch(err => {
                console.log('Error ', err.response);
                toast.error(err.response.data.message)
            })
    }

    return <>
        <div className="col-md-7 card text-center my-4">
            <div className="card-header">
                <ul className="nav nav-pills card-header-pills">
                    <li className="nav-item">
                        <a className={`nav-link ${tab === "image" && "active"}`} onClick={() => setTab("image")}>
                            Image
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link ${tab === "video" && "active"}`} onClick={() => setTab("video")}>
                            Video
                        </a>
                    </li>
                </ul>
            </div>
            <div className="card-body">
                <h5 className="card-title">Upload Image</h5>
                <form onSubmit={handleSubmit(createPost)}>
                    <Controller
                        control={control}
                        name="contentLink"
                        rules={{ required: true }}
                        render={({
                            field: { onChange, value },
                            fieldState: { invalid, isTouched, isDirty, error },
                            formState,
                        }) => (
                            <UploadImage onChange={onChange} value={value} type={tab} />
                        )}
                    />
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">
                            Description
                        </label>
                        <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows={3}
                            defaultValue={""}
                            {...register("description", { required: true })}
                        />
                    </div>


                    <div class="d-grid gap-2">
                        <button type="submit" className="btn btn-primary">
                            Post
                        </button>

                    </div>
                </form>


            </div>
        </div>

    </>
} 