'use client';

import FolderDuotone from '@/components/icons/folder-duotone'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import React from 'react'
import Folder from './folder'
import { useQueryData } from '@/hooks/useQueryData'
import { getWorkspaceFolders } from '@/actions/workspace'
import { useMutationDataState } from '@/hooks/useMutationData';
import { FoldersProps } from '@/types/index.type';

type Props = {
    workspaceId: string
}

const Folders = ({ workspaceId }: Props) => {

    // Get folders
    const { data, isFetched } = useQueryData(
        ['workspace-folders'],
        () => getWorkspaceFolders(workspaceId)
    );

    const { latestVariables } = useMutationDataState(['create-folder']);

    const { data: folders, status } = data as FoldersProps;

    // if (isFetched && folders) {

    // }

    // wip: add redux stuff for folders

    // optimistic variable 
    // WIP: add the classnames for the folder based on success response
    return (
        <div className='flex flex-col gap-4'>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <FolderDuotone />
                    <h2 className='text-[#bdbdbd] text-xl'>
                        Folder
                    </h2>
                </div>
                <div className="flex items-center gap-2">
                    <p className="text-[#bdbdbd]">
                        See all
                        <ArrowRight color='#707070' />
                    </p>
                </div>
            </div>
            <section className={cn(status !== 200 && 'justify-center', 'flex items-center gap-4 overflow-x-auto w-full')}>
                {
                    status !== 200 ? <p className='text-neutral-300'>
                        No folders in this workspace
                    </p> : <>
                        {
                            latestVariables && latestVariables.status === 'pending' && (
                                <Folder
                                    name={latestVariables.variables.name}
                                    id={latestVariables.variables.id}
                                />
                            )
                        }
                        {
                            folders.map((folder) => (
                                <Folder
                                    key={folder.id}
                                    id={folder.id}
                                    name={folder.name}
                                    count={folder._count.videos}
                                />
                            ))
                        }
                    </>
                }
            </section>
        </div>
    )
}

export default Folders;