import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect } from "react";
export const useAuthContext = () => {
    const ctxt = useContext(AuthContext)

    if (!ctxt) {
        throw Error('useAuthContext must be used inside an TaskContextProvider');
    }
    return ctxt
}