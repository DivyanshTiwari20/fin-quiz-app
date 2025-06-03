'use client';

import Link from 'next/link'; // Import Link for navigation
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Import Card components
import { Button } from '@/components/ui/button'; // Import Button component

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4 flex-col">
      <Card className="w-full max-w-md mx-auto text-center shadow-lg rounded-xl bg-white">
        <CardHeader className="pb-6">
          {/* Image moved inside the CardHeader */}
          <img
            src="./logo.png" // Using your specified local image path
            alt="FinLingo Logo"
            className="mb-4 rounded-lg shadow-md w-24 h-auto block mx-auto md:w-32" // Resized to be even smaller: w-24 (mobile), md:w-32 (medium screens and up)
            onError={(e) => { e.target.onerror = null; e.target.src="./logo.png" }} // Fallback for image loading errors
          />
          <CardTitle className="text-4xl font-extrabold text-green-700 mb-4">
            FinLingo
          </CardTitle>
        </CardHeader>
      
        <CardContent className="space-y-6 p-6">
      
          <p className="text-lg text-gray-700 leading-relaxed my-3">
            An financial quiz app to Sharpen your financial knowledge with engaging quizzes.
            {/* Login to start your learning journey! */}
          </p>
          <Link href="/login">
            <Button className="w-full py-3 text-lg font-bold bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
              Get Started
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
