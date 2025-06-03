// QuizPage.js
'use client';

import { useEffect, useState, useCallback } from 'react';
import { superbase } from '@/lib/supabaseClient'; // Ensure this path is correct
import { Button } from '@/components/ui/button'; // Shadcn UI Button
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'; // Shadcn UI Card

export default function QuizPage() {
  const [allQuestions, setAllQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [showInterimResults, setShowInterimResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Preserved Original JSON Parsing Logic ---
  // This function is designed to handle options data in various formats
  // as it might come from Supabase (array, object, or JSON string of either).
  const safeParseOptions = useCallback((optionsInput) => {
    // 1. If it's already an array, return it directly.
    if (Array.isArray(optionsInput)) {
      return optionsInput;
    }
    // 2. If it's an object (e.g., if JSON.parse already converted a JSON object),
    //    convert its values to an array.
    if (typeof optionsInput === 'object' && optionsInput !== null) {
      return Object.values(optionsInput);
    }
    // 3. If it's a string, attempt to parse as JSON first.
    if (typeof optionsInput === 'string') {
      try {
        const parsed = JSON.parse(optionsInput);
        // If parsed result is an array, return it.
        if (Array.isArray(parsed)) {
          return parsed;
        }
        // If parsed result is an object, convert its values to an array.
        if (typeof parsed === 'object' && parsed !== null) {
          return Object.values(parsed);
        }
        // If JSON parsing yielded a non-array/non-object value (e.g., a number, boolean, null),
        // or if the original string was not valid JSON, fall back to splitting by comma.
        console.warn("Parsed JSON was not an array/object, falling back to string split.");
        return optionsInput.split(',').map(opt => opt.trim());
      } catch (e) {
        // JSON parsing failed, indicating it's likely a simple comma-separated string.
        console.warn("JSON parsing failed, falling back to string split:", optionsInput, e);
        return optionsInput.split(',').map(opt => opt.trim());
      }
    }
    // 4. Default fallback for any unexpected type, return an empty array.
    console.error("Unexpected options input type, returning empty array:", optionsInput);
    return [];
  }, []);
  // --- End of Original JSON Parsing Logic Preservation ---

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch all 25 questions
        const { data, error: supabaseError } = await superbase
          .from('questions')
          .select('*');

        if (supabaseError) {
          console.error('Supabase fetch error:', supabaseError);
          setError('Failed to load questions. Please try again.');
        } else {
          // Apply the robust safeParseOptions to each question's options
          const formattedData = data.map(q => ({
            ...q,
            options: safeParseOptions(q.options),
          }));
          setAllQuestions(formattedData);
        }
      } catch (e) {
        console.error('Unexpected error during fetch:', e);
        setError('An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [safeParseOptions]);

  const checkAnswer = (selected) => {
    if (showInterimResults) return; // Prevent interaction during interim results display

    const current = allQuestions[currentQuestionIndex];

    if (selected === current.correct) {
      setCorrectAnswers(c => c + 1);
      setScore(s => s + 10);
    } else {
      setWrongAnswers(w => w + 1);
    }

    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex < allQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
      // Check if it's the end of a 5-question batch
      if (nextIndex % 5 === 0) {
        setShowInterimResults(true);
      }
    } else {
      // All questions have been answered
      const finalScore = score + (selected === current.correct ? 10 : 0); // Include points for the last question
      const bonusCoins = Math.max(0, Math.floor(correctAnswers / 3) - Math.floor(wrongAnswers / 2));
      window.location.href = `/results?score=${finalScore}&coins=${bonusCoins}`;
    }
  };

  const handleContinue = () => {
    setShowInterimResults(false);
  };

  // --- Loading, Error, No Questions States ---
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <Card className="w-full max-w-md mx-auto text-center shadow-lg rounded-xl bg-white border border-green-200">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <svg className="animate-spin h-10 w-10 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-4 text-lg font-semibold text-gray-800">Loading Questions...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50 p-4">
        <Card className="w-full max-w-md mx-auto text-center shadow-lg rounded-xl bg-white border border-red-200">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-red-700">Error!</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-lg text-gray-800">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!allQuestions.length && !loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <Card className="w-full max-w-md mx-auto text-center shadow-lg rounded-xl bg-white border border-gray-200">
          <CardContent className="p-6">
            <p className="text-lg font-semibold text-gray-800">No questions found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // --- Interim Results Display (integrated into QuizPage.js) ---
  if (showInterimResults) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <Card className="w-full max-w-md mx-auto text-center shadow-lg rounded-xl bg-white border border-green-200">
          <CardHeader className="pb-6">
            <CardTitle className="text-3xl font-extrabold text-green-700 mb-2">
              Batch Complete!
            </CardTitle>
            <CardDescription className="text-gray-600">
              Your progress after this set of questions.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="text-xl font-semibold text-gray-800">
              Current Score: <span className="text-green-600 text-2xl">{score}</span>
            </div>
            <div className="text-lg text-gray-700">
              Correct Answers: <span className="text-green-500 font-bold">{correctAnswers}</span>
            </div>
            <div className="text-lg text-gray-700">
              Wrong Answers: <span className="text-red-500 font-bold">{wrongAnswers}</span>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center pt-4">
            <Button
              onClick={handleContinue}
              className="w-full py-3 text-lg font-bold bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Continue Quiz
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // --- Main Quiz Question Display ---
  const currentQuestion = allQuestions[currentQuestionIndex];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-xl mx-auto shadow-lg rounded-xl bg-white border border-green-200">
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl font-extrabold text-green-700 mb-2">
            Question {currentQuestionIndex + 1} / {allQuestions.length}
          </CardTitle>
          <CardDescription className="text-gray-600 text-md">
            Choose the correct answer.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-xl font-semibold text-gray-900 leading-relaxed">
            {currentQuestion.question}
          </p>
          <div className="grid grid-cols-1 gap-4">
            {/* Ensure currentQuestion.options is an array before mapping */}
            {Array.isArray(currentQuestion.options) && currentQuestion.options.map((opt, idx) => (
              <Button
                key={idx}
                onClick={() => checkAnswer(opt)}
                className="w-full py-3 text-lg font-medium bg-green-500 hover:bg-green-600 text-white rounded-md shadow-sm transition-all duration-200 ease-in-out"
              >
                {opt}
              </Button>
            ))}
          </div>
        </CardContent>
        <CardFooter className="pt-6 text-center text-gray-700 text-sm">
          Your current score: <span className="font-bold text-green-600">{score}</span>
        </CardFooter>
      </Card>
    </div>
  );
}