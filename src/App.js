import "./styles.css";
import {
  vehicleValueCat,
  vehicleSymbols,
  baseRate,
  clf,
  vehicleMonitoring,
  loading,
  driverClass
} from "../rating_logic/data";
import { farooq } from "../rating_logic/rating";
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <p>{vehicleValueCat["0-5000"]["CAT"]}</p>
      <p>{vehicleSymbols["Honda-ACCORD 4D"]["PD"]}</p>
      <p>{baseRate["BI"]["Base rate"]}</p>
      <p>{clf[14]}</p>
      <p>{vehicleMonitoring}</p>
      <p>{loading["Toyota	Haice"]}</p>
      <p>{driverClass["22-Male-Single"]["Collision"]}</p>

      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
