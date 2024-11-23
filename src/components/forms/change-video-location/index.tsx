'use client'

import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useMoveVideos } from '@/hooks/useFolders';
import React from 'react'

type Props = {
    videoId: string,
    currentWorkspaceId?: string,
    currentFolder?: string,
    currentFolderName?: string,
}

const ChangeVideoLocation = ({
    videoId,
    currentWorkspaceId,
    currentFolder,
    currentFolderName
}: Props) => {
    //WIP: wire up use move folder

    const { } = useMoveVideos();

    return (
        <form
            className='flex flex-col gap-y-5'
        >
            <div className='border-[1px] rounded-xl p-5'>
                <h2 className='text-xs mb-5 text-[#a4a4a4]'>
                    Current
                </h2>

                <p className='text-[#a4a4a4]'>Workspace</p>
                <p className='text-[#a4a4a4] text-sm'>This video has no folder</p>

            </div>
            <Separator orientation='horizontal' />
            <div className="flex flex-col gap-y-5 p-5 border-[1px] rounded-xl">
                <h2 className='text-xs text-[#a4a4a4]'>
                    To
                </h2>
                <Label className='flex flex-col gap-y-2'>
                    <p className='text-xs'>Workspace</p>
                    <select className='rounded-xl text-base bg-transparent'>
                        <option value=''>Select a workspace</option>
                    </select>
                </Label>
            </div>
        </form>
    )
}

export default ChangeVideoLocation;