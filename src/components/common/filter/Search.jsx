import React from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { changeName } from "../../../store/filterSlice";
const Search = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.filterSlice);
  return (
    <div className="w-full border bg-[#f6f5f5] border-slate-300 rounded-xl p-3 flex items-center gap-3 text-slate-300">
      <FaSearch size={20} /> |
      <input
        value={name}
        onChange={(e) => dispatch(changeName(e.target.value))}
        className="flex-1 bg-transparent border-none focus:outline-none caret-slate-300 text-slate-700"
      />
    </div>
  );
};

export default Search;
