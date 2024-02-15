export function ReasonsTableMaker({db}){
    return(
        <div className="table">
        <table style={{ width: "300%", tableLayout: "fixed" }}>
          <colgroup>
            <col style={{ width: "23%" }} />
            <col style={{ width: "30%" }} />
            <col style={{ width: "30%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "25%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "47%" }} />
          </colgroup>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>States Entered</th>
              <th>States Not Entered</th>
              <th>Failure Desc</th>
              <th>Failure Code</th>
              <th>User ID</th>
              <th>Bank Transaction ID</th>
              <th>Transaction Hash</th>
            </tr>
          </thead>
          <tbody>
            {db ? (
              db.map((item, index) => (
                <tr key={index} className="td">
                  <td className="columnDesign">{item.txid}</td>
                  <td className="columnDesign">{item.statesEntered1}</td>
                  <td className="columnDesign">{item.statesNotEntered1}</td>
                  <td className="columnDesign">{item.failure_desc}</td>
                  <td className="columnDesign">{item.failure_code}</td>
                  <td className="columnDesign">{item.userId}</td>
                  <td className="columnDesign">{item.bank_transaction_id}</td>
                  <td
                    className="columnDesignw"
                    style={{
                      color: item.txn_hash.startsWith("https")
                        ? "green"
                        : "black",
                    }}
                  >
                    {item.txn_hash}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="13">No data found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
}