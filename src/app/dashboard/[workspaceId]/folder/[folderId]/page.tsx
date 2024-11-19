import { getAllUserVideos, getFolderInfo } from '@/actions/workspace'
import FolderInfo from '@/components/global/folders/folder-info'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import React from 'react'

type Props = {
    params: { workspaceId: string, folderId: string }
}

const FolderPage = async ({
    params: { workspaceId, folderId }
}: Props) => {

    const query = new QueryClient();

    await query.prefetchQuery({
        queryKey: ['folder-videos'],
        queryFn: () => getAllUserVideos(workspaceId)
    });

    await query.prefetchQuery({
        queryKey: ['folder-info'],
        queryFn: () => getFolderInfo(folderId)
    });

    return (
        <HydrationBoundary state={dehydrate(query)}>
            <FolderInfo folderId={folderId} />
        </HydrationBoundary>
    )
}

export default FolderPage;