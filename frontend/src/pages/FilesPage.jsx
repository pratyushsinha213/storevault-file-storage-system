/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
// import React, { useEffect, useRef, useState } from 'react';
// import useFileStore from '@/store/useFileStore';
// import FileCard from '@/components/ui/FileCard';
// import { UploadCloud, PlusCircle, Trash2, Search, ChevronDown } from 'lucide-react';
// import { toast } from 'sonner';
// import UploadToast from '@/components/ui/UploadToast';
// import CreateFolderModal from '@/components/ui/CreateFolderModal';
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
// import FolderCard from '@/components/ui/FolderCard';
// import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
// import { Button } from '@/components/ui/button';

// const FilesPage = () => {
//     const fileInputRef = useRef(null);
//     const { uploadFile, getAllFiles, deleteFile, files } = useFileStore();

//     const [search, setSearch] = useState("");
//     const [showFolderModal, setShowFolderModal] = useState(false);
//     const [currentFolderId, setCurrentFolderId] = useState(null); // null = fiLes
//     const [currentPath, setCurrentPath] = useState([{ id: null, name: "fiLes" }]);

//     const handleUploadClick = () => fileInputRef.current?.click();

//     const handleFileChange = async (e) => {
//         const file = e.target.files?.[0];
//         if (!file) return;

//         const formData = new FormData();
//         formData.append("file", file);

//         const toastId = toast.loading(`Uploading ${file.name}...`);

//         try {
//             await uploadFile(
//                 formData,
//                 (percent) => {
//                     toast.message(`Uploading ${file.name}: ${percent.toFixed(0)}%`, { id: toastId });
//                 },
//                 () => { }
//             );

//             await getAllFiles();
//             toast.success(`${file.name} uploaded successfully!`, { id: toastId });
//         } catch (err) {
//             toast.error(`Failed to upload ${file.name}`, { id: toastId });
//         }
//     };

//     const handleDelete = async (fileId) => {
//         await deleteFile(fileId);
//         await getAllFiles();
//     };

//     const handleClearAll = async () => {
//         if (confirm("Are you sure you want to delete all files?")) {
//             for (const file of files) {
//                 await deleteFile(file._id);
//             }
//             await getAllFiles();
//         }
//     };

//     useEffect(() => {
//         getAllFiles();
//     }, [getAllFiles]);

//     const visibleFiles = files?.filter(file => file.folderId === currentFolderId);

//     return (
//         <div className="min-h-screen px-6 py-10 bg-black text-primary">
//             {/* Breadcrumb */}
//             <div className="mb-6">
//                 <Breadcrumb>
//                     <BreadcrumbList>
//                         {currentPath.map((crumb, idx) => (
//                             <BreadcrumbItem key={crumb.id || "fiLes"}>
//                                 <BreadcrumbLink asChild>
//                                     <button
//                                         onClick={() => {
//                                             const newPath = currentPath.slice(0, idx + 1);
//                                             setCurrentPath(newPath);
//                                             setCurrentFolderId(crumb.id);
//                                         }}
//                                         className={`text-sm ${idx === currentPath.length - 1
//                                             ? "font-semibold text-white"
//                                             : "text-zinc-400 hover:underline"
//                                             }`}
//                                     >
//                                         {crumb.name}
//                                     </button>
//                                 </BreadcrumbLink>
//                                 {idx !== currentPath.length - 1 && <BreadcrumbSeparator />}
//                             </BreadcrumbItem>
//                         ))}
//                     </BreadcrumbList>
//                 </Breadcrumb>
//             </div>

//             {/* Header Actions */}
//             <div className="flex flex-col items-start justify-between gap-4 mb-6 sm:flex-row sm:items-center">
//                 <div className="flex items-center gap-3">
//                     <Button
//                         onClick={handleClearAll}
//                         className="text-red-300 bg-red-900 hover:bg-red-800"
//                     >
//                         <Trash2 size={16} className="mr-1" /> Clear All
//                     </Button>

//                     <CreateFolderModal open={showFolderModal} onClose={() => setShowFolderModal(false)} />

