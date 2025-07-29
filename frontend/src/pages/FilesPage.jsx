import React, { useEffect, useRef, useState } from 'react';
import useFileStore from '@/store/useFileStore';
import FileCard from '@/components/ui/FileCard';
import {
    UploadCloud, PlusCircle, Trash2, Search, ChevronDown,
    Eye, Download, Trash, FolderOpen, Grid3X3, List, Filter
} from 'lucide-react';
import { toast } from 'sonner';
import CreateFolderModal from '@/components/ui/CreateFolderModal';
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import FolderCard from '@/components/ui/FolderCard';
import {
    Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnimatedGridPattern } from '@/components/magicui/animated-grid-pattern';
import { cn } from '@/lib/utils';
import formatBytes from '@/utils/formatBytes';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const FilesPage = () => {
    const fileInputRef = useRef(null);
    const { uploadFile, getAllFiles, deleteFile, files } = useFileStore();

    const [search, setSearch] = useState("");
    const [showFolderModal, setShowFolderModal] = useState(false);
    const [currentFolderId, setCurrentFolderId] = useState(null);
    const [currentPath, setCurrentPath] = useState([{ id: null, name: "fiLes" }]);
    const [viewMode, setViewMode] = useState("grid");

    useEffect(() => {
        getAllFiles();
    }, [getAllFiles]);

    const handleUploadClick = () => fileInputRef.current?.click();

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        const toastId = toast.loading(`Uploading ${file.name}...`);
        try {
            await uploadFile(formData, (percent) => {
                toast.message(`Uploading ${file.name}: ${percent.toFixed(0)}%`, { id: toastId });
            });
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

    const visibleFiles = files?.filter(file => file.folderId === currentFolderId);
    const folders = visibleFiles?.filter(f => f.isFolder && f.name.toLowerCase().includes(search.toLowerCase())) || [];
    const normalFiles = visibleFiles?.filter(f => !f.isFolder && f.name.toLowerCase().includes(search.toLowerCase())) || [];

    return (
        <div className="min-h-screen px-6 py-8 bg-black text-primary">
            <AnimatedGridPattern
                numSquares={30}
                maxOpacity={0.1}
                duration={3}
                repeatDelay={1}
                className={cn("[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]", "inset-x-0 inset-y-[-30%] min-h-screen skew-y-12")}
            />

            {/* Enhanced Breadcrumb */}
            <Card className="mb-6 border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                <CardContent className="p-4">
                    <Breadcrumb>
                        <BreadcrumbList>
                            {currentPath.map((crumb, idx) => (
                                <BreadcrumbItem key={crumb.id || "root"}>
                                    <BreadcrumbLink asChild>
                                        <button
                                            onClick={() => {
                                                const newPath = currentPath.slice(0, idx + 1);
                                                setCurrentPath(newPath);
                                                setCurrentFolderId(crumb.id);
                                            }}
                                            className={cn(
                                                "text-sm transition-colors",
                                                idx === currentPath.length - 1
                                                    ? "font-semibold text-white"
                                                    : "text-zinc-400 hover:text-white"
                                            )}
                                        >
                                            {crumb.name}
                                        </button>
                                    </BreadcrumbLink>
                                    {idx !== currentPath.length - 1 && <BreadcrumbSeparator />}
                                </BreadcrumbItem>
                            ))}
                        </BreadcrumbList>
                    </Breadcrumb>
                </CardContent>
            </Card>

            {/* Enhanced Header Actions */}
            <div className="flex flex-col items-start justify-between gap-4 mb-8 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                    <Button
                        onClick={handleClearAll}
                        variant="destructive"
                        size="sm"
                        className="bg-red-900/50 hover:bg-red-900/70 border-red-700/50"
                    >
                        <Trash2 size={16} className="mr-2" /> Clear All
                    </Button>

                    <CreateFolderModal open={showFolderModal} onClose={() => setShowFolderModal(false)} />

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                                <PlusCircle size={16} className="mr-2" /> New
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-48 text-white bg-zinc-900 border-zinc-700">
                            <DropdownMenuItem onClick={() => setShowFolderModal(true)} className="hover:bg-zinc-800">
                                📁 Create Folder
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleUploadClick} className="hover:bg-zinc-800">
                                📤 Upload File
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-zinc-600 text-zinc-400">
                        {folders.length} folders, {normalFiles.length} files
                    </Badge>
                </div>
            </div>

            {/* Enhanced Upload Area */}
            <Card className="mb-8 border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                <CardContent className="p-8">
                    <div
                        className="flex flex-col items-center justify-center w-full h-40 transition-all border-2 border-dashed cursor-pointer rounded-2xl bg-zinc-800/50 border-zinc-600 hover:bg-zinc-800/70 hover:border-zinc-500 group"
                        onClick={handleUploadClick}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                            accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                            onChange={handleFileChange}
                        />
                        <div className="text-center transition-colors text-zinc-400 group-hover:text-zinc-300">
                            <UploadCloud className="w-12 h-12 mx-auto mb-4 text-zinc-500 group-hover:text-zinc-400" />
                            <p className="mb-2 text-lg font-medium">Click or drag & drop to upload a file</p>
                            <p className="text-sm text-zinc-500">Supported: PDF, PNG, JPG, DOCX</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Enhanced Search & Controls */}
            <div className="flex flex-col gap-4 mb-8 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute transform -translate-y-1/2 left-4 top-1/2 size-5 text-zinc-400 z-1" />
                    <Input
                        type="text"
                        placeholder="Search files and folders..."
                        className="w-full py-2 pl-10 pr-4 text-sm text-white transition-all rounded-lg bg-zinc-900/50 border-zinc-700 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 backdrop-blur-sm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-400 hover:bg-zinc-800">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                    </Button>

                    <Tabs value={viewMode} onValueChange={setViewMode} className="w-fit">
                        <TabsList className="px-1 border rounded-lg h-9 bg-zinc-900 border-zinc-700">
                            <TabsTrigger value="grid" className="px-3 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                                <Grid3X3 className="w-4 h-4 mr-1" />
                                Grid
                            </TabsTrigger>
                            <TabsTrigger value="table" className="px-3 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                                <List className="w-4 h-4 mr-1" />
                                List
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </div>

            {/* Enhanced Folders Section */}
            {folders.length > 0 && (
                <Card className="mb-8 border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <FolderOpen className="w-5 h-5 text-blue-400" />
                            <CardTitle className="text-lg font-semibold">Folders</CardTitle>
                            <Badge variant="secondary" className="text-blue-400 bg-blue-500/20 border-blue-500/30">
                                {folders.length}
                            </Badge>
                        </div>
                        <CardDescription>Organize your files into folders</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                            {folders.map((folder) => (
                                <div key={folder._id} className="group">
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
                    </CardContent>
                </Card>
            )}

            {/* Enhanced Files Section */}
            <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-6 rounded-full bg-gradient-to-b from-primary to-primary/50"></div>
                        <CardTitle className="text-lg font-semibold">Files</CardTitle>
                        <Badge variant="secondary" className="text-green-400 bg-green-500/20 border-green-500/30">
                            {normalFiles.length}
                        </Badge>
                    </div>
                    <CardDescription>Your uploaded files and documents</CardDescription>
                </CardHeader>
                <CardContent>
                    {normalFiles.length > 0 ? (
                        viewMode === "grid" ? (
                            <div className="grid gap-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
                                {normalFiles.map(file => (
                                    <div key={file._id} className="group">
                                        <FileCard file={file} onDelete={handleDelete} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="w-full overflow-x-auto scrollbar-table scroll-smooth">
                                <table className="w-full text-sm text-left table-auto text-zinc-300">
                                    <thead>
                                        <tr className="border-b text-zinc-400 border-zinc-700">
                                            <th className="px-4 py-3">Preview</th>
                                            <th className="px-4 py-3">Name</th>
                                            <th className="px-4 py-3">Type</th>
                                            <th className="px-4 py-3">Size</th>
                                            <th className="px-4 py-3 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {normalFiles.map(file => (
                                            <tr key={file._id} className="transition-colors border-b border-zinc-800 hover:bg-zinc-800/50">
                                                <td className="px-4 py-3">
                                                    {file.mimeType.startsWith('image') ? (
                                                        <img
                                                            src={file.viewUrl}
                                                            alt={file.name}
                                                            className="object-cover w-10 h-10 transition-transform duration-300 transform rounded-lg group-hover:scale-105"
                                                        />
                                                    ) : (
                                                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-700 text-zinc-400">
                                                            {file.mimeType === 'application/pdf' ? '📄' : '📄'}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3 font-medium">{file.name}</td>
                                                <td className="px-4 py-3 text-zinc-400">{file.mimeType?.split("/")[1]?.toUpperCase()}</td>
                                                <td className="px-4 py-3 text-zinc-400">{formatBytes(file.size)}</td>
                                                <td className="px-4 py-3 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="w-8 h-8 p-0 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20"
                                                            onClick={() => window.open(file.viewUrl, '_blank')}
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="w-8 h-8 p-0 text-green-400 hover:text-green-300 hover:bg-green-500/20"
                                                            onClick={() => window.open(file.downloadUrl, '_blank')}
                                                        >
                                                            <Download className="w-4 h-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="w-8 h-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/20"
                                                            onClick={() => handleDelete(file._id)}
                                                        >
                                                            <Trash className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )
                    ) : (
                        <div className="py-16 text-center text-zinc-500">
                            <UploadCloud className="w-16 h-16 mx-auto mb-4 text-zinc-600" />
                            <p className="mb-2 text-lg font-medium">No files in this folder</p>
                            <p className="text-sm text-zinc-600">Upload something to get started!</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default FilesPage;