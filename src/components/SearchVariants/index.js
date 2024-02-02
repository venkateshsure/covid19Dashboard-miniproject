import {BiChevronRightSquare} from 'react-icons/bi'

import './index.css'

const SearchVariants = props => {
  const {each} = props
  const {stateCode, name} = each
  return (
    <li className="search-variants-li-con">
      <p className="search-variants-name">{name}</p>
      <div className="search-variants-sec-con">
        <p className="search-variants-state-code">{stateCode}</p>
        <button
          className="bi-square-button"
          type="button"
          aria-label="bi square"
        >
          <BiChevronRightSquare className="bi-square" />
        </button>
      </div>
    </li>
  )
}

export default SearchVariants
