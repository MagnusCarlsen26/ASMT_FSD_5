import React, { useState, useEffect } from 'react';
import axios from 'axios';

const History = () => {
    const [submissions,setSubmissions] = useState([])

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.post("https://asmfsdserver.vercel.app/save/getHistory",{
                    username : localStorage.getItem("username")
                })

                if (!response.data.isError) {
                    setSubmissions(response.data.data.history)
                } else {
                    alert("internal server error")
                }
            } catch(error) {
                console.error(error)
                alert("internal server error.")
            }
        }
        fetchData()
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
            <div className="w-full max-w-md">
             
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-center">Your Past Submissions</h2>
                        {submissions.length === 0 ? (
                            <p className="text-center">No submissions yet.</p>
                        ) : (
                            <ul>
                                {submissions.map((submission) => (
                                    <li key={submission.id} className="mb-4 border-b border-gray-700 pb-4">
                                        <p>
                                            <strong>Product:</strong> {submission.productName}
                                        </p>
                                        <p>
                                            <strong>Rating:</strong> {submission.rating} star{submission.rating > 1 ? 's' : ''}
                                        </p>
                                        <p>
                                            <strong>Comments:</strong> {submission.comments}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
            </div>
        </div>
    );

};

export default History;
