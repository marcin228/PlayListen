import { GlobalContext, GlobalContextType } from "../contexts/GlobalContextProvider";
import { useContext } from "react";

export function useGlobalContext():GlobalContextType{

    return useContext<GlobalContextType>(GlobalContext);
}