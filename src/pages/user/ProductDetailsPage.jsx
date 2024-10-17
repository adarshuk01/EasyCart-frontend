import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductDetails } from '../../redux/user/action/productActions';
import { addToCart } from '../../redux/user/action/cartAction'; // Import the addToCart action
import { Star } from 'lucide-react';
import ReviewForm from '../../components/user/ReviewForm';

const ProductDetailsPage = () => {
    const { id } = useParams(); // Get product ID from URL params
    const dispatch = useDispatch();
    const navigate = useNavigate(); // For navigation

    // State for the selected quantity
    const [quantity, setQuantity] = useState(1);

    // Get product details from Redux state
    const productDetails = useSelector((state) => state.user.productDetails);
    const { loading, error, product } = productDetails;
    console.log(product);

    useEffect(() => {
        dispatch(getProductDetails(id)); // Fetch product details when component mounts
    }, [dispatch, id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const rating = Math.round(product.ratings);

    // Handle Add to Cart action
    const addToCartHandler = () => {
        dispatch(addToCart(product._id, quantity)); // Dispatch the action to add the product to the cart

    };

    return (
        <div className="container mx-auto ">
            <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
                {/* Product Image */}
                <img
                    src={product.image?.url || '/path/to/default/image.jpg'}
                    alt={product.name}
                    className="w-full lg:w-1/3 h-auto object-cover rounded"
                />

                {/* Product Info */}
                <div className="w-full lg:w-2/3">
                    <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                    <p className="text-gray-600">{product.brand}</p>
                    <h3 className="text-xl text-gray-800 mb-2">₹{product.price}</h3>

                    {/* Rating */}
                    <div className="flex items-center mb-4">
                        {Array.from({ length: 5 }, (_, index) => (
                            <Star
                                key={index}
                                stroke=""
                                fill={`${index < rating ? 'blue' : 'gray'}`}
                                className="h-5 w-5"
                            />
                        ))}
                        <span className="ml-2 text-gray-600">({product.numReviews} Reviews)</span>
                    </div>

                    {/* Description */}
                    <p className="mb-4">{product.description}</p>

                    {/* Quantity Selector */}
                    <div className="flex items-center mb-4">
                        <button
                            onClick={() => setQuantity(Math.max(quantity - 1, 1))}
                            className="bg-gray-200 text-gray-700 px-2 py-1 rounded-l-md hover:bg-gray-300"
                            disabled={product.stock === 0}
                        >
                            -
                        </button>
                        <span className="px-4 py-1 text-lg font-semibold">{quantity}</span>
                        <button
                            onClick={() => setQuantity(Math.min(quantity + 1, product.stock))}
                            className="bg-gray-200 text-gray-700 px-2 py-1 rounded-r-md hover:bg-gray-300"
                            disabled={product.stock === 0 || quantity >= product.stock}
                        >
                            +
                        </button>
                    </div>
                    <div className='flex gap-2'>
                        {/* Add to Cart Button */}
                        <button
                            onClick={addToCartHandler}
                            className={`w-full text-center py-2 rounded-md text-white ${product.stock === 0
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-500 hover:bg-blue-600'
                                } transition duration-300`}
                            disabled={product.stock === 0}
                        >
                            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </button>

                        <button
                            className={`w-full text-center py-2 rounded-md ${product.stock === 0
                                ? 'bg-yellow-400 cursor-not-allowed text-black'
                                : 'border border-blue-500 text-blue-500'
                                } transition duration-300`}
                            disabled={product.stock === 0}
                        >
                            {product.stock === 0 ? 'Notify Me' : 'Buy Now'}
                        </button>
                    </div>


                    {/* Reviews Section */}
                    <div className="mt-6 h-[250px] overflow-auto">
                        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
                        {product.reviews.length === 0 ? (
                            <p>No reviews yet.</p>
                        ) : (
                            product.reviews.map((review) => (
                                <div key={review._id} className="mb-4 p-4 bg-slate-100  rounded-lg flex items-start space-x-4">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            {/* Dummy user image */}
                                            <img
                                                src={`https://ui-avatars.com/api/?name=${(review.user?.firstName || 'User')}+${(review.user?.lastName || 'Name')}&background=random&color=fff`}
                                                alt={`${review.user?.firstName || 'User'} ${review.user?.lastName || 'Name'}`}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />


                                            <div>
                                                <p className="font-semibold">
                                                    {review.user?.firstName || 'Anonymous'} {review.user?.lastName || 'User'}
                                                </p>
                                                <div className="flex items-center mb-2">
                                                    {Array.from({ length: 5 }, (_, index) => (
                                                        <Star
                                                            key={index}
                                                            stroke=""
                                                            fill={`${index < (review.rating || 0) ? 'blue' : 'gray'}`}
                                                            className="h-5 w-5"
                                                        />
                                                    ))}
                                                </div>
                                            </div>

                                        </div>
                                        <p>"{review.comment}"</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Add Review Form */}
            <div className="mt-4">
                <ReviewForm productId={id} />
            </div>
        </div>
    );
};

export default ProductDetailsPage;
