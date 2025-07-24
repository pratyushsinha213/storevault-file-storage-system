import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { FileText } from "lucide-react";

const FileSearchCommand = ({ files = [], onSelect }) => {
    return (
        <Command className="absolute z-50 w-full max-w-lg overflow-hidden -translate-x-1/2 border shadow-xl rounded-xl top-10 left-1/2 bg-zinc-950 border-zinc-800">
            <CommandInput placeholder="Search files..." />
            <CommandList>
                <CommandEmpty>No files found.</CommandEmpty>
                <CommandGroup heading="Your Files">
                    {files.map((file) => (
                        <CommandItem
                            key={file._id}
                            onSelect={() => onSelect(file)}
                            className="gap-2"
                        >
                            <FileText className="w-4 h-4 text-zinc-400" />
                            <span>{file.name}</span>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    );
};

export default FileSearchCommand;