import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Favourite.module.css';
import Home from '../Home/Home';
import DisplayWeather from '../DisplayWeather/DisplayWeather';
import { BsFillHeartFill } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import Modal from '../Modal/Modal';
import { useHistory } from "react-router-dom";

const Favourite = ({favInfo,setFavInfo,message, setMessage}) => {
    const [show,setShow] = useState(false);
    let history = useHistory();
return (
<div>
    <div className={styles.home}>
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
<div className={styles.Favourite }>
    
   {favInfo.length===0? <div className={styles.message}>
        <div className={styles.image}></div>
       <h1>No Favourites added</h1>
   </div> :
   <div>
   <div className={styles.removeAll}>
        <p className={styles.cityNumber}>{favInfo.length} City added as favourite</p>
        <p onClick={() => {setShow(true)}} className={styles.removeButton}>Remove all</p>
    </div>

    { show && (<Modal show={show} setShow={setShow} favInfo={favInfo} setFavInfo={setFavInfo}/>)}
    

   {favInfo.map((menuItem)=> {
        const {name, country, icon, degree, description} = menuItem;
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
                <BsFillHeartFill/>
            </div>
          </div>
        )
      })}
   </div>}
</div>
</div>
);
};


Favourite.propTypes = {

};

export default Favourite;
