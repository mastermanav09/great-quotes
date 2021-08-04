import { useEffect } from "react";
import QuoteList from "./QuoteList";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";
import NoQuotesFound from "./NoQuotesFound";
import LoadingSpinner from "../UI/LoadingSpinner";

const AllQuotes = () => {
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (error) {
    return <h3 className="centered focused">{error}</h3>;
  }

  if (status === "completed" && (loadedQuotes.length === 0 || !loadedQuotes)) {
    return <NoQuotesFound />;
  }

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  return <QuoteList quotes={loadedQuotes} />;
};

export default AllQuotes;
