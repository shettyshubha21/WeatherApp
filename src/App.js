import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Home from './components/Home/Home';
import Favourite from './components/Favourite/Favourite';
import RecentSearch from './components/RecentSearch/RecentSearch';
import { useState} from 'react';
import Modal from './components/Modal/Modal';
import { useLocalStorageState } from './useLocalStorageState';


function App() {
  const[selectedIndex, setSelectedIndex] = useState(0);
  const classNames1 = `home ${selectedIndex === 0 ? 'selected' : undefined}`;
  const classNames2 = `fav ${selectedIndex === 1 ? 'selected' : undefined}`;
  const classNames3 = `search ${selectedIndex === 2 ? 'selected' : undefined}`;

  const [favInfo, setFavInfo] = useState([]);
  const [message,setMessage] = useState(false);

  const [searchInfo, setSearchInfo] =useLocalStorageState([]);

  const dateBuilder = (d) => {
    let months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

    let days = [ "Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day},${date} ${month} ${year}`;
};
function timeBuilder(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

  return (
    <Router>
      <div className="App">
      <div className="background">
      <div className="logo">
            
      </div>
        <nav className="nav"> 
          <ul className="list">
           
            <li>
              <Link className={classNames1} onClick={() => {setSelectedIndex(0); console.log(selectedIndex)}} to="/">HOME</Link>
            </li>
            <li >
              <Link className={classNames2} onClick={() => {setSelectedIndex(1)}} to="/favourite">FAVOURITE</Link>
            </li> 
           <li>
              <Link className={classNames3} onClick={() => {setSelectedIndex(2)}} to="/recentsearch">RECENT SEARCH</Link>
            </li> 
            <div className="date">{dateBuilder(new Date())} {timeBuilder(new Date())}</div>
          </ul>
          <div className="line"></div>
        </nav>
          

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/recentsearch">
            <RecentSearch 
              searchInfo = {searchInfo}
              setSearchInfo = {setSearchInfo}

              favInfo={favInfo}
              setFavInfo={setFavInfo}

              setSelectedIndex={setSelectedIndex}
            />
          </Route>
          
          <Route path="/favourite">
          <Favourite favInfo={favInfo}
          setFavInfo={setFavInfo} 
            message={message}
            setMessage={setMessage}

            setSelectedIndex={setSelectedIndex}
          />
          </Route>

          <Route path="/modal">
          <Modal
            favInfo={favInfo}
             setFavInfo={setFavInfo}
            />
          </Route>
          <Route  path="/">
            <Home favInfo={favInfo}
             setFavInfo={setFavInfo}
             message={message}
            setMessage={setMessage}

            searchInfo = {searchInfo}
            setSearchInfo = {setSearchInfo}

            setSelectedIndex={setSelectedIndex}
            />
          </Route>
        </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
