import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import axiosInstance from "@/services/axios";
import useFileStore from "@/store/useFileStore";

const RenameFolderModal = ({ open, onClose, folder }) => {
    const [newName, setNewName] = useState(folder?.name || "");
    const { getAllFiles } = useFileStore();


    const handleRename = async () => {
        try {
            await axiosInstance.put(`/files/folder/${folder._id}`, { name: newName });
            toast.success("Folder renamed!");
            onClose();
            await getAllFiles();
        } catch (err) {
            toast.error("Rename failed: " + err.message);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="text-white bg-zinc-900">
                <DialogHeader>
                    <DialogTitle>Rename Folder</DialogTitle>
                </DialogHeader>
                <Input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="New folder name"
                    className="text-white bg-zinc-800"
                />
                <DialogFooter>
                    <Button onClick={handleRename}>Rename</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default RenameFolderModal;