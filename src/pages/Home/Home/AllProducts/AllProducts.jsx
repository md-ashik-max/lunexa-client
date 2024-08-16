import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { MdArrowForwardIos, MdOutlineArrowBackIos } from "react-icons/md";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import ProductCard from "./ProductCard";


const AllProducts = () => {
    const axiosPublic = useAxiosPublic();
    const { data: allProducts = [] } = useQuery({
        queryKey: ['allProducts'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allProducts')
            return res.data
        }
    })

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
        <div className="max-w-7xl mx-6 lg:mx-auto my-28">
            <div className="text-center">
                <h2 className="text-4xl font-bold font-roboto my-3">OUR ALL <span className="text-[#E64398]">PRODUCTS</span></h2>
                <div className="flex flex-col justify-center items-center space-y-2">
                    <img className="w-12" src="https://i.ibb.co/2sFHBqw/line-thin.png" alt="" />
                    <img className="w-16" src="https://i.ibb.co/2sFHBqw/line-thin.png" alt="" />
                </div>
                <p className="mt-3">Join our exciting contest now! Showcase your creativity and win amazing prizes. <br /> Do not miss this chance to shine. Enter today and let your talents be recognized!</p>

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