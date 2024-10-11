import React, { useState } from 'react';
import './../App.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FeedbackForm = () => {
  const [product, setProduct] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comments, setComments] = useState('');
  const [username, setUsername] = useState("")
  const products = ['Product A', 'Product B', 'Product C'];
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const resopnse = await axios.post("https://asmfsdserver.vercel.app/save/saveFeedback",{
        username,
        productName : product,
        rating,
        comments
      })
      if (!resopnse.data.isError) {
        if (resopnse.data.data.message === "Feedback saved successfully !!.") {
          alert("Feedback saved successfully !!")
          localStorage.setItem("username",username)
        } else {
          alert(resopnse.data.data.message)
        }
      } else {
        alert("There was some error while saving your feedback.")
      }
    } catch (error) {
      console.error(error)
      alert("Internal server error.")
    }
    setProduct('');
    setRating(0);
    setComments('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Submit Your Feedback</h2>

        <div className="mb-6">
          <label className="block mb-2">Your Name</label>
          <textarea
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Select Product</label>
          <select
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
          >
            <option value="">-- Select a product --</option>
            {products.map((prod, idx) => (
              <option key={idx} value={prod}>
                {prod}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Rating</label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-8 h-8 cursor-pointer ${
                  (hoverRating || rating) >= star ? 'text-yellow-400' : 'text-gray-500'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.343 4.131a1 1 0 00.95.69h4.351c.969 0 1.371 1.24.588 1.81l-3.518 2.556a1 1 0 00-.364 1.118l1.343 4.131c.3.921-.755 1.688-1.54 1.118L10 13.011l-3.518 2.556c-.785.57-1.84-.197-1.54-1.118l1.343-4.131a1 1 0 00-.364-1.118L2.403 9.558c-.783-.57-.38-1.81.588-1.81h4.351a1 1 0 00.95-.69l1.343-4.131z" />
              </svg>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-2">Comments</label>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
            rows="4"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
        >
          Submit Feedback
        </button>
        <br></br>
        <br></br>
        <div
          className="mb-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded cursor-pointer text-center"
            onClick={() => navigate("/history")}
        >
          View Past Submissions
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
