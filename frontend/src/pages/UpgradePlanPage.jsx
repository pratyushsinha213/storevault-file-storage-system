// NEW ENHANCED DESIGN
import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatedGridPattern } from '@/components/magicui/animated-grid-pattern';
import { cn } from '@/lib/utils';
import {
    Check,
    Crown,
    Star,
    Zap,
    Shield,
    Users,
    Building,
    Sparkles,
    ArrowRight,
    CreditCard,
    Lock,
    HeadphonesIcon
} from "lucide-react";
import useAuthStore from "@/store/useAuthStore";

const YEARLY_DISCOUNT = 20;

const plans = [
    {
        name: "Free",
        icon: "🚀",
        price: 0,
        description: "Perfect for getting started with basic file storage needs",
        features: [
            { title: "5 GB storage", included: true },
            { title: "25 MB max file upload", included: true },
            { title: "Basic folder organization", included: true },
            { title: "File sharing", included: true },
            { title: "Email support", included: true },
            { title: "Advanced analytics", included: false },
            { title: "Team collaboration", included: false },
            { title: "Priority support", included: false },
        ],
        buttonText: "Get Started Free",
        popular: false,
        color: "from-zinc-600 to-zinc-700"
    },
    {
        name: "Pro",
        icon: "⭐",
        price: 9.99,
        description: "Enhanced features for power users and freelancers",
        features: [
            { title: "100 GB storage", included: true },
            { title: "500 MB max file upload", included: true },
            { title: "File versioning", included: true },
            { title: "Priority upload speed", included: true },
            { title: "Advanced analytics", included: true },
            { title: "Email support", included: true },
            { title: "Team collaboration", included: false },
            { title: "Priority support", included: false },
        ],
        buttonText: "Upgrade to Pro",
        popular: true,
        color: "from-blue-600 to-purple-600"
    },
    {
        name: "Team",
        icon: "👥",
        price: 19.99,
        description: "Collaborative features for teams and small businesses",
        features: [
            { title: "1 TB shared storage", included: true },
            { title: "1 GB max file upload", included: true },
            { title: "Team collaboration tools", included: true },
            { title: "Admin controls", included: true },
            { title: "Audit logging", included: true },
            { title: "Advanced analytics", included: true },
            { title: "Priority support", included: true },
            { title: "Custom integrations", included: false },
        ],
        buttonText: "Upgrade to Team",
        popular: false,
        color: "from-green-600 to-emerald-600"
    },
    {
        name: "Enterprise",
        icon: "🏢",
        price: 49.99,
        description: "Enterprise-grade features for large organizations",
        features: [
            { title: "Unlimited storage", included: true },
            { title: "Unlimited upload size", included: true },
            { title: "Advanced security features", included: true },
            { title: "Usage analytics", included: true },
            { title: "Dedicated support", included: true },
            { title: "Custom integrations", included: true },
            { title: "SLA guarantees", included: true },
            { title: "On-premise deployment", included: true },
        ],
        buttonText: "Contact Sales",
        popular: false,
        color: "from-purple-600 to-pink-600"
    },
];

