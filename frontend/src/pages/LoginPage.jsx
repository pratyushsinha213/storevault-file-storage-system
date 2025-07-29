import React, { useState } from 'react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IconDatabase } from '@tabler/icons-react'
import { Link, Navigate } from 'react-router-dom'
import useAuthStore from '@/store/useAuthStore'
import { Loader2 } from 'lucide-react'
import LoadingPageSkeleton from '@/components/ui/LoadingPageSkeleton'

const LoginPage = () => {

    const { isLoading, loginUser } = useAuthStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    if (isLoading) {
        return (
            <LoadingPageSkeleton />
        )
    }


    const handleLogin = async (e) => {
        e.preventDefault();
        const result = await loginUser({ email, password });

        if (result.success) {
            Navigate("/");
        }
        // No need for else — toast is already triggered in the store
    };

    return (
        <div className="grid min-h-svh lg:grid-cols-2 text-primary">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <Link to={'/'} className="flex items-center gap-2 font-medium">
                        <div className="flex items-center justify-center rounded-md bg-primary text-primary-foreground size-6">
                            <img src="/favicon.png" className="size-4"/>
                        </div>
                        StoreVault
                    </Link>
                </div>
                <div className="flex items-center justify-center flex-1">
                    <div className="w-full max-w-xs">
                        <form onSubmit={handleLogin} className={cn("flex flex-col gap-6")}>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-2xl font-bold">Login to your account</h1>
                                <p className="text-sm text-muted-foreground text-balance">
                                    Enter your email below to login to your account
                                </p>
                            </div>
                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        id="email"
                                        type="email"
                                        placeholder="john@doe.com"
                                        required
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                        <Link
                                            to={'/forgot-password'}
                                            className="ml-auto text-sm underline-offset-4 hover:underline"
                                        >
                                            Forgot your password?
                                        </Link>
                                    </div>
                                    <Input
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        id="password"
                                        type="password"
                                        placeholder="********"
                                        required
                                    />
                                </div>
                                <Button
                                    disabled={isLoading}
                                    type="submit"
                                    className={`w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {isLoading ? (
                                        <div className='flex items-center justify-center gap-2'>
                                            <Loader2 className='size-5 animate-spin' />
                                            Logging in...
                                        </div>
                                    ) : (
                                        <div>Login</div>
                                    )}
                                </Button>
                                <div className="relative text-sm text-center after:border-border after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                    <span className="relative z-10 px-2 bg-background text-muted-foreground">
                                        Or continue with
                                    </span>
                                </div>
                                <Button variant="outline" className="w-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path
                                            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    Login with GitHub
                                </Button>
                            </div>
                            <div className="text-sm text-center">
                                Don&apos;t have an account?{" "}
                                <Link to={'/register'} className="underline underline-offset-4">
                                    Register
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="relative hidden bg-muted lg:block">
                <img
                    src={`/login-image.png`}
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}

export default LoginPage