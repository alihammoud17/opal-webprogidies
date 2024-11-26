import { Button } from '@/components/ui/button'
import { Link } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

type Props = {
    className?: string,
    videoId: string,
    variant?: 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'link'
    | 'ghost'
    | null
}

const CopyLink = ({
    className = '',
    videoId,
    variant = 'default'
}: Props) => {

    const onCopyClipboard = () => {
        const url = `${process.env.NEXT_PUBLIC_HOST_URL}/preview/${videoId}`
        navigator.clipboard.writeText(url);

        toast.info('Link copied to clipboard')
    }

    return (
        <Button variant={variant} onClick={onCopyClipboard} className={className}>
            <Link size={20} className='text-[#a4a4a4]' />
        </Button>
    )
}

export default CopyLink;