import { createSlice } from '@reduxjs/toolkit';

const savedBuildsSlice = createSlice({
  name: 'savedBuilds',
  initialState: {
    items: [],
  },
  reducers: {
    addSavedBuild: (state, action) => {
      const buildExists = state.items.some(
        build => build.id === action.payload.id
      );

      if (!buildExists) {
        state.items.push({
          ...action.payload,
          savedAt: new Date().toISOString(),
        });
      }
    },

    removeSavedBuild: (state, action) => {
      state.items = state.items.filter(build => build.id !== action.payload);
    },

    toggleSavedBuild: (state, action) => {
      const buildExists = state.items.some(
        build => build.id === action.payload.id
      );

      if (buildExists) {
        state.items = state.items.filter(
          build => build.id !== action.payload.id
        );
      } else {
        state.items.push({
          ...action.payload,
          savedAt: new Date().toISOString(),
        });
      }
    },
  },
});

export const { addSavedBuild, removeSavedBuild, toggleSavedBuild } =
  savedBuildsSlice.actions;

export default savedBuildsSlice.reducer;