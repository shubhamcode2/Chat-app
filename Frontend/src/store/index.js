import { create } from "zustand";
import { createAuthSlice } from "./slices/auth-slice";



export const userAppStore = create()((...args)=>({
    ...createAuthSlice(...args)
}))