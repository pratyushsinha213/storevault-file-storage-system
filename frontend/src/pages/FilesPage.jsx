/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import useFileStore from '@/store/useFileStore';
import FileCard from '@/components/ui/FileCard';
import { UploadCloud, PlusCircle, Trash2, Search, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import UploadToast from '@/components/ui/UploadToast';
import CreateFolderModal from '@/components/ui/CreateFolderModal';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import FolderCard from '@/components/ui/FolderCard';

const FilesPage = () => {
    const fileInputRef = useRef(null);
    const { uploadFile, getAllFiles, deleteFile, files } = useFileStore();
    const [search, setSearch] = useState("");

    const handleUploadClick = () => fileInputRef.current?.click();


    // const handleFileChange = async (e) => {
    //     const file = e.target.files?.[0];
    //     if (!file) return;

    //     const formData = new FormData();
    //     formData.append('file', file);

    //     let toastId;
    //     let currentProgress = 0;

    //     const updateToast = (progress, done = false) => {
    //         if (toastId) {
    //             setTimeout(() => {
    //                 toast.dismiss(toastId); // remove old
    //             }, 5000)
    //         }

    //         toastId = toast.custom((t) => (
    //             <UploadToast file={file} progress={progress} isDone={done} />
    //         ), { duration: Infinity, position: "bottom-right", id: file.name });
    //     };

    //     try {
    //         await uploadFile(
    //             formData,
    //             (percent) => {
    //                 currentProgress = percent;
    //                 updateToast(percent);
    //             },
    //             () => updateToast(currentProgress, true)
    //         );
    //         await getAllFiles();
    //     } catch (err) {
    //         toast.error("Upload failed.");
    //     }
    // };

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        // Show loading toast
        const toastId = toast.loading(`Uploading ${file.name}...`);

        try {
            await uploadFile(
                formData,
                (percent) => {
                    toast.message(`Uploading ${file.name}: ${percent.toFixed(0)}%`, {
                        id: toastId,
                    });
                }
            );

            await getAllFiles();
            toast.success(`${file.name} uploaded successfully!`, { id: toastId });
        } catch (err) {
            toast.error(`Failed to upload ${file.name}`, { id: toastId });
        }
    };

    const handleDelete = async (fileId) => {
        await deleteFile(fileId);
        await getAllFiles();
    };

    const handleClearAll = async () => {
        if (confirm("Are you sure you want to delete all files?")) {
            for (const file of files) {
                await deleteFile(file._id);
            }
            await getAllFiles();
        }
    };

    useEffect(() => {
        getAllFiles();
    }, [getAllFiles]);

    const [showFolderModal, setShowFolderModal] = useState("");

    return (
        <div className="min-h-screen px-6 py-10 bg-black text-primary">
            {/* Header */}
            <div className="flex flex-col items-start justify-end gap-4 mb-8 sm:flex-row sm:items-center sm:gap-0">
                {/* <h1 className="text-3xl font-semibold tracking-tight text-white">📂 File Manager</h1> */}

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleClearAll}
                        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-red-300 transition bg-red-900 rounded-md hover:bg-red-800"
                    >
                        <Trash2 size={16} /> Clear All
                    </button>

                    {/* <button
                        onClick={handleUploadClick}
                        className="flex items-center gap-1 px-4 py-2 text-sm font-medium transition rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                        <UploadCloud size={16} /> Upload
                    </button> */}
                    <CreateFolderModal open={showFolderModal} onClose={() => setShowFolderModal(false)} />

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center gap-2 px-4 py-2 font-medium transition rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
                                <PlusCircle size={16} /> New
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="text-white bg-zinc-900">
                            <DropdownMenuItem onClick={() => setShowFolderModal(true)}>
                                📁 Create Folder
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleUploadClick}>
                                📤 Upload File
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Upload Dropzone */}
            <div
                className="flex items-center justify-center w-full max-w-5xl mx-auto mb-10 transition-all border-2 border-dashed cursor-pointer rounded-2xl h-36 bg-zinc-900 border-zinc-700 hover:bg-zinc-800 group"
                onClick={handleUploadClick}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    name="file"
                    id="file"
                    className="hidden"
                    accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                    onChange={handleFileChange}
                />
                <div className="text-center text-zinc-400 group-hover:text-zinc-300">
                    <p className="text-lg font-medium">Click or drag & drop to upload a file</p>
                    <p className="text-xs text-zinc-500">Supported: PDF, PNG, JPG, DOCX</p>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col justify-between gap-4 mb-6 sm:flex-row sm:items-center">
                <div className="flex items-center w-full max-w-xs px-3 py-2 rounded-md bg-zinc-900">
                    <Search className="w-4 h-4 text-zinc-400" />
                    <input
                        type="text"
                        placeholder="Search files..."
                        className="w-full pl-2 text-sm text-white bg-transparent outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-2 text-sm">
                    <span className="text-zinc-400">Sort:</span>
                    <button className="flex items-center gap-1 px-2 py-1 text-white transition rounded-md bg-zinc-800 hover:bg-zinc-700">
                        Recent <ChevronDown className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Files */}
            <div className="max-w-6xl mx-auto">
                {files?.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {files
                            .filter((file) =>
                                file.name.toLowerCase().includes(search.toLowerCase())
                            )
                            .map((file) =>
                                file.isFolder ? (
                                    <FolderCard key={file._id} folder={file} />
                                ) : (
                                    <FileCard key={file._id} file={file} onDelete={handleDelete} />
                                )
                            )}
                    </div>
                ) : (
                    <div className="py-10 text-center text-zinc-500">
                        <p className="text-lg">No files uploaded yet.</p>
                        <p className="text-sm text-zinc-600">Upload some files to get started!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FilesPage;