import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateProps = {
    workspaces: ({
        id: string;
        name: string;
        type: 'PERSONAL' | 'PUBLIC';
    })[];
}

const initialState: initialStateProps = {
    workspaces: []
}

const workspacesSlice = createSlice({
    name: 'workspaces',
    initialState,
    reducers: {
        WORKSPACES: (_, action: PayloadAction<initialStateProps>) => {
            return { ...action.payload };
        }
    }
});

export const { WORKSPACES } = workspacesSlice.actions;
export default workspacesSlice.reducer;