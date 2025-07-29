import React from 'react';
import { Eye, Download, Trash2 } from 'lucide-react';
import formatBytes from '@/utils/formatBytes';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const FileCard = ({ file, onDelete }) => {
    const isImage = file.mimeType.startsWith('image/');
    const isPdf = file.mimeType === 'application/pdf';

    return (
        <div className="relative overflow-hidden transition-all duration-300 border shadow group border-zinc-800 rounded-xl hover:shadow-xl bg-gradient-to-br from-zinc-900 to-zinc-950">
            {/* Preview */}
            <div className="relative h-48 overflow-hidden bg-zinc-800">
                {isImage ? (
                    <img
                        src={file.viewUrl}
                        alt={file.name}
                        className="object-cover w-full h-full transition-transform duration-500 transform group-hover:scale-105"
                    />
                ) : isPdf ? (
                    <iframe
                        src={file.viewUrl}
                        title={file.name}
                        className="object-cover w-full h-full"
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full text-sm text-gray-400">
                        No Preview
                    </div>
                )}

                {/* Action Buttons */}
                <div className="absolute inset-0 flex items-center justify-center gap-6 transition-opacity duration-300 opacity-0 bg-black/60 group-hover:opacity-100">
                    <a
                        href={file.viewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-300 transition-transform hover:scale-110 hover:text-blue-400"
                        title="View"
                    >
                        <Eye className="w-6 h-6" />
                    </a>
                    <a
                        href={file.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-300 transition-transform hover:scale-110 hover:text-green-400"
                        title="Download"
                    >
                        <Download className="w-6 h-6" />
                    </a>
                    <button
                        onClick={() => onDelete(file._id)}
                        className="text-red-400 transition-transform hover:scale-110 hover:text-red-500 hover:cursor-pointer"
                        title="Delete"
                    >
                        <Trash2 className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col gap-1 p-4 text-white">
                <p className="font-medium truncate">{file.name}</p>
                <p className="text-xs text-zinc-400">{formatBytes(file.size)}</p>
            </div>
        </div>
    );
};

export default FileCard;