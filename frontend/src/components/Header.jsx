import React from 'react'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { IconBrandGithub, IconDatabase } from '@tabler/icons-react'

const components = [
    {
        title: "Alert Dialog",
        href: "/docs/primitives/alert-dialog",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        description:
            "For sighted users to preview content available behind a link.",
    },
    {
        title: "Progress",
        href: "/docs/primitives/progress",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "Scroll-area",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
    },
    {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
]

function ListItem({
    title,
    children,
    href,
    ...props
}) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link href={href}>
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="text-sm leading-snug text-muted-foreground line-clamp-2">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}


const Header = ({ isUserLoggedIn }) => {

    return (
        <header className="flex items-center justify-between gap-2 bg-black h-14 shrink-0 text-primary">
            {!isUserLoggedIn && (
                <a href="/">
                    <div className='flex items-center gap-3 px-2 py-3 ml-3 text-2xl font-bold'>
                        <IconDatabase />
                        <span>StoreVault</span>
                    </div>
                </a>
            )}
            <div className="flex items-center justify-center w-full gap-1 px-4 lg:gap-2 lg:px-6">
                <Separator orientation="vertical" className="h-4 mx-2" />
                <div>
                    <NavigationMenu viewport={false}>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Home</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                        <li className="row-span-3">
                                            <NavigationMenuLink asChild>
                                                <a
                                                    className="flex flex-col justify-end w-full h-full p-6 no-underline rounded-md select-none from-muted/50 to-muted bg-linear-to-b outline-hidden focus:shadow-md"
                                                    href="/"
                                                >
                                                    <div className="mt-4 mb-2 text-lg font-medium">
                                                        shadcn/ui
                                                    </div>
                                                    <p className="text-sm leading-tight text-muted-foreground">
                                                        Beautifully designed components built with Tailwind CSS.
                                                    </p>
                                                </a>
                                            </NavigationMenuLink>
                                        </li>
                                        <ListItem href="/docs" title="Introduction">
                                            Re-usable components built using Radix UI and Tailwind CSS.
                                        </ListItem>
                                        <ListItem href="/docs/installation" title="Installation">
                                            How to install dependencies and structure your app.
                                        </ListItem>
                                        <ListItem href="/docs/primitives/typography" title="Typography">
                                            Styles for headings, paragraphs, lists...etc
                                        </ListItem>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                        {components.map((component) => (
                                            <ListItem
                                                key={component.title}
                                                title={component.title}
                                                href={component.href}
                                            >
                                                {component.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link href="/docs">Docs</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>List</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[300px] gap-4">
                                        <li>
                                            <NavigationMenuLink asChild>
                                                <Link href="#">
                                                    <div className="font-medium">Components</div>
                                                    <div className="text-muted-foreground">
                                                        Browse all components in the library.
                                                    </div>
                                                </Link>
                                            </NavigationMenuLink>
                                            <NavigationMenuLink asChild>
                                                <Link href="#">
                                                    <div className="font-medium">Documentation</div>
                                                    <div className="text-muted-foreground">
                                                        Learn how to use the library.
                                                    </div>
                                                </Link>
                                            </NavigationMenuLink>
                                            <NavigationMenuLink asChild>
                                                <Link href="#">
                                                    <div className="font-medium">Blog</div>
                                                    <div className="text-muted-foreground">
                                                        Read our latest blog posts.
                                                    </div>
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Simple</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[200px] gap-4">
                                        <li>
                                            <NavigationMenuLink asChild>
                                                <Link href="#">Components</Link>
                                            </NavigationMenuLink>
                                            <NavigationMenuLink asChild>
                                                <Link href="#">Documentation</Link>
                                            </NavigationMenuLink>
                                            <NavigationMenuLink asChild>
                                                <Link href="#">Blocks</Link>
                                            </NavigationMenuLink>
                                        </li>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[200px] gap-4">
                                        <li>
                                            <NavigationMenuLink asChild>
                                                <Link href="#" className="flex-row items-center gap-2">
                                                    <CircleHelpIcon />
                                                    Backlog
                                                </Link>
                                            </NavigationMenuLink>
                                            <NavigationMenuLink asChild>
                                                <Link href="#" className="flex-row items-center gap-2">
                                                    <CircleIcon />
                                                    To Do
                                                </Link>
                                            </NavigationMenuLink>
                                            <NavigationMenuLink asChild>
                                                <Link href="#" className="flex-row items-center gap-2">
                                                    <CircleCheckIcon />
                                                    Done
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                    {!isUserLoggedIn && (
                        <div className='flex items-center gap-2 ml-auto'>
                            <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
                                <Link
                                    to={'/login'}
                                    rel="noopener noreferrer"
                                >
                                    Login
                                </Link>
                            </Button>
                            <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
                                <Link
                                    to={'/register'}
                                    rel="noopener noreferrer"
                                >
                                    Register
                                </Link>
                            </Button>
                            <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
                                <a
                                    href='https://github.com/pratyushsinha213/'
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <IconBrandGithub />
                                </a>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header