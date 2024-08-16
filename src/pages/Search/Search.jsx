import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ProductCard from "../Home/Home/AllProducts/ProductCard";
import { MdArrowForwardIos, MdOutlineArrowBackIos } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Search = () => {
    const [search, setSearch] = useState("");
    const [filteredProduct, setFilteredProduct] = useState([]);
    const [hidden, setHidden] = useState('hidden');

    const handleChange = (event) => {
        setSearch(event.target.value.toLowerCase());
        const filteredData = allProducts.filter((product) => {
            const searchFields = ['product_name'];
            return searchFields.some((field) =>
                product[field].toLowerCase().includes(search)
            );
        });
        setHidden(filteredData.length > 0 ? 'mt-4 absolute z-10 bg-base-100 px-12 pb-12 rounded-xl' : 'hidden');
        setFilteredProduct(filteredData);
    };

    const axiosPublic = useAxiosPublic();
    const { data: allProducts = [] } = useQuery({
        queryKey: ['allProducts'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allProducts');
            return res.data;
        }
    });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const totalPages = Math.ceil(allProducts.length / itemsPerPage);

    // Calculate the current items to display
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = allProducts.slice(indexOfFirstItem, indexOfLastItem);

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="max-w-7xl mx-6 lg:mx-auto pt-24 mb-28">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-[#0677A1] mb-3">Discover Our Unique Products</h2>
                <p className="text-lg text-gray-600">Find the perfect item from our wide range of high-quality products. Use the search box below to explore our offerings and make your selection today!</p>
            </div>

            <div className="relative">
                <input
                    type="text"
                    placeholder="Search for products by name"
                    onChange={handleChange}
                    value={search}
                    autoComplete="off"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#0677A1] focus:border-transparent transition duration-300 ease-in-out"
                />
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                    <FaSearch className="text-gray-500" />
                </div>
            </div>

            <div className={hidden}>
                {filteredProduct.length > 0 ? (
                    <ul className="mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-md">
                        {filteredProduct.map((product) => (
                            <Link key={product._id} to={`/productDetails/${product._id}`}>
                                <li className="hover:text-white hover:p-2 rounded-xl hover:bg-slate-500 transition-colors duration-300">
                                    {product.product_name}
                                </li>
                            </Link>
                        ))}
                    </ul>
                ) : (
                    <p className="mt-4 text-center">No products found matching your search.</p>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {currentItems.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>

            <div className="md:flex justify-between items-center my-6 md:my-12 md:border border-dashed rounded-md px-3">
                <span>
                    Showing {indexOfFirstItem + 1} to {indexOfLastItem} of {allProducts.length}
                </span>
                <div className="flex items-center my-4">
                    <button
                        onClick={prevPage}
                        className={`p-2 text-[#0677A1] border border-dashed border-[#0677A1] rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
                        disabled={currentPage === 1}
                    >
                        <MdOutlineArrowBackIos />
                    </button>
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToPage(index + 1)}
                            className={`px-3 py-1 mx-1 text-gray-700 border rounded ${currentPage === index + 1 ? 'bg-[#0677A1] text-white' : 'hover:bg-gray-200'}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={nextPage}
                        className={`p-2 text-[#0677A1] border border-dashed border-[#0677A1] rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-transparent'}`}
                        disabled={currentPage === totalPages}
                    >
                        <MdArrowForwardIos />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Search;
