import React, { useState, useMemo, useCallback } from "react";
import _ from "lodash";

// custom hook
const useDebounce = (callback, delay) => {
  // const debounce = useMemo(() => _.debounce(callback, delay), []); // 1st method
  const debounce = useCallback(_.debounce(callback, delay), [delay]); // 2nd method //3rd method is using Ref

  return debounce;
};

const Debounce = () => {
  const [clientValue, setClientValue] = useState("");
  const [dbValue, setDbValue] = useState("");
  const [delay, setDelay] = useState();

  // const debounceSave = useMemo(
  //   () => _.debounce((value) => setDbValue(value), 1000),
  //   []
  // ); // without custom hook

  const debounceSave = useDebounce((value) => setDbValue(value), delay); // using custom hook

  const handleInputChange = (e) => {
    const value = e.target.value;
    setClientValue(value);
    debounceSave(value);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">๐งถ Example of Debouncing ๐งถ</h2>
      <div className="col-md-3">
        <input
          className="form-control form-control-lg"
          type="text"
          placeholder=" ๐น Enter ๐ฅ Here ๐น"
          aria-label=".form-control-lg example"
          onChange={handleInputChange}
        />
        <input
          className="form-control form-control-sm mt-2"
          type="number"
          placeholder="Enter Delay Value"
          aria-label=".form-control-lg example"
          onChange={(e) => setDelay(e.target.value)}
        />
      </div>
      <div className="col-md-3 d-flex  justify-content-between mt-2">
        <div>
          <span className="badge bg-secondary">Editor ( Client ๐ฃ )</span>
          <div>{clientValue}</div>
        </div>
        <div>
          <span className="badge bg-secondary">Saved ( DB ๐งญ )</span>
          <div>{dbValue}</div>
        </div>
      </div>
    </div>
  );
};

export default Debounce;
