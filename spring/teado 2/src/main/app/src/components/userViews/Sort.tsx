import { faEgg, faToiletPaper} from '@fortawesome/free-solid-svg-icons';
import React from 'react';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
function Sort(props:{setSortPref:Function, sortPref:boolean}) { 
    const setSortPref =props.setSortPref;
const sortPref=props.sortPref;
  return (
    <div>
    <Link to="#" onClick={() => setSortPref(!sortPref)}>
      <FontAwesomeIcon icon={faToiletPaper} />
    </Link>
  
  </div>
  )
}

export default Sort;
