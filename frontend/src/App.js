import Headers from './header.js';
import Notepad from './notepad.js';
import Book from './book.js';
import MaGlass from './maglass.js';
import BriefClock from './briefclock.js';
import Looseleaf from './looseleaf.js';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Headers />
        <Switch>
          <Route exact path='/'>
            <Notepad />
            <Book />
            <MaGlass />
          </Route>
          <Route path='/about'>
            <Looseleaf />
          </Route>
          <Route path='/briefs'>
            <BriefClock />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
//Photo by Victor Santos from Pexels
//https://www.pexels.com/photo/close-up-of-leaf-on-wooden-plank-325703/