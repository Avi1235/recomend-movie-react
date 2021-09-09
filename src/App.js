
import React, { useState } from "react";
import { BrowserRouter as Router ,Switch,Route,NavLink } from 'react-router-dom';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';


import { DropDown } from "./components/DropDown";
import { RecomendList } from "./components/RecomendList";
import { MainApp } from "./MainApp";
import { GoToShow } from "./components/GoToShow";

function App() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [searchData, setSearchData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isopen, setIsopen] = useState(false)
  const [interrupt, setInterrupt] = useState(true)
  const [typingTimeout, setTypingTimeout] = useState(0)

  const handleOnChangeSearch = (e) => {
    let isSubscribed = true;
    if (typingTimeout) {
      clearTimeout(typingTimeout);
   }
    setSearchTerm(e.target.value);
    setTypingTimeout(setTimeout(function () {
      
      fetch("http://localhost:5000/api/search/" + searchTerm)
      .then(res => res.json())
      .then(
        (result) => {
          if (isSubscribed) {
          setIsLoaded(true);
          setSearchData(result);
        }},
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
          console.log(error.message);
        }
      )
    }, 1500))
      return () => isSubscribed = false;
  }

  const searchOnClick = () => {
    setIsopen(false);
    setSearchTerm('');
    setSearchData([]);
  }

  const handleClickAway = () => {
    if (interrupt === isopen){
      setIsopen(!isopen);
    }
  }

  const interrutClickAway = () => {
    setInterrupt(true);
  }
  const interrutClickAway2 = () => {
    setInterrupt(false);
  }

  return (
    <Router>
    <div className="MainpageReactiView">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <NavLink  exact={true} to="/">  
          <img src={process.env.PUBLIC_URL + '/logo192.png'} style={{ height: 20 }} />
          </NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02"
          aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="navbar-nav mr-5">
            <li className="nav-item">
            <NavLink className="nav-link" exact={true} activeClassName='active' to="/">Explorar</NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link" activeClassName='active' to="/recomendaciones">Recomendaciones</NavLink>
            </li>
          </ul>
          <form className="search-bar-dropdown pl-5 ml-5" onSubmit={e => { e.preventDefault(); }} >
          <ClickAwayListener onClickAway={interrutClickAway}>
            <input
              className="form-control"
              style={{ width: "570px" }}
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleOnChangeSearch}
              onClick={interrutClickAway2}
            />
            </ClickAwayListener>
            <ClickAwayListener onClickAway={handleClickAway}>
              <ul className="list_group instant_search pl-0 pt-2" style={isopen ? {  visibility:"visible" } : {  visibility:"hidden" }} >
                {
                  searchData.map(movie => (
                    <DropDown movie={movie} key={movie.imdbId} searchOnClick={searchOnClick} />
                  ))
                }
              </ul>
              </ClickAwayListener>
          </form>
        </div>
      </nav>

      <Switch>
        <Route path="/title" component={GoToShow}/>
        <Route path={'/recomendaciones/'} component={RecomendList} />
        <Route exact={true} path={'/'} component={MainApp} />
      </Switch>

          </div>
    </Router>
  );
}

export default App;
