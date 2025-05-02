import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import GlobalStateContext, { getContext } from "./GlobalStateContext";
import { BrowserRouter, Routes, Route, useNavigate, Link } from 'react-router-dom'
import AddData from "./AddData";
import { apiSlice, useDeleteUserDataMutation, useGetUserDataQuery } from "../Services/apiSlice";
import { useDispatch } from "react-redux";

export default function Home() {

  const { data = [], error, isLoading } = useGetUserDataQuery();
  console.log(data, error, isLoading);

  return (
    <BrowserRouter>
      <GlobalStateContext>
        <Header />
        <Routes>
          <Route path='/' element={(
            <div className="bg-white h-[calc(100vh-68px)] flex flex-col items-center py-10 gap-5">
              {
                error ?
                  <h2 className="text-center  top- text-2xl text-red-500 font-bold font-sans">
                    {'Something went wrong, please try again!'}
                  </h2> : null
              }

              {
                !data.length ? (
                  isLoading ?
                    <h2 className="text-center text-2xl font-bold font-sans">
                      Loading...
                    </h2> : null
                ) : null

              }

              {
                data ?
                  <UserTable data={data.data || []} /> : null
              }
            </div>
          )} />
          <Route path="/add" element={<AddData />} />
        </Routes>

      </GlobalStateContext>
    </BrowserRouter>
  );
}

const Header = () => {
  const navigate = useNavigate();
  const stateContext = getContext();

  if (!stateContext) {
    navigate('/');
    return null;
  }
  const { onAppDataPage } = stateContext
  const isEdittingInitalized = stateContext.isEdittingInitalized
  return (
    <div className="px-8 py-2.5 bg-[#0f0f0f74] shadow-md flex justify-between">
      <h1 className="text-[2rem] text-white font-bold tracking-wider">
        <Link to={'/'}>
          Crud App
        </Link>
      </h1>

      <button
        onClick={() => {
          // console.log('in the button component', isEdittingInitalized.current)
          if (isEdittingInitalized.current) {
            isEdittingInitalized.current = false;
          }
          navigate('/add')
        }}
        disabled={onAppDataPage}
        className={
          `bg-[#f0f0f0] rounded-md px-5 py-2.5 shadow text-lg font-medium hover:bg-blue-100 
                ${onAppDataPage ? 'cursor-not-allowed' : 'cursor-pointer'}`
        }
      >
        Add Data
      </button>
    </div>
  );
}

const UserTable = ({ data }) => {

  const [dashboardData, setDashboardData] = useState([]);
  const [deleteUserData, { _, error, isLoading }] = useDeleteUserDataMutation()
  const dispatch = useDispatch();
  useEffect(() => {
    setDashboardData(data);
  }, [data])

  const stateContext = getContext();
  const navigate = useNavigate();

  const setFormData = stateContext.setFormData
  const isEdittingInitalized = stateContext.isEdittingInitalized

  const handleDelete = async (dataIndex) => {
    try {
      const result = await deleteUserData(dataIndex).unwrap();
      console.log('delete user success ', result);
      dispatch(apiSlice.util.updateQueryData(
        'getUserData',
        undefined,
        draft => {
          draft.data = result.data
        }
      ))
    } catch (error) {
      console.log(error);
    }
  }

  const handleEdit = (dataIndex) => {
    const editData = data.find((_, index) => index === dataIndex);
    isEdittingInitalized.current = dataIndex;
    if (!editData) return;
    setFormData({
      name: editData[0],
      nickName: editData[1],
      familyName: editData[2],
      jobName: editData[3],
      companyName: editData[4],
    });
    navigate('/add')
  }

  return (
    <table className="w-[80vw] h-fit flex flex-col gap-1.5">
      <thead className="w-full">
        <tr className="grid grid-cols-6 grid-rows-1 bg-[#f0f0f0] shadow-sm py-1.25">
          <th>Name</th>
          <th>Nick Name</th>
          <th>Family Name</th>
          <th>Job Name</th>
          <th>Company Name</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody className="w-full flex flex-col gap-1">
        {
          dashboardData.length ? dashboardData.map((user, index) => {
            const mainIndex = index
            return (
              <tr key={index} className="grid grid-cols-6 grid-rows-1">
                {
                  user.map((value, index) =>
                  (
                    value === 'action' ?
                      <td
                        key={index}
                        className={
                          `flex items-center justify-center gap-3.5 py-1.5
                          ${index % 2 === 0 ? 'bg-blue-100' : 'bg-gray-100'}`
                        }
                      >
                        <button className="cursor-pointer" onClick={() => handleDelete(mainIndex)}>
                          <MdDelete className="w-6 h-6 hover:text-[#0f0f0f74]" />
                        </button>
                        <button className="cursor-pointer" onClick={() => handleEdit(mainIndex)}>
                          <FaRegEdit className="w-6 h-6 hover:text-[#0f0f0f74]" />
                        </button>
                      </td>
                      :
                      <td
                        key={index}
                        className={
                          `text-center font-medium py-1.5
                          ${index % 2 === 0 ? 'bg-blue-100' : 'bg-gray-100'}`
                        }
                      >
                        {value}
                      </td>
                  ))
                }
              </tr>
            )
          }) : null
        }
      </tbody>

    </table>
  );
}