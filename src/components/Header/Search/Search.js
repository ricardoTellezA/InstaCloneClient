import React, { useEffect, useState } from "react";
import { Search as SearchSU, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { size } from "lodash";
import { useQuery } from "@apollo/client";
import { SEARCH } from "../../../gql/user";
import ImageNoFound from "../../../assests/png/avatar.png";
import "./Search.scss";

const Search = () => {
  const [search, setSearch] = useState(null);
  const [result, setResult] = useState([]);
  
  const { loading, data } = useQuery(SEARCH, {
    variables: { search },
  });

  useEffect(() => {
    if (size(data?.search) > 0) {
      const results = [];
      data.search.forEach((user, index) => {
        results.push({
          key: index,
          title: user.name,
          username: user.username,
          avatar: user.avatar,
        });
      });
      setResult(results);
    } else {
      setResult([]);
    }
  }, [data]);

  const onChange = (e) => {
    if (e.target.value) setSearch(e.target.value);
    else setSearch(null);
  };

  const handleResultSelect = () => {
    setSearch(null);
    setResult([]);
  };

  return (
    <SearchSU
      className="search-users"
      fluid
      input={{ icon: "search", iconPosition: "left" }}
      loading={loading}
      value={search || ""}
      onSearchChange={onChange}
      results={result}
      resultRenderer={(e) => <ResultSearch data={e} />}
      onResultSelect={handleResultSelect}
    />
  );
};

function ResultSearch(props) {
  const { data } = props;
  return (
    <Link className="search-users__item" to={`/${data.username}`}>
      <Image src={data.avatar || ImageNoFound} />
      <div>
        <p>{data.title}</p>
        <p>{data.username}</p>
      </div>
    </Link>
  );
}

export default Search;
