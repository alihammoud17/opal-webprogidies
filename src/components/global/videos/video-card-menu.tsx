import React from 'react'
import Modal from '../modal';
import { Move } from 'lucide-react';
import ChangeVideoLocation from '@/components/forms/change-video-location';

type Props = {
  videoId: string,
  currentWorkspaceId?: string,
  currentFolder?: string,
  currentFolderName?: string,
}

const CardMenu = ({
  videoId,
  currentWorkspaceId,
  currentFolder,
  currentFolderName
}: Props) => {
  return (
    // <Modal
    //   classname='flex items-center cursor-pointer gap-x-2'
    //   title='Modal title'
    //   description='Modal Description'
    //   trigger={
    //     <Move size={20} fill='#a4a4a4' className='text-[#a4a4a4]' />
    //   }
    // >
    <ChangeVideoLocation
      videoId={videoId}
      currentWorkspaceId={currentWorkspaceId}
      currentFolder={currentFolder}
      currentFolderName={currentFolderName}
    />
    // </Modal>
  )
}

export default CardMenu;