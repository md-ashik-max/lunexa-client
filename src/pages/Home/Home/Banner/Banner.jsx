import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaArrowLeft, FaArrowRight, FaPause, FaPlay } from "react-icons/fa";
import { useRef, useState } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import "swiper/swiper-bundle.css";
import { Autoplay } from "swiper/modules";

const Banner = () => {
    const axiosPublic = useAxiosPublic();
    const swiperRef = useRef(null);
    const [isAutoplay, setIsAutoplay] = useState(true);

    const status = 'Popular';

    const { data: bannerProducts = [] } = useQuery({
        queryKey: ['bannerProduct', status],
        queryFn: async () => {
            const res = await axiosPublic.get(`/allProducts/banner/${status}`);
            return res.data;
        }
    });

    const shouldLoop = bannerProducts.length > 1;

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

    const toggleAutoplay = () => {
        if (swiperRef.current) {
            if (isAutoplay) {
                swiperRef.current.autoplay.stop();
            } else {
                swiperRef.current.autoplay.start();
            }
            setIsAutoplay(!isAutoplay);
        }
    };

    return (
        <div className="relative max-w-7xl mx-auto py-24 md:h-[700px]">
            <Swiper
                onSwiper={(swiper) => swiperRef.current = swiper} 
                spaceBetween={30}
                slidesPerView={1}
                loop={shouldLoop}
                autoplay={isAutoplay ? {
                    delay: 3000, 
                    disableOnInteraction: false, 
                } : false}
                modules={[Autoplay]} 
                className="mySwiper"
            >
                {bannerProducts.map((product, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-[700px] flex items-center justify-center">
                            <img
                                src={product.image_url || "https://i.ibb.co/85ThMmT/Graphic-Design.webp"}
                                alt={product.product_name}
                                className="w-full h-full object-cover rounded-lg"
                            />
                        
                            <div
                                    className="bg-cover bg-center absolute top-12 w-80 -left-12 -rotate-45"
                                    style={{ backgroundImage:` url(https://i.ibb.co/X5zHTCx/red-ribon.png)` }}

                                >
                                    {product.status === "Popular" ? <h3 className="text-3xl font-bold text-white p-4 text-center">Popular</h3> : <h3  className="text-3xl font-bold text-white p-4 text-center">Upcoming</h3>}
                                    </div>
                        
                            <div className="absolute bottom-8 left-8 bg-white bg-opacity-70 p-6 rounded-lg shadow-lg backdrop-blur-md">
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">{product.product_name}</h2>
                                <h3 className="text-lg text-gray-700 mb-1">Price: {product.price}$</h3>
                                <h3 className="text-lg text-gray-700 mb-1">Brand: {product.brand}</h3>
                                <h3 className="text-lg text-gray-700 mb-1">Category: {product.category}</h3>
                                <p className="mt-2 text-gray-600">{product.description}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            {/* Navigation buttons */}
            <div className="absolute z-50 w-full flex justify-center gap-4 bottom-6">
                <button
                    className="btn w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 text-white shadow-lg"
                    onClick={handlePrev}>
                    <FaArrowLeft />
                </button>
                <button
                    className="btn w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 text-white shadow-lg"
                    onClick={toggleAutoplay}>
                    {isAutoplay ? <FaPause /> : <FaPlay />}
                </button>
                <button
                    className="btn w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 text-white shadow-lg"
                    onClick={handleNext}>
                    <FaArrowRight />
                </button>
            </div>
        </div>
    );
};

export default Banner;
