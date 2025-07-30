import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
    ArrowUpRight, 
    ArrowRight, 
    CirclePlay, 
    BarChart2, 
    CloudUpload, 
    Settings,
    Shield,
    Zap,
    Users,
    Database,
    Lock,
    Star,
    CheckCircle,
    Globe,
    Smartphone,
    Monitor,
    Sparkles,
    Bot,
    FileText,
    FolderOpen,
    Search,
    Share2,
    Download,
    Eye,
    Clock,
    TrendingUp,
    Award,
    MessageSquare,
    Heart,
    ChevronRight,
    ChevronLeft
} from "lucide-react";
import { Particles } from "@/components/ui/particles";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import DashboardPage from "./DashboardPage";
import { LineGraph } from "@/components/ui/LineGraph";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { cn } from "@/lib/utils";

// NEW ENHANCED LANDING PAGE
const features = [
    {
        icon: CloudUpload,
        category: "Smart File Uploads",
        title: "Upload, organize and access files instantly",
        details: "Drag and drop your files into folders with blazing-fast speed. StoreVault ensures a smooth upload experience with support for all file types and a responsive interface.",
        color: "from-blue-500 to-cyan-500"
    },
    {
        icon: BarChart2,
        category: "User Analytics",
        title: "Gain insights into your storage and activity",
        details: "Track uploads, file types, usage trends, and top files over time. Visual dashboards help you stay informed and make data-driven storage decisions.",
        color: "from-purple-500 to-pink-500"
    },
    {
        icon: Shield,
        category: "Access Control",
        title: "Control who sees your data and when",
        details: "Share files securely with role-based access. Set granular permissions, expiration links, and manage visibility across teams or external collaborators.",
        color: "from-green-500 to-emerald-500"
    },
    {
        icon: Users,
        category: "Collaboration",
        title: "Collaborate in real-time, effortlessly",
        details: "Enable seamless teamwork by commenting, organizing, and working on shared folders. Keep everyone aligned with intuitive collaboration tools.",
        color: "from-orange-500 to-red-500"
    },
    {
        icon: Database,
        category: "Storage Optimization",
        title: "Know what's eating your space and optimize",
        details: "Identify large or redundant files, and reclaim space intelligently. StoreVault offers detailed usage breakdowns and smart cleanup suggestions.",
        color: "from-indigo-500 to-purple-500"
    },
    {
        icon: Bot,
        category: "AI Assistant",
        title: "Get intelligent help with your files",
        details: "Our AI assistant helps you organize, search, and manage your files more efficiently. Get smart suggestions and automated workflows.",
        color: "from-teal-500 to-blue-500"
    }
];

const pricingPlans = [
    {
        name: "Free",
        price: "$0",
        period: "/month",
        description: "Perfect for getting started",
        features: [
            "5 GB storage",
            "Basic file management",
            "Standard support",
            "Web access only"
        ],
        popular: false,
        color: "border-zinc-700"
    },
    {
        name: "Pro",
        price: "$9",
        period: "/month",
        description: "For professionals and teams",
        features: [
            "100 GB storage",
            "Advanced analytics",
            "AI assistant",
            "Priority support",
            "Mobile apps",
            "Team collaboration"
        ],
        popular: true,
        color: "border-blue-500"
    },
    {
        name: "Enterprise",
        price: "$29",
        period: "/month",
        description: "For large organizations",
        features: [
            "Unlimited storage",
            "Custom integrations",
            "Advanced security",
            "24/7 support",
            "API access",
            "Custom branding"
        ],
        popular: false,
        color: "border-zinc-700"
    }
];

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Product Manager",
        company: "TechCorp",
        content: "StoreVault has transformed how our team manages files. The AI assistant is incredibly helpful and the analytics give us great insights.",
        avatar: "https://avatars.githubusercontent.com/u/1?v=4",
        rating: 5
    },
    {
        name: "Michael Chen",
        role: "Designer",
        company: "Creative Studio",
        content: "The collaboration features are amazing. We can work together seamlessly and the file organization is intuitive.",
        avatar: "https://avatars.githubusercontent.com/u/2?v=4",
        rating: 5
    },
    {
        name: "Emily Rodriguez",
        role: "Developer",
        company: "StartupXYZ",
        content: "As a developer, I love the API access and automation features. StoreVault integrates perfectly with our workflow.",
        avatar: "https://avatars.githubusercontent.com/u/3?v=4",
        rating: 5
    }
];

