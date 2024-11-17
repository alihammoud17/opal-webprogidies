'use client';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import Loader from '../loader';
import FolderDuotone from '@/components/icons/folder-duotone';
import { useMutationData } from '@/hooks/useMutationData';
import { renameFolder } from '@/actions/workspace';
import { Input } from '@/components/ui/input';

type Props = {
    name: string,
    id: string,
    optimistic?: boolean,
    count?: number
}

const Folder = ({
    name,
    id,
    optimistic,
    count
}: Props) => {

    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const folderCardRef = React.useRef<HTMLDivElement | null>(null);
    // rename state 
    const [onRename, setOnRename] = useState(false);
    // handle rename
    const Rename = () => {
        setOnRename(true);
    }
    // handle rename cancel
    const Renamed = () => {
        setOnRename(false);
    }

    // link to take element
    const pathName = usePathname();
    const router = useRouter();
    // send user programatically to a page. (rather than using a link)

    // wip: Add loading state

    // optimistic variable
    const { mutate, isPending } = useMutationData(
        ['rename-folder'],
        (data: { name: string }) => renameFolder(id, data.name),
        'workspace-folders',
        Renamed
    );

    const updateFolderName = (e: React.FocusEvent<HTMLInputElement>) => {
        if (inputRef.current && folderCardRef.current) {
            if (!inputRef.current.contains(e?.target as Node | null) &&
                !folderCardRef.current.contains(e?.target as Node | null)) {
                if (inputRef.current.value) {
                    mutate({ name: inputRef.current.value });
                }
                else {
                    Renamed();
                }
            }
        }
    }

    // handle folder click
    const handleFolderClick = () => {
        router.push(`${pathName}/folder/${id}`);
    }

    const handleNameDoubleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
        e.stopPropagation();
        console.log('double click');
        Rename();
    }

    return (
        <div
            onClick={handleFolderClick}
            ref={folderCardRef}
            className={cn(optimistic && 'opacity-60', 'flex hover:bg-neutral-800 cursor-pointer transition duration-150 items-center gap-2 justify-between min-w-[250px] py-4 px-4 rounded-lg border-[1px]')}
        >
            <Loader state={false}>
                <div className='flex flex-col gap-[1px]'>
                    {onRename ? (
                        <Input
                            onBlur={updateFolderName}
                            ref={inputRef}
                            type='text'
                            placeholder={name}
                            autoFocus
                            className='bg-transparent border-none text-base w-full outline-none p-0 text-neutral-300'
                        />
                    ) :
                        <p
                            onClick={(e) => e.stopPropagation()}
                            className='text-neutral-300'
                            onDoubleClick={handleNameDoubleClick}
                        >
                            {name}
                        </p>
                    }
                    <span className='text-sm text-neutral-500'>{count || 0} videos</span>
                </div>
            </Loader>
            <FolderDuotone />
        </div>
    )
}

export default Folder;