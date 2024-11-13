import { useMutationData } from "./useMutationData"
import { createWorkspace } from "@/actions/workspace"
import useZodForm from "./useZodForm";
import { workspaceSchema } from "@/components/forms/workspace-form/schema";

export const useCreateWorkspace = () => {

    const {
        mutate: createWorkspaceMutation,
        isPending,
    } = useMutationData(
        ['create-workspace'],
        (data: { name: string }) => createWorkspace(data.name),
        'user-workspaces'
    );

    const {
        errors, onFormSubmit, register
    } = useZodForm(workspaceSchema, createWorkspaceMutation);

    return {
        errors,
        onFormSubmit,
        register,
        isPending
    };

}


