import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import { useEffect } from "react";
import HighlightedQuote from "../quotes/HighlightedQuote";
import Comments from "../comments/Comments";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

const QuoteDetail = (props) => {
  const {
    sendRequest,
    status,
    data: quote,
    error,
  } = useHttp(getSingleQuote, true);
  const match = useRouteMatch();
  const params = useParams();

  useEffect(() => {
    sendRequest(params.quoteId);
  }, [sendRequest, params.quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <h3 className="centered focused">{error}</h3>;
  }

  if (!quote.text) {
    return <h3 className="centered">No quote found</h3>;
  }
  return (
    <>
      <HighlightedQuote text={quote.text} author={quote.author} />

      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            {/* match.url ---> /quotes/${params.quoteId}/ */}
            Load Comments
          </Link>
        </div>
      </Route>

      <Route path={`${match.path}/comments`}>
        {/* match.path ---> /quotes/${params.quoteId}/ (path till now) */}
        <Comments />
      </Route>
    </>
  );
};

export default QuoteDetail;
