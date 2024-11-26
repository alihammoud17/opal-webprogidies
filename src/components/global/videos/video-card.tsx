import React from 'react'
import Loader from '../loader'
import CardMenu from './video-card-menu'
import ChangeVideoLocation from '@/components/forms/change-video-location'
import CopyLink from './copy-link'
import Link from 'next/link'

type Props = {
    User: {
        firstname: string | null
        lastname: string | null
        image: string | null
    } | null,
    id: string,
    processing: boolean,
    Folder: {
        id: string,
        name: string
    } | null,
    createdAt: Date,
    workspaceId: string,
    title: string | null,
    source: string
}

const VideoCard = ({
    User,
    id,
    processing,
    Folder,
    createdAt,
    workspaceId,
    title,
    source
}: Props) => {
    // WIP: wire up date

    const daysAgo = (new Date().getTime() - new Date(createdAt).getTime()) / 1000 / 60 / 60 / 24;

    return (
        <Loader
            className="bg-[#171717] flex justify-center items-center border-[1px] border-[rgb(37,37,37)] rounded-xl"
            state={processing}
        >
            <div className=" group overflow-hidden cursor-pointer bg-[#171717] relative border-[1px] border-[#252525] flex flex-col rounded-xl">
                <div className="absolute top-3 right-3 z-50 gap-x-3 hidden group-hover:flex">
                    <CardMenu
                        currentFolderName={Folder?.name}
                        videoId={id}
                        currentWorkspaceId={workspaceId}
                        currentFolder={Folder?.id}
                    />
                    <CopyLink
                        className='p-0 h-5 bg-hover:bg-transparent'
                        videoId={id}
                    />
                </div>
                <Link
                    href={`/preview/${id}`}
                    className='hover:bg-[#252525] transition duration-150 flex flex-col justify-between h-full'
                >
                    <video
                        className="w-full aspect-video opacity-50 z-20"
                        preload='metadata'
                        controls={false}
                    >
                        <source src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/${source}#t=1`} type="video/mp4" />
                    </video>
                    <div className='px-5 py-3 flex flex-col gap-y-2 z-20'>
                        <h2 className='text-sm font-semibold text-[#bdbdbd]'>
                            {title}
                        </h2>
                    </div>
                </Link>
            </div>
        </Loader>
    )
}

export default VideoCard;