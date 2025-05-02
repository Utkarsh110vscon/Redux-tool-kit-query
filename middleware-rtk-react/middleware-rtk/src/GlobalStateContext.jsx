import { createContext, useContext, useRef, useState } from "react"

const StateContext = createContext();

export const getContext = () => {
    return useContext(StateContext);
}

const GlobalStateContext = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        nickName: '',
        familyName: '',
        jobName: '',
        companyName: '',
    });
    const isEdittingInitalized = useRef(false);
    const [onAppDataPage, setOnAddDataPage] = useState(false);
    return (
        <StateContext.Provider value={{
            formData,
            setFormData,
            isEdittingInitalized,
            onAppDataPage,
            setOnAddDataPage,
            isAuth,
            setIsAuth
        }}>
            {children}
        </StateContext.Provider>
    );
}

export default GlobalStateContext;