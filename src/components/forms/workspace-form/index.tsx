import FormGenerator from '@/components/global/form-generator'
import Loader from '@/components/global/loader'
import { Button } from '@/components/ui/button'
import { useCreateWorkspace } from '@/hooks/useCreateWorkspace'
import React from 'react'

type Props = {}

const WorkspaceForm = (props: Props) => {
    const {
        errors,
        onFormSubmit,
        register,
        isPending
    } = useCreateWorkspace()
    return (
        <form
            onSubmit={onFormSubmit}
            className="flex flex-col gap-y-3"
        >
            <FormGenerator
                name='name'
                label='Workspace Name'
                placeholder='Enter workspace name'
                inputType='input'
                register={register}
                errors={errors}
                type='text'

            />
            <Button
                type='submit'
                disabled={isPending}
                className="w-full mt-2 text-sm"
            >
                <Loader state={isPending}>
                    Create Workspace
                </Loader>
            </Button>
        </form>
    )
}

export default WorkspaceForm;