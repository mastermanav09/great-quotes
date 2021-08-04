import React, { Suspense } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import Layout from "./components/layout/Layout";

const NewQuote = React.lazy(() => import("./components/quotes/NewQuote"));
// this function will get import and loaded dynamically (and downloaded by the browser as a splitted data bundle) only when it is needed.(when user access the page(Route) in which this components is used). It will not be downloaded in advance (in intial download bundle.)
const QuoteDetail = React.lazy(() => import("./components/quotes/QuoteDetail"));
const AllQuotes = React.lazy(() => import("./components/quotes/AllQuotes"));
const Error = React.lazy(() => import("./components/Error"));

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes" />
          </Route>

          <Route path="/quotes" exact>
            <AllQuotes />
          </Route>

          <Route path="/quotes/:quoteId">
            <QuoteDetail />
          </Route>

          <Route path="/add-quote">
            <NewQuote />
          </Route>

          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
