import React from "react";

const Card = ({jdLink,jdUid,  maxExp,minExp ,minJdSalary ,maxJdSalary , jobRole ,jobDetailsFromCompany ,location , salaryCurrencyCode}) => {

  // function capitalizeFirstLetter(word) {
  //   if (!word) return ''; 
  //   return word?.charAt(0)?.toUpperCase() + word.slice(1);
  // }

  
  return (
    <div className="border shadow-md p-6 flex flex-col gap-4 rounded-2xl h-[580px]  w-[380px]">
      <span className="border font-light self-start p-2 px-4 rounded-full shadow-lg">
        ⏳ Posted 12 days ago
      </span>

      {/* Company details */}
      <div className="flex gap-3">
        <div className="h-18 w-12  ">
          <img src='./logo.png'alt='logo' className="bg-cover" />
        </div>
        <div>
          <p className="tracking-widest font-semibold text-[#8B8B8B]">Fitstok</p>
          <h4 className="font-light ">{jobRole}</h4>
          <p className="text-sm font-medium">{location}</p>
        </div>
      </div>

      {/*  */}
      {minJdSalary ? (
  <p className="text-slate-600">
    Estimated Salary: ₹{minJdSalary && parseInt(minJdSalary)?.toFixed(2)} - {maxJdSalary && parseInt( maxJdSalary)?.toFixed(2)} LPA ✅
  </p>
) : (
  <p className="text-slate-600 ">Not disclosed</p>
)}

   
      <div className=" ">
      <h4 className="font-semibold">About Company:</h4>
      <h6 className="text-sm font-bold">About us</h6>
      <div className="relative h-[11rem]   overflow-y-hidden ">
     
      <p className="text-sm ">
       {jobDetailsFromCompany}
        </p> 
       
    
        <div className="absolute bottom-0 flex justify-center items-end b-0 z-10  h-20 w-full" id="blur">
        <a className="text-[#4943DA] font-light" href={jdLink}>View job</a>
        </div>
       
        </div>
      </div>

      
      <div>
        <p  className="tracking-widest font-semibold text-[#8B8B8B]">Minimum Experience</p>
        <h4 className="font-light">{minExp ?? 0} years</h4>
      </div>
      <button className="bg-[#55EFC4] px-8 py-4 border  rounded-xl w-full h-14 font-medium text-lg flex justify-center items-center">
        <span className="mr-1">⚡️</span> <h3>Easy apply </h3>
      </button>
    </div>
  );
};

export default Card;
