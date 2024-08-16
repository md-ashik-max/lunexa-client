import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { MdArrowForwardIos, MdOutlineArrowBackIos } from "react-icons/md";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import ProductCard from "./ProductCard";

const AllProducts = () => {
    const axiosPublic = useAxiosPublic();
    const [allProducts, setAllProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedPriceRange, setSelectedPriceRange] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    const fetchProducts = async () => {
        let url = '/allProducts';

        if (selectedBrand) url = `/products/brand/${selectedBrand}`;
        if (selectedCategory) url = `/products/category/${selectedCategory}`;
        if (selectedPriceRange) url = `/products/price/${selectedPriceRange}`;
        if (sortOrder) url = `/products/sort/${sortOrder}`;

        const { data } = await axiosPublic.get(url);
        setAllProducts(data);
    };

    useEffect(() => {
        fetchProducts();
    }, [selectedBrand, selectedCategory, selectedPriceRange, sortOrder]);

    const totalPages = Math.ceil(allProducts.length / itemsPerPage);

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
        <div className="max-w-7xl mx-6 lg:mx-auto my-28">
            <div className="text-center">
                <h2 className="text-4xl font-bold font-roboto my-3">OUR ALL <span className="text-[#E64398]">PRODUCTS</span></h2>
                <div className="flex flex-col justify-center items-center space-y-2">
                    <img className="w-12" src="https://i.ibb.co/2sFHBqw/line-thin.png" alt="" />
                    <img className="w-16" src="https://i.ibb.co/2sFHBqw/line-thin.png" alt="" />
                </div>
                <p className="mt-3">Find the best products tailored to your needs. Filter by brand, category, or price range, and sort them as per your preference.</p>
            </div>

            <div className="my-8 flex flex-wrap gap-4 justify-center">
                {/* Filter by Brand */}
                <select
                    className="border border-gray-300 px-4 py-2 rounded-md focus:ring focus:ring-pink-300 transition duration-200"
                    onChange={(e) => setSelectedBrand(e.target.value)}
                >
                    <option value="">All Brands</option>
                    <option value="Dell">Dell</option>
                    <option value="Samsung">Samsung</option>
                    <option value="LG">LG</option>
                    <option value="Google">Google</option>
                    <option value="Sony">Sony</option>
                    <option value="Apple">Apple</option>
                    <option value="Apple">Apple</option>
                    <option value="Apple">Apple</option>
                    <option value="Apple">Apple</option>
                    <option value="Apple">Apple</option>
                </select>

                {/* Filter by Category */}
                <select
                    className="border border-gray-300 px-4 py-2 rounded-md focus:ring focus:ring-pink-300 transition duration-200"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Desktops">Desktops</option>
                    <option value="Monitors">Monitors</option>
                    {/* Add more categories as needed */}
                </select>

                {/* Filter by Price Range */}
                <select
                    className="border border-gray-300 px-4 py-2 rounded-md focus:ring focus:ring-pink-300 transition duration-200"
                    onChange={(e) => setSelectedPriceRange(e.target.value)}
                >
                    <option value="">All Prices</option>
                    <option value="low">Below $500</option>
                    <option value="mid">$500 - $1000</option>
                    <option value="high">Above $1000</option>
                </select>

                {/* Sorting */}
                <select
                    className="border border-gray-300 px-4 py-2 rounded-md focus:ring focus:ring-pink-300 transition duration-200"
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="">Sort By</option>
                    <option value="priceLowHigh">Price: Low to High</option>
                    <option value="priceHighLow">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {
                    currentItems.map((product, index) => <ProductCard key={index} product={product}></ProductCard>)
                }
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

export default AllProducts;
