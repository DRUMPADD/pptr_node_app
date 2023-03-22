import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'

function SearchForm() {
  return (
    <form className='search-form'>
        <div className='search-box'>
            <input type={'text'} className='inp-search' placeholder='Registro' />
            <button type='button'>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
        </div>
    </form>
  )
}

export default SearchForm