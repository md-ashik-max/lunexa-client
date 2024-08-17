import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { FaAngleDoubleLeft } from "react-icons/fa";

const ProductDetails = () => {
    const product = useLoaderData();

    return (
        <div className="max-w-7xl pt-24 mb-24 mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={product.image_url} alt={product.product_name} className="w-full h-[500px] object-cover" />
            <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800">{product.product_name}</h2>
                <p className="mt-2 text-gray-600">{product.description}</p>
                <div className="mt-4 flex flex-col space-y-2">
                    <span className="text-xl font-bold text-red-500">${product.price}</span>
                    <span className="text-sm text-gray-500">Category: {product.category}</span>
                    <span className="text-sm text-gray-500">Brand: {product.brand}</span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                    <span className="bg-green-500 text-white px-2 py-1 text-xs font-semibold rounded">{product.status}</span>
                    <span className="text-yellow-500 text-lg font-bold">{product.ratings} ★</span>
                </div>
                <p className="mt-2 text-gray-400 text-sm">Created on: {product.product_creation_date}</p>
            </div>
            <div className='p-6'>
            <Link to='/'>
                        <button className="flex btn w-52 bg-transparent text-[#0677A1] border-[#0677A1] border-dashed font-bold hover:bg-[#0677A1] hover:text-white items-center gap-2 group">
                            <span className="hidden group-hover:flex text-xl animate__animated animate__fadeInRight">
                                <FaAngleDoubleLeft />
                            </span>
                            Back
                        </button>
                    </Link>
            </div>
        </div>
    );
};

export default ProductDetails;
