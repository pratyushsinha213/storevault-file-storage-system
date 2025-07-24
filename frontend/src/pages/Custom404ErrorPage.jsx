import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Ghost } from 'lucide-react'

const Custom404ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10 text-center text-white bg-black">
      <Ghost className="w-16 h-16 mb-4 text-zinc-400 animate-bounce" />
      <h1 className="text-5xl font-bold text-red-500">404</h1>
      <p className="mt-2 text-xl font-medium text-zinc-300">Page Not Found</p>
      <p className="mt-1 text-sm text-zinc-500">Sorry, we couldn’t find the page you were looking for.</p>

      <Button
        onClick={() => navigate('/')}
        className="px-6 py-2 mt-6 text-white bg-blue-600 hover:bg-blue-700"
      >
        Go Home
      </Button>
    </div>
  );
};

export default Custom404ErrorPage;