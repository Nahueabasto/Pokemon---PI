import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import LandingPage from './component/LandingPage';
import Home from './component/Home';
import PokeDetail from './component/Detail';  
import Form from './component/Form';   

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Switch>
      <Route exact path="/" component={LandingPage}/>
      <Route exact path ="/home" component={Home} />
      <Route exact path="/pokemons/:uuid" render={({match}) => <PokeDetail uuid={match.params.uuid}/>} />
      <Route exact path="/home/form" component={Form} />
    </Switch>
    </div>
  </BrowserRouter>
  );
}

export default App;


// <Route exact path="/pokemons/:uuid" render={({match}) => <Detail uuid={match.params.uuid}/>} />
