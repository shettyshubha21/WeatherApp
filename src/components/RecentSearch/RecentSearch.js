import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styles from './RecentSearch.module.css';
import Home from '../Home/Home';
import { BsFillHeartFill, BsHeart } from "react-icons/bs";
import Modal from '../Modal/Modal';
import { BsSearch } from "react-icons/bs";
import { useHistory } from "react-router-dom";

const RecentSearch = ({searchInfo, setSearchInfo, favInfo}) => {
const [clear,setClear] = useState(false);
let history = useHistory();

const hearts = () => {
  const displayHeart = searchInfo.map((item) => {
    const favele = favInfo.find((ele) => ele.name === item.name);
    if(favele) {
      return { ...item, isFav: true}
    }
    else {
      return { ...item, isFav: false} 
    }
  })
  setSearchInfo(displayHeart);
}

useEffect (() => {
  hearts();
})

return (
<div>
<div>
<form className={styles.searchField}>
        <input
          type="text"
          placeholder="Search city"
          name="city"
          
        />
        <button onClick={()=>{history.push("/") } } >
          {<BsSearch/>}
        </button>
      </form>
</div>
    <div  className={styles.RecentSearch}>
    {searchInfo.length===0? <div className={styles.message}>
        <div className={styles.image}></div>
       <h1>No Recent Search</h1>
   </div> :

      <div>
      <div className={styles.clearAll}>
      <p>You recently searched for</p>
      <p onClick={() => {setClear(true)}}>Clear All</p>
    </div>

    {clear && <Modal clear={clear} setClear={setClear} searchInfo={searchInfo} setSearchInfo={setSearchInfo} />}

    {searchInfo.map((menuItem)=> {
        const {name, country, icon, degree, description, isFav} = menuItem;
        return (
          <div className={styles.display}>
            <div className={styles.name} >
                <h4>{name}</h4><h4>,</h4>
                <h4>{country}</h4>
            </div>
            <div className={styles.icon}>
                <img src={icon} alt={name} className={styles.photo}/>
                <h1 className={styles.degree}>{degree}<sup>o</sup>C</h1>
                <h1 className={styles.description}>{description}</h1>
            </div>
            <div className={styles.favIcon}>
            {isFav ?<BsFillHeartFill/> : <BsHeart/> }
            </div>
          </div>
        )
      })}
      </div>
    }
      </div>
</div>
);
};


RecentSearch.propTypes = {

};

export default RecentSearch;


