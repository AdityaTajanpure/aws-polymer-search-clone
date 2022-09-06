/* eslint-disable react-hooks/exhaustive-deps */
import { Bar } from "react-chartjs-2";
import { DataContext } from "../context/context";
import { useContext, useEffect, useState } from "react";

function Chart() {
  const { tags } = useContext(DataContext);
  const [value, setValue] = useState();
  const [labelArray, setLabelArray] = useState([]);
  const [dataArray, setDataArray] = useState([]);

  const chart = (value) => {
    let labelArray1 = [];
    let dataArray1 = [];
    for (let key1 in tags) {
      if (key1 === value) {
        for (let key2 in tags[key1]) {
          labelArray1.push(key2);
          dataArray1.push(tags[key1][key2]);
        }
      }
    }

    setLabelArray([...labelArray1]);
    setDataArray([...dataArray1]);
  };

  useEffect(() => {
    chart(value);
  }, [value]);

  const data = {
    labels: labelArray,
    datasets: [
      {
        label: value,
        data: dataArray,
        backgroundColor: "#17a2b8",
        borderColor: "#dc3545",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 3,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `${value} distibution`,
      },
    },
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div className="d-flex flex-column align-items-center  w-100 mt-2 p-4">
        <div>
          <label>
            <p className="mr-3">select axis</p>
          </label>
          <select
            name="data"
            value={value}
            onChange={(event) => {
              handleChange(event);
            }}
          >
            <option value="">select</option>
            <option value="language">Language</option>
            <option value="topics">Topics</option>
            <option value="license">License</option>
            <option value="stargazers_count">Stars</option>
            <option value="forks_count">Forks</option>
            <option value="watchers_count">Watchers</option>
            <option value="open_issues_count">Open Issues</option>
            <option value="has_wiki">Has Wiki</option>
          </select>
        </div>
        {value && (
          <div className="chart">
            <Bar data={data} options={options} />
          </div>
        )}
      </div>
    </>
  );
}

export default Chart;
