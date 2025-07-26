/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/store/useAuthStore";
import { Loader2 } from "lucide-react";

const PaymentCancelledPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const { handlePaymentCancelled, isLoading } = useAuthStore();
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!sessionId) {
            setError("No session ID found. Are you sure you cancelled a payment?");
            return;
        }

        const cancelPayment = async () => {
            const result = await handlePaymentCancelled(sessionId);
            if (!result.success) {
                setError("Something went wrong while cancelling the payment.");
            }
        };

        cancelPayment();
    }, [sessionId, handlePaymentCancelled]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-red-50">
                <Loader2 className="w-10 h-10 mb-4 text-red-600 animate-spin" />
                <h1 className="text-xl text-red-700">Verifying payment cancellation...</h1>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-red-50">
            <XCircle className="w-16 h-16 mb-4 text-red-600" />
            <h1 className="mb-2 text-3xl font-bold text-red-700">Payment Cancelled</h1>
            <p className="mb-6 text-red-800 text-md">
                {error
                    ? error
                    : "Your payment was not completed. You can try again or choose another plan."}
            </p>
            <Button asChild variant="destructive" className="px-6 rounded-full">
                <Link to="/upgrade-plan">Try Again</Link>
            </Button>
        </div>
    );
};

export default PaymentCancelledPage;