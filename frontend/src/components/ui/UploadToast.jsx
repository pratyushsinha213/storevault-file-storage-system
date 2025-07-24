// components/ui/UploadToast.js
import React from 'react';
import { cn } from '@/lib/utils';

const UploadToast = ({ file, progress, isDone }) => {
    const isImage = file?.type?.startsWith('image/');
    const sizeKB = (file.size / 1024).toFixed(2);

    return (
        <div className="flex items-center gap-3 p-3 bg-zinc-900 rounded-lg shadow-md text-white w-[300px] border border-zinc-700">
            {/* Preview */}
            <div className="flex items-center justify-center w-12 h-12 overflow-hidden rounded bg-zinc-800">
                {isImage ? (
                    <img src={URL.createObjectURL(file)} alt="thumb" className="object-cover w-full h-full" />
                ) : (
                    <span className="text-xs text-zinc-400">📄</span>
                )}
            </div>

            {/* Info */}
            <div className="flex flex-col flex-1">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-zinc-400">{sizeKB} KB</p>

                {/* Progress bar */}
                <div className="w-full h-2 mt-1 rounded bg-zinc-700">
                    <div
                        className={cn(
                            "h-full rounded transition-all duration-300",
                            isDone ? "bg-green-400" : "bg-blue-400"
                        )}
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default UploadToast;