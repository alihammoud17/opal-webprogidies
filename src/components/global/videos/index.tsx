'use client'
import { getAllUserVideos } from '@/actions/workspace'
import VideoRecorderDuotone from '@/components/icons/video-recorder-duotone'
import { useQueryData } from '@/hooks/useQueryData'
import { cn } from '@/lib/utils'
import { VideosProps } from '@/types/index.type'
import React from 'react'
import VideoCard from './video-card'

type Props = {
    folderId: string
    videosKey: string
    workspaceId: string
}

const Videos = ({ folderId, videosKey, workspaceId }: Props) => {

    const video = {
        User: {
            firstname: 'John',
            lastname: 'Doe',
            image: 'https://picsum.photos/id/237/200/300'
        },
        id: 'video1',
        processing: false,
        Folder: {
            id: 'folder1',
            name: 'My Videos'
        },
        createdAt: new Date('2023-01-01T10:00:00Z'),
        title: 'My First Video',
        source: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    }

    const { data: videoData } = useQueryData([videosKey], () =>
        getAllUserVideos(folderId)
    )

    const { status: videosStatus, data: videos } = videoData as VideosProps

    return (
        <div className="flex flex-col gap-4 mt-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <VideoRecorderDuotone />
                    <h2 className="text-[#BdBdBd] text-xl">Videos</h2>
                </div>
            </div>
            <section
                className={cn(
                    videosStatus !== 200
                        ? 'p-5'
                        : 'grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
                )}
            >
                {/* {videosStatus === 200 ? (
                    videos.map((video) => (
                        <VideoCard
                            key={video.id}
                            workspaceId={workspaceId}
                            {...video}
                        />
                    ))
                ) : (
                    <p className="text-[#BDBDBD]"> No videos in workspace</p>
                )} */}
                <VideoCard
                    key={video.id}
                    workspaceId={workspaceId}
                    {...video}
                />
            </section>
        </div>
    )
}

export default Videos