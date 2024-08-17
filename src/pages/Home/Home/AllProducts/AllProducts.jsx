import { useState, useEffect } from "react";
import { MdArrowForwardIos, MdOutlineArrowBackIos } from "react-icons/md";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import ProductCard from "./ProductCard";

const AllProducts = () => {
    const axiosPublic = useAxiosPublic();
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedPriceRange, setSelectedPriceRange] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    const fetchProductsByCategory = async () => {
        let url = '/allProducts';
        if (selectedCategory) {
            url = `/products/category/${selectedCategory}`;
        }

        const { data } = await axiosPublic.get(url);
        setAllProducts(data);
        setFilteredProducts(data); // Initialize filteredProducts with all category products
    };

    useEffect(() => {
        fetchProductsByCategory();
    }, [selectedCategory]);

    useEffect(() => {
        let tempProducts = [...allProducts];

        // Apply brand filter
        if (selectedBrand) {
            tempProducts = tempProducts.filter(product => product.brand === selectedBrand);
        }

        // Apply price range filter
        if (selectedPriceRange) {
            if (selectedPriceRange === 'low') {
                tempProducts = tempProducts.filter(product => product.price < 500);
            } else if (selectedPriceRange === 'mid') {
                tempProducts = tempProducts.filter(product => product.price >= 500 && product.price <= 1000);
            } else if (selectedPriceRange === 'high') {
                tempProducts = tempProducts.filter(product => product.price > 1000);
            }
        }

        // Apply sorting
        if (sortOrder) {
            if (sortOrder === 'priceLowHigh') {
                tempProducts.sort((a, b) => a.price - b.price);
            } else if (sortOrder === 'priceHighLow') {
                tempProducts.sort((a, b) => b.price - a.price);
            } else if (sortOrder === 'newest') {
                tempProducts.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
            }
        }

        setFilteredProducts(tempProducts);
    }, [selectedBrand, selectedPriceRange, sortOrder, allProducts]);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

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
                {/* Filter by Category */}
                <select
                    className="border border-gray-300 px-4 py-2 rounded-md focus:ring focus:ring-pink-300 transition duration-200"
                    onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        setCurrentPage(1); // Reset to page 1 on category change
                    }}
                >
                    <option value="">All Categories</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Smartphones">Smartphones</option>
                    <option value="Audio">Audio</option>
                    <option value="Cameras">Cameras</option>
                    <option value="Wearables">Wearables</option>
                    <option value="Smart Home">Smart Home</option>
                    <option value="Televisions">Televisions</option>
                    <option value="Gaming Consoles">Gaming Consoles</option>
                    <option value="Personal Care">Personal Care</option>
                    <option value="Kitchen Appliances">Kitchen Appliances</option>
                    <option value="Accessories">Accessories</option>
                    <option value="E-Readers">E-Readers</option>
                    <option value="Gaming Accessories">Gaming Accessories</option>
                    <option value="Drones">Drones</option>
                    <option value="Camera Accessories">Camera Accessories</option>
                </select>

                {/* Filter by Brand */}
                <select
                    className="border border-gray-300 px-4 py-2 rounded-md focus:ring focus:ring-pink-300 transition duration-200"
                    onChange={(e) => setSelectedBrand(e.target.value)}
                >
                    <option value="">All Brands</option>
                    <option value="Apple">Apple</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Dell">Dell</option>
                    <option value="LG">LG</option>
                    <option value="Google">Google</option>
                    <option value="Sony">Sony</option>
                    <option value="Microsoft">Microsoft</option>
                    <option value="HP">HP</option>
                    <option value="Ring">Ring</option>
                    <option value="Razer">Razer</option>
                    <option value="Asus">Asus</option>
                    <option value="Eufy">Eufy</option>
                    <option value="Bose">Bose</option>
                    <option value="Garmin">Garmin</option>
                    <option value="Canon">Canon</option>
                    <option value="Anker">Anker</option>
                    <option value="DJI">DJI</option>
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
                    Showing {indexOfFirstItem + 1} to {indexOfLastItem} of {filteredProducts.length}
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
