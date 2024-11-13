'use client'

import { getWorkSpaces } from '@/actions/workspace'
import { Select, SelectContent, SelectTrigger, SelectValue, SelectGroup, SelectLabel, SelectItem } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useQueryData } from '@/hooks/useQueryData'
import { WorkspaceProps, NotificationProps } from '@/types/index.type'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import Modal from '../modal'
import { Menu, PlusCircle } from 'lucide-react'
import Search from '../search'
import { MENU_ITEMS } from '@/constants'
import SidebarItems from './sidebar-items'
import { getNotifications } from '@/actions/user'
import WorkspacePlaceholder from './workspace-placeholder'
import GlobalCard from '../global-card'
import Loader from '../loader'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import InfoBar from '../info-bar'

type Props = {
    activeWorkspaceId: string
}

const Sidebar = ({ activeWorkspaceId }: Props) => {

    //WIP: Upgrade button
    const router = useRouter();

    const pathName = usePathname();


    const { data, isFetched } = useQueryData(['user-workspaces'], getWorkSpaces);

    const { data: notifications } = useQueryData(['user-notifications'], getNotifications);

    const menuItems = MENU_ITEMS(activeWorkspaceId);

    const { data: workspace } = data as WorkspaceProps;
    const { data: count } = notifications as NotificationProps;

    const onChangeActiveWorkspace = (value: string) => {
        router.push(`/dashboard/${value}`);
    }

    const currentWorkspace = workspace?.workspace?.find((workspace) => workspace.id === activeWorkspaceId);

    console.log("pathName", pathName);

    const SidebarSection = (
        <div className='bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden'>
            <div className='bg-[#111111] p-4 gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0 flex'>
                <Image src='/opal-logo.svg' alt='logo' width={40} height={40} />
                <p className='text-2xl'>Opal</p>
            </div>
            <Select defaultValue={activeWorkspaceId} onValueChange={onChangeActiveWorkspace}>
                <SelectTrigger className="mt-16 text-neutral-400 bg-transparent">
                    <SelectValue placeholder="Select a workspace">Select a workspace</SelectValue>
                </SelectTrigger>
                <SelectContent className='bg-[#111111] backdrop-blur-xl'>
                    <SelectGroup>
                        <SelectLabel>Workspaces</SelectLabel>
                        <Separator />
                        {
                            workspace?.workspace?.map((workspace) => (
                                <SelectItem
                                    key={workspace.id}
                                    value={workspace.id}
                                >
                                    {workspace.name}
                                </SelectItem>
                            ))
                        }
                        {
                            workspace?.members?.length > 0
                            && workspace.members.map((member) => (member.Workspace &&
                                <SelectItem
                                    key={member.Workspace.id}
                                    value={member.Workspace.id}
                                >
                                    {member.Workspace.name}
                                </SelectItem>
                            ))
                        }
                    </SelectGroup>
                </SelectContent>
            </Select>
            {/* Invite to workspace */}
            {currentWorkspace?.type === 'PUBLIC' && workspace?.subscription?.plan === 'PRO' && (
                <Modal
                    title='Invite To Workspace'
                    description='Invite members to your workspace'
                    trigger={
                        <span
                            className='text-sm cursor-pointer flex items-center justify-center bg-neutral-800/90 hover:bg-neutral-800/60 w-full rounded-sm p-[5px] gap-2'
                        >
                            <PlusCircle size={16} className='text-neutral-800/90 fill-neutral-500' />
                            <span className='text-neutral-400 font-semibold text-xs'>
                                Invite To Workspace
                            </span>
                        </span>
                    }
                >
                    <Search workspaceId={activeWorkspaceId} />
                </Modal>
            )}
            <p className='w-full text-[#9d9d9d] font-bold mt-4'>Menu</p>
            <nav className='w-full'>
                <ul>
                    {menuItems.map((item) => (
                        <SidebarItems
                            key={item.title}
                            title={item.title}
                            href={item.href}
                            icon={item.icon}
                            selected={pathName === item.href}
                            notifications={item.title === 'Notifications' && count && count._count && count._count.notification ? count._count.notification : undefined}
                        />
                    ))}
                </ul>
            </nav>
            <Separator className='w-4/5' />
            <p className='w-full text-[#9d9d9d] font-bold mt-4'>Workspaces</p>

            {
                workspace?.workspace?.length === 1 && workspace.members.length === 0 && (
                    <div className='w-full mt-[-10px]'>
                        <p className="text-[#9d9d9d] font-medium text-sm opacity-40">
                            {workspace?.subscription?.plan === 'FREE' ? 'Upgrade to Pro to create more workspaces' : 'Create a workspace to get started'}
                        </p>
                    </div>
                )
            }
            <nav className='w-full'>
                <ul className='h-[150px] overflow-auto overflow-x-hidden fade-layer'>
                    {workspace?.workspace?.length > 0 && workspace.workspace?.map((workspace) => workspace.type !== 'PERSONAL' && (
                        <SidebarItems
                            key={workspace.id}
                            title={workspace.name}
                            href={`/dashboard/${workspace.id}`}
                            icon={React.createElement(WorkspacePlaceholder, null, workspace.name.charAt(0).toUpperCase())}
                            selected={pathName === `/dashboard/${workspace.id}`}
                        />
                    ))}
                    {
                        workspace?.members?.length > 0 && workspace.members?.map((member) => (
                            member.Workspace && (
                                <SidebarItems
                                    key={member.Workspace.id}
                                    title={member.Workspace.name}
                                    href={`/dashboard/${member.Workspace.id}`}
                                    icon={React.createElement(WorkspacePlaceholder, null, member.Workspace.name.charAt(0).toUpperCase())}
                                    selected={pathName === `/dashboard/${member.Workspace.id}`}
                                />
                            )))
                    }
                </ul>
            </nav>
            <Separator className='w-4/5' />
            {workspace?.subscription?.plan === 'FREE' && (
                <GlobalCard
                    title='Upgrade to Pro'
                    description='Unlock AI features like transcription, AI summary, and more'
                    footer={
                        <Button
                            className='w-full text-sm mt-2'
                            onClick={() => router.push('/dashboard/upgrade')}
                        >
                            <Loader
                                color='#000'
                                state={false}
                            >Upgrade</Loader>
                        </Button>
                    }
                />
            )}

        </div>
    );

    return (
        <div className='full'>
            {/* INFOBAR */}
            <InfoBar />
            {/* SHEET (MOBILE/DESKTOP) */}
            <div className='md:hidden fixed my-4'>
                <Sheet>
                    <SheetTrigger asChild
                        className='ml-2'
                    >
                        <Button
                            variant='ghost'
                            className='mt-[2px]'
                        >
                            <Menu />
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side='left'
                        className='p-0 w-fit h-full'
                    >
                        {SidebarSection}
                    </SheetContent>
                </Sheet>
            </div>
            <div className="md:block hidden h-full">
                {SidebarSection}
            </div>

        </div>
    )
}

export default Sidebar;