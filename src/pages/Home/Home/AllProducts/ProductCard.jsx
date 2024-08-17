import 'animate.css';
import { FaAngleDoubleRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const { product_name,description,_id,price ,image_url} = product;
    return (
        <div className="card bg-base-100 shadow-xl border-2">
            <div className="relative group">
                <figure className="overflow-hidden h-64"><img className="h-full w-full rounded-t-xl hover:scale-150 transition duration-500 cursor-pointer object-cover" src={image_url} alt="" /></figure>
            </div>

            <div className="card-body">
                <div className='h-[70px]'>
                    <h2 className="card-title text-2xl font-bold">
                        {product_name}
                    </h2>
                </div>
                <h3 className='text-xl font-bold'>Price : ${price}</h3>
                <p className='h-16'>{description.slice(0,80)}...</p>
                <Link to={`/productDetails/${_id}`}>
                    <button className="flex btn w-full bg-transparent text-[#0677A1] border-0 font-bold hover:bg-[#0677A1] hover:text-white items-center gap-2 group">
                        View Details
                        <span className="hidden group-hover:flex text-xl animate__animated animate__fadeInLeft">
                            <FaAngleDoubleRight />
                        </span>
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;