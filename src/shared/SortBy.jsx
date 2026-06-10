
export default function SortBy ({sortBy, sortDirection, onSortByChange, onSortDirectionChange}) {
    
    // const optionOne = [
    //     {label: "Creation Date", value: "creationDate"},
    //     {label: "Title", value: "title"}
    // ]

    // const optionTwo = [
    //     {label: "Descending", value: "desc"},
    //     {label: "Ascending", value: "asc"}
    // ]

    const handleChangeOne = (e) => onSortByChange(e.target.value);
    const handleChangeTwo = (e) => onSortDirectionChange(e.target.value);

    return (
        <div>
            <label htmlFor="Sort_By" >Sort By: </label>
            <select
              id="Sort_By"
              value={sortBy}
              
              onChange={handleChangeOne}
            >
                <option value="creationDate">Creation Date</option>
                <option value="title">Title</option>
            
            </select>
            
            <label htmlFor="Order" > Order: </label>
            <select
              id="Order"
              value={sortDirection}
              
              onChange={handleChangeTwo}
            >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>

            </select>
            
        </div>
    )
}

// options={optionOne}
// options={optionTwo}