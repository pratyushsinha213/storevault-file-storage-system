// import {
//     Sidebar,
//     SidebarContent,
//     SidebarFooter,
//     SidebarGroup,
//     SidebarGroupContent,
//     SidebarGroupLabel,
//     SidebarHeader,
//     SidebarMenu,
//     SidebarMenuButton,
//     SidebarMenuItem,
//     SidebarProvider,
//     SidebarTrigger,
//     useSidebar,
// } from "@/components/ui/sidebar"
// import { IconChartBar, IconCreditCard, IconDashboard, IconDatabase, IconDotsVertical, IconFolder, IconLogout, IconMessageChatbot, IconNotification, IconUserCircle } from "@tabler/icons-react"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
// import useAuthStore from "@/store/useAuthStore"
// import { Button } from "./ui/button"
// import { Link, Navigate, useNavigate } from "react-router-dom"
// import { getInitialsFromName } from "@/utils/getInitialsFromName"

// // Menu items.
// const items = [
//     // {
//     //     title: "Dashboard",
//     //     url: "/dashboard",
//     //     icon: IconDashboard,
//     // },
//     {
//         title: "Analytics",
//         url: "/analytics",
//         icon: IconChartBar,
//     },
//     {
//         title: "Files",
//         url: "/files",
//         icon: IconFolder,
//     },
//     {
//         title: "AI Assistant",
//         url: "/ai-assistant",
//         icon: IconMessageChatbot,
//     },
// ]

// const AppSidebar = () => {
//     const { isMobile } = useSidebar();
//     const { user, logoutUser } = useAuthStore();
//     const navigate = useNavigate();

//     const handleLogout = async (e) => {
//         e.preventDefault();
//         const result = await logoutUser();
//         if (result.success) {
//             navigate("/");
//         }
//     }

//     return (
//         <>
//             <Sidebar>
//                 <SidebarHeader>
//                     <SidebarMenuButton>
//                         <a className="flex items-center gap-2" href="/">
//                             <img src="/favicon.png" className="size-6" />
//                             <span className="text-base font-semibold">StoreVault</span>
//                         </a>
//                     </SidebarMenuButton>
//                 </SidebarHeader>
//                 <SidebarContent>
//                     <SidebarGroup>
//                         <DropdownMenu>
//                             <DropdownMenuTrigger asChild>
//                                 <SidebarMenuButton
//                                     size="lg"
//                                     side={isMobile ? "bottom" : "right"}
//                                     // className="data-[state=open]:bg-sidebar-secondary data-[state=open]:text-sidebar-accent-foreground">
//                                     className="bg-primary hover:bg-[#e8e4e4] hover:cursor-pointer hover:text-zinc-800 text-black my-4 flex">
//                                     <div className="flex items-center justify-center gap-2 text-md">
//                                         <span className="text-xl">+</span>
//                                         <span className="">New</span>
//                                     </div>
//                                 </SidebarMenuButton>
//                             </DropdownMenuTrigger>
//                             <DropdownMenuContent className="w-48 mt-2 text-black rounded-md shadow-lg bg-primary">
//                                 <DropdownMenuItem onClick={() => console.log("📄 New File")}>
//                                     📄 Create File
//                                 </DropdownMenuItem>
//                                 <DropdownMenuItem onClick={() => console.log("📁 New Folder")}>
//                                     📁 Create Folder
//                                 </DropdownMenuItem>
//                                 <DropdownMenuItem onClick={() => console.log("📤 Upload File")}>
//                                     📤 Upload File
//                                 </DropdownMenuItem>
//                                 <DropdownMenuSeparator />
//                                 <DropdownMenuItem onClick={() => console.log("⚙️ Settings")}>
//                                     ⚙️ File Settings
//                                 </DropdownMenuItem>
//                             </DropdownMenuContent>
//                         </DropdownMenu>
//                         <SidebarGroupLabel>Actions</SidebarGroupLabel>
//                         <SidebarGroupContent>
//                             <SidebarMenu>
//                                 {items.map((item) => (
//                                     <SidebarMenuItem key={item.title}>
//                                         <SidebarMenuButton asChild>
//                                             <Link to={`${item.url}`}>
//                                                 <item.icon />
//                                                 <span>{item.title}</span>
//                                             </Link>
//                                         </SidebarMenuButton>
//                                     </SidebarMenuItem>
//                                 ))}
//                             </SidebarMenu>
//                         </SidebarGroupContent>
//                     </SidebarGroup>
//                 </SidebarContent>

