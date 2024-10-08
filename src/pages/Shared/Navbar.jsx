import { useContext } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { CgLogOut } from "react-icons/cg";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    // console.log(user.displayName)


    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    title: "Log Out Successfully",
                    showClass: {
                        popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `
                    },
                    hideClass: {
                        popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `
                    }
                });
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div className="navbar bg-gradient-to-r from-[#0677A1] to-[#0a8ebf] text-white fixed z-50 w-full shadow-lg">

            <div className='container mx-auto'>
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-gray-800 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><NavLink to='/'>Home</NavLink></li>
                            <li><a>About Us</a></li>
                            <li><a>Products</a></li>
                            <li><a>Contact Us</a></li>
                        </ul>
                    </div>
                </div>


                <div className="navbar-center flex">
                    <img className='w-12' src="https://i.ibb.co/GWkYHmd/icons8-l-96.png" alt="l" />
                    <a href="/" className="btn btn-ghost normal-case text-3xl font-bold">
                        Lunexa
                    </a>
                </div>


                <div className="navbar-end flex items-center space-x-4">
                    <Link to='/search'>
                    <button className="btn btn-ghost btn-circle">
                        <FaSearch className="h-5 w-5" />
                    </button>
                    </Link>
                    {user ? <>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button"><img className="w-14 h-14 rounded-full" src={user?.photoURL} alt="" /></div>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 space-y-4 flex flex-col items-center">
                                <img className="w-14 h-14 rounded-full" src={user?.photoURL} alt="" />
                                <h3 className="text-xl font-bold text-black">{user.displayName}</h3>
                                <li> <button onClick={handleLogOut} className="flex items-center text-black font-bold hover:text-red-600">Log Out <CgLogOut className="text-xl font-bold"></CgLogOut></button></li>
                            </ul>
                        </div>
                    </>
                        :
                        <Link to='/signIn'>
                            <button className="btn md:text-lg font-bold hover:bg-transparent border-2 border-[#0677A1] text-white bg-[#0677A1]">Sign In</button>
                        </Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;