const UpgradePlanPage = () => {
    const [selectedBillingPeriod, setSelectedBillingPeriod] = useState("monthly");
    const { initiateCheckout, isLoading, upgradePlanCheck } = useAuthStore();

    const getYearlyPrice = (price) => {
        return price * ((100 - YEARLY_DISCOUNT) / 100);
    };

    return (
        <div className="min-h-screen text-white bg-black">
            <AnimatedGridPattern
                numSquares={30}
                maxOpacity={0.1}
                duration={3}
                repeatDelay={1}
                className={cn(
                    "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
                    "inset-x-0 inset-y-[-30%] min-h-screen skew-y-12"
                )}
            />

            {/* Enhanced Header */}
            <div className="relative z-10 px-6 py-16 text-center">
                <div className="max-w-4xl mx-auto space-y-6">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
                            <Crown className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-5xl font-bold text-transparent bg-gradient-to-r from-white to-zinc-300 bg-clip-text">
                                Choose Your Plan
                            </h1>
                            <p className="mt-2 text-xl text-zinc-400">Unlock powerful features to enhance your file storage experience</p>
                        </div>
                    </div>

                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center">
                        <Tabs
                            value={selectedBillingPeriod}
                            onValueChange={setSelectedBillingPeriod}
                            className="w-fit"
                        >
                            <TabsList className="h-12 px-2 border rounded-xl bg-zinc-900/50 backdrop-blur-sm border-zinc-700">
                                <TabsTrigger
                                    value="monthly"
                                    className="px-6 py-2 rounded-lg data-[state=active]:bg-white data-[state=active]:text-black transition-all"
                                >
                                    Monthly
                                </TabsTrigger>
                                <TabsTrigger
                                    value="yearly"
                                    className="px-6 py-2 rounded-lg data-[state=active]:bg-white data-[state=active]:text-black transition-all"
                                >
                                    <div className="flex items-center gap-2">
                                        <span>Yearly</span>
                                        <Badge variant="secondary" className="text-xs text-green-400 bg-green-500/20 border-green-500/30">
                                            Save {YEARLY_DISCOUNT}%
                                        </Badge>
                                    </div>
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                </div>
            </div>

            {/* Plans Grid */}
            <div className="relative z-10 px-6 pb-16">
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {plans.map((plan, index) => (
                            <Card
                                key={plan.name}
                                className={cn(
                                    "relative border-zinc-800 bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-900/70 transition-all duration-300 hover:scale-105",
                                    plan.popular && "ring-2 ring-blue-500/50 shadow-2xl shadow-blue-500/20"
                                )}
                            >
                                {plan.popular && (
                                    <div className="absolute transform -translate-x-1/2 -top-4 left-1/2">
                                        <Badge className="px-4 py-2 text-white border-0 bg-gradient-to-r from-blue-500 to-purple-600">
                                            <Star className="w-4 h-4 mr-2" />
                                            Most Popular
                                        </Badge>
                                    </div>
                                )}

                                <CardHeader className="pb-6 text-center">
                                    <div className="flex items-center justify-center mb-4">
                                        <div className={cn(
                                            "p-4 rounded-2xl bg-gradient-to-br",
                                            plan.color
                                        )}>
                                            <span className="text-3xl">{plan.icon}</span>
                                        </div>
                                    </div>
                                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                                    <CardDescription className="text-base text-zinc-400">
                                        {plan.description}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="space-y-6">
                                    {/* Pricing */}
                                    <div className="text-center">
                                        <div className="flex items-baseline justify-center gap-2">
                                            <span className="text-4xl font-bold">
                                                ${selectedBillingPeriod === "monthly"
                                                    ? plan.price
                                                    : getYearlyPrice(plan.price).toFixed(2)
                                                }
                                            </span>
                                            <span className="text-zinc-400">
                                                /{selectedBillingPeriod === "monthly" ? "month" : "month"}
                                            </span>
                                        </div>
                                        {selectedBillingPeriod === "yearly" && plan.price > 0 && (
                                            <p className="mt-1 text-sm text-zinc-500">
                                                Billed annually (${(getYearlyPrice(plan.price) * 12).toFixed(2)}/year)
                                            </p>
                                        )}
                                    </div>

                                    {/* Features */}
                                    <div className="space-y-3">
                                        {plan.features.map((feature, featureIndex) => (
                                            <div key={featureIndex} className="flex items-center gap-3">
                                                <div className={cn(
                                                    "flex items-center justify-center w-5 h-5 rounded-full",
                                                    feature.included
                                                        ? "bg-green-500/20 text-green-400"
                                                        : "bg-zinc-700/50 text-zinc-500"
                                                )}>
                                                    {feature.included ? (
                                                        <Check className="w-3 h-3" />
                                                    ) : (
                                                        <span className="text-xs">×</span>
                                                    )}
                                                </div>
                                                <span className={cn(
                                                    "text-sm",
                                                    feature.included ? "text-zinc-200" : "text-zinc-500"
                                                )}>
                                                    {feature.title}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Action Button */}
                                    <Button
                                        className={cn(
                                            "w-full py-3 text-base font-semibold transition-all duration-200",
                                            plan.popular
                                                ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                                                : "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700"
                                        )}
                                        onClick={async () => {
                                            await upgradePlanCheck(plan.name);
                                            initiateCheckout(plan.name);
                                        }}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                                                Processing...
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                {plan.buttonText}
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        )}
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Additional Info */}
                    <div className="mt-16 space-y-8 text-center">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            <div className="flex items-center justify-center gap-3 p-4 border rounded-xl bg-zinc-900/50 backdrop-blur-sm border-zinc-800">
                                <Shield className="w-6 h-6 text-green-400" />
                                <span className="text-sm text-zinc-300">Secure & Encrypted</span>
                            </div>
                            <div className="flex items-center justify-center gap-3 p-4 border rounded-xl bg-zinc-900/50 backdrop-blur-sm border-zinc-800">
                                <HeadphonesIcon className="w-6 h-6 text-blue-400" />
                                <span className="text-sm text-zinc-300">24/7 Support</span>
                            </div>
                            <div className="flex items-center justify-center gap-3 p-4 border rounded-xl bg-zinc-900/50 backdrop-blur-sm border-zinc-800">
                                <Zap className="w-6 h-6 text-yellow-400" />
                                <span className="text-sm text-zinc-300">Instant Setup</span>
                            </div>
                        </div>

                        <div className="space-y-4 text-center">
                            <p className="text-zinc-400">
                                All plans include a 30-day money-back guarantee
                            </p>
                            <p className="text-sm text-zinc-500">
                                Need a custom plan? <span className="text-blue-400 cursor-pointer hover:underline">Contact our sales team</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpgradePlanPage;