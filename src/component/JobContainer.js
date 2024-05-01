import React, { useState, useEffect } from "react";
import { useFetchJobsQuery } from "../redux/jobsApi";
import Card from "./Card";
import SelectQuery from "./SelectQuery";

const JobContainer = () => {
  const [filteredJobs ,setFilteredJobs] = useState([]);
  const [selected, setSelected] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const { data, error, isLoading } = useFetchJobsQuery({
    limit: 10,
    offset: (page - 1) * 10,
  });

  function filterJobsByRole(...roles) {
    return jobs.filter((job) => roles.includes(job.jobRole.toLowerCase()));
  }
 

  useEffect(()=>{
    console.log( ...selected )
    setFilteredJobs(filterJobsByRole(...selected));
    console.log("filter data", filteredJobs);

  } ,[selected])
  

  useEffect(() => {
    if (!isLoading && !error && data) {
      setJobs((prevJobs) => [...prevJobs, ...data.jdList]);
      console.log(jobs);
      setTotalCount(data.totalCount);
      setLoading(false);
    }
  }, [data, error, isLoading]);

  //Infinite Scroll
  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 10 && !loading) {
      setLoading(true);
      setPage((prev) => prev + 10);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="py-8">
      <div className="flex mb-8 gap-2">
        <h4 className="font-semiBold text-2xl  ">Total Jobs:</h4>
        <span className="flex  bg-blue-500 font-light rounded-full justify-center items-center p-1  px-2 text-sm text-white">
          {filteredJobs?.length > 0 ? filteredJobs?.length  : totalCount}
        </span>
      </div>

      <SelectQuery selected={selected} setSelected={setSelected} />

      <div className="grid sm: grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-8 mt-8 ">
      {filteredJobs && filteredJobs.length > 0 ? (
  filteredJobs.map((job, index) => (
    <div className="justify-self-center" key={index}>
      <Card {...job} />
    </div>
  ))
) : (
  jobs.map((job, index) => (
    <div className="justify-self-center" key={index}>
      <Card {...job} />
    </div>
  ))
)}

        {loading && <h2>Loading...</h2>}
      </div>
      {error && <div>Error: {error.message}</div>}
    </div>
  );
};

export default JobContainer;