//                 <SidebarMenuItem>
//                     <SidebarMenuButton asChild>
//                         <Link to={`/upgrade-plan`}>
//                             <IconCreditCard />
//                             <span>Upgrade Plan</span>
//                         </Link>
//                     </SidebarMenuButton>
//                 </SidebarMenuItem>
//                 <SidebarFooter>
//                     <SidebarMenu>
//                         <SidebarMenuItem>
//                             <DropdownMenu>
//                                 <DropdownMenuTrigger asChild>
//                                     <SidebarMenuButton
//                                         size="lg"
//                                         className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
//                                         <Avatar className="w-8 h-8 rounded-lg grayscale">
//                                             <AvatarImage src={user?.image} alt={user?.fullName} />
//                                             <AvatarFallback className="rounded-lg">{getInitialsFromName(user?.fullName)}</AvatarFallback>
//                                         </Avatar>
//                                         <div className="grid flex-1 text-sm leading-tight text-left">
//                                             <span className="font-medium truncate">{user?.fullName}</span>
//                                             <span className="text-xs truncate text-muted-foreground">
//                                                 {user?.email}
//                                             </span>
//                                         </div>
//                                         <IconDotsVertical className="ml-auto size-4" />
//                                     </SidebarMenuButton>
//                                 </DropdownMenuTrigger>
//                                 <DropdownMenuContent
//                                     className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
//                                     side={isMobile ? "bottom" : "right"}
//                                     align="end"
//                                     sideOffset={4}>
//                                     <DropdownMenuLabel className="p-0 font-normal">
//                                         <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
//                                             <Avatar className="w-8 h-8 rounded-lg">
//                                                 <AvatarImage src={user?.image} alt={user?.fullName} />
//                                                 <AvatarFallback className="rounded-lg">{getInitialsFromName(user?.fullName)}</AvatarFallback>
//                                             </Avatar>
//                                             <div className="grid flex-1 text-sm leading-tight text-left">
//                                                 <span className="font-medium truncate">{user?.fullName}</span>
//                                                 <span className="text-xs truncate text-muted-foreground">
//                                                     {user?.email}
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     </DropdownMenuLabel>
//                                     <DropdownMenuSeparator />
//                                     <DropdownMenuGroup>
//                                         <DropdownMenuItem onClick={() => navigate("/settings/account")}>
//                                             <IconUserCircle />
//                                             Account
//                                         </DropdownMenuItem>
//                                         <DropdownMenuItem>
//                                             <IconCreditCard />
//                                             Billing
//                                         </DropdownMenuItem>
//                                     </DropdownMenuGroup>
//                                     <DropdownMenuSeparator />
//                                     <DropdownMenuItem>
//                                         <Button onClick={handleLogout} variant={`ghost`} className={`text-red-500 hover:text-red-500`}>
//                                             <IconLogout className="text-red-500" />
//                                             Log out
//                                         </Button>
//                                     </DropdownMenuItem>
//                                 </DropdownMenuContent>
//                             </DropdownMenu>
//                         </SidebarMenuItem>
//                     </SidebarMenu>
//                 </SidebarFooter>
//             </Sidebar>
//             <SidebarTrigger className={`cursor-pointer bg-transparent text-foreground mx-2 mt-3.5`} />
//         </>
//     );
// };

