import { useAppSelector } from "@/redux/store"
import { useEffect, useState } from "react";
import { useMutationData } from "./useMutationData";
import { getWorkspaceFolders, moveVideoLocation } from "@/actions/workspace";
import useZodForm from "./useZodForm";
import { moveVideoSchema } from "@/components/forms/change-video-location/schema";

export const useMoveVideos = (
    videoId: string,
    currentWorkspace: string
) => {
    // get state from redux store
    const { folders } = useAppSelector(state => state.folders);
    const { workspaces } = useAppSelector(state => state.workspaces);
    //states (api res states, fetching states)
    const [isFetching, setIsFetching] = useState(false);



    //folder state
    const [isFolders, setIsFolders] = useState<({ _count: { videos: number }; id: string; name: string; createdAt: Date; workSpaceId: string | null })[] | undefined>(undefined);

    //use mutation data => optimistic change
    const { mutate, isPending } = useMutationData(
        ['change-video-location'],
        (data: { folder_id: string, workspaceId: string }) => moveVideoLocation(videoId, data.workspaceId, data.folder_id)
    );

    // hook forms (ZodForms hook)
    const {
        errors,
        watch,
        register,
        onFormSubmit,
    } = useZodForm(
        moveVideoSchema,
        mutate,
        { folder_id: null, workspaceId: currentWorkspace }
    );

    //fetch folders useEffect

    const fetchFolders = async (workspace: string) => {
        setIsFetching(true);
        const folders = await getWorkspaceFolders(workspace);
        setIsFetching(false);
        setIsFolders(folders.data);
    }

    useEffect(() => {
        fetchFolders(currentWorkspace);
    }, []);

    useEffect(() => {
        const workspace = watch(async (value) => {
            if (value.workspace_id) {
                fetchFolders(value.workspac_id);
            }
        });

        return () => workspace.unsubscribe();
    }, [watch]);

    return {
        isFolders,
        workspaces,
        isFetching,
        isPending,
        onFormSubmit,
        register,
        errors,
        folders
    }
} 