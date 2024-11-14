import React, { useState } from 'react';
import axios from 'axios';

const CarList = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState(null);
    const [tags, setTags] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Form data setup for multipart handling
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        if (images) {
            Array.from(images).forEach((image) => {
                formData.append('images', image);
            });
        }
        formData.append('tags', tags);

        try {
            const response = await axios.post('http://localhost:4000/api/docs/cars/addcars', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log(response.data.message);
            alert('Car added successfully!');
            // Clear the form after submission
            setTitle('');
            setDescription('');
            setImages(null);
            setTags('');
        } catch (error) {
            console.error('Error creating car:', error);
            alert('Error creating car');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
                <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">Add New Car</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-600 font-medium mb-2">Title:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 font-medium mb-2">Description:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-gray-600 font-medium mb-2">Images:</label>
                        <input
                            type="file"
                            multiple
                            onChange={(e) => setImages(e.target.files)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 font-medium mb-2">Tags:</label>
                        <input
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="Comma separated tags (e.g., 'SUV, Sedan, Electric')"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Add Car
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CarList;
