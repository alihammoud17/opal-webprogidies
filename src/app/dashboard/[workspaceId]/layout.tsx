import { onAuthenticateUser } from '@/actions/user'
import { verifyAccessToWorkspace } from '@/actions/workspace'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    params: { workspaceId: string },
    children: React.ReactNode
}

const WorkspaceLayout = async ({
    children,
    params: { workspaceId }
}: Props) => {

    const auth = await onAuthenticateUser();

    if (!auth.user?.workspace || !auth.user?.workspace.length) {
        redirect('/auth/sign-in');
    }

    const hasAccess = await verifyAccessToWorkspace(workspaceId);

    return (
        <div>{children}</div>
    )
}

export default WorkspaceLayout