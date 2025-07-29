import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconDatabase } from '@tabler/icons-react';
import { Link, Navigate } from 'react-router-dom';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import useAuthStore from '@/store/useAuthStore';
import { Loader2 } from 'lucide-react';

const RegisterPage = () => {
    const { isLoading, registerUser } = useAuthStore();

    const [form, setForm] = useState({
        fullName: '',
        email: '',
        password: '',
        role: 'user',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await registerUser(form);
        if (result.success) {
            Navigate("/");
        }
    };

    return (
        <div className="grid min-h-svh lg:grid-cols-2 text-primary">
            <div className="relative hidden bg-muted lg:block">
                <img
                    src={`/register-image.png`}
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
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
                        <form className={cn("flex flex-col gap-6")} onSubmit={handleSubmit}>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-2xl font-bold">Register your account</h1>
                                <p className="text-sm text-muted-foreground text-balance">
                                    Enter the following details to create your account
                                </p>
                            </div>
                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="fullName">Full Name</Label>
                                    <Input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        placeholder="John Doe"
                                        required
                                        value={form.fullName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="john@doe.com"
                                        required
                                        value={form.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="********"
                                        required
                                        value={form.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="role">Role</Label>
                                    <RadioGroup
                                        defaultValue="user"
                                        className="flex items-center gap-4"
                                        onValueChange={(value) => setForm({ ...form, role: value })}
                                    >
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="admin" id="admin" />
                                            <Label htmlFor="admin">Admin</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="user" id="user" />
                                            <Label htmlFor="user">User</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <div className='flex items-center justify-center gap-2'>
                                            <Loader2 className='size-5 animate-spin' />
                                            Creating...
                                        </div>
                                    ) : (
                                        "Register"
                                    )}
                                </Button>
                                <div className="relative text-sm text-center after:border-border after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                    <span className="relative z-10 px-2 bg-background text-muted-foreground">
                                        Or continue with
                                    </span>
                                </div>
                                <Button variant="outline" className="w-full">
                                    {/* GitHub Icon */}
                                    Login with GitHub
                                </Button>
                            </div>
                            <div className="text-sm text-center">
                                Already have an account?{" "}
                                <Link to={'/login'} className="underline underline-offset-4">
                                    Login
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;