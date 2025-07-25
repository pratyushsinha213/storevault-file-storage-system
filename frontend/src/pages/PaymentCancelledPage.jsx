import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PaymentCancelledPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-red-50">
            <XCircle className="w-16 h-16 mb-4 text-red-600" />
            <h1 className="mb-2 text-3xl font-bold text-red-700">Payment Cancelled</h1>
            <p className="mb-6 text-red-800 text-md">
                Your payment was not completed. You can try again or choose another plan.
            </p>
            <Button asChild variant="destructive" className="px-6 rounded-full">
                <Link to="/upgrade-plan">Try Again</Link>
            </Button>
        </div>
    );
};

export default PaymentCancelledPage;