'use client';

import { fetchQuestionsWithCache } from '@/lib/cache';
import { useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export default function QuizPage() {
  const [allQuestions, setAllQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  // FIX: Added setWrongAnswers here
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [showInterimResults, setShowInterimResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Parse options as object ---
  const safeParseOptions = useCallback((optionsInput) => {
    // console.log('safeParseOptions: Input received:', optionsInput, 'Type:', typeof optionsInput); // Debug input

    // If it's already an object, return it directly
    if (typeof optionsInput === 'object' && optionsInput !== null && !Array.isArray(optionsInput)) {
      return optionsInput;
    }
    // If it's a string, attempt to parse as JSON
    if (typeof optionsInput === 'string') {
      try {
        const parsed = JSON.parse(optionsInput);
        // console.log('safeParseOptions: Parsed JSON content:', parsed, 'Type:', typeof parsed); // Debug parsed

        // If parsed result is an object (e.g., from "{\"a\": \"opt1\", \"b\": \"opt2\"}")
        if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
          return parsed;
        }
      } catch (e) {
        console.warn('Failed to parse options string:', e);
      }
    }
    // Default fallback: return an empty object if input is not a valid object or parseable string to object
    return {};
  }, []);

  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);
      try {
        const data = await fetchQuestionsWithCache();
        const parsed = data.map(q => ({
          ...q,
          options: safeParseOptions(q.options),
        }));
        setAllQuestions(parsed.sort(() => Math.random() - 0.5));
      } catch (err) {
        setError('Could not load questions.');
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [safeParseOptions]);

  const checkAnswer = (selectedKey) => {
    if (showInterimResults) return;

    const current = allQuestions[currentQuestionIndex];
    let newCorrect = correctAnswers;
    let newWrong = wrongAnswers;

    if (selectedKey === current.correct) {
      newCorrect += 1;
    } else {
      newWrong += 1;
    }

    setCorrectAnswers(newCorrect);
    // FIX: Calling setWrongAnswers now
    setWrongAnswers(newWrong);


    const newScore = newCorrect - Math.floor(newWrong / 2);
    setScore(newScore);

    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex < allQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
      if (nextIndex % 5 === 0) {
        setShowInterimResults(true);
      }
    } else {
      const finalScore = newCorrect - Math.floor(newWrong / 2);
      const bonusCoins = Math.max(0, Math.floor(newCorrect / 3) - Math.floor(newWrong / 2));
      window.location.href = `/results?score=${finalScore}&coins=${bonusCoins}`;
    }
  };

  const handleContinue = () => {
    setShowInterimResults(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <Card className="w-full max-w-md mx-auto text-center shadow-lg rounded-xl bg-white border border-green-200">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <svg className="animate-spin h-10 w-10 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
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

  if (showInterimResults) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <Card className="w-full max-w-md mx-auto text-center shadow-lg rounded-xl bg-white border border-green-200">
          <CardHeader className="pb-6">
            <CardTitle className="text-3xl font-extrabold text-green-700 mb-2">Batch Complete!</CardTitle>
            <CardDescription className="text-gray-600">
              Your progress after this set of questions.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="text-lg text-gray-700">
              Total Correct Answers: <span className="text-green-500 font-bold">{correctAnswers}</span>
            </div>
            <div className="text-lg text-gray-700">
              Total Wrong Answers: <span className="text-red-500 font-bold">{wrongAnswers}</span>
            </div>
            <div className="text-xl font-semibold text-gray-800">
              Current Score: <span className="text-green-600 text-2xl">{score}</span>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center pt-4">
            <Button onClick={handleContinue} className="w-full py-3 text-lg font-bold bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
              Continue Quiz
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const currentQuestion = allQuestions[currentQuestionIndex];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-xl mx-auto shadow-lg rounded-xl bg-white border border-green-200">
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl font-extrabold text-green-700 mb-2">
            Question {currentQuestionIndex + 1} / {allQuestions.length}
          </CardTitle>
          <CardDescription className="text-gray-600 text-md">Choose the correct answer.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-xl font-semibold text-gray-900 leading-relaxed">
            {currentQuestion.question}
          </p>
          <div className="grid grid-cols-1 gap-4">
            {currentQuestion.options &&
              Object.entries(currentQuestion.options).map(([key, value], idx) => (
                <Button
                  key={key}
                  onClick={() => checkAnswer(key)}
                  className="w-full py-3 text-lg font-medium bg-green-500 hover:bg-green-600 text-white rounded-md shadow-sm transition-all duration-200 ease-in-out"
                >
                  {value}
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