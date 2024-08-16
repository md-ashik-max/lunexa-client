import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';

const Navbar = () => {
    return (
        <div className="navbar bg-gray-800 text-white fixed z-50 w-full shadow-lg">

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
                    <button className="btn btn-outline btn-primary flex items-center">
                        <FaUser className="h-5 w-5 mr-2" />
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
