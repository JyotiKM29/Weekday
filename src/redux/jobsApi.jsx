import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const jobsApi = createApi({
    reducerPath: 'jobsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.weekday.technology' }),
    endpoints: (builder) => ({
        fetchJobs: builder.query({
            query: ({ limit, offset }) => ({
                url: '/adhoc/getSampleJdJSON',
                method: 'POST',
                body: { limit, offset },
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
    }),
});
export const { useFetchJobsQuery } = jobsApi;


