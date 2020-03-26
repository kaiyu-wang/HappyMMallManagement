import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom'
import Layout from 'component/layout/index.jsx';
//home
import Home from 'page/home/index.jsx';
import Login from 'page/login/index.jsx';

class App extends React.Component{
    render(){
        return (
            <Router>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/" render={ props => (
                        <Layout >
                            <Switch>
                                <Route exact path="/" component={Home}/>
                                <Route path="/product" component={Home}/>
                                <Route path="/product-category" component={Home}/>
                                <Redirect from="*" to ="/" />
                            </Switch>
                        </Layout> 
                    )}/>
                   
                </Switch>   
            </Router>
        )
    }
}


ReactDOM.render(
    <App/>,
document.getElementById('app')
);