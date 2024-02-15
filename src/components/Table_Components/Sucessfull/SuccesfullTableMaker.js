import * as React from "react";
import { Dropdown, Table } from "react-bootstrap";
import "../../Table_Components/table.css";
import { convertEpochToIST } from "../../../Logic/convertEpochToIST";

export function SuccesfullTableMaker(data) { // width = 100
  return (
    <table style={{ width: "450%", tableLayout: "fixed" }} > 
      <colgroup>
        <col style={{ width: "20%" }} /> 
        <col style={{ width: "10%" }} />
        <col style={{ width: "10%" }} />
        <col style={{ width: "7%" }} />
        <col style={{ width: "7%" }} />
        <col style={{ width: "25%" }} />
        <col style={{ width: "5%" }} />
        <col style={{ width: "6%" }} />
        <col style={{ width: "6%" }} />
        <col style={{ width: "6%" }} />
        <col style={{ width: "20%" }} />
        <col style={{ width: "7%" }} />
        <col style={{ width: "8%" }} />
        <col style={{ width: "8%" }} />
        <col style={{ width: "33%" }} />
        <col style={{ width: "12%" }} />
        <col style={{ width: "20%" }} />
        <col style={{ width: "13%" }} />
        <col style={{ width: "20%" }} />
        <col style={{ width: "10%" }} />
    </colgroup>
      <thead style={{ position : "sticky" , top:"0" }}>
        <tr>
          <th>Transaction ID</th>
          <th>Status</th>
          <th>Created At</th>
          <th>Elapsed Time (HRS)</th>
          <th>Total Elapsed Time (HRS)</th>
          <th>Address</th>
          <th>Exchange Rate</th>
          <th>Network</th>
          <th>Fiat Amount</th>
          <th>Fiat Symbol</th>
          <th>User ID</th>
          <th>Crypto Amount</th>
          <th>Crypto Symbol</th>
          <th>Transaction Type</th>
          <th>Transaction Hash</th>
          <th>Failure Code</th>
          <th>Bank Transaction Id</th>
          <th>Failure Desc</th>
          <th>Source Id</th>
          <th>Account No.</th>
        </tr>
      </thead>
      <tbody>
        {data ? (
          data.map((item, index) => (
            <tr key={index} className="td">
              <td className="columnDesign break">{item.txId}</td>
              <td className="columnDesign">{item.status}</td>
              <td className="columnDesign">{convertEpochToIST(item.createdAt)}</td>
              <td className="columnDesign">{item.elapsed_Time}</td>
              <td className="columnDesign">{item.Total_elapsed_Time}</td>
              <td className="columnDesign">{item.address}</td>
              <td className="columnDesign">{item.exchange_rate}</td>
              <td className="columnDesign">{item.network}</td>
              <td className="columnDesign">{Number(item.fiat_amount)?.toFixed(3)}</td>
              <td className="columnDesign">{item.fiat_symbol}</td>
              <td className="columnDesign">{item.userId}</td>
              <td className="columnDesign">{item.crypto_amount}</td>
              <td className="columnDesign">{item.crypto_symbol}</td>
              <td className="columnDesign">{item.transaction_type}</td>
              <td className="columnDesign">{item.txn_hash}</td>
              <td className="columnDesign">{item.failure_code}</td>
              <td className="columnDesign">{item.bank_transaction_id}</td>
              <td className="columnDesign">{item.failure_desc}</td>
              <td className="columnDesign">{item.source_id}</td>
              <td className="columnDesign">{item.account_no}</td>
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