// export default AppSidebar;

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
    useSidebar,
} from "@/components/ui/sidebar"
import { 
    IconChartBar, 
    IconCreditCard, 
    IconDashboard, 
    IconDatabase, 
    IconDotsVertical, 
    IconFolder, 
    IconLogout, 
    IconMessageChatbot, 
    IconNotification, 
    IconUserCircle,
    IconSettings,
    IconHome,
    IconPlus,
    IconSearch,
    IconStar,
    IconClock,
    IconMessage,
    IconHistory,
    IconBookmark,
    IconCopy,
    IconLock,
    IconEye,
    IconCalendar,
    IconShield,
    IconFileText,
    IconRefresh,
    IconPlug,
    IconWebhook,
    IconCode,
    IconGitBranch,
    IconUsers
} from "@tabler/icons-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import useAuthStore from "@/store/useAuthStore"
import { Button } from "./ui/button"
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom"
import { getInitialsFromName } from "@/utils/getInitialsFromName"
import { Badge } from "./ui/badge"
import { cn } from "@/lib/utils"

// Enhanced menu items with better organization
const mainMenuItems = [
    {
        title: "Files",
        url: "/files",
        icon: IconFolder,
        description: "Manage your files",
        badge: "New"
    },
    {
        title: "AI Assistant",
        url: "/ai-assistant",
        icon: IconMessageChatbot,
        description: "Chat with AI"
    },
    {
        title: "Analytics",
        url: "/analytics",
        icon: IconChartBar,
        description: "View insights"
    },
]

const smartOrganizationItems = [
    {
        title: "Smart Folders",
        url: "/smart-folders",
        icon: IconDatabase,
        description: "Auto-organized content",
        badge: "AI"
    },
    {
        title: "Collections",
        url: "/collections",
        icon: IconFolder,
        description: "Group related files"
    },
    {
        title: "Favorites",
        url: "/favorites",
        icon: IconStar,
        description: "Quick access"
    },
    {
        title: "Recent",
        url: "/recent",
        icon: IconClock,
        description: "Recently accessed"
    },
    {
        title: "Shared with Me",
        url: "/shared",
        icon: IconUsers,
        description: "Collaborative files"
    }
]

const collaborationItems = [
    {
        title: "Team Workspaces",
        url: "/workspaces",
        icon: IconUsers,
        description: "Collaborative spaces"
    },
    {
        title: "Shared Drives",
        url: "/shared-drives",
        icon: IconDatabase,
        description: "Team storage"
    },
    {
        title: "Comments",
        url: "/comments",
        icon: IconMessage,
        description: "File feedback"
    },
    {
        title: "Version History",
        url: "/versions",
        icon: IconHistory,
        description: "Track changes"
    }
]

const searchDiscoveryItems = [
    {
        title: "Advanced Search",
        url: "/search",
        icon: IconSearch,
        description: "Find files quickly"
    },
    {
        title: "Search History",
        url: "/search-history",
        icon: IconClock,
        description: "Recent searches"
    },
    {
        title: "Saved Searches",
        url: "/saved-searches",
        icon: IconBookmark,
        description: "Reusable queries"
    },
    {
        title: "Duplicate Files",
        url: "/duplicates",
        icon: IconCopy,
        description: "Find duplicates"
    }
]

const securityComplianceItems = [
    {
        title: "Encrypted Vault",
        url: "/vault",
        icon: IconLock,
        description: "Extra secure storage"
    },
    {
        title: "Access Logs",
        url: "/access-logs",
        icon: IconEye,
        description: "Track file access"
    },
    {
        title: "Data Retention",
        url: "/retention",
        icon: IconCalendar,
        description: "File lifecycle"
    },
    {
        title: "Compliance",
        url: "/compliance",
        icon: IconShield,
        description: "Audit trails"
    }
]

const productivityItems = [
    {
        title: "Templates",
        url: "/templates",
        icon: IconFileText,
        description: "Document templates"
    },
    {
        title: "Batch Operations",
        url: "/batch",
        icon: IconCopy,
        description: "Bulk actions"
    },
    {
        title: "File Conversion",
        url: "/convert",
        icon: IconRefresh,
        description: "Convert formats"
    },
    {
        title: "OCR Processing",
        url: "/ocr",
        icon: IconFileText,
        description: "Extract text"
    }
]

