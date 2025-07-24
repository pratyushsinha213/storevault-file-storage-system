import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowRight, CirclePlay } from "lucide-react";
import { Particles } from "@/components/ui/particles";
import Footer from "@/components/footer";
import { Link } from "react-router-dom";

const features = [
    {
        category: "Marketing and Sales",
        title: "Collect and enrich leads your way",
        details:
            "Take control over how and when to follow up with your leads. Store and reference leads in multiple tables and, from there, automatically send them personalized emails.",
        tutorialLink: "#",
    },
    {
        category: "Project Management",
        title: "Streamline your workflows effortlessly",
        details:
            "Organize tasks, deadlines, and team collaboration in one place. Use customizable boards to manage projects efficiently and automate routine updates.",
        tutorialLink: "#",
    },
    {
        category: "Customer Support",
        title: "Deliver seamless customer experiences",
        details:
            "Track and resolve customer queries faster with an integrated ticketing system. Set priorities, automate follow-ups, and enhance satisfaction with personalized responses.",
        tutorialLink: "#",
    },
    {
        category: "Team Collaboration",
        title: "Stay connected with your team",
        details:
            "Simplify communication and align team efforts with shared boards and real-time updates. Enable transparent goal tracking and instant feedback for better results.",
        tutorialLink: "#",
    },
    {
        category: "Product Development",
        title: "Accelerate innovation with ease",
        details:
            "Bring your product ideas to life by managing prototypes, feedback, and iterations in one place. Collaborate with your team to refine features and release with confidence.",
        tutorialLink: "#",
    },
];

const LandingPage = ({ isUserLoggedIn }) => {
    return (
        <>
            {isUserLoggedIn ? (
                <div className="flex flex-col min-h-screen">
                    <Header isUserLoggedIn />
                    <div className="flex-1">
                        {/* Main content here */}
                    </div>
                    <Footer />
                </div>
            ) : (
                <div className="flex flex-col min-h-screen text-primary">
                    <Header />
                    <div className="flex-1">
                        {/* Hero Section */}
                        <div className="relative flex items-center justify-center min-h-screen px-6">
                            <Particles
                                className="absolute inset-0 pointer-events-none"
                                quantity={100}
                                ease={80}
                                color={"#fff"}
                                refresh
                            />
                            <div className="relative z-10 max-w-2xl text-center">
                                <Badge className="py-1 border-none rounded-full bg-primary">
                                    Just released v1.0.0
                                </Badge>
                                <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold !leading-[1.2] tracking-tight">
                                    Customized Shadcn UI Blocks & Components
                                </h1>
                                <p className="mt-6 text-[17px] md:text-lg">
                                    Explore a collection of Shadcn UI blocks and components, ready to
                                    preview and copy. Streamline your development workflow with
                                    easy-to-implement examples.
                                </p>
                                <div className="flex items-center justify-center gap-4 mt-12">
                                    <Button size="lg" className="text-base rounded-full">
                                        Get Started <ArrowUpRight className="!h-5 !w-5" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="text-base rounded-full shadow-none"
                                    >
                                        <CirclePlay className="!h-5 !w-5" /> Watch Demo
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Features Section */}
                        <div className="flex items-center justify-center">
                            <div className="w-full max-w-screen-lg px-6 py-10">
                                <h2 className="text-4xl md:text-5xl md:leading-[3.5rem] font-bold tracking-tight max-w-xl md:text-center md:mx-auto">
                                    Boost Your Strategy with Smart Features
                                </h2>
                                <div className="w-full mx-auto mt-8 space-y-20 md:mt-16">
                                    {features.map((feature) => (
                                        <div
                                            key={feature.category}
                                            className="flex flex-col items-center md:flex-row gap-x-20 gap-y-6 md:odd:flex-row-reverse"
                                        >
                                            <div className="w-full aspect-[6/4] bg-muted rounded-xl border border-border/50 basis-1/2" />
                                            <div className="basis-1/2 shrink-0">
                                                <span className="text-sm font-semibold uppercase text-muted-foreground">
                                                    {feature.category}
                                                </span>
                                                <h4 className="my-3 text-3xl font-semibold tracking-tight">
                                                    {feature.title}
                                                </h4>
                                                <p className="text-muted-foreground text-[17px]">
                                                    {feature.details}
                                                </p>
                                                <Button
                                                    asChild
                                                    className="mt-6 rounded-full min-w-40 text-[15px]"
                                                >
                                                    <Link to={feature.tutorialLink}>
                                                        Learn More <ArrowRight />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            )}
        </>
    );
};

export default LandingPage;