//                     <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                             <Button>
//                                 <PlusCircle size={16} className="mr-1" /> New
//                             </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent className="text-white bg-zinc-900">
//                             <DropdownMenuItem onClick={() => setShowFolderModal(true)}>
//                                 📁 Create Folder
//                             </DropdownMenuItem>
//                             <DropdownMenuItem onClick={handleUploadClick}>
//                                 📤 Upload File
//                             </DropdownMenuItem>
//                         </DropdownMenuContent>
//                     </DropdownMenu>
//                 </div>
//             </div>

//             {/* Upload Dropzone */}
//             <div
//                 className="flex items-center justify-center w-full max-w-5xl mx-auto mb-10 transition-all border-2 border-dashed cursor-pointer rounded-2xl h-36 bg-zinc-900 border-zinc-700 hover:bg-zinc-800 group"
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
//                 <div className="text-center text-zinc-400 group-hover:text-zinc-300">
//                     <p className="text-lg font-medium">Click or drag & drop to upload a file</p>
//                     <p className="text-xs text-zinc-500">Supported: PDF, PNG, JPG, DOCX</p>
//                 </div>
//             </div>

//             {/* Controls */}
//             <div className="flex flex-col justify-between gap-4 mb-6 sm:flex-row sm:items-center">
//                 <div className="flex items-center w-full max-w-xs px-3 py-2 rounded-md bg-zinc-900">
//                     <Search className="w-4 h-4 text-zinc-400" />
//                     <input
//                         type="text"
//                         placeholder="Search files..."
//                         className="w-full pl-2 text-sm text-white bg-transparent outline-none"
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                     />
//                 </div>

//                 <div className="flex items-center gap-2 text-sm">
//                     <span className="text-zinc-400">Sort:</span>
//                     <button className="flex items-center gap-1 px-2 py-1 text-white transition rounded-md bg-zinc-800 hover:bg-zinc-700">
//                         Recent <ChevronDown className="w-4 h-4" />
//                     </button>
//                 </div>
//             </div>

//             {/* File Grid */}
//             <div className="max-w-6xl mx-auto">
//                 {visibleFiles?.length > 0 ? (
//                     <div className="grid grid-cols-6 gap-6">
//                         {visibleFiles
//                             .filter(file => file.isFolder && file.name.toLowerCase().includes(search.toLowerCase()))
//                             .map(folder => (
//                                 <div key={folder._id} className="col-span-2">
//                                     <FolderCard
//                                         folder={folder}
//                                         onOpen={(f) => {
//                                             if (f._id === currentFolderId) return;
//                                             setCurrentFolderId(f._id);
//                                             setCurrentPath(prev => [...prev, { id: f._id, name: f.name }]);
//                                         }}
//                                     />
//                                 </div>
//                             ))}

//                         {visibleFiles
//                             .filter(file => !file.isFolder && file.name.toLowerCase().includes(search.toLowerCase()))
//                             .map(file => (
//                                 <div key={file._id} className="col-span-3">
//                                     <FileCard file={file} onDelete={handleDelete} />
//                                 </div>
//                             ))}
//                     </div>
//                 ) : (
//                     <div className="py-10 text-center text-zinc-500">
//                         <p className="text-lg">No files in this folder.</p>
//                         <p className="text-sm text-zinc-600">Upload something to get started!</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default FilesPage;

import React, { useEffect, useRef, useState } from 'react';
import useFileStore from '@/store/useFileStore';
import FileCard from '@/components/ui/FileCard';
import { UploadCloud, PlusCircle, Trash2, Search, ChevronDown, Folder as FolderIcon, MoreVertical as DotsVerticalIcon } from 'lucide-react';
import { toast } from 'sonner';
import UploadToast from '@/components/ui/UploadToast';
import CreateFolderModal from '@/components/ui/CreateFolderModal';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import FolderCard from '@/components/ui/FolderCard';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from '@/components/ui/button';
import { FlickeringGrid } from '@/components/magicui/flickering-grid';
import { cn } from '@/lib/utils';
import { AnimatedGridPattern } from '@/components/magicui/animated-grid-pattern';

