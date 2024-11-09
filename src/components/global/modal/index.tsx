import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import React from 'react'

type Props = {
    trigger: React.ReactNode,
    children: React.ReactNode,
    title: string,
    description: string,
    classname?: string,
}

const Modal = ({
    trigger,
    children,
    title,
    description,
    classname,
}: Props) => {
    return (
        <Dialog>
            <DialogTrigger className={classname} asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default Modal;