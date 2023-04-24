import { useState } from "react";
import "./App.css";
import { options } from "./Utiles";
import ReactOrgChart from "./Components/reactOrgChart";
import StyledTreeExample from "./Components/reactOrganizationalChart";

function App() {
  const [library, setLibrary] = useState(options[0].value);

  function handleChange(e) {
    setLibrary(e.target.value);
  }
  return (
    <div className="App">
      <select value={library} onChange={handleChange}>
        {options.map((option) => (
          <option value={option.value}>Using Library {option.label}</option>
        ))}
      </select>
      {library === "react-orgchart" && <ReactOrgChart />}
      {library === "react-organizational-chart" && <StyledTreeExample />}
    </div>
  );
}

export default App;