const FilesPage = () => {
    const fileInputRef = useRef(null);
    const { uploadFile, getAllFiles, deleteFile, files } = useFileStore();

    const [search, setSearch] = useState("");
    const [showFolderModal, setShowFolderModal] = useState(false);
    const [currentFolderId, setCurrentFolderId] = useState(null); // null = fiLes
    const [currentPath, setCurrentPath] = useState([{ id: null, name: "fiLes" }]);

    const handleUploadClick = () => fileInputRef.current?.click();

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        const toastId = toast.loading(`Uploading ${file.name}...`);

        try {
            await uploadFile(
                formData,
                (percent) => {
                    toast.message(`Uploading ${file.name}: ${percent.toFixed(0)}%`, { id: toastId });
                },
                () => { }
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

    const visibleFiles = files?.filter(file => file.folderId === currentFolderId);


    const folders = visibleFiles.filter(f => f.isFolder && f.name.toLowerCase().includes(search.toLowerCase()));
    const normalFiles = visibleFiles.filter(f => !f.isFolder && f.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="min-h-screen px-6 py-10 bg-black text-primary">
            <AnimatedGridPattern
                numSquares={30}
                maxOpacity={0.1}
                duration={3}
                repeatDelay={1}
                className={cn(
                    "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
                    "inset-x-0 inset-y-[-30%] min-h-screen skew-y-12",)}
            />
            {/* Breadcrumb */}
            <div className="mb-6">
                <Breadcrumb>
                    <BreadcrumbList>
                        {currentPath.map((crumb, idx) => (
                            <BreadcrumbItem key={crumb.id || "fiLes"}>
                                <BreadcrumbLink asChild>
                                    <button
                                        onClick={() => {
                                            const newPath = currentPath.slice(0, idx + 1);
                                            setCurrentPath(newPath);
                                            setCurrentFolderId(crumb.id);
                                        }}
                                        className={`text-sm ${idx === currentPath.length - 1
                                            ? "font-semibold text-white"
                                            : "text-zinc-400 hover:underline"
                                            }`}
                                    >
                                        {crumb.name}
                                    </button>
                                </BreadcrumbLink>
                                {idx !== currentPath.length - 1 && <BreadcrumbSeparator />}
                            </BreadcrumbItem>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            {/* Header Actions */}
            <div className="flex flex-col items-start justify-between gap-4 mb-6 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                    <Button
                        onClick={handleClearAll}
                        className="text-red-300 bg-red-900 hover:bg-red-800"
                    >
                        <Trash2 size={16} className="mr-1" /> Clear All
                    </Button>

                    <CreateFolderModal open={showFolderModal} onClose={() => setShowFolderModal(false)} />

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button>
                                <PlusCircle size={16} className="mr-1" /> New
                            </Button>
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

            {/* Search + Sort */}
            <div className="flex flex-col justify-between gap-4 mb-6 sm:flex-row sm:items-center">
                <div className="flex items-center w-full max-w-xs px-3 py-2 border rounded-md bg-zinc-900 border-zinc-700">
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
                    <button className="flex items-center gap-1 px-2 py-1 text-white rounded-md bg-zinc-800 hover:bg-zinc-700">
                        Recent <ChevronDown className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Section: Folders */}
            {folders.length > 0 && (
                <div className="mb-6">
                    <h2 className="mb-2 text-sm font-medium text-zinc-400">Folders</h2>
                    <div className="flex flex-wrap gap-4">
                        {folders.map((folder) => (
                            <div
                                key={folder._id}
                                className="w-[220px]"
                            >
                                <FolderCard
                                    folder={folder}
                                    onOpen={(f) => {
                                        if (f._id === currentFolderId) return;
                                        setCurrentFolderId(f._id);
                                        setCurrentPath(prev => [...prev, { id: f._id, name: f.name }]);
                                    }}
                                    onDelete={handleDelete}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Section: Files */}
            <div>
                <h2 className="mb-2 text-sm font-medium text-zinc-400">Files</h2>
                {normalFiles.length > 0 ? (
                    <div className="grid grid-cols-5 gap-6">
                        {normalFiles.map(file => (
                            <FileCard key={file._id} file={file} onDelete={handleDelete} />
                        ))}
                    </div>
                ) : (
                    <div className="py-10 text-center text-zinc-500">
                        <p className="text-lg">No files in this folder.</p>
                        <p className="text-sm text-zinc-600">Upload something to get started!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FilesPage;