const stats = [
    { label: "Active Users", value: "10K+", icon: Users },
    { label: "Files Stored", value: "1M+", icon: FileText },
    { label: "Storage Used", value: "50TB+", icon: Database },
    { label: "Countries", value: "150+", icon: Globe }
];

const LandingPage = ({ isUserLoggedIn }) => {
    return (
        <>
            {isUserLoggedIn ? (
                <DashboardPage />
            ) : (
                <div className="flex flex-col min-h-screen text-white bg-black">
                    <Header />
                    
                    {/* Hero Section */}
                    <section className="relative flex items-center justify-center min-h-screen px-6">
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
                        <Particles
                            className="absolute inset-0 pointer-events-none"
                            quantity={100}
                            ease={80}
                            color={"#fff"}
                            refresh
                        />
                        
                        <div className="relative z-10 max-w-4xl text-center">
                            <Badge className="px-4 py-2 mb-6 text-sm font-semibold text-white border-none rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                                <Sparkles className="w-4 h-4 mr-2" />
                                Now live - StoreVault v1.0 🚀
                            </Badge>
                            
                            <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl">
                                <span className="text-transparent bg-gradient-to-r from-white to-zinc-300 bg-clip-text">
                                    Modern File Storage
                                </span>
                                <br />
                                <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                                    with AI Intelligence
                                </span>
                            </h1>
                            
                            <p className="max-w-3xl mx-auto mb-8 text-xl leading-relaxed md:text-2xl text-zinc-300">
                                Upload, manage, analyze, and share your files with confidence. 
                                Powered by AI assistance and real-time analytics for the modern workspace.
                            </p>
                            
                            <div className="flex flex-col items-center justify-center gap-4 mb-12 sm:flex-row">
                                <Button size="lg" className="px-8 py-6 text-lg font-semibold text-white rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                                    Get Started Free <ArrowUpRight className="w-5 h-5 ml-2" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="px-8 py-6 text-lg font-semibold text-white rounded-full border-zinc-600 hover:bg-zinc-800"
                                >
                                    <CirclePlay className="w-5 h-5 mr-2" /> Watch Demo
                                </Button>
                            </div>
                            
                            {/* Stats */}
                            <div className="grid max-w-4xl grid-cols-2 gap-8 mx-auto md:grid-cols-4">
                                {stats.map((stat, index) => (
                                    <div key={index} className="text-center">
                                        <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20">
                                            <stat.icon className="w-6 h-6 text-blue-400" />
                                        </div>
                                        <div className="mb-1 text-2xl font-bold text-white">{stat.value}</div>
                                        <div className="text-sm text-zinc-400">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Features Section */}
                    <section className="px-6 py-20">
                        <div className="mx-auto max-w-7xl">
                            <div className="mb-16 text-center">
                                <h2 className="mb-6 text-4xl font-bold md:text-5xl">
                                    Everything you need to manage files intelligently
                                </h2>
                                <p className="max-w-3xl mx-auto text-xl text-zinc-400">
                                    From simple uploads to advanced AI-powered organization, 
                                    StoreVault provides all the tools you need for modern file management.
                                </p>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {features.map((feature, index) => (
                                    <Card key={index} className="transition-all duration-300 border-zinc-800 bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-900/70 group">
                                        <CardHeader>
                                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                                <feature.icon className="w-6 h-6 text-white" />
                                            </div>
                                            <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                                            <CardDescription className="text-zinc-400">
                                                {feature.category}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="leading-relaxed text-zinc-300">
                                                {feature.details}
                                            </p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Pricing Section */}
                    <section className="px-6 py-20 bg-zinc-900/30">
                        <div className="max-w-6xl mx-auto">
                            <div className="mb-16 text-center">
                                <h2 className="mb-6 text-4xl font-bold md:text-5xl">
                                    Choose the perfect plan for you
                                </h2>
                                <p className="max-w-2xl mx-auto text-xl text-zinc-400">
                                    Start free and scale as you grow. All plans include our core features.
                                </p>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                                {pricingPlans.map((plan, index) => (
                                    <Card key={index} className={`relative border-2 ${plan.color} bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-900/70 transition-all duration-300 ${plan.popular ? 'scale-105' : ''}`}>
                                        {plan.popular && (
                                            <div className="absolute transform -translate-x-1/2 -top-4 left-1/2">
                                                <Badge className="px-4 py-1 text-white bg-gradient-to-r from-blue-500 to-purple-600">
                                                    Most Popular
                                                </Badge>
                                            </div>
                                        )}
                                        <CardHeader className="text-center">
                                            <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                                            <div className="flex items-baseline justify-center gap-1">
                                                <span className="text-4xl font-bold text-white">{plan.price}</span>
                                                <span className="text-zinc-400">{plan.period}</span>
                                            </div>
                                            <CardDescription className="text-zinc-400">
                                                {plan.description}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="mb-8 space-y-3">
                                                {plan.features.map((feature, featureIndex) => (
                                                    <li key={featureIndex} className="flex items-center gap-3">
                                                        <CheckCircle className="flex-shrink-0 w-5 h-5 text-green-400" />
                                                        <span className="text-zinc-300">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            <Button 
                                                className={`w-full ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' : 'bg-zinc-800 hover:bg-zinc-700'} text-white`}
                                            >
                                                Get Started
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Testimonials Section */}
                    <section className="px-6 py-20">
                        <div className="max-w-6xl mx-auto">
                            <div className="mb-16 text-center">
                                <h2 className="mb-6 text-4xl font-bold md:text-5xl">
                                    Loved by teams worldwide
                                </h2>
                                <p className="max-w-2xl mx-auto text-xl text-zinc-400">
                                    See what our users have to say about StoreVault
                                </p>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                                {testimonials.map((testimonial, index) => (
                                    <Card key={index} className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                                        <CardContent className="p-6">
                                            <div className="flex items-center gap-1 mb-4">
                                                {[...Array(testimonial.rating)].map((_, i) => (
                                                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                                ))}
                                            </div>
                                            <p className="mb-6 leading-relaxed text-zinc-300">
                                                "{testimonial.content}"
                                            </p>
                                            <div className="flex items-center gap-3">
                                                <img 
                                                    src={testimonial.avatar} 
                                                    alt={testimonial.name}
                                                    className="w-10 h-10 rounded-full"
                                                />
                                                <div>
                                                    <div className="font-semibold text-white">{testimonial.name}</div>
                                                    <div className="text-sm text-zinc-400">{testimonial.role} at {testimonial.company}</div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="px-6 py-20">
                        <div className="max-w-4xl mx-auto text-center">
                            <Card className="border-zinc-800 bg-gradient-to-r from-zinc-900/50 to-zinc-800/50 backdrop-blur-sm">
                                <CardContent className="p-12">
                                    <h2 className="mb-6 text-4xl font-bold md:text-5xl">
                                        Ready to transform your file management?
                                    </h2>
                                    <p className="max-w-2xl mx-auto mb-8 text-xl text-zinc-400">
                                        Join thousands of users who trust StoreVault for their file storage and collaboration needs.
                                    </p>
                                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                                        <Button size="lg" className="px-8 py-6 text-lg font-semibold text-white rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                                            Start Free Trial <ArrowUpRight className="w-5 h-5 ml-2" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            className="px-8 py-6 text-lg font-semibold text-white rounded-full border-zinc-600 hover:bg-zinc-800"
                                        >
                                            Contact Sales
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </section>

                    <Footer />
                </div>
            )}
        </>
    );
};

export default LandingPage;