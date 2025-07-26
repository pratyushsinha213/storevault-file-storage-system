// components/ui/UploadToast.js
import React from 'react';
import { cn } from '@/lib/utils';
import formatBytes from '@/utils/formatBytes';

const UploadToast = ({ file, progress, isDone }) => {
    const isImage = file?.type?.startsWith('image/');
    const sizeKB = parseInt(formatBytes(file?.size).split(" ")[0]);

    return (
        <div className="flex items-start gap-4 p-4 w-[340px] max-w-full bg-zinc-900 rounded-lg border border-zinc-700 shadow-xl text-white">
            {/* File Preview */}
            <div className="flex items-center justify-center overflow-hidden rounded-md w-14 h-14 shrink-0 bg-zinc-800">
                {isImage ? (
                    <img
                        src={URL.createObjectURL(file)}
                        alt="file"
                        className="object-cover w-full h-full rounded"
                    />
                ) : (
                    <div className="text-2xl">📄</div>
                )}
            </div>

            {/* File Info and Progress */}
            <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <span className="text-xs text-zinc-400">{formatBytes(file.size)}</span>
                </div>

                {/* Progress Bar */}
                <div className="relative h-2 overflow-hidden rounded-full bg-zinc-700">
                    <div
                        className={cn(
                            "absolute top-0 left-0 h-full transition-all duration-500 ease-in-out",
                            isDone ? "bg-green-400" : "bg-blue-500"
                        )}
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Optional status text */}
                <p className="mt-1 text-xs text-right text-zinc-400">
                    {isDone ? 'Upload complete' : `Uploading... ${progress.toFixed(0)}%`}
                </p>
            </div>
        </div>
    );
};

export default UploadToast;