import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEyeInvisible } from "react-icons/ai";
import { IoEyeSharp } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SignUp = () => {
    const { user, loading, createUser, updateUserProfile } = useContext(AuthContext);
    const [registerError, setRegisterError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user, navigate]);

    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit = data => {
        const email = data.email;
        const password = data.password;
        const fullName = data.fullName;
        const image = data.image;
        
        createUser(email, password)
            .then(() => {
                updateUserProfile(fullName, image)
                    .then(() => {
                        const userInfo = {
                            email: data.email,
                            name: data.fullName
                        };
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                navigate(location?.state ? location.state : "/");
                                Swal.fire({
                                    title: "Created user successfully",
                                    showClass: {
                                        popup: `animate__animated animate__fadeInUp animate__faster`
                                    },
                                    hideClass: {
                                        popup: `animate__animated animate__fadeOutDown animate__faster`
                                    }
                                });
                            });
                    });
            })
            .catch(error => {
                setRegisterError(error.message);
            });
    };

    if (user || loading) return null;

    return (
        <div className="flex flex-col my-24 md:flex-row justify-center items-center max-w-5xl mx-auto rounded-2xl shadow-2xl">
            <div className="animate__animated animate__fadeInRight w-full h-full py-6 md:py-[244px] flex flex-col items-center bg-[#0677A1] rounded-r-2xl rounded-t-3xl md:rounded-r-[150px] text-center text-white">
                <h3 className="text-4xl font-bold">Welcome Back!</h3>
                <p className="my-6">Enter your personal details to use all of the site's features</p>
                <Link to='/signIn'>
                    <button className="btn bg-white text-[#0677A1] font-bold py-3 px-6 rounded-full shadow-md hover:bg-[#0677A1] hover:text-white transition-all duration-200">Login</button>
                </Link>
            </div>
            <div className="animate__animated animate__fadeInRight card shrink-0 w-full md:w-1/2 py-6 bg-base-100">
                <div className="flex flex-col items-center">
                    <h3 className="text-3xl font-bold">Register</h3>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" placeholder="Name" name="name" className="input input-bordered" {...register("fullName", { required: true })} />
                        {errors.fullName && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input type="text" placeholder="Photo URL" name="photo" className="input input-bordered" {...register("image")} />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="Email" name="email" className="input input-bordered" {...register("email", { required: true })} />
                        {errors.email && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <div className="relative">
                            {showPassword ? 
                                <span className="absolute right-2 top-4 text-xl" onClick={() => setShowPassword(!showPassword)}>
                                    <IoEyeSharp />
                                </span> 
                                : 
                                <span className="absolute right-2 top-4 text-xl" onClick={() => setShowPassword(!showPassword)}>
                                    <AiFillEyeInvisible />
                                </span>
                            }
                            <input type={showPassword ? "text" : "password"} placeholder="password" name="password" className="input input-bordered w-full" 
                                {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])/
                                })} 
                            />
                        </div>
                        {errors.password?.type === 'required' && <span className="text-red-500">Password is required</span>}
                        {errors.password?.type === 'minLength' && <span className="text-red-500">Password must be at least 6 characters</span>}
                        {errors.password?.type === 'maxLength' && <span className="text-red-500">Password must be less than 20 characters</span>}
                        {errors.password?.type === 'pattern' && <span className="text-red-500">Password must include at least one uppercase, one lowercase, one special character, and one number</span>}
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-transparent text-[#0677A1] hover:text-white hover:bg-[#0677A1]">Register</button>
                        {registerError && <p className="text-red-600">{registerError}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
