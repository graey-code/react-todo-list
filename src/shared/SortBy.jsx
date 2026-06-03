import React, {Select} from "react";
//import Select from "react-dropdown-select";

export default function SortedBy ({sortBy, sortDirection, onSortByChange, onSortDirectionChange}) {
    
    const optionOne = [
        {label: "Creation Date", value: "creationDate"},
        {label: "Title", value: "title"}
    ]

    const optionTwo = [
        {label: "Descending", value: "desc"},
        {label: "Ascending", value: "asc"}
    ]

    const handleChangeOne = (e) => onSortByChange(e.target.value);
    const handleChangeTwo = (e) => onSortDirectionChange(e.target.value);

    return (
        <div className="d-flex justify-content-center mt-5">
            <label htmlFor="Sort_By" >
                Sort By...

            </label>
            <Select
              id="Sort_By"
              value={sortBy}
              options={optionOne}
              onChange={handleChangeOne}
            >
            
            </Select>
            
            <label htmlFor="Order" >
                Order...

            </label>
            <Select
              id="Order"
              value={sortDirection}
              options={optionTwo}
              onChange={handleChangeTwo}
            >

            </Select>

        </div>
    )
}

