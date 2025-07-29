// NEW ENHANCED DESIGN
import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useSearchParams } from "react-router-dom";
import useAuthStore from "@/store/useAuthStore";
import { AnimatedGridPattern } from '@/components/magicui/animated-grid-pattern';
import { cn } from '@/lib/utils';
import { 
    CheckCircle, 
    Sparkles, 
    ArrowRight, 
    Home, 
    CreditCard,
    Shield,
    Zap,
    Loader2
} from "lucide-react";

const PaymentSuccessPage = () => {
    const [searchParams] = useSearchParams();
    const session_id = searchParams.get("session_id");
    const { verifyPaymentSuccess } = useAuthStore();
    const hasVerified = useRef(false);
    const [isVerifying, setIsVerifying] = useState(true);
    const [verificationComplete, setVerificationComplete] = useState(false);

    useEffect(() => {
        if (session_id && !hasVerified.current) {
            const verifyPayment = async () => {
                setIsVerifying(true);
                try {
                    await verifyPaymentSuccess(session_id);
                    setVerificationComplete(true);
                } catch (error) {
                    console.error('Payment verification failed:', error);
                } finally {
                    setIsVerifying(false);
                }
            };
            
            verifyPayment();
            hasVerified.current = true;
        } else {
            setIsVerifying(false);
        }
    }, [session_id, verifyPaymentSuccess]);

    if (isVerifying) {
        return (
            <div className="min-h-screen text-white bg-black">
                <AnimatedGridPattern
                    numSquares={30}
                    maxOpacity={0.1}
                    duration={3}
                    repeatDelay={1}
                    className={cn(
                        "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
                        "absolute inset-0 -z-10"
                    )}
                />
                
                <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
                    <div className="relative">
                        <div className="p-6 border rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm border-green-500/30">
                            <Loader2 className="w-12 h-12 text-green-400 animate-spin" />
                        </div>
                        <div className="absolute w-6 h-6 bg-green-500 rounded-full -top-2 -right-2 animate-pulse"></div>
                    </div>
                    <h1 className="mt-6 text-2xl font-bold text-green-400">Verifying Payment...</h1>
                    <p className="mt-2 text-zinc-400">Please wait while we confirm your payment</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen text-white bg-black">
            <AnimatedGridPattern
                numSquares={30}
                maxOpacity={0.1}
                duration={3}
                repeatDelay={1}
                className={cn(
                    "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
                    "absolute inset-0 -z-10"
                )}
            />

            <div className="flex flex-col items-center justify-center min-h-screen px-6 py-16">
                {/* Success Animation */}
                <div className="relative mb-8">
                    <div className="p-8 border rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm border-green-500/30 animate-pulse">
                        <CheckCircle className="w-16 h-16 text-green-400" />
                    </div>
                    <div className="absolute -top-4 -right-4">
                        <div className="p-3 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 animate-bounce">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>

                {/* Success Content */}
                <div className="max-w-2xl mx-auto space-y-6 text-center">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text">
                            Payment Successful!
                        </h1>
                        <p className="text-xl text-zinc-300">
                            Thank you for upgrading your StoreVault plan
                        </p>
                    </div>

                    <Card className="border-green-500/30 bg-green-500/10 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-green-400">Welcome to Premium!</CardTitle>
                            <CardDescription className="text-zinc-300">
                                Your account has been successfully upgraded
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <div className="flex items-center gap-3 p-3 border rounded-lg bg-green-500/20 border-green-500/30">
                                    <Shield className="w-5 h-5 text-green-400" />
                                    <span className="text-sm text-zinc-300">Enhanced Security</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 border rounded-lg bg-green-500/20 border-green-500/30">
                                    <Zap className="w-5 h-5 text-green-400" />
                                    <span className="text-sm text-zinc-300">Priority Support</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 border rounded-lg bg-green-500/20 border-green-500/30">
                                    <CreditCard className="w-5 h-5 text-green-400" />
                                    <span className="text-sm text-zinc-300">Premium Features</span>
                                </div>
                            </div>
                            
                            {session_id && (
                                <div className="flex items-center justify-center gap-2 p-3 border rounded-lg bg-zinc-800/50 border-zinc-700">
                                    <span className="text-xs text-zinc-400">Transaction ID:</span>
                                    <Badge variant="outline" className="text-xs border-zinc-600 text-zinc-300">
                                        {session_id.slice(0, 8)}...
                                    </Badge>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                        <Button 
                            asChild 
                            className="px-8 py-3 text-white transition-all duration-200 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl hover:scale-105"
                        >
                            <Link to="/dashboard" className="flex items-center gap-2">
                                <Home className="w-4 h-4" />
                                Go to Dashboard
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </Button>
                        
                        <Button 
                            variant="outline" 
                            asChild 
                            className="px-8 py-3 transition-all duration-200 border-zinc-700 text-zinc-300 hover:bg-zinc-800 rounded-xl"
                        >
                            <Link to="/files" className="flex items-center gap-2">
                                Start Using Features
                            </Link>
                        </Button>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-8 space-y-2 text-center">
                        <p className="text-sm text-zinc-500">
                            You'll receive a confirmation email shortly
                        </p>
                        <p className="text-xs text-zinc-600">
                            Need help? Contact our support team
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccessPage;