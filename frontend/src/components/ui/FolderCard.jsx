import { Folder, MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";
import { useState } from "react";
import RenameFolderModal from "./RenameFolderModal";
import DeleteFolderModal from "./DeleteFolderModal";

const FolderCard = ({ folder, onOpen }) => {
    const [showRenameModal, setShowRenameModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    return (
        <>
            <div
                className="relative px-3 py-2 transition-all duration-300 border group rounded-2xl bg-zinc-900 border-zinc-800 hover:border-zinc-700 hover:shadow-xl"
            >
                {/* Main Card Click Area */}
                <div
                    onClick={() => onOpen?.(folder)}
                    className="space-y-2 cursor-pointer"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-yellow-500/10">
                            <Folder className="w-6 h-6 text-yellow-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-base font-medium text-white truncate">{folder.name}</h3>
                            <p className="text-sm text-zinc-400">{folder?.fileCount || 0} items</p>
                        </div>
                    </div>
                </div>

                {/* Options Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="absolute transition-opacity opacity-0 top-6 right-3 text-zinc-400 hover:text-white group-hover:opacity-100">
                            <MoreVertical size={18} />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="text-sm text-white border rounded-md bg-zinc-900 border-zinc-700">
                        <DropdownMenuItem onClick={() => onOpen?.(folder)}>📂 Open</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setShowRenameModal(true)}>✏️ Rename</DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => setShowDeleteModal(true)}
                            className="text-red-400"
                        >
                            🗑️ Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Rename Modal */}
            {showRenameModal && (
                <RenameFolderModal
                    open={showRenameModal}
                    onClose={() => setShowRenameModal(false)}
                    folder={folder}
                />
            )}
            {/* Delete Modal */}
            {showDeleteModal && (
                <DeleteFolderModal
                    open={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    folder={folder}
                />
            )}
        </>
    );
};

export default FolderCard;