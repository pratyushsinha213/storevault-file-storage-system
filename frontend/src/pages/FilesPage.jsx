/* eslint-disable no-unused-vars */
// import React, { useEffect, useRef } from 'react';
// import useFileStore from '@/store/useFileStore';
// import FileCard from '@/components/ui/FileCard';

// const FilesPage = () => {
//     const fileInputRef = useRef(null);
//     const { uploadFile, getAllFiles, deleteFile, files } = useFileStore();

//     const handleUploadClick = () => fileInputRef.current?.click();

//     const handleFileChange = async (e) => {
//         const file = e.target.files?.[0];
//         if (!file) return;

//         const formData = new FormData();
//         formData.append('file', file);
//         await uploadFile(formData);
//         await getAllFiles();
//     };

//     const handleDelete = async (fileId) => {
//         await deleteFile(fileId);
//         await getAllFiles();
//     };

//     useEffect(() => {
//         getAllFiles();
//     }, [getAllFiles]);

//     return (
//         <div className="p-6 text-primary">
//             {/* Upload */}
//             <div
//                 className="flex items-center justify-center w-full max-w-4xl mx-auto mb-8 transition border-2 border-red-500 border-dashed cursor-pointer bg-zinc-900 rounded-xl h-36 hover:bg-zinc-800"
//                 onClick={handleUploadClick}
//             >
//                 <input
//                     ref={fileInputRef}
//                     type="file"
//                     name="file"
//                     id="file"
//                     className="hidden"
//                     accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
//                     onChange={handleFileChange}
//                 />
//                 <div className="text-center text-gray-500">
//                     <p className="font-medium">Click to upload or drag files here</p>
//                     <p className="text-xs text-gray-400">Supported formats: PDF, PNG, JPG, DOCX</p>
//                 </div>
//             </div>

//             {/* File List */}
//             <div className="max-w-6xl mx-auto">
//                 <h2 className="mb-4 text-xl font-semibold">Your Files</h2>
//                 {files?.length > 0 ? (
//                     <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//                         {files.map((file) => (
//                             <FileCard key={file._id} file={file} onDelete={handleDelete} />
//                         ))}
//                     </div>
//                 ) : (
//                     <p className="text-sm text-muted-foreground">No files uploaded yet.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default FilesPage;

import React, { useEffect, useRef, useState } from 'react';
import useFileStore from '@/store/useFileStore';
import FileCard from '@/components/ui/FileCard';
import { UploadCloud, PlusCircle, Trash2, Search, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import UploadToast from '@/components/ui/UploadToast';

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
    //     await uploadFile(formData);
    //     await getAllFiles();
    // };


    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        let toastId;
        let currentProgress = 0;

        const updateToast = (progress, done = false) => {
            if (toastId) {
                setTimeout(() => {
                    toast.dismiss(toastId); // remove old
                }, 5000)
            }

            toastId = toast.custom((t) => (
                <UploadToast file={file} progress={progress} isDone={done} />
            ), { duration: Infinity, position: "bottom-right", id: file.name });
        };

        try {
            await uploadFile(
                formData,
                (percent) => {
                    currentProgress = percent;
                    updateToast(percent);
                },
                () => updateToast(currentProgress, true)
            );
            await getAllFiles();
        } catch (err) {
            toast.error("Upload failed.");
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

                    <button
                        onClick={handleUploadClick}
                        className="flex items-center gap-1 px-4 py-2 text-sm font-medium transition rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                        <UploadCloud size={16} /> Upload
                    </button>
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
                            .map((file) => (
                                <FileCard key={file._id} file={file} onDelete={handleDelete} />
                            ))}
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