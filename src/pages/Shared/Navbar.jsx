import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
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
                            <li><a href="/">Home</a></li>
                            <li><a href="/about">About Us</a></li>
                            <li><a href="/products">Products</a></li>
                            <li><a href="/contact">Contact Us</a></li>
                        </ul>
                    </div>
                </div>


                <div className="navbar-center">
                    <a href="/" className="btn btn-ghost normal-case text-2xl font-bold">
                        Lunexa
                    </a>
                </div>


                <div className="navbar-end flex items-center space-x-4">
                    <button className="btn btn-ghost btn-circle">
                        <FaSearch className="h-5 w-5" />
                    </button>
                    {user ? <>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button"><img className="w-14 h-14 rounded-full" src={user?.photoURL} alt="" /></div>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 space-y-4 flex flex-col items-center">
                                <img className="w-14 h-14 rounded-full" src={user?.photoURL} alt="" />
                                <h3 className="text-xl font-bold">{user?.displayName}</h3>
                                <Link to='/dashboard/leaderBoard'>
                                    <li><button className="flex items-center font-bold bg-transparent hover:text-[#0677A1]"><GiLaurelsTrophy />  LeaderBoard</button></li>
                                </Link>
                                {
                                    isAdmin ?
                                        <Link to='/dashboard/adminHome'>
                                            <li><button className="font-bold bg-transparent hover:text-[#0677A1]"><MdDashboardCustomize /> Dashboard</button></li>
                                        </Link>
                                        :
                                        isCreator ? <Link to='/dashboard/creatorHome'>
                                            <li><button className="flex items-center font-bold bg-transparent hover:text-[#0677A1]"><MdDashboardCustomize /> Dashboard</button></li>
                                        </Link>
                                            :
                                            <Link to='/dashboard/userProfile'>
                                                <li><button className="flex items-center font-bold bg-transparent hover:text-[#0677A1]"><MdDashboardCustomize /> Dashboard</button></li>
                                            </Link>
                                }
                                <li> <button onClick={handleLogOut} className="flex items-center text-black font-bold hover:text-red-600">Log Out <CgLogOut className="text-xl font-bold"></CgLogOut></button></li>
                            </ul>
                        </div>
                    </>
                        :
                        <Link to='/signIn'>
                            <button className="btn md:text-lg font-bold text-[#0677A1] bg-transparent border-2 border-[#0677A1] hover:text-white hover:bg-[#0677A1]">Sign In</button>
                        </Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;
