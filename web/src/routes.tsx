import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Landing from "./pages/components/Landing";
import OrphanagesMap from "./pages/components/OrphanagesMap";

function Routes() {
  return (
    <BrowserRouter>
      <Switch> {/*para que apenas uma rota seja chamada por vez*/}
        <Route path="/" component={Landing} exact />
        <Route path="/app" component={OrphanagesMap} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
