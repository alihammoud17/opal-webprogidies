import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateProps = {
    folders: ({
        _count: {
            videos: number;
        }
    } & {
        id: string;
        name: string;
        createdAt: Date;
        workspaceId: string | null;
    })[];
}

const initialState: initialStateProps = {
    folders: []
}

const foldersSlice = createSlice({
    name: 'folders',
    initialState,
    reducers: {
        FOLDERS: (_, action: PayloadAction<initialStateProps>) => {
            return { ...action.payload };
        }
    }
});

export const { FOLDERS } = foldersSlice.actions;
export default foldersSlice.reducer;