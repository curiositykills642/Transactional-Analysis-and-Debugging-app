import * as React from "react";
import { Dropdown, Table } from "react-bootstrap";
import "../../Table_Components/table.css";
import { convertEpochToIST } from "../../../Logic/convertEpochToIST";

function UnSuccesfullTableMakerSend(data) { // width = 100
  return (
    <table style={{ width: "220%", tableLayout: "fixed" }} > 
      <colgroup>
        <col style={{ width: "12%" }} /> 
        <col style={{ width: "6%" }} />
        <col style={{ width: "5%" }} />
        <col style={{ width: "4%" }} />
        <col style={{ width: "4%" }} />
        <col style={{ width: "4%" }} />
        <col style={{ width: "4%" }} />
        <col style={{ width: "4%" }} />
        <col style={{ width: "12%" }} />
        <col style={{ width: "12%" }} />
      </colgroup>
      <thead style={{ position : "sticky" , top:"0" }}>
        <tr>
          <th>Transaction ID</th>
          <th>Status</th>
          <th>Created At</th>
          <th>Network</th>
          <th>Fiat Amount</th>
          <th>Fiat Symbol</th>
          <th>Crypto Amount</th>
          <th>Crypto Symbol</th>
          <th>Reciever</th>
          <th>Sender</th>
        </tr>
      </thead>
      <tbody>
        {data ? (
          data.map((item, index) => (
            <tr key={index} className="td">
              <td className="columnDesign break">{item.txnId}</td>
              <td className="columnDesign">{item.status}</td>
              <td className="columnDesign">{convertEpochToIST(item.createdAt)}</td>
              <td className="columnDesign">{item.network}</td>
              <td className="columnDesign">{Number(item.usdValue)?.toFixed(3)}</td>
              <td className="columnDesign">{"USD"}</td>
              <td className="columnDesign">{item.amount}</td>
              <td className="columnDesign">{item.cryptoSymbol}</td>
              <td className="columnDesign">{item.receiver}</td>
              <td className="columnDesign">{item.sender}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="13">No data found.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default UnSuccesfullTableMakerSend;
