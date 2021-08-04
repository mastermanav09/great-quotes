import { useHistory, useLocation } from "react-router-dom";
import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";
import { useMemo } from "react";

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.text.toLowerCase() > quoteB.text.toLowerCase() ? 1 : -1;
    }

    return quoteA.text.toLowerCase() < quoteB.text.toLowerCase() ? 1 : -1;
  });
};

const QuoteList = (props) => {
  const history = useHistory();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search); // is a constructor which is given by the browser to access the location object value(here 'search').

  const isSortingAscending =
    queryParams.get("sort") === "asc" || queryParams.get("sort") === null;

  let sortedQuotes = useMemo(
    () => sortQuotes(props.quotes, isSortingAscending),
    [props.quotes, isSortingAscending]
  );

  const changeSortingHandler = () => {
    // more-readable
    history.push({
      pathname: location.pathname, // /quotes (location of current page/component)
      search: `?sort=${isSortingAscending ? "desc" : "asc"}`, // it will take query string
    });

    // history.push(
    //   `${location.pathname}?sort=${isSortingAscending ? "desc" : "asc"}`
    // );
  };

  let content = (
    <ul className={classes.list}>
      {sortedQuotes.map((quote) => (
        <QuoteItem
          key={quote.id}
          id={quote.id}
          author={quote.author}
          text={quote.text}
        />
      ))}
    </ul>
  );

  return (
    <>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {isSortingAscending ? "Descending" : "Ascending"}
        </button>
      </div>
      {content}
    </>
  );
};

export default QuoteList;
