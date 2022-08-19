import React, { useContext } from "react";
import { DEFAULT_STATE, quizReducerFunction } from "./quizReducer";

export const StateContext = React.createContext(DEFAULT_STATE);
export const DispatchContext = React.createContext<any>(null);

export const StateProvider = StateContext.Provider;
export const DispatchProvider = DispatchContext.Provider;

export function useStateContext() {
    const context = useContext(StateContext);
    if (!context) {
        throw new Error("useStateContext must be used within a StateProvider");
    }
    return context;
}

export function useDispatchContext() {
    const context = useContext(DispatchContext);
    if (!context) {
        throw new Error("DispatchContext must be used within a StateProvider");
    }
    return context;
}
