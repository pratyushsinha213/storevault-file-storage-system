import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axiosInstance from "@/services/axios";
import useFileStore from "@/store/useFileStore";

const DeleteFolderModal = ({ open, onClose, folder }) => {
    const { getAllFiles } = useFileStore();

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/files/folder/${folder._id}`);
            toast.success("Folder deleted successfully!");
            onClose();
            await getAllFiles();
        } catch (err) {
            toast.error("Failed to delete folder: " + err.message);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="text-white bg-zinc-900">
                <DialogHeader>
                    <DialogTitle>Delete Folder</DialogTitle>
                </DialogHeader>
                <div className="py-4 text-sm text-zinc-400">
                    Are you sure you want to delete the folder{" "}
                    <span className="font-semibold text-white">{folder?.name}</span>? This
                    action cannot be undone.
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleDelete}>
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteFolderModal;