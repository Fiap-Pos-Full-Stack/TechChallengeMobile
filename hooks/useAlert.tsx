import { useContext } from "react";
import { AlertContext, AlertContextType } from "../context/alertContext";


function useAlert(): AlertContextType {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('Should be used in the provider');
    }
    return context;
}

export default useAlert