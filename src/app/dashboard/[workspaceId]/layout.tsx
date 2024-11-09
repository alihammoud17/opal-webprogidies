import { getNotifications, onAuthenticateUser } from '@/actions/user'
import { getAllUserVideos, getWorkspaceFolders, getWorkSpaces, verifyAccessToWorkspace } from '@/actions/workspace'
import { redirect } from 'next/navigation'
import React from 'react';
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query'
import Sidebar from '@/components/global/sidebar';

type Props = {
    params: { workspaceId: string },
    children: React.ReactNode
}

const WorkspaceLayout = async ({
    children,
    params,
}: Props) => {

    const { workspaceId } = await params;

    const auth = await onAuthenticateUser();

    if (!auth.user?.workspace || !auth.user?.workspace.length) {
        redirect('/auth/sign-in');
    }

    const hasAccess = await verifyAccessToWorkspace(workspaceId);

    if (hasAccess.status !== 200) {
        return redirect(`/dashboard/${auth.user?.workspace[0].id}`);
    }

    if (!hasAccess.data?.workspace) {
        return null;
    }

    const query = new QueryClient();

    await query.prefetchQuery({
        queryKey: ['workspace-folders'],
        queryFn: () => getWorkspaceFolders(workspaceId)
    });
    await query.prefetchQuery({
        queryKey: ['user-videos'],
        queryFn: () => getAllUserVideos(workspaceId)
    })
    await query.prefetchQuery({
        queryKey: ['user-workspaces'],
        queryFn: () => getWorkSpaces()
    })
    await query.prefetchQuery({
        queryKey: ['user-notifications'],
        queryFn: () => getNotifications()
    })


    return (
        <HydrationBoundary state={dehydrate(query)}>
            <div className='flex h-screen w-screen'>
                <Sidebar activeWorkspaceId={workspaceId} />
            </div>
        </HydrationBoundary>
    )
}

export default WorkspaceLayout