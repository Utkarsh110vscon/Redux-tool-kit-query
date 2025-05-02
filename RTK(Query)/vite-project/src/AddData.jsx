'use client'
import { useEffect, useRef } from "react";
import { getContext } from "./GlobalStateContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { apiSlice, usePostUserDataMutation } from "../Services/apiSlice";
import { useUpdateData } from "../hooks/useUpdateData";

const AddData = () => {

    const [postUserData, { _, error, isLoading }] = usePostUserDataMutation();
    const { updateUserData, edittedData, err, loading } = useUpdateData()
    const dispatch = useDispatch();
    const stateContext = getContext();
    const navigate = useNavigate();
    const isEdittingInitalized = stateContext.isEdittingInitalized;
    const { setOnAddDataPage } = stateContext;

    useEffect(() => {
        setOnAddDataPage(true);
        if (!isEdittingInitalized.current) {
            setFormData({
                name: '',
                nickName: '',
                familyName: '',
                jobName: '',
                companyName: '',
            });
        }

        return () => setOnAddDataPage(false);
    }, []);

    const formData = stateContext.formData
    const setFormData = stateContext.setFormData

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(isEdittingInitalized.current)
        try {
            let result;
            if (isEdittingInitalized.current) {
                result = await updateUserData({
                    updatedData: formData,
                    index: isEdittingInitalized.current
                }).unwrap();
                console.log('put success', result);
            } else {
                result = await postUserData(formData).unwrap();
                console.log('post success', result)
            }

            dispatch(apiSlice.util.updateQueryData(
                'getUserData',
                undefined,
                draft => {
                    draft.data = result.data
                }
            ));
        } catch (err) {
            console.log('post failed', err)
        } finally {
            navigate('/');
        }
    }

    return (
        <div className="p-6 h-[calc(100vh-68px)] bg-[#f2f2f2] flex justify-center items-start">
            <form onSubmit={handleSubmit} className="w-full max-w-xl bg-white shadow-md rounded-xl p-6 space-y-5">
                <h2 className="text-2xl font-semibold text-center">User Information</h2>

                {(error || err) && <h2 className="text-center text-red-600 text-lg font-bold">
                    Failed to add or update data.
                </h2>}

                <div className="grid grid-cols-1 gap-2">
                    <label className="text-lg font-semibold" htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData?.name}
                        onChange={(e) => {
                            const { name, value } = e.target
                            setFormData((prev) => ({ ...prev, [name]: value }))
                        }}
                        className="outline-none px-4 py-2 bg-[#f0f0f0] rounded-lg text-base"
                        placeholder="Enter full name"
                    />
                </div>

                <div className="grid grid-cols-1 gap-2">
                    <label className="text-lg font-semibold" htmlFor="nickName">Nick Name</label>
                    <input
                        type="text"
                        name="nickName"
                        value={formData.nickName}
                        onChange={(e) => {
                            const { name, value } = e.target
                            setFormData((prev) => ({ ...prev, [name]: value }))
                        }}
                        className="outline-none px-4 py-2 bg-[#f0f0f0] rounded-lg text-base"
                        placeholder="Enter nick name"
                    />
                </div>

                <div className="grid grid-cols-1 gap-2">
                    <label className="text-lg font-semibold" htmlFor="familyName">Family Name</label>
                    <input
                        type="text"
                        name="familyName"
                        value={formData.familyName}
                        onChange={(e) => {
                            const { name, value } = e.target
                            setFormData((prev) => ({ ...prev, [name]: value }))
                        }}
                        className="outline-none px-4 py-2 bg-[#f0f0f0] rounded-lg text-base"
                        placeholder="Enter family name"
                    />
                </div>

                <div className="grid grid-cols-1 gap-2">
                    <label className="text-lg font-semibold" htmlFor="jobName">Job Name</label>
                    <input
                        type="text"
                        name="jobName"
                        value={formData.jobName}
                        onChange={(e) => {
                            const { name, value } = e.target
                            setFormData((prev) => ({ ...prev, [name]: value }))
                        }}
                        className="outline-none px-4 py-2 bg-[#f0f0f0] rounded-lg text-base"
                        placeholder="Enter job title"
                    />
                </div>

                <div className="grid grid-cols-1 gap-2">
                    <label className="text-lg font-semibold" htmlFor="companyName">Company Name</label>
                    <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={(e) => {
                            const { name, value } = e.target
                            setFormData((prev) => ({ ...prev, [name]: value }))
                        }}
                        className="outline-none px-4 py-2 bg-[#f0f0f0] rounded-lg text-base"
                        placeholder="Enter company name"
                    />
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        {
                            (isLoading || loading) ? 'loading...' : 'Submit'
                        }
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddData;