import React from 'react'

const HeroSection = () => {
    return (
        <div className="flex items-center justify-center min-h-screen px-6">
            <BackgroundPattern />
            <div className="relative z-10 max-w-2xl text-center">
                <Badge className="bg-gradient-to-br via-70% from-primary via-muted/30 to-primary rounded-full py-1 border-none">
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
    )
}

export default HeroSection