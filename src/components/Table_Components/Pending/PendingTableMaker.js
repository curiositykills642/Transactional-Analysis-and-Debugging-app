import { useEffect, useState } from "react"

export function PendingTableMaker({db}){

     return(
        <div className="table">
          <table style={{ width: "230%", tableLayout: "fixed" }}>
            <colgroup>
              <col style={{ width: "25%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "12%" }} />
              <col style={{ width: "25%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "47%" }} />
            </colgroup>
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>States Entered</th>
                <th>States Not Entered</th>
                <th>Elapsed Time ( In HRS )</th>
                <th>User ID</th>
                <th>Bank Transaction ID</th>
                <th>Transaction Hash</th>
              </tr>
            </thead>
            <tbody>
              {db.length !==0 ? (
                db.map((item, index) => (
                  <tr key={index} className="td">
                    <td className="columnDesign">{item.txid}</td>
                    <td className="columnDesign">{item.statesEntered1}</td>
                    <td className="columnDesign">{item.statesNotEntered1}</td>
                    <td className="columnDesign">{item.elapsed_Time}</td>
                    <td className="columnDesign">{item.userId}</td>
                    <td className="columnDesign">{item.bank_transaction_id}</td>
                    <td className="columnDesign" >{item.txn_hash}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} style={{padding:"18px"}}>No data found. Either there Were no pending trasactions or all the pending transactions are CI stuck.</td>
                </tr>
              )}
            </tbody>
          </table>
      </div>
    )
}