import React, { useState, useEffect } from "react";
import { useFetchJobsQuery } from "../redux/jobsApi";
import Card from "./Card";

const JobContainer = () => {
  const [jobs, setJobs] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1); // Start from page 1
  const [loading, setLoading] = useState(false);
  const { data, error, isLoading } = useFetchJobsQuery({ limit: 10, offset: (page - 1) * 10 });

  useEffect(() => {
    if (!isLoading && !error && data) {
      setJobs((prevJobs) => [...prevJobs, ...data.jdList]);
      console.log(jobs)
      setTotalCount(data.totalCount);
      setLoading(false);
    }
  }, [data, error, isLoading]); 

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 10 && !loading) {
      setLoading(true);
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <h2>Total Jobs: {totalCount}</h2>
      <div className="grid sm: grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-8  ">
        {loading ? "Loading..." : jobs.map((job, index) => (
          <div className="justify-self-center">
           <Card {...job}/>
          
       
</div>
        ))}
      </div>
      {error && <div>Error: {error.message}</div>}
    </div>
  );
};

export default JobContainer;
