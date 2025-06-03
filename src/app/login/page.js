'use client'; // Enables React hooks in Next.js app directory

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Import Link for navigation
import { superbase } from '@/lib/supabaseClient'; // Note: Corrected to 'supabase'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'; // Import Card components

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    setErrorMsg('');
    setLoading(true);
    const { error } = await superbase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      setErrorMsg(error.message || 'Login failed');
    } else {
      router.push('/quiz');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md mx-auto text-center shadow-lg rounded-xl bg-white border border-green-200">
        <CardHeader className="pb-6">
          <CardTitle className="text-3xl font-extrabold text-green-700 mb-2">
            Login
          </CardTitle>
          <CardDescription className="text-gray-600 text-md">
            Enter your credentials to continue.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          {errorMsg && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg border border-red-200 text-sm">
              {errorMsg}
            </div>
          )}
          <Input
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoComplete="email"
            className="w-full p-3 rounded-md border border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
          />
          <Input
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete="current-password"
            className="w-full p-3 rounded-md border border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
          />
          <Button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 text-lg font-bold bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
          <div className="text-center text-sm text-gray-600 pt-4">
            Didn't have an account?{' '}
            <Link href="/signup" className="text-green-600 hover:text-green-700 font-semibold underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
