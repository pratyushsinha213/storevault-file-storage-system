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
import { IconChartBar, IconCreditCard, IconDashboard, IconDatabase, IconDotsVertical, IconFolder, IconLogout, IconMessageChatbot, IconNotification, IconUserCircle } from "@tabler/icons-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import useAuthStore from "@/store/useAuthStore"
import { Button } from "./ui/button"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { getInitialsFromName } from "@/utils/getInitialsFromName"

// Menu items.
const items = [
    // {
    //     title: "Dashboard",
    //     url: "/dashboard",
    //     icon: IconDashboard,
    // },
    {
        title: "Analytics",
        url: "/analytics",
        icon: IconChartBar,
    },
    {
        title: "Files",
        url: "/files",
        icon: IconFolder,
    },
    {
        title: "AI Assistant",
        url: "/ai-assistant",
        icon: IconMessageChatbot,
    },
]

const AppSidebar = () => {
    const { isMobile } = useSidebar();
    const { user, logoutUser } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
        const result = await logoutUser();
        if (result.success) {
            navigate("/");
        }
    }

    return (
        <>
            <Sidebar>
                <SidebarHeader>
                    <SidebarMenuButton>
                        <a className="flex items-center gap-2" href="/">
                            <IconDatabase className="!size-5" />
                            <span className="text-base font-semibold">StoreVault</span>
                        </a>
                    </SidebarMenuButton>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Actions</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link to={`${item.url}`}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

                <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                        <Link to={`/upgrade-plan`}>
                            <IconCreditCard />
                            <span>Upgrade Plan</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton
                                        size="lg"
                                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                                        <Avatar className="w-8 h-8 rounded-lg grayscale">
                                            <AvatarImage src={user?.image} alt={user?.fullName} />
                                            <AvatarFallback className="rounded-lg">{getInitialsFromName(user?.fullName)}</AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-sm leading-tight text-left">
                                            <span className="font-medium truncate">{user?.fullName}</span>
                                            <span className="text-xs truncate text-muted-foreground">
                                                {user?.email}
                                            </span>
                                        </div>
                                        <IconDotsVertical className="ml-auto size-4" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                    side={isMobile ? "bottom" : "right"}
                                    align="end"
                                    sideOffset={4}>
                                    <DropdownMenuLabel className="p-0 font-normal">
                                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                            <Avatar className="w-8 h-8 rounded-lg">
                                                <AvatarImage src={user?.image} alt={user?.fullName} />
                                                <AvatarFallback className="rounded-lg">{getInitialsFromName(user?.fullName)}</AvatarFallback>
                                            </Avatar>
                                            <div className="grid flex-1 text-sm leading-tight text-left">
                                                <span className="font-medium truncate">{user?.fullName}</span>
                                                <span className="text-xs truncate text-muted-foreground">
                                                    {user?.email}
                                                </span>
                                            </div>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <IconUserCircle />
                                            Account
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <IconCreditCard />
                                            Billing
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <IconNotification />
                                            Notifications
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Button onClick={handleLogout} variant={`ghost`} className={`text-red-500 hover:text-red-500`}>
                                            <IconLogout className="text-red-500" />
                                            Log out
                                        </Button>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
            <SidebarTrigger className={`cursor-pointer text-foreground mx-2 mt-3.5`} />
        </>
    );
};

export default AppSidebar;