import { useEffect, useState } from "react";
import { useUpdateUserDataMutation } from "../Services/apiSlice";

export const useUpdateData= () => {
    const [updateUserData, { data, error, isLoading }] = useUpdateUserDataMutation();
    const [ edittedData, setEdittedData ]= useState(null);
    const [err, setErr]= useState(null);
    const [loading, setLoading]= useState(false);
    
    useEffect(() => {
        setEdittedData(data),
        setErr(error);
        setLoading(isLoading)
    }, [data, error, isLoading]);

    return(
        {
            updateUserData,
            edittedData,
            err,
            loading
        }
    );
}