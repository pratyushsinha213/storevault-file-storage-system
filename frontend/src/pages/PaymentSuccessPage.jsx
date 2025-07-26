// import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useSearchParams } from "react-router-dom";
import useAuthStore from "@/store/useAuthStore";
import { useEffect, useRef } from "react";
import { CheckCircle } from "lucide-react";

const PaymentSuccessPage = () => {
    const [searchParams] = useSearchParams();
    const session_id = searchParams.get("session_id");
    const { verifyPaymentSuccess } = useAuthStore();
    const hasVerified = useRef(false); // <-- guard variable

    useEffect(() => {
        if (session_id && !hasVerified.current) {
            verifyPaymentSuccess(session_id);
            hasVerified.current = true; // prevent re-calls
        }
    }, [session_id, verifyPaymentSuccess]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-green-50">
            <CheckCircle className="w-16 h-16 mb-4 text-green-600" />
            <h1 className="mb-2 text-3xl font-bold text-green-700">Payment Successful</h1>
            <p className="mb-6 text-green-800 text-md">
                Thank you for upgrading your plan. Your payment was processed successfully.
            </p>
            <Button asChild className="px-6 rounded-full">
                <Link to="/">Go to Home</Link>
            </Button>
        </div>
    );
};

export default PaymentSuccessPage;