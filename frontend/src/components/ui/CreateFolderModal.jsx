import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import axiosInstance from "@/services/axios";
import useFileStore from "@/store/useFileStore";

const CreateFolderModal = ({ open, onClose }) => {
    const [folderName, setFolderName] = useState("");
    const { getAllFiles } = useFileStore();

    const handleCreate = async () => {
        if (!folderName.trim()) {
            toast.error("Folder name cannot be empty.");
            return;
        }

        try {
            await axiosInstance.post("/files/folder", { name: folderName }); // Adjust route if needed
            toast.success("Folder created!");
            onClose();
            setFolderName("");
            await getAllFiles();
        } catch (err) {
            toast.error("Failed to create folder." + err.message);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="text-white bg-zinc-900">
                <DialogHeader>
                    <DialogTitle>Create New Folder</DialogTitle>
                </DialogHeader>
                <Input
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                    placeholder="Enter folder name"
                    className="text-white bg-zinc-800"
                />
                <DialogFooter>
                    <Button onClick={handleCreate}>Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateFolderModal;