// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//     Tooltip,
//     TooltipContent,
//     TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { cn } from "@/lib/utils";
// import { CircleCheck, CircleHelp } from "lucide-react";
// import { useState } from "react";
// import { Outlet, useSearchParams } from "react-router-dom";

// const tooltipContent = {
//     styles: "Choose from a variety of styles to suit your preferences.",
//     filters: "Choose from a variety of filters to enhance your portraits.",
//     credits: "Use these credits to retouch your portraits.",
// };

// const YEARLY_DISCOUNT = 20;
// // const plans = [
// //     {
// //         name: "Free",
// //         price: 0,
// //         description:
// //             "Includes 5 GB of storage, 25 MB per-file upload limit, and basic folder organization. Ideal for personal use and testing.",
// //         features: [
// //             { title: "5 hours turnaround time" },
// //             { title: "20 AI portraits" },
// //             { title: "Choice of 2 styles", tooltip: tooltipContent.styles },
// //             { title: "Choice of 2 filters", tooltip: tooltipContent.filters },
// //             { title: "2 retouch credits", tooltip: tooltipContent.credits },
// //         ],
// //         buttonText: "Get 20 portraits in 5 hours",
// //     },
// //     {
// //         name: "Advanced",
// //         price: 40,
// //         isRecommended: true,
// //         description:
// //             "Get 50 AI-generated portraits with 5 unique styles and filters.",
// //         features: [
// //             { title: "3 hours turnaround time" },
// //             { title: "50 AI portraits" },
// //             { title: "Choice of 5 styles", tooltip: tooltipContent.styles },
// //             { title: "Choice of 5 filters", tooltip: tooltipContent.filters },
// //             { title: "5 retouch credits", tooltip: tooltipContent.credits },
// //         ],
// //         buttonText: "Get 50 portraits in 3 hours",
// //         isPopular: true,
// //     },
// //     {
// //         name: "Premium",
// //         price: 80,
// //         description:
// //             "Get 100 AI-generated portraits with 10 unique styles and filters.",
// //         features: [
// //             { title: "1-hour turnaround time" },
// //             { title: "100 AI portraits" },
// //             { title: "Choice of 10 styles", tooltip: tooltipContent.styles },
// //             { title: "Choice of 10 filters", tooltip: tooltipContent.filters },
// //             { title: "10 retouch credits", tooltip: tooltipContent.credits },
// //         ],
// //         buttonText: "Get 100 portraits in 1 hour",
// //     },
// // ];

// const plans = [
//   {
//     name: "Free",
//     price: 0,
//     description:
//       "Includes 5 GB of storage, 25 MB per-file upload limit, and basic folder organization. Ideal for personal use and testing.",
//     features: [
//       { title: "5 GB storage" },
//       { title: "25 MB max file upload" },
//       { title: "Basic folder organization" },
//       { title: "Suitable for personal use" },
//     ],
//     buttonText: "Start for Free",
//   },
//   {
//     name: "Pro",
//     price: 9.99,
//     description:
//       "Includes 100 GB of storage, 500 MB per-file upload limit, file versioning, and priority upload speed. Great for freelancers.",
//     features: [
//       { title: "100 GB storage" },
//       { title: "500 MB max file upload" },
//       { title: "File versioning" },
//       { title: "Priority upload speed" },
//       { title: "Designed for freelancers" },
//     ],
//     buttonText: "Upgrade to Pro",
//     isRecommended: true,
//   },
//   {
//     name: "Team",
//     price: 19.99,
//     description:
//       "Includes 1 TB shared storage, 1 GB per-file upload limit, team collaboration tools, admin controls, and audit logs.",
//     features: [
//       { title: "1 TB shared storage" },
//       { title: "1 GB max file upload" },
//       { title: "Team collaboration tools" },
//       { title: "Admin controls" },
//       { title: "Audit logging" },
//     ],
//     buttonText: "Upgrade to Team",
//     isPopular: true,
//   },
//   {
//     name: "Enterprise",
//     price: 49.99,
//     description:
//       "Custom storage limits, unlimited upload size, advanced security features, analytics, and dedicated support. Tailored for large organizations.",
//     features: [
//       { title: "Custom storage limits" },
//       { title: "Unlimited upload size" },
//       { title: "Advanced security features" },
//       { title: "Usage analytics" },
//       { title: "Dedicated support" },
//     ],
//     buttonText: "Contact Sales",
//   },
// ];

// const UpgradePlanPage = () => {
//     const [selectedBillingPeriod, setSelectedBillingPeriod] = useState("monthly");

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 text-primary">
//             <h1 className="text-5xl font-bold tracking-tight text-center">Pricing</h1>
//             <Tabs
//                 value={selectedBillingPeriod}
//                 onValueChange={setSelectedBillingPeriod}
//                 className="mt-8"
//             >
//                 <TabsList className="h-11 px-1.5 rounded-full">
//                     <TabsTrigger value="monthly" className="py-1.5 rounded-full">
//                         Monthly
//                     </TabsTrigger>
//                     <TabsTrigger value="yearly" className="py-1.5 rounded-full">
//                         Yearly (Save {YEARLY_DISCOUNT}%)
//                     </TabsTrigger>
//                 </TabsList>
//             </Tabs>
//             <div className="grid items-center max-w-screen-lg grid-cols-1 gap-8 mx-auto mt-12 lg:grid-cols-3">
//                 {plans.map((plan) => (
//                     <div
//                         key={plan.name}
//                         className={cn("relative border rounded-xl p-6", {
//                             "border-[2px] border-primary py-10": plan.isPopular,
//                         })}
//                     >
//                         {plan.isPopular && (
//                             <Badge className="absolute top-0 translate-x-1/2 -translate-y-1/2 right-1/2">
//                                 Most Popular
//                             </Badge>
//                         )}
//                         <h3 className="text-lg font-medium">{plan.name}</h3>
//                         <p className="mt-2 text-4xl font-bold">
//                             AED
//                             {selectedBillingPeriod === "monthly"
//                                 ? plan.price
//                                 : plan.price * ((100 - YEARLY_DISCOUNT) / 100)}
//                             <span className="ml-1.5 text-sm text-muted-foreground font-normal">
//                                 /month
//                             </span>
//                         </p>
//                         <p className="mt-4 font-medium text-muted-foreground">
//                             {plan.description}
//                         </p>

//                         <Button
//                             variant={plan.isPopular ? "default" : "outline"}
//                             size="lg"
//                             className="w-full mt-6"
//                         >
//                             {plan.buttonText}
//                         </Button>
//                         <Separator className="my-8" />
//                         <ul className="space-y-2">
//                             {plan.features.map((feature) => (
//                                 <li key={feature.title} className="flex items-start gap-1.5">
//                                     <CircleCheck className="w-4 h-4 mt-1 text-green-600" />
//                                     {feature.title}
//                                     {feature.tooltip && (
//                                         <Tooltip>
//                                             <TooltipTrigger className="cursor-help">
//                                                 <CircleHelp className="w-4 h-4 mt-1 text-gray-500" />
//                                             </TooltipTrigger>
//                                             <TooltipContent>{feature.tooltip}</TooltipContent>
//                                         </Tooltip>
//                                     )}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default UpgradePlanPage;

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { CircleCheck, CircleHelp } from "lucide-react";
import { useState } from "react";
import useAuthStore from "@/store/useAuthStore"; // <-- import your auth/payment store

const YEARLY_DISCOUNT = 5;

const plans = [
  {
    name: "Free",
    price: 0,
    description:
      "Includes 5 GB of storage, 25 MB per-file upload limit, and basic folder organization. Ideal for personal use and testing.",
    features: [
      { title: "5 GB storage" },
      { title: "25 MB max file upload" },
      { title: "Basic folder organization" },
      { title: "Suitable for personal use" },
    ],
    buttonText: "Start for Free",
  },
  {
    name: "Pro",
    price: 9.99,
    description:
      "Includes 100 GB of storage, 500 MB per-file upload limit, file versioning, and priority upload speed. Great for freelancers.",
    features: [
      { title: "100 GB storage" },
      { title: "500 MB max file upload" },
      { title: "File versioning" },
      { title: "Priority upload speed" },
      { title: "Designed for freelancers" },
    ],
    buttonText: "Upgrade to Pro",
    isRecommended: true,
  },
  {
    name: "Team",
    price: 19.99,
    description:
      "Includes 1 TB shared storage, 1 GB per-file upload limit, team collaboration tools, admin controls, and audit logs.",
    features: [
      { title: "1 TB shared storage" },
      { title: "1 GB max file upload" },
      { title: "Team collaboration tools" },
      { title: "Admin controls" },
      { title: "Audit logging" },
    ],
    buttonText: "Upgrade to Team",
    isPopular: true,
  },
  {
    name: "Enterprise",
    price: 49.99,
    description:
      "Custom storage limits, unlimited upload size, advanced security features, analytics, and dedicated support. Tailored for large organizations.",
    features: [
      { title: "Custom storage limits" },
      { title: "Unlimited upload size" },
      { title: "Advanced security features" },
      { title: "Usage analytics" },
      { title: "Dedicated support" },
    ],
    buttonText: "Contact Sales",
  },
];

const UpgradePlanPage = () => {
    const [selectedBillingPeriod, setSelectedBillingPeriod] = useState("monthly");
    const { initiateCheckout, isLoading } = useAuthStore();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-6 py-16 text-primary">
            <div className="w-full mx-auto text-center max-w-7xl">
                <h1 className="text-5xl font-bold tracking-tight">Pricing</h1>
                <Tabs
                    value={selectedBillingPeriod}
                    onValueChange={setSelectedBillingPeriod}
                    className="mt-6"
                >
                    <TabsList className="h-11 px-1.5 rounded-full justify-center mx-auto">
                        <TabsTrigger value="monthly" className="py-1.5 rounded-full">
                            Monthly
                        </TabsTrigger>
                        <TabsTrigger value="yearly" className="py-1.5 rounded-full">
                            Yearly (Save {YEARLY_DISCOUNT}%)
                        </TabsTrigger>
                    </TabsList>
                </Tabs>

                <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-2 lg:grid-cols-4">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={cn("relative border rounded-xl p-6 text-left", {
                                "border-[2px] border-primary py-10": plan.isPopular,
                            })}
                        >
                            {plan.isPopular && (
                                <Badge className="absolute top-0 translate-x-1/2 -translate-y-1/2 right-1/2">
                                    Most Popular
                                </Badge>
                            )}
                            <h3 className="text-lg font-medium">{plan.name}</h3>
                            <p className="mt-2 text-4xl font-bold">
                                AED
                                {selectedBillingPeriod === "monthly"
                                    ? plan.price
                                    : plan.price * (Math.round((100 - YEARLY_DISCOUNT) / 100)).toFixed(2)}
                                <span className="ml-1.5 text-sm text-muted-foreground font-normal">
                                    /month
                                </span>
                            </p>
                            <p className="mt-4 font-medium text-muted-foreground">
                                {plan.description}
                            </p>

                            <Button
                                variant={plan.isPopular ? "default" : "outline"}
                                size="lg"
                                className="w-full mt-6"
                                onClick={() => initiateCheckout(plan.name)}
                                disabled={isLoading}
                            >
                                {plan.buttonText}
                            </Button>
                            <Separator className="my-8" />
                            <ul className="space-y-2">
                                {plan.features.map((feature) => (
                                    <li key={feature.title} className="flex items-start gap-1.5">
                                        <CircleCheck className="w-4 h-4 mt-1 text-green-600" />
                                        {feature.title}
                                        {feature.tooltip && (
                                            <Tooltip>
                                                <TooltipTrigger className="cursor-help">
                                                    <CircleHelp className="w-4 h-4 mt-1 text-gray-500" />
                                                </TooltipTrigger>
                                                <TooltipContent>{feature.tooltip}</TooltipContent>
                                            </Tooltip>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UpgradePlanPage;