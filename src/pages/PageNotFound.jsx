import React from 'react'

const PageNotFound = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-white text-white px-4">
          <div className="text-center space-y-6">
            <h1 className="text-9xl font-extrabold text-lime-500 animate-bounce">404</h1>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-500">Oops! Page Not Found</h2>
            <p className="text-gray-700 text-lg">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <a
              href="/"
              className="inline-block mt-4 bg-orange-500 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-full transition duration-300 backtohome"
            >
              Go Back Home
            </a>
          </div>
        </div>
      );
}

export default PageNotFound