import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';




const HomePage = () => {
    const navigate = useNavigate();


    const inputRef = useRef<HTMLInputElement>(null);
    const [darkMode, setDarkMode] = useState(() => {
        // Load theme preference from local storage (persistent theme)
        return localStorage.getItem("theme") === "dark";
    });

    const handleSubmit = () => {
        if(inputRef.current) {

            localStorage.setItem("prompt", inputRef.current.value);
            console.log(inputRef.current.value);

            inputRef.current.value = "";
            navigate('/response');
        }
        else 
        {
            alert("Please enter a Prompt");
        }
        
    }

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
            <nav className="site-navigation py-4 dark:bg-gray-800 bg-white shadow-md">
                <div className="container mx-auto flex items-center justify-end px-5">
                    <button
                        onClick={toggleTheme}
                        className="font-semibold text-lg text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                    >
                        {darkMode ? 'Light Mode ☀️' : 'Dark Mode 🌙'}
                    </button>
                </div>
            </nav>
            <main className="flex-1 flex flex-col items-center justify-center bg-white dark:bg-gray-900">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-8">
                    What do you want to make ?
                </h1>

                <section className="search-input-section bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-md rounded-full flex items-center w-96 hover:shadow-lg transition-shadow">
                    <input
                        type="text"
                        ref = {inputRef}
                        placeholder="Search Google or type a URL"
                        className="search-input flex-1 py-4 px-6 focus:outline-none rounded-full bg-transparent text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500"
                    />
                </section>

                <section className="buttons-section mt-8">
                    <button className="bg-blue-600 dark:bg-blue-500 text-white px-6 py-3 rounded-lg mr-4 hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none transition-colors" onClick={handleSubmit}>
                        Submit
                    </button>
                    {/* <button className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-6 py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none transition-colors">
                        Cancel
                    </button> */}
                </section>

            </main>
        </div>
    );
};

export default HomePage;