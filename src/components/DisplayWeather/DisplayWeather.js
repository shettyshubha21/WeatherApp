import React, {useState} from 'react';
import styles from './DisplayWeather.module.css';
import { FaThermometerHalf, FaCloudRain, FaWind } from "react-icons/fa";
import { FiDroplet } from "react-icons/fi";
import { AiOutlineEye } from "react-icons/ai";
import cn from 'classnames';

const  DisplayWeather = ({data}) => {
  const [degree, setDegree] = useState(true);
  
  const buttonClasses = cn(styles.btn, {[styles.Active]: !degree});
  const buttonClass = cn(styles.btn, {[styles.Active]: degree});
 

    const iconurl =
      "http://openweathermap.org/img/w/" +
      `${data.name !== undefined ? data.weather[0].icon : null}` +
      ".png";
     
    return (
      <div className={styles.DisplayWeather}>
        {data.name !== undefined ? (
          <div>
            <div className={styles.Display}>
              <span className={styles.Name}>
                {data.name} , {data.sys.country}
              </span>
              <div className={styles.icon}>
                <img  className={styles.img} src={iconurl} alt="" srcset="" />
              </div>
              
              <div className={styles.toggle}>
                <button onClick={() => { setDegree(true); console.log(degree)}} className={buttonClasses} ><sup>o</sup>C</button>
                <button onClick={() => { setDegree(false); console.log(degree)}} className={buttonClass}><sup>o</sup>F</button>
              </div>

              {degree? <h1 className={styles.degree}>
                {Math.floor(data.main.temp)}
              </h1> : <h1 className={styles.degree}>
                {Math.floor((data.main.temp * 1.8) + 32)}
              </h1>}
            
             
              <div className={styles.description}>
              <span >
                {data.weather[0].description}
              </span>
              </div>
             
            </div>
            <div className={styles.line}></div>
    <div className={styles.icons}>
        <div className={styles.firstIcon}>
            <FaThermometerHalf/> 
        </div>
        <div className={styles.text}>
            Min-Max
            <span>{Math.floor(data.main.temp_min)}<sup>o</sup>-{Math.floor(data.main.temp_max)}<sup>o</sup></span>
        </div>
        <div className={styles.secondIcon}>
            <FaCloudRain/>
        </div>
        <div className={styles.text}>
            Precipitation
            <span>{data.rain? data.rain['1h']  : '0%' }</span>
        </div>
        <div className={styles.thirdIcon}>
            <FiDroplet/>
        </div>
        <div className={styles.text}>
            Humidity
            <span>{data.main.humidity}%</span>
        </div>
        <div className={styles.fourthIcon}>
            <FaWind/>
        </div>  
        <div className={styles.text}>
            Wind
            <span>{Math.floor(data.wind.speed * 2.236936)} mph</span>
        </div>
        <div className={styles.fifthIcon}>
            <AiOutlineEye/>
        </div>  
        <div className={styles.text}>
            Visibility
            <span>{Math.floor(data.visibility * 2.236936/1000)} mph</span>
        </div>  
    </div> 
          </div>
        ) : (
          <div className={styles.error}>
            <h2>City not found</h2>
          </div>
        )}
      
      </div>
      
    );
  }

export default DisplayWeather;
