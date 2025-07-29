import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import useAuthStore from "@/store/useAuthStore";
import { CameraIcon } from "lucide-react";
import { getInitialsFromName } from "@/utils/getInitialsFromName";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AccountSettingsPage = () => {
    const { user } = useAuthStore();

    const [formData, setFormData] = useState({
        fullName: user?.fullName || "",
        email: user?.email || "",
        password: "",
        confirmPassword: "",
        image: user?.image || ""
    });

    const [profileImage, setProfileImage] = useState(user?.image || "");
    const [previewImage, setPreviewImage] = useState(user?.image || "");

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
            setProfileImage(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        // ⛔️ Replace with actual API logic
        toast.success("Account settings updated");
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4 text-white bg-black">
            <div className="w-full max-w-2xl p-8 shadow-lg bg-zinc-900 rounded-xl">
                <h2 className="mb-6 text-3xl font-bold text-center">Account Settings</h2>

                {/* Profile Image Section */}
                <div className="flex flex-col items-center gap-4 mb-8">
                    <div className="relative">
                        <Avatar className="rounded-full size-24">
                            <AvatarImage src={user?.image} alt={user?.fullName} />
                            <AvatarFallback className="text-3xl rounded-full">{getInitialsFromName(user?.fullName)}</AvatarFallback>
                        </Avatar>
                        <label htmlFor="imageUpload" className="absolute bottom-0 right-0 p-1 text-black bg-white rounded-full shadow-md cursor-pointer">
                            <CameraIcon className="w-4 h-4" />
                        </label>
                        <input
                            type="file"
                            id="imageUpload"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </div>
                    <span className="text-sm text-muted-foreground">
                        Click camera icon to change
                    </span>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className="mt-3"
                        />
                    </div>

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className="mt-3"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <Label htmlFor="password">New Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className={`mt-3`}
                            />
                        </div>
                        <div>
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className={`mt-3`}
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full font-semibold text-black bg-white hover:bg-zinc-200"
                    >
                        Update Settings
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default AccountSettingsPage;