import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Landing from "./pages/components/Landing";
import OrphanagesMap from "./pages/components/OrphanagesMap";
import CreateOrphanage from "./pages/components/CreateOrphanage";
import Orphanage from "./pages/components/Orphanage";

function Routes() {
  return (
    <BrowserRouter>
      <Switch> {/*para que apenas uma rota seja chamada por vez*/}
        <Route path="/" component={Landing} exact />
        <Route path="/app" component={OrphanagesMap} />

        <Route path="/orphanages/create" component={CreateOrphanage} />
        <Route path="/orphanages/:id" component={Orphanage} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
