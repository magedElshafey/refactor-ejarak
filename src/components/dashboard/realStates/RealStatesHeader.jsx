import React from 'react'
import SearchInput from '../common/SearchInput';

const RealStatesHeader = ({ onSearchChange }) => {
    return (
        <div className='py-7'>
            <SearchInput onSearchChange={onSearchChange} />
        </div>
    )
}

export default RealStatesHeader;