/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../context/context";
import { FcSearch } from "react-icons/fc";
import { AiFillThunderbolt } from "react-icons/ai";
import DisplayCard from "../components/Card";

function Query() {
  const { data, mainTags } = useContext(DataContext);
  const [filterData, setFilterData] = useState([]);
  const [search, setSearch] = useState();
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setFilterData([...data]);
    for (let key in mainTags) {
      if (Object.keys(mainTags[key]).length > 0) {
        mainTags[key].forEach((a) => {
          setTags((tags) => [...tags, a]);
        });
      }
    }
  }, []);

  if (data.length < 1) return [];

  const handleSearch = (e) => {
    setSearch(e.target.value);

    if (e.target.value) {
      const regex = new RegExp(e.target.value, "gi");

      let newData = filterData.filter((a) => {
        return regex.test(a.name);
      });
      setFilterData([...newData]);
    } else {
      setFilterData([...data]);
    }
  };

  return (
    <>
      <div className="outerContainer">
        <Container className=" bg-muted d-flex flex-column align-items-center ">
          <div className="mainHeader ">
            <h4>
              <b>
                <FcSearch />
                The Best Way to Browse Quality AWS GitHub Repositories
                <FcSearch />
              </b>
            </h4>
          </div>
          <div>
            <p>
              <AiFillThunderbolt style={{ color: "yellow" }} />
              Built with a spreadsheet +{" "}
              <a
                href="https://www.polymersearch.com/?utm_source=built_with_polymer_aws"
                target="_blank"
                rel="noreferrer"
              >
                Polymer Search
              </a>{" "}
              |
              <a
                href="https://app.polymersearch.com/auth/login"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                Create a search and data app in seconds with Polymer beta
              </a>
            </p>
          </div>
          <div className="searchContainer">
            <div>
              <form>
                <input
                  className="searchBox form-control"
                  placeholder="search..."
                  onChange={handleSearch}
                  value={search}
                />
              </form>
            </div>
          </div>
        </Container>
        {tags.length > 0 && (
          <div className="tagBar">
            <div className="ms-5 mt-2">
              <p>
                TAGS :
                {tags.map((a, index) => {
                  return (
                    <div key={index} className="tagBarItem text-muted">
                      {a}
                    </div>
                  );
                })}
              </p>
            </div>
          </div>
        )}

        <div className="countBar  ">
          <div>
            <p>
              Repositories:
              <p className="d-inline text-muted"> {filterData.length} </p>
            </p>
          </div>
        </div>

        <div className="row cardContainer">
          {filterData.map((a) => {
            return <DisplayCard key={a._id} data={a} />;
          })}
        </div>
      </div>
    </>
  );
}

export default Query;
