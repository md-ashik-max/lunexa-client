import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useRef } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import "swiper/swiper-bundle.css";
import { Autoplay } from "swiper/modules";

const Banner = () => {
    const axiosPublic = useAxiosPublic();
    const swiperRef = useRef(null);

    // Select status dynamically (e.g., popular or upcoming)
    const status ='Popular';
    console.log('Selected Status:', status);

    const { data: bannerProducts = [] } = useQuery({
        queryKey: ['bannerProduct', status],
        queryFn: async () => {
            const res = await axiosPublic.get(`/allProducts/banner/${status}`);
            return res.data;
        }
    });
    console.log(bannerProducts)

    const shouldLoop = bannerProducts.length > 1;  // Only loop if more than 1 slide

    // Custom navigation buttons
    const handleNext = () => {
        if (swiperRef.current) {
            swiperRef.current.slideNext();
        }
    };

    const handlePrev = () => {
        if (swiperRef.current) {
            swiperRef.current.slidePrev();
        }
    };

    return (
        <div className="relative max-w-7xl mx-auto py-24 md:h-[700px]">
            <Swiper
                onSwiper={(swiper) => swiperRef.current = swiper} // Set the swiper instance to swiperRef
                spaceBetween={30}
                slidesPerView={1}
                loop={shouldLoop}
                autoplay={{
                    delay: 3000, // 3 seconds delay between slides
                    disableOnInteraction: false, // Don't disable autoplay on user interactions
                }}
                modules={[Autoplay]} // Include the Autoplay module
                className="mySwiper"
            >
                {bannerProducts.map((product, index) => (
                    <SwiperSlide key={index}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center p-4 h-full">

                            <div>
                                <img
                                    src={product.image || "https://i.ibb.co/85ThMmT/Graphic-Design.webp"} // Use product.image if available
                                    alt={product.product_name}
                                    className="w-full h-[600px] object-cover rounded-md"
                                />
                            </div>
                            <div className="">
                                <div
                                    className="bg-cover bg-center"
                                    style={{ backgroundImage: `url('https://i.ibb.co/X5zHTCx/red-ribon.png')` }}

                                >
                                    {product.status === "Popular" ? <h3 className="text-3xl font-bold text-white p-4 text-center">Popular</h3> : <h3  className="text-3xl font-bold text-white p-4 text-center">Upcoming</h3>}

                                </div>
                                <h2 className="text-2xl font-bold mt-4">Name : {product.product_name}</h2>
                                <h3>Price : {product.price}$</h3>
                                <h3>Brand : {product.brand}</h3>
                                <h3>Category : {product.category}</h3>
                                <p className="mt-2 text-gray-700">DesCription : {product.description}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="md:absolute z-50 w-full flex md:justify-between justify-center gap-6 mt-4 top-1/2">
                <div>
                    <button
                        className='btn w-12 h-12 rounded-full bg-[#0677A1] hover:text-[#0677A1] font-bold hover:bg-white text-white'
                        onClick={handlePrev}>
                        <FaArrowLeft />
                    </button>
                </div>
                <div>
                    <button
                        className='btn w-12 h-12 rounded-full bg-[#0677A1] hover:text-[#0677A1] font-bold hover:bg-white text-white'
                        onClick={handleNext}>
                        <FaArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Banner;
