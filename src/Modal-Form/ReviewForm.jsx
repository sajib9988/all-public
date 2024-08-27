import { useState } from 'react';

const ReviewForm = ({ onSubmit }) => {
    const [rating, setRating] = useState(''); // State to manage the rating

    const handleSubmit = (e) => {
        e.preventDefault();
        const review = e.target.review.value; // Get review text
        onSubmit({ rating, review }); // Pass both rating and review to the parent component
        e.target.reset(); // Reset form fields
        setRating(''); // Reset rating state
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="review">
                    Write a Review
                </label>
                <textarea
                    id="review"
                    name="review"
                    rows="4"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Write your review here..."
                    required
                ></textarea>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rating">
                    Rating (out of 5)
                </label>
                <input
                    type="number"
                    id="rating"
                    name="rating"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter rating"
                    required
                />
            </div>
            <button
                type="submit"
                className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Submit Review
            </button>
        </form>
    );
};

export default ReviewForm;
