import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AnimatedGridPattern } from '@/components/magicui/animated-grid-pattern';
import { cn } from '@/lib/utils';
import { 
    User, 
    Shield, 
    Bell, 
    Palette, 
    Database, 
    Zap, 
    Globe, 
    Key, 
    Mail, 
    Smartphone,
    Monitor,
    Moon,
    Sun,
    Settings,
    Save,
    Trash2,
    Download,
    Upload,
    Eye,
    EyeOff,
    CheckCircle,
    AlertTriangle,
    Info
} from 'lucide-react';

const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState('account');
    const [showPassword, setShowPassword] = useState(false);
    const [theme, setTheme] = useState('dark');
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        security: true,
        updates: true
    });

    const tabs = [
        { id: 'account', label: 'Account', icon: User },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'storage', label: 'Storage', icon: Database },
        { id: 'appearance', label: 'Appearance', icon: Palette },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'integrations', label: 'Integrations', icon: Zap }
    ];

    const user = {
        name: "John Doe",
        email: "john.doe@example.com",
        avatar: "https://avatars.githubusercontent.com/u/12345678?v=4",
        plan: "Pro",
        storageUsed: "2.4 GB",
        storageTotal: "100 GB"
    };

    const renderAccountTab = () => (
        <div className="space-y-6">
            {/* Profile Section */}
            <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                        <User className="w-5 h-5" />
                        Profile Information
                    </CardTitle>
                    <CardDescription className="text-zinc-400">
                        Update your personal information and profile picture
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-6">
                        <Avatar className="w-20 h-20 rounded-xl ring-4 ring-zinc-700">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="text-lg font-semibold text-white rounded-xl bg-zinc-800">
                                {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                            <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                                <Upload className="w-4 h-4 mr-2" />
                                Change Photo
                            </Button>
                            <p className="text-sm text-zinc-500">JPG, PNG or GIF. Max size 2MB.</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-zinc-300">Full Name</Label>
                            <Input 
                                id="name" 
                                defaultValue={user.name}
                                className="text-white bg-zinc-800 border-zinc-700 placeholder:text-zinc-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-zinc-300">Email Address</Label>
                            <Input 
                                id="email" 
                                type="email" 
                                defaultValue={user.email}
                                className="text-white bg-zinc-800 border-zinc-700 placeholder:text-zinc-500"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Subscription Section */}
            <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                        <Key className="w-5 h-5" />
                        Subscription & Billing
                    </CardTitle>
                    <CardDescription className="text-zinc-400">
                        Manage your subscription and billing information
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg bg-zinc-800/50 border-zinc-700">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-blue-500/20">
                                <Key className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <div className="font-semibold text-white">{user.plan} Plan</div>
                                <div className="text-sm text-zinc-400">Active until Dec 31, 2024</div>
                            </div>
                        </div>
                        <Badge variant="secondary" className="text-blue-400 bg-blue-500/20 border-blue-500/30">
                            Active
                        </Badge>
                    </div>
                    
                    <div className="flex gap-3">
                        <Button className="text-white bg-blue-600 hover:bg-blue-700">
                            <Key className="w-4 h-4 mr-2" />
                            Manage Billing
                        </Button>
                        <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                            <Download className="w-4 h-4 mr-2" />
                            Download Invoice
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );

    const renderSecurityTab = () => (
        <div className="space-y-6">
            {/* Password Section */}
            <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                        <Shield className="w-5 h-5" />
                        Password & Security
                    </CardTitle>
                    <CardDescription className="text-zinc-400">
                        Update your password and security settings
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="current-password" className="text-zinc-300">Current Password</Label>
                        <div className="relative">
                            <Input 
                                id="current-password" 
                                type={showPassword ? "text" : "password"}
                                className="pr-10 text-white bg-zinc-800 border-zinc-700 placeholder:text-zinc-500"
                                placeholder="Enter current password"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="w-4 h-4 text-zinc-400" />
                                ) : (
                                    <Eye className="w-4 h-4 text-zinc-400" />
                                )}
                            </Button>
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="new-password" className="text-zinc-300">New Password</Label>
                        <Input 
                            id="new-password" 
                            type="password"
                            className="text-white bg-zinc-800 border-zinc-700 placeholder:text-zinc-500"
                            placeholder="Enter new password"
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="confirm-password" className="text-zinc-300">Confirm New Password</Label>
                        <Input 
                            id="confirm-password" 
                            type="password"
                            className="text-white bg-zinc-800 border-zinc-700 placeholder:text-zinc-500"
                            placeholder="Confirm new password"
                        />
                    </div>
                    
                    <Button className="text-white bg-green-600 hover:bg-green-700">
                        <Save className="w-4 h-4 mr-2" />
                        Update Password
                    </Button>
                </CardContent>
            </Card>

            {/* Two-Factor Authentication */}
            <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                        <Smartphone className="w-5 h-5" />
                        Two-Factor Authentication
                    </CardTitle>
                    <CardDescription className="text-zinc-400">
                        Add an extra layer of security to your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg bg-zinc-800/50 border-zinc-700">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-green-500/20">
                                <CheckCircle className="w-5 h-5 text-green-400" />
                            </div>
                            <div>
                                <div className="font-semibold text-white">2FA Enabled</div>
                                <div className="text-sm text-zinc-400">Authenticator app configured</div>
                            </div>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    
                    <div className="flex gap-3">
                        <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                            <Smartphone className="w-4 h-4 mr-2" />
                            Setup Authenticator
                        </Button>
                        <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                            <Mail className="w-4 h-4 mr-2" />
                            Backup Codes
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Login History */}
            <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                        <Monitor className="w-5 h-5" />
                        Login History
                    </CardTitle>
                    <CardDescription className="text-zinc-400">
                        Recent login activity on your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {[
                            { device: "MacBook Pro", location: "San Francisco, CA", time: "2 minutes ago", status: "active" },
                            { device: "iPhone 14", location: "San Francisco, CA", time: "1 hour ago", status: "active" },
                            { device: "Windows PC", location: "New York, NY", time: "2 days ago", status: "suspicious" }
                        ].map((login, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-zinc-800/50 border-zinc-700">
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "p-2 rounded-lg",
                                        login.status === "active" ? "bg-green-500/20" : "bg-red-500/20"
                                    )}>
                                        {login.status === "active" ? (
                                            <CheckCircle className="w-4 h-4 text-green-400" />
                                        ) : (
                                            <AlertTriangle className="w-4 h-4 text-red-400" />
                                        )}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-white">{login.device}</div>
                                        <div className="text-sm text-zinc-400">{login.location} • {login.time}</div>
                                    </div>
                                </div>
                                <Badge 
                                    variant="secondary" 
                                    className={cn(
                                        login.status === "active" 
                                            ? "text-green-400 bg-green-500/20 border-green-500/30"
                                            : "text-red-400 bg-red-500/20 border-red-500/30"
                                    )}
                                >
                                    {login.status}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );

    const renderStorageTab = () => (
        <div className="space-y-6">
            {/* Storage Overview */}
            <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                        <Database className="w-5 h-5" />
                        Storage Overview
                    </CardTitle>
                    <CardDescription className="text-zinc-400">
                        Monitor your storage usage and manage files
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-zinc-300">Storage Used</span>
                            <span className="font-semibold text-white">{user.storageUsed} / {user.storageTotal}</span>
                        </div>
                        <div className="w-full h-3 rounded-full bg-zinc-800">
                            <div 
                                className="h-3 transition-all duration-300 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                                style={{ width: '24%' }}
                            ></div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-zinc-400">24% used</span>
                            <span className="text-zinc-400">75.6 GB available</span>
                        </div>
                    </div>
                    
                    <Separator className="bg-zinc-700" />
                    
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="p-4 border rounded-lg bg-zinc-800/50 border-zinc-700">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                <span className="text-sm font-semibold text-white">Documents</span>
                            </div>
                            <div className="text-2xl font-bold text-white">1.2 GB</div>
                            <div className="text-xs text-zinc-400">45% of storage</div>
                        </div>
                        <div className="p-4 border rounded-lg bg-zinc-800/50 border-zinc-700">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="text-sm font-semibold text-white">Images</span>
                            </div>
                            <div className="text-2xl font-bold text-white">800 MB</div>
                            <div className="text-xs text-zinc-400">30% of storage</div>
                        </div>
                        <div className="p-4 border rounded-lg bg-zinc-800/50 border-zinc-700">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                <span className="text-sm font-semibold text-white">Videos</span>
                            </div>
                            <div className="text-2xl font-bold text-white">400 MB</div>
                            <div className="text-xs text-zinc-400">15% of storage</div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Storage Actions */}
            <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                        <Trash2 className="w-5 h-5" />
                        Storage Management
                    </CardTitle>
                    <CardDescription className="text-zinc-400">
                        Clean up storage and manage file retention
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Find Large Files
                        </Button>
                        <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                            <Download className="w-4 h-4 mr-2" />
                            Download All
                        </Button>
                        <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                            <Info className="w-4 h-4 mr-2" />
                            Duplicate Files
                        </Button>
                        <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Empty Trash
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );

    const renderAppearanceTab = () => (
        <div className="space-y-6">
            {/* Theme Settings */}
            <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                        <Palette className="w-5 h-5" />
                        Theme & Appearance
                    </CardTitle>
                    <CardDescription className="text-zinc-400">
                        Customize the look and feel of your interface
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <Label className="text-zinc-300">Theme Mode</Label>
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { id: 'light', label: 'Light', icon: Sun },
                                { id: 'dark', label: 'Dark', icon: Moon },
                                { id: 'auto', label: 'Auto', icon: Monitor }
                            ].map((themeOption) => (
                                <Button
                                    key={themeOption.id}
                                    variant={theme === themeOption.id ? "default" : "outline"}
                                    className={cn(
                                        "flex flex-col items-center gap-2 p-4 h-auto",
                                        theme === themeOption.id
                                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                                            : "border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                                    )}
                                    onClick={() => setTheme(themeOption.id)}
                                >
                                    <themeOption.icon className="w-5 h-5" />
                                    <span className="text-sm">{themeOption.label}</span>
                                </Button>
                            ))}
                        </div>
                    </div>
                    
                    <Separator className="bg-zinc-700" />
                    
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <Label className="text-zinc-300">Compact Mode</Label>
                                <p className="text-sm text-zinc-400">Reduce spacing for more content</p>
                            </div>
                            <Switch />
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <div>
                                <Label className="text-zinc-300">Show File Previews</Label>
                                <p className="text-sm text-zinc-400">Display thumbnails for images and documents</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <div>
                                <Label className="text-zinc-300">Animations</Label>
                                <p className="text-sm text-zinc-400">Enable smooth transitions and effects</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );

    const renderNotificationsTab = () => (
        <div className="space-y-6">
            <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                        <Bell className="w-5 h-5" />
                        Notification Preferences
                    </CardTitle>
                    <CardDescription className="text-zinc-400">
                        Control how and when you receive notifications
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <Label className="text-zinc-300">Email Notifications</Label>
                                <p className="text-sm text-zinc-400">Receive updates via email</p>
                            </div>
                            <Switch 
                                checked={notifications.email}
                                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, email: checked }))}
                            />
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <div>
                                <Label className="text-zinc-300">Push Notifications</Label>
                                <p className="text-sm text-zinc-400">Get real-time updates in your browser</p>
                            </div>
                            <Switch 
                                checked={notifications.push}
                                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, push: checked }))}
                            />
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <div>
                                <Label className="text-zinc-300">Security Alerts</Label>
                                <p className="text-sm text-zinc-400">Important security notifications</p>
                            </div>
                            <Switch 
                                checked={notifications.security}
                                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, security: checked }))}
                            />
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <div>
                                <Label className="text-zinc-300">Product Updates</Label>
                                <p className="text-sm text-zinc-400">New features and improvements</p>
                            </div>
                            <Switch 
                                checked={notifications.updates}
                                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, updates: checked }))}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );

    const renderIntegrationsTab = () => (
        <div className="space-y-6">
            <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                        <Zap className="w-5 h-5" />
                        Connected Apps
                    </CardTitle>
                    <CardDescription className="text-zinc-400">
                        Manage your third-party integrations
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {[
                        { name: 'Slack', status: 'connected', icon: '💬' },
                        { name: 'Google Drive', status: 'connected', icon: '☁️' },
                        { name: 'Dropbox', status: 'disconnected', icon: '📦' },
                        { name: 'Zapier', status: 'connected', icon: '⚡' }
                    ].map((app, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-zinc-800/50 border-zinc-700">
                            <div className="flex items-center gap-3">
                                <div className="text-2xl">{app.icon}</div>
                                <div>
                                    <div className="font-semibold text-white">{app.name}</div>
                                    <div className="text-sm text-zinc-400">
                                        {app.status === 'connected' ? 'Connected' : 'Not connected'}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge 
                                    variant="secondary" 
                                    className={cn(
                                        app.status === 'connected'
                                            ? "text-green-400 bg-green-500/20 border-green-500/30"
                                            : "text-zinc-400 bg-zinc-500/20 border-zinc-500/30"
                                    )}
                                >
                                    {app.status}
                                </Badge>
                                <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                                >
                                    {app.status === 'connected' ? 'Manage' : 'Connect'}
                                </Button>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );

    const renderTabContent = () => {
        switch (activeTab) {
            case 'account': return renderAccountTab();
            case 'security': return renderSecurityTab();
            case 'storage': return renderStorageTab();
            case 'appearance': return renderAppearanceTab();
            case 'notifications': return renderNotificationsTab();
            case 'integrations': return renderIntegrationsTab();
            default: return renderAccountTab();
        }
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
                    "absolute inset-0 -z-10"
                )}
            />

            <div className="container relative z-10 px-6 py-8 mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-blue-500/20">
                            <Settings className="w-6 h-6 text-blue-400" />
                        </div>
                        <h1 className="text-3xl font-bold text-white">Settings</h1>
                    </div>
                    <p className="text-zinc-400">Manage your account preferences and security settings</p>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-1">
                        <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                            <CardContent className="p-4">
                                <nav className="space-y-2">
                                    {tabs.map((tab) => (
                                        <Button
                                            key={tab.id}
                                            variant={activeTab === tab.id ? "default" : "ghost"}
                                            className={cn(
                                                "w-full justify-start gap-3",
                                                activeTab === tab.id
                                                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                                                    : "text-zinc-300 hover:text-white hover:bg-zinc-800"
                                            )}
                                            onClick={() => setActiveTab(tab.id)}
                                        >
                                            <tab.icon className="w-4 h-4" />
                                            {tab.label}
                                        </Button>
                                    ))}
                                </nav>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {renderTabContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;