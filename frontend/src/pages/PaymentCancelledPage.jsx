// NEW ENHANCED DESIGN
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSearchParams, Link } from "react-router-dom";
import useAuthStore from "@/store/useAuthStore";
import { AnimatedGridPattern } from '@/components/magicui/animated-grid-pattern';
import { cn } from '@/lib/utils';
import { 
    XCircle, 
    Loader2, 
    ArrowLeft, 
    RefreshCw, 
    AlertTriangle,
    CreditCard,
    Home,
    HelpCircle
} from "lucide-react";

const PaymentCancelledPage = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const { handlePaymentCancelled, isLoading } = useAuthStore();
    const [error, setError] = useState(null);
    const [isProcessing, setIsProcessing] = useState(true);

    useEffect(() => {
        if (!sessionId) {
            setError("No session ID found. Are you sure you cancelled a payment?");
            setIsProcessing(false);
            return;
        }

        const cancelPayment = async () => {
            setIsProcessing(true);
            try {
                const result = await handlePaymentCancelled(sessionId);
                if (!result.success) {
                    setError("Something went wrong while cancelling the payment.");
                }
            } catch (err) {
                setError("An unexpected error occurred. Please try again.");
            } finally {
                setIsProcessing(false);
            }
        };

        cancelPayment();
    }, [sessionId, handlePaymentCancelled]);

    if (isLoading || isProcessing) {
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
                        <div className="p-6 border rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-sm border-red-500/30">
                            <Loader2 className="w-12 h-12 text-red-400 animate-spin" />
                        </div>
                        <div className="absolute w-6 h-6 bg-red-500 rounded-full -top-2 -right-2 animate-pulse"></div>
                    </div>
                    <h1 className="mt-6 text-2xl font-bold text-red-400">Processing Cancellation...</h1>
                    <p className="mt-2 text-zinc-400">Please wait while we handle your request</p>
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
                {/* Cancellation Icon */}
                <div className="relative mb-8">
                    <div className="p-8 border rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-sm border-red-500/30">
                        <XCircle className="w-16 h-16 text-red-400" />
                    </div>
                    <div className="absolute -top-4 -right-4">
                        <div className="p-3 rounded-full bg-gradient-to-br from-orange-400 to-red-500">
                            <AlertTriangle className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>

                {/* Cancellation Content */}
                <div className="max-w-2xl mx-auto space-y-6 text-center">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text">
                            Payment Cancelled
                        </h1>
                        <p className="text-xl text-zinc-300">
                            Your payment was not completed
                        </p>
                    </div>

                    <Card className="border-red-500/30 bg-red-500/10 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-red-400">No Charges Made</CardTitle>
                            <CardDescription className="text-zinc-300">
                                Your account remains unchanged
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 border rounded-lg bg-zinc-800/50 border-zinc-700">
                                <p className="text-zinc-300">
                                    {error || "You can try again or choose a different plan. No charges were made to your account."}
                                </p>
                            </div>
                            
                            {sessionId && (
                                <div className="flex items-center justify-center gap-2 p-3 border rounded-lg bg-zinc-800/50 border-zinc-700">
                                    <span className="text-xs text-zinc-400">Session ID:</span>
                                    <Badge variant="outline" className="text-xs border-zinc-600 text-zinc-300">
                                        {sessionId.slice(0, 8)}...
                                    </Badge>
                                </div>
                            )}

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <div className="flex items-center gap-3 p-3 border rounded-lg bg-zinc-800/50 border-zinc-700">
                                    <CreditCard className="w-5 h-5 text-zinc-400" />
                                    <span className="text-sm text-zinc-300">No Charges</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 border rounded-lg bg-zinc-800/50 border-zinc-700">
                                    <RefreshCw className="w-5 h-5 text-zinc-400" />
                                    <span className="text-sm text-zinc-300">Try Again</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 border rounded-lg bg-zinc-800/50 border-zinc-700">
                                    <HelpCircle className="w-5 h-5 text-zinc-400" />
                                    <span className="text-sm text-zinc-300">Get Help</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                        <Button 
                            asChild 
                            className="px-8 py-3 text-white transition-all duration-200 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 rounded-xl hover:scale-105"
                        >
                            <Link to="/upgrade-plan" className="flex items-center gap-2">
                                <RefreshCw className="w-4 h-4" />
                                Try Again
                            </Link>
                        </Button>
                        
                        <Button 
                            variant="outline" 
                            asChild 
                            className="px-8 py-3 transition-all duration-200 border-zinc-700 text-zinc-300 hover:bg-zinc-800 rounded-xl"
                        >
                            <Link to="/dashboard" className="flex items-center gap-2">
                                <Home className="w-4 h-4" />
                                Go to Dashboard
                            </Link>
                        </Button>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-8 space-y-2 text-center">
                        <p className="text-sm text-zinc-500">
                            Having trouble? Our support team is here to help
                        </p>
                        <p className="text-xs text-zinc-600">
                            Contact us at support@storevault.com
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancelledPage;