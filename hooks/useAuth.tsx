import { useContext } from "react";
import { AuthContext, AuthContextType } from "../context/authContext";


function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('Should be used in the provider');
    }
    return context;
}

export default useAuth