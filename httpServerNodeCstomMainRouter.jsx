import React, {Component} from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import NavNode from "./httpServerNodeCstomNavRouter";
import CustomNodeTable from "./httpServerNodeCstomTableRouter";
import AddFormNode from "./httpServerNodeCstomAddRouter";

class MainNode extends Component {
    render() {
       return (
          <div className="container">
              <NavNode />

              <Switch>
                 <Route path="/customersAdd" component={AddFormNode}/>
                 <Route path="/customers/:id/edit" component={AddFormNode}/>

                 <Route path="/customers" component={CustomNodeTable}/>
                 <Redirect from="/" to="customers"/>
              </Switch>
          </div>
       )
    }
}
export default MainNode;