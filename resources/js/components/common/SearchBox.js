import React, {useState} from 'react'
import {InputField} from '../ComponentsManager'

export default function SearchBox({handleSearch}) {
  const [search, setSearch] = useState({search_box: ''})

  return (
    <div className="search-box-container">
      <InputField id="search_box" name="search_box" type="text" maxLength="32" placeholder="Enter search"
      stateValue={search} setStateValue={setSearch} appendIcon="search" appendClick={() => handleSearch(search.search_box)}/>
    </div>
  )
}