const integrationItems = [
    {
        title: "Connected Apps",
        url: "/integrations",
        icon: IconPlug,
        description: "Third-party apps"
    },
    {
        title: "Webhooks",
        url: "/webhooks",
        icon: IconWebhook,
        description: "Automated triggers"
    },
    {
        title: "API Access",
        url: "/api",
        icon: IconCode,
        description: "Developer access"
    },
    {
        title: "Workflows",
        url: "/workflows",
        icon: IconGitBranch,
        description: "Automation"
    }
]

// const secondaryMenuItems = [
//     {
//         title: "Settings",
//         url: "/settings",
//         icon: IconSettings,
//         description: "Account preferences"
//     },
//     {
//         title: "Search",
//         url: "/search",
//         icon: IconSearch,
//         description: "Find files quickly"
//     },
// ]

const AppSidebar = () => {
    const { isMobile } = useSidebar();
    const { user, logoutUser } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async (e) => {
        e.preventDefault();
        const result = await logoutUser();
        if (result.success) {
            navigate("/");
        }
    }

    const isActiveRoute = (url) => {
        return location.pathname === url;
    }

    return (
        <>
            {/* <Sidebar className="w-[20%] border-r bg-primary text-secondary border-zinc-700/50"> */}
            <Sidebar className="border-r bg-primary text-secondary border-zinc-700/50">
                <SidebarHeader className="px-6 py-8 border-b border-zinc-700/50">
                    <SidebarMenuButton className="p-3 transition-colors rounded-lg hover:bg-zinc-800/50">
                        <Link to="/" className="flex items-center gap-4">
                            <div className="relative">
                                <img src="/favicon.png" className="w-10 h-10 rounded-lg z-1" alt="StoreVault" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-bold text-white">StoreVault</span>
                                {/* <span className="text-sm text-zinc-400">File Storage</span> */}
                            </div>
                        </Link>
                    </SidebarMenuButton>
                </SidebarHeader>

                <SidebarContent className="px-6 py-8 space-y-10">
                    {/* Quick Actions */}
                    <SidebarGroup>
                        <SidebarGroupLabel className="px-2 mb-6 text-xs font-semibold tracking-wider uppercase text-zinc-400">
                            Quick Actions
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton
                                        size="lg"
                                        side={isMobile ? "bottom" : "right"}
                                        className="w-full py-5 font-semibold text-black transition-all duration-200 bg-white cursor-pointer hover:bg-zinc-100 hover:text-zinc-800 hover:shadow-md rounded-xl"
                                    >
                                        <div className="flex items-center justify-center gap-3">
                                            <IconPlus className="w-5 h-5" />
                                            <span className="text-base">Create New</span>
                                        </div>
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="mt-3 text-black bg-white border shadow-xl w-60 rounded-xl border-zinc-200">
                                    <DropdownMenuLabel className="px-4 py-3 text-sm font-semibold text-zinc-700">
                                        Create New
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem 
                                        onClick={() => navigate('/files')}
                                        className="flex items-center gap-4 px-4 py-4 rounded-lg cursor-pointer hover:bg-gray-100"
                                    >
                                        <div className="p-2 bg-blue-100 rounded-lg">
                                            <IconFolder className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-zinc-800">Create Folder</div>
                                            <div className="text-sm text-zinc-500">Organize your files</div>
                                        </div>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                        onClick={() => navigate('/files')}
                                        className="flex items-center gap-4 px-4 py-4 rounded-lg cursor-pointer hover:bg-gray-100"
                                    >
                                        <div className="p-2 bg-green-100 rounded-lg">
                                            <IconPlus className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-zinc-800">Upload File</div>
                                            <div className="text-sm text-zinc-500">Add new files</div>
                                        </div>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem 
                                        onClick={() => navigate('/ai-assistant')}
                                        className="flex items-center gap-4 px-4 py-4 rounded-lg cursor-pointer hover:bg-gray-100"
                                    >
                                        <div className="p-2 bg-purple-100 rounded-lg">
                                            <IconMessageChatbot className="w-5 h-5 text-purple-600" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-zinc-800">AI Chat</div>
                                            <div className="text-sm text-zinc-500">Get AI assistance</div>
                                        </div>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

                    {/* Main Navigation */}
                    <SidebarGroup>
                        <SidebarGroupLabel className="px-2 mb-6 text-xs font-semibold tracking-wider uppercase text-zinc-400">
                            Navigation
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu className="space-y-3">
                                {mainMenuItems.map((item) => (
                                    <SidebarMenuItem key={item.url}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActiveRoute(item.url)}
                                            className={cn(
                                                "w-full transition-all duration-200 rounded-md py-6 px-2",
                                                isActiveRoute(item.url)
                                                    ? "bg-white text-black shadow-md"
                                                    : "hover:bg-zinc-800/50 text-zinc-300 hover:text-white"
                                            )}
                                        >
                                            <Link to={item.url} className="flex items-center gap-4">
                                                <div className={cn(
                                                    "p-2 rounded-lg transition-colors",
                                                    isActiveRoute(item.url)
                                                        ? "bg-zinc-100"
                                                        : "bg-zinc-700/50"
                                                )}>
                                                    <item.icon className={cn(
                                                        "size-5",
                                                        isActiveRoute(item.url)
                                                            ? "text-zinc-700"
                                                            : "text-zinc-400"
                                                    )} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-base font-semibold">{item.title}</span>
                                                        {item.badge && (
                                                            <Badge variant="secondary" className="text-xs font-semibold text-blue-400 bg-blue-500/20 border-blue-500/30">
                                                                {item.badge}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

                    {/* Smart Organization */}
                    <SidebarGroup>
                        <SidebarGroupLabel className="px-2 mb-6 text-xs font-semibold tracking-wider uppercase text-zinc-400">
                            Smart Organization
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu className="space-y-3">
                                {smartOrganizationItems.map((item) => (
                                    <SidebarMenuItem key={item.url}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActiveRoute(item.url)}
                                            className={cn(
                                                "w-full transition-all duration-200 rounded-md py-6 px-2",
                                                isActiveRoute(item.url)
                                                    ? "bg-white text-black shadow-md"
                                                    : "hover:bg-zinc-800/50 text-zinc-300 hover:text-white"
                                            )}
                                        >
                                            <Link to={item.url} className="flex items-center gap-3">
                                                <div className={cn(
                                                    "p-2 rounded-lg transition-colors",
                                                    isActiveRoute(item.url)
                                                        ? "bg-zinc-100"
                                                        : "bg-zinc-700/50"
                                                )}>
                                                    <item.icon className={cn(
                                                        "size-4",
                                                        isActiveRoute(item.url)
                                                            ? "text-zinc-700"
                                                            : "text-zinc-400"
                                                    )} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-medium">{item.title}</span>
                                                        {item.badge && (
                                                            <Badge variant="secondary" className="text-xs font-semibold text-purple-400 bg-purple-500/20 border-purple-500/30">
                                                                {item.badge}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

                    {/* Collaboration */}
                    <SidebarGroup>
                        <SidebarGroupLabel className="px-2 mb-6 text-xs font-semibold tracking-wider uppercase text-zinc-400">
                            Collaboration
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu className="space-y-3">
                                {collaborationItems.map((item) => (
                                    <SidebarMenuItem key={item.url}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActiveRoute(item.url)}
                                            className={cn(
                                                "w-full transition-all duration-200 rounded-md py-6 px-2",
                                                isActiveRoute(item.url)
                                                    ? "bg-white text-black shadow-md"
                                                    : "hover:bg-zinc-800/50 text-zinc-300 hover:text-white"
                                            )}
                                        >
                                            <Link to={item.url} className="flex items-center gap-3">
                                                <div className={cn(
                                                    "p-2 rounded-lg transition-colors",
                                                    isActiveRoute(item.url)
                                                        ? "bg-zinc-100"
                                                        : "bg-zinc-700/50"
                                                )}>
                                                    <item.icon className={cn(
                                                        "size-4",
                                                        isActiveRoute(item.url)
                                                            ? "text-zinc-700"
                                                            : "text-zinc-400"
                                                    )} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <span className="text-sm font-medium">{item.title}</span>
                                                </div>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

                    {/* Search & Discovery */}
                    <SidebarGroup>
                        <SidebarGroupLabel className="px-2 mb-6 text-xs font-semibold tracking-wider uppercase text-zinc-400">
                            Search & Discovery
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu className="space-y-3">
                                {searchDiscoveryItems.map((item) => (
                                    <SidebarMenuItem key={item.url}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActiveRoute(item.url)}
                                            className={cn(
                                                "w-full transition-all duration-200 rounded-md py-6 px-2",
                                                isActiveRoute(item.url)
                                                    ? "bg-white text-black shadow-md"
                                                    : "hover:bg-zinc-800/50 text-zinc-300 hover:text-white"
                                            )}
                                        >
                                            <Link to={item.url} className="flex items-center gap-3">
                                                <div className={cn(
                                                    "p-2 rounded-lg transition-colors",
                                                    isActiveRoute(item.url)
                                                        ? "bg-zinc-100"
                                                        : "bg-zinc-700/50"
                                                )}>
                                                    <item.icon className={cn(
                                                        "size-4",
                                                        isActiveRoute(item.url)
                                                            ? "text-zinc-700"
                                                            : "text-zinc-400"
                                                    )} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <span className="text-sm font-medium">{item.title}</span>
                                                </div>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

                    {/* Tools */}
                    {/* <SidebarGroup>
                        <SidebarGroupLabel className="px-2 mb-6 text-xs font-semibold tracking-wider uppercase text-zinc-400">
                            Tools
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu className="space-y-3">
                                {secondaryMenuItems.map((item) => (
                                    <SidebarMenuItem key={item.url}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActiveRoute(item.url)}
                                            className={cn(
                                                "w-full transition-all duration-200 rounded-md py-6 px-2",
                                                isActiveRoute(item.url)
                                                    ? "bg-white text-black shadow-md"
                                                    : "hover:bg-zinc-800/50 text-zinc-300 hover:text-white"
                                            )}
                                        >
                                            <Link to={item.url} className="flex items-center gap-4">
                                                <div className={cn(
                                                    "p-2 rounded-lg transition-colors",
                                                    isActiveRoute(item.url)
                                                        ? "bg-zinc-100"
                                                        : "bg-zinc-700/50"
                                                )}>
                                                    <item.icon className={cn(
                                                        "size-4",
                                                        isActiveRoute(item.url)
                                                            ? "text-zinc-700"
                                                            : "text-zinc-400"
                                                    )} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <span className="text-sm font-medium">{item.title}</span>
                                                </div>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup> */}
                </SidebarContent>

                <SidebarFooter className="p-2 border-t border-zinc-700/50">
                    <div className="flex items-center gap-4 p-4 transition-colors cursor-pointer rounded-xl bg-zinc-800/50 hover:bg-zinc-800/70">
                        <Avatar className="w-10 h-10 rounded-lg ring-2 ring-zinc-600">
                            <AvatarImage src={user?.image} alt={user?.fullName} />
                            <AvatarFallback className="text-sm font-semibold text-white rounded-lg bg-zinc-700">
                                {getInitialsFromName(user?.fullName)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-white truncate">
                                {user?.fullName || "User"}
                            </div>
                            <div className="text-xs truncate text-zinc-400">
                                {user?.email || "user@example.com"}
                            </div>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-700/50">
                                    <IconDotsVertical className="w-4 h-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 text-white bg-zinc-900 border-zinc-700 rounded-xl">
                                <DropdownMenuLabel className="px-4 py-3 text-sm font-semibold text-zinc-400">
                                    Account
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                    onClick={() => navigate('/settings')}
                                    className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-zinc-800"
                                >
                                    <IconSettings className="w-4 h-4" />
                                    <span>Settings</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                    onClick={() => navigate('/upgrade-plan')}
                                    className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-zinc-800"
                                >
                                    <IconCreditCard className="w-4 h-4" />
                                    <span>Upgrade Plan</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 px-4 py-3 text-red-400 cursor-pointer hover:bg-red-500/20"
                                >
                                    <IconLogout className="w-4 h-4" />
                                    <span>Sign Out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </SidebarFooter>
            </Sidebar>
            <SidebarTrigger className="cursor-pointer bg-transparent text-foreground mx-2 mt-3.5" />
        </>
    )
}

export default AppSidebar