import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { AiFillEyeInvisible } from "react-icons/ai";

const SignIn = () => {
    const axiosPublic = useAxiosPublic();
    const { user, loading, signIn, googleLogin } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user, navigate])

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        const email = data.email;
        const password = data.password;
        signIn(email, password)
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Sign in User Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(location?.state ? location.state : "/")
            })
            .catch(error => {
                console.error(error)
                toast.error(error.message)
            })
    };

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            navigate('/')
                            Swal.fire({
                                title: "Created user successfully",
                                showClass: {
                                    popup: `animate__animated animate__fadeInUp animate__faster`
                                },
                                hideClass: {
                                    popup: `animate__animated animate__fadeOutDown animate__faster`
                                }
                            });
                        } else {
                            navigate('/')
                            Swal.fire({
                                title: "Logged in user successfully",
                                showClass: {
                                    popup: `animate__animated animate__fadeInUp animate__faster`
                                },
                                hideClass: {
                                    popup: `animate__animated animate__fadeOutDown animate__faster`
                                }
                            });

                        }
                    })
            })
    }

    if (user || loading) return;

    return (
        <div className="flex flex-col my-32 md:flex-row justify-center items-center max-w-5xl mx-auto rounded-2xl shadow-2xl bg-white">
            <div className="animate__animated animate__fadeInRight card shrink-0 w-full md:w-1/2 py-6 bg-base-100">
                <div className="flex flex-col items-center">
                    <h3 className="text-3xl font-bold">Sign In</h3>
                    <div className="flex gap-8 text-xl my-6">
                        <button onClick={() => handleGoogleLogin()} className="btn bg-transparent text-[#0677A1] border-[#0677A1] hover:text-white hover:bg-[#0677A1]">
                            <FaGoogle /> Sign In With Google
                        </button>
                    </div>
                    <div className="divider px-8">OR</div>
                    <p>Use your email password</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
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
                            {showPassword ? (
                                <span className="absolute right-2 top-4 text-xl cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                    <IoEyeSharp />
                                </span>
                            ) : (
                                <span className="absolute right-2 top-4 text-xl cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                    <AiFillEyeInvisible />
                                </span>
                            )}
                            <input type={showPassword ? "text" : "password"} placeholder="Password" name="password" className="input input-bordered w-full" {...register("password", { required: true })} />
                        </div>
                        {errors.password && <span className="text-red-500">This field is required</span>}
                        <label className="label">
                            <Link to="/forgot-password" className="label-text-alt link link-hover">Forgot password?</Link>
                        </label>
                    </div>
                    <div className="form-control">
                        <button className="btn bg-[#0677A1] text-white font-bold py-3 px-6 rounded-full shadow-md hover:bg-[#055f8b] transition-all duration-200">
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
            <div className="animate__animated animate__fadeInRight md:ml-12 w-full h-full py-6 md:py-56 flex flex-col items-center bg-gradient-to-r from-[#0677A1] to-[#0a8ebf] rounded-r-2xl rounded-t-3xl md:rounded-l-[150px] text-white text-center">
                <h3 className="text-4xl font-bold">Hello Friend!</h3>
                <p className="my-6">Sign up with your personal details to enjoy all our site's features.</p>
                <Link to='/signUp'>
                    <button className="btn bg-white text-[#0677A1] font-bold py-3 px-6 rounded-full shadow-md hover:bg-[#055f8b] hover:text-white transition-all duration-200">
                        Sign Up
                    </button>
                </Link>
            </div>
            <ToastContainer />
        </div>
    );
};

export default SignIn;
