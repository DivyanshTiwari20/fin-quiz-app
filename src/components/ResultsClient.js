// ResultsClient.js
'use client';

import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ResultsClient() {
  const searchParams = useSearchParams();
  const score = searchParams.get('score');
  const coins = searchParams.get('coins');

  const handleGoHome = () => {
    window.location.href = '/'; // Adjust this to your actual home page route if different
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md mx-auto text-center shadow-lg rounded-xl bg-white border border-green-200">
        <CardHeader className="pb-6">
          <CardTitle className="text-3xl font-extrabold text-green-700 mb-2">
            Quiz Complete!
          </CardTitle>
          <CardDescription className="text-gray-700 text-md">
            Here are your final results.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="text-2xl font-bold text-gray-900">
              Your Final Score:
            </div>
            <div className="text-5xl font-extrabold text-green-600">
              {score}
            </div>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="text-xl font-semibold text-gray-800">
              Coins Earned:
            </div>
            <div className="text-4xl font-extrabold text-yellow-500">
              {coins}
            </div>
          </div>
        </CardContent>
        <div className="pt-6">
          <Button
            onClick={handleGoHome}
            className="w-full py-3 text-lg font-bold bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Go to Home
          </Button>
        </div>
      </Card>
    </div>
  );
}
