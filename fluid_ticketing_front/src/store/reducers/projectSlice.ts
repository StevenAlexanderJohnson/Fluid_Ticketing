import { createSlice } from "@reduxjs/toolkit"
import { Project } from "../../../../server/src/Models/Project";

export const projectSlice = createSlice({
    name: 'project',
    initialState: {
        projectData: null,
    } as {projectData: Project | null},
    reducers: {
        setProject: (state, action) => {
            console.log('setting project ', action.payload);
            state.projectData = action.payload;
        },
        clearProject: (state) => {
            state.projectData = null;
        }
    }
});

export const {setProject, clearProject} = projectSlice.actions;

export default projectSlice.reducer;