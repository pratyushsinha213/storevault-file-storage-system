import { CLIENT_BASE_URL } from "../config/env.js";
import User from "../models/User.js";
import stripe from "../services/stripeService.js"
import { storagePlans } from "../utils/storagePlans.js";

export const checkoutPayment = async (req, res) => {

    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const { plan } = req.body;
    let sanitizedPlan = plan.slice(0, 1).toUpperCase() + plan.slice(1).toLowerCase();
    const chosenPlan = storagePlans[sanitizedPlan];

    // implement stripe payment logic here
    // after successful payment, update the users plan, storage limit, hasUserPaid 

    const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        currency: 'aed',
        success_url: `${CLIENT_BASE_URL}/upgrade-plan/payments/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${CLIENT_BASE_URL}/upgrade-plan/payments/cancelled?session_id={CHECKOUT_SESSION_ID}`,
        line_items: [
            {
                price_data: {
                    currency: 'aed',
                    product_data: {
                        name: `${chosenPlan.name} Plan`,
                        description: chosenPlan.description,
                        // images: [
                        //     ''
                        // ]
                    },
                    unit_amount: Math.round(chosenPlan.price * 100)
                },
                quantity: 1
            }
        ]
    })

    // res.redirect(200, session.url);
    return res.status(200).json({ url: session.url });

}

export const successPayment = async (req, res) => {
    try {
        const [result, session] = await Promise.all([
            stripe.checkout.sessions.listLineItems(req.query.session_id),
            stripe.checkout.sessions.retrieve(req.query.session_id)
        ]);

        // Optional: verify payment is complete
        if (session.payment_status !== "paid") {
            return res.status(400).json({ message: "Payment not completed" });
        }

        const customerEmail = session.customer_details?.email;
        // const productName = session.line_items?.[0]?.price_data?.product_data?.name || "";
        const lineItems = result;

        if (!customerEmail) {
            return res.status(400).json({ message: "Customer email not found in session" });
        }

        const user = await User.findOne({ email: customerEmail }).select('-password');

        if (!user) {
            return res.status(404).json({ message: "User not found for this email" });
        }

        // Derive the plan from product name
        const planName = lineItems.data[0].description.split(" ")[0]; // e.g. 'Pro Plan' -> 'Pro'
        const chosenPlan = storagePlans[planName];


        if (!chosenPlan) {
            return res.status(400).json({ message: "Invalid plan from Stripe session" });
        }

        // Update user with the selected plan
        // if (user.paymentHistory.includes(req.query.session_id)) {
        //     return res.status(400).json({ message: "User has already paid for this plan" });
        // }

        user.paymentHistory.push(req.query.session_id);
        user.storageTier = planName;
        user.hasUserPaid = chosenPlan === 'Free' ? false : true;
        // user.storageLimit = chosenPlan.storage * 1024 * 1024 * 1024; // Convert GB to bytes
        user.storageLimit = chosenPlan.storage * 1024 * 1024; // Convert MB to bytes

        await user.save();

        return res.status(200).json({ message: "Plan upgraded successfully", plan: planName, user });
    } catch (error) {
        // return res.status(500).json({ message: "Error verifying payment", error: error.message });
        return res.status(500).json({ message: error.message });
    }
}

export const cancelledPayment = async (req, res) => {
    const sessionId = req.query.session_id;

    if (!sessionId) {
        return res.status(400).json({ message: "Missing session ID" });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Optional: Check session status
    if (session.payment_status === "paid") {
        return res.status(400).json({
            message: "This session was actually paid. Please do not use the cancelled route.",
        });
    }

    return res.status(200).json({
        message: "Payment was cancelled. No changes were made to your account.",
    });
};