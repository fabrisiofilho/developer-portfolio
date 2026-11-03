import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Repository } from "../../models/Repository";
import { github } from "../../services/github-service";


export const getRepositories = createAsyncThunk(
    'github/getRepositories',
    async () => {
      const result = await github.get<Repository[]>(
        `fabrisiofilho/repos`);
      return result.data;
    },
);
  

type StateProps = {
    repositories: Repository[];
    status: 'pending' | 'accept' | 'rejected'
};
  
const initialState: StateProps = {
    repositories: [],
    status: 'pending'
};
  
export const githubSlide = createSlice({
    initialState,
    name: 'github',
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getRepositories.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(getRepositories.fulfilled, (state, action) => {
            state.repositories = action.payload;
            state.status = 'accept';
        })
        .addCase(getRepositories.rejected, (state) => {
            state.status = 'rejected';
        })
    },
});
