'use client'

import { getWorkSpaces } from '@/actions/workspace';
import { useQueryData } from '@/hooks/useQueryData'
import React from 'react'
import Modal from '../modal';
import { Button } from '@/components/ui/button';
import FolderPlusDuotine from '@/components/icons/folder-plus-duotone';
import WorkspaceForm from '@/components/forms/workspace-form';

type Props = {}

const CreateWorkspace = (props: Props) => {

    const { data } = useQueryData(
        ['user-workspaces'],
        getWorkSpaces
    );

    const { data: plan } = data as {
        status: number,
        data: {
            subscription: {
                plan: 'PRO' | 'FREE'
            } | null
        }
    }

    // TODO: Uncomment later 
    if (plan?.subscription?.plan === 'PRO')

        return (
            <Modal
                title='Create a Workspace'
                description='Create a new workspace to collaborate with your team. Enter the workspace details below to get started.'
                trigger={
                    <Button className='bg-[#1d1d1d] text-[#707070] flex items-center gap-2 py-6 px-4 rounded-2xl'>
                        <FolderPlusDuotine />{' '}
                        Create a workspace
                    </Button>
                }
            >
                <WorkspaceForm />
            </Modal>
        );

    if (plan?.subscription?.plan === 'FREE')
        return <></>;
}

export default CreateWorkspace;