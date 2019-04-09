import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// class AppRouter extends Component {
//     render() {
//       return (
//         <Router>
//             <Route path="/" exact component={App} />
//             <Route path="/about/" component={AboutPage} />
//             <Route path="/note/" component={NotePage} />
//         </Router>
//       )
//     }
// }

// ReactDOM.render(
//     <AppRouter />
//     , document.getElementById('root'));

// ReactDOM.render(
//     <Router>
//         <Route path="/" component={App} />
//         <Route path="/about/" component={AboutPage} />
//         <Route path="/note/" component={NotePage} />
//     </Router>
//     , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
