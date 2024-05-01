import { useEffect, useRef, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const SelectQuery = ({selected ,setSelected}) => {
  const [query, setQuery] = useState("");
 
  const [menuOpen, setMenuOpen] = useState(false);

  const inputRef = useRef(null);
  const outlineRef = useRef();

  useEffect(() => {
    const inputElement = inputRef.current;
    const outlineElement = outlineRef.current;
  
    const focusHandler = () => {
      outlineElement.style.border = '2px solid #2584FF';
    };
  
    const blurHandler = () => {
      outlineElement.style.border = 'none'; // Remove the border
    };
  
    if (inputElement && outlineElement) {
      inputElement.addEventListener('focus', focusHandler);
      inputElement.addEventListener('blur', blurHandler);
  
      return () => {
        inputElement.removeEventListener('focus', focusHandler);
        inputElement.removeEventListener('blur', blurHandler);
      };
    }
  }, [inputRef, outlineRef]);
  



  const tags = [
    "tech lead", "frontend", "backend", "ios", "android"
  ];

  const filteredTags = tags.filter(
    (item) =>
      item?.toLocaleLowerCase()?.includes(query.toLocaleLowerCase()?.trim()) &&
      !selected.includes(item)
  );

  const isDisable =
    !query?.trim() ||
    selected.filter(
      (item) =>
        item?.toLocaleLowerCase()?.trim() === query?.toLocaleLowerCase()?.trim()
    )?.length;

  return (
    <div className="bg-red-100  ">
      <div className="relative  w-auto bg-red-100 text-sm rounded" ref={outlineRef}>
       
        <div className=" flex bg-white h-14  w-full rounded-md items-center   border justify-between   gap-2.5">
        {selected?.length ? (
          <div className=" h-14  relative text-xs flex  justify-center items-center  p-2 overflow-x-scroll ">
          <div className="flex gap-2">

         
            {selected.map((tag) => {
              return (
                <div
                  key={tag}
                  className="bg-gray-200 font-light flex  text-nowrap rounded  justify-between items-center p-1 pl-2 gap-2"
                >
                  {tag}
                  <div
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() =>
                      setSelected(selected.filter((i) => i !== tag))
                    }
                  >
                 <span
                className="text-gray-400 cursor-pointer text-sm">
                  <ClearIcon  />
                  </span>
                   
                  </div>
                </div>
              );
            })}
            </div>
            <div className="ml-3 w-full text-right">
              <span
                className="text-gray-700 cursor-pointer"
                onClick={() => {
                  setSelected([]);
                  inputRef.current?.focus();
                }}
              >
                <ClearIcon />
              </span>
            </div>
          </div>
        ) : null}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value.trimStart())}
            placeholder="Search or Create tags"
            className=" bg-transparent  text-sm flex-1 px-4 py-2 focus-visible:outline-none "
            onFocus={() => setMenuOpen(true)}
            onBlur={() => setMenuOpen(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isDisable) {
                setSelected((prev) => [...prev, query]);
                setQuery("");
                setMenuOpen(true);
              }
            }}
           
            
          />
          <button
            className="text-sm bg-white disabled:text-gray-300 text-rose-500 disabled:cursor-not-allowed"
            disabled={isDisable}
            onClick={() => {
              if (isDisable) {
                return;
              }
              setSelected((prev) => [...prev, query]);
              setQuery("");
              inputRef.current?.focus();
              setMenuOpen(true);
            }}
          >
            <KeyboardArrowDownIcon />
          </button>
        </div>

        {/* Menu's */}
        {menuOpen ? (
          <div className=" bg-white rounded-md border absolute w-full max-h-52  flex overflow-y-auto scrollbar-thin scrollbar-track-slate-50 scrollbar-thumb-slate-200">
            <ul className="w-full">
              {filteredTags?.length ? (
                filteredTags.map((tag, i) => (
                  <li
                    key={tag}
                    className="p-2 cursor-pointer hover:bg-blue-100   w-full"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setMenuOpen(true);
                      setSelected((prev) => [...prev, tag]);
                      setQuery("");
                    }}
                  >
                    {tag}
                  </li>
                ))
              ) : (
                <li className="p-2 text-gray-500">No options available</li>
              )}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SelectQuery;