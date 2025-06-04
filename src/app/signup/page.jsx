'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Import Link for navigation
import { superbase } from '@/lib/supabaseClient';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'; // Import Card components

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' }); // For success/error messages
  const router = useRouter();

  const handleSignup = async () => {
    setMessage({ type: '', text: '' }); // Clear previous messages
    setLoading(true);
    const { error } = await superbase.auth.signUp({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      setMessage({ type: 'error', text: 'Signup failed: ' + error.message });
    } else {
      setMessage({ type: 'success', text: 'Signup successful! Please check your email for verification if required, then log in.' });
      // Optionally, redirect after a short delay to allow user to read message
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md mx-auto text-center shadow-lg rounded-xl bg-white border border-green-200">
        <CardHeader className="pb-6">
          <CardTitle className="text-3xl font-extrabold text-green-700 mb-2">
            Sign Up
          </CardTitle>
          <CardDescription className="text-gray-600 text-md">
            Create your account to get started.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          {message.text && (
            <div className={`p-3 rounded-lg border text-sm ${
              message.type === 'error'
                ? 'bg-red-50 text-red-700 border-red-200'
                : 'bg-green-50 text-green-700 border-green-200'
            }`}>
              {message.text}
            </div>
          )}
          <Input
            placeholder="Enter your username"
            value={String}
            onChange={(e) => setName(e.target.value)}
            type="string"

            className="w-full p-3 rounded-md border border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
          />
          <Input
            placeholder="Enter your name"
            value={String}
            onChange={(e) => setName(e.target.value)}
            type="string"

            className="w-full p-3 rounded-md border border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
          />
          <Input
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoComplete="email"
            className="w-full p-3 rounded-md border border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
          />
          <Input
            type="password"
            placeholder="Choose a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            className="w-full p-3 rounded-md border border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
          />
          <Button
            onClick={handleSignup}
            disabled={loading}
            className="w-full py-3 text-lg font-bold bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
          <div className="text-center text-sm text-gray-600 pt-4">
            Already have an account?{' '}
            <Link href="/login" className="text-green-600 hover:text-green-700 font-semibold underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
