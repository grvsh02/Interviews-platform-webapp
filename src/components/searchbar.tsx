import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

type SearchbarProps = {
    keyword?: string,
    onSearch?: (keyword: string) => void
}

const Searchbar = ({keyword, onSearch = () => {}}: SearchbarProps) => {

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value);
    }

    return (
        <div className="w-2/5 h-12 flex bg-white relative">
            <input className="min-w-full pl-8" onChange={handleSearch} value={keyword} placeholder="Search by Name, email or phone no. "></input>
            <FontAwesomeIcon icon={faSearch} className="absolute left-2 top-4"/>
        </div>
    )
}

export default Searchbar