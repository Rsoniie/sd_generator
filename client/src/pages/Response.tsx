import React, { useState } from 'react';

const HomePage = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const images: { [key: string]: string } = {
        button1 : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPbxqmJmak5MSh6gaXAiORiQM5U-Q3c8q7Dg&s',
        button2: 'https://media.geeksforgeeks.org/wp-content/uploads/20230202105033/rate-limiter.png',
        button3: 'https://miro.medium.com/v2/resize:fit:799/1*bsdz59Udf39VYrwiNyF1Tw.jpeg'
    };

    const handleButtonClick = (imageKey: string) => {
        setSelectedImage(images[imageKey]);
    };

    const handleDownload = () => {
        if (selectedImage) {
            const link = document.createElement('a');
            link.href = selectedImage;
            link.download = 'image.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="min-h-screen flex bg-gray-100">
            <div className="w-1/6 bg-gray-800 p-4">
                <button
                    onClick={() => handleButtonClick('button1')}
                    className="w-full mb-4 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 focus:outline-none"
                >
                   Workflow
                </button>
                <button
                    onClick={() => handleButtonClick('button2')}
                    className="w-full mb-4 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 focus:outline-none"
                >
                    High level design
                </button>
                <button
                    onClick={() => handleButtonClick('button3')}
                    className="w-full mb-4 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 focus:outline-none"
                >
                    Low level design
                </button>
            </div>
            <div className="flex-1 p-8">
                {selectedImage ? (
                    <div className="flex flex-col items-center">
                        <img src={selectedImage} alt="Selected" className="mb-4" />
                        <button
                            onClick={handleDownload}
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
                        >
                            Download Image
                        </button>
                    </div>
                ) : (
                    <div className="text-center text-gray-700">
                        Please select a button to display an image.
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;