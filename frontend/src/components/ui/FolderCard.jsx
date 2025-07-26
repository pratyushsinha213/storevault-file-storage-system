import { Folder, MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";
import { useState } from "react";
import RenameFolderModal from "./RenameFolderModal";

const FolderCard = ({ folder, onOpen, onDelete }) => {
    const [showRenameModal, setShowRenameModal] = useState(false);

    return (
        <>
            <div
                className="relative flex items-center justify-between p-4 transition-all border rounded-xl bg-zinc-900 border-zinc-800 hover:shadow-lg hover:border-zinc-700 group"
            >
                {/* Folder Info */}
                <div
                    onClick={() => onOpen?.(folder)}
                    className="flex flex-col justify-between w-full gap-2 cursor-pointer"
                >
                    <div className="flex items-center gap-3">
                        <Folder className="w-6 h-6 text-yellow-500" />
                        <div className="text-base font-medium text-white truncate max-w-[160px]">
                            {folder.name}
                        </div>
                    </div>
                    <div className="text-sm text-zinc-400">{folder?.fileCount || 0} items</div>
                </div>

                {/* Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="invisible group-hover:visible text-zinc-400 hover:text-white">
                            <MoreVertical size={18} />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="text-sm text-white bg-zinc-900">
                        <DropdownMenuItem onClick={() => onOpen?.(folder)}>📂 Open</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setShowRenameModal(true)}>✏️ Rename</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDelete?.(folder._id)} className="text-red-400">
                            🗑️ Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {showRenameModal && (
                <RenameFolderModal
                    open={showRenameModal}
                    onClose={() => setShowRenameModal(false)}
                    folder={folder}
                />
            )}
        </>
    );
};

export default FolderCard;