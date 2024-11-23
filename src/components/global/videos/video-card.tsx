import React from 'react'
import Loader from '../loader'
import CardMenu from './video-card-menu'
import ChangeVideoLocation from '@/components/forms/change-video-location'

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
    title: string,
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
    return (
        <Loader state={false}>
            {/* <div className='overflow-hidden cursor-pointer bg-[#171717] relative border-[1px] border[#252525] flex flex-col rounded-xl'>
                <div className='absolute top-3 right-3 z-50 flex flex-col gap-y-3'>
                    <CardMenu
                        currentFolderName={Folder?.name}
                        videoId={id}
                        currentWorkspaceId={workspaceId}
                        currentFolder={Folder?.id}
                    />
                </div>
            </div> */}
            <ChangeVideoLocation
            //   videoId={videoId}
            //   currentWorkspaceId={currentWorkspaceId}
            //   currentFolder={currentFolder}
            //   currentFolderName={currentFolderName}
            />
        </Loader>
    )
}

export default VideoCard;