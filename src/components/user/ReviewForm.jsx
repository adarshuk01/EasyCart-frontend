import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitReview } from '../../redux/user/action/productActions';
import { Star } from 'lucide-react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

const ReviewForm = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();
  const { success, error } = useSelector((state) => state.user.productReview);

  const submitHandler = (e) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error('Please select a rating!');
      return;
    }

    const review = {
      rating,
      comment,
    };

    dispatch(submitReview(productId, review));
  };

  // Handle toast notifications when `success` or `error` changes
  useEffect(() => {
    if (success) {
      toast.success('Review submitted successfully!');
      setRating(0);
      setComment('');
    }

    if (error) {
      toast.error(error);
    }
  }, [success, error]); // Add success and error as dependencies

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  return (
    <form onSubmit={submitHandler} className="mt-4">
      <h2 className="text-lg font-bold mb-3">Write a Review</h2>

      {/* Star Rating */}
      <div className="flex items-center mb-4">
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            stroke=""
            fill={index < rating ? 'blue' : 'lightgray'}
            className="h-6 w-6 cursor-pointer"
            onClick={() => handleStarClick(index)}
          />
        ))}
      </div>

      {/* Comment Box */}
      <div className="mb-4">
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md"
          rows="4"
          placeholder="Write your review here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Submit Review
      </button>
      <ToastContainer />
    </form>
  );
};

export default ReviewForm;
