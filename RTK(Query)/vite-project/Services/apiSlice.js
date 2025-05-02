import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001'
    }),
    endpoints: (builder) => ({
        getUserData: builder.query({
            query: () => 'getUserData',
        }),

        postUserData: builder.mutation({
            query: (newData) => ({
                url: 'postData',
                method: 'POST',
                body: newData
            })
        }),

        updateUserData: builder.mutation({
            query: ({ updatedData, index }) => ({
                url: `updateExistingData?index=${index}`,
                method: 'PUT',
                body: updatedData
            })
        }),

        deleteUserData: builder.mutation({
            query: (index) => ({
                url: `deletePost?dataIndex=${index}`,
                method: 'DELETE'
            })
        })
    })
});

export const {
    useGetUserDataQuery,
    useDeleteUserDataMutation,
    usePostUserDataMutation,
    useUpdateUserDataMutation
} = apiSlice;