import React from 'react';
import home from '../../images/Home.png';
import "./Help.css"

export function Help(){
    return (
        <div className="help-page">
          <h1 className="page-title">How the Site Works</h1>
    
          <div className="section">
            <h2>Site Overview</h2>
            <ul>
              <li>When you open the site, it fetches all the required APIs (which may take some time).</li>
              <li>Once the APIs are fetched, a transaction table will pop up, reflecting the entire transaction DB.</li>
              <li>You can select the start and end dates, click on submit, and explore the data.</li>
              <li>The site provides various sections and functionalities:</li>
            </ul>
          </div>
    
          <div className="section">
            <h2>Labelled Home Page </h2>
            <img src={home} alt="Demo Photo 1" style={{width: '150vh', height: '100vh' , }} />

            <ol>
              <li>Set the start date and time for fetching the data.</li>
              <li>Set the end date and time for fetching the data.</li>
              <li>Click the submit button to compute the logic and render the data on the dashboard.</li>
              <li>Choose between prod or pre-prod data.</li>
              <li>A disabled button displaying the count of successful unique transactions.</li>
              <li>A disabled button displaying the count of unsuccessful unique transactions.</li>
              <li>Clicking this button displays the DB of successful transaction IDs.</li>
              <li>Clicking this button displays the DB of unsuccessful transaction IDs.</li>
              <li>An analysis of why a transaction is unsuccessful and filtering according to the reason of failure.</li>
              <li>A table displaying all the transactions in the Dynamo DB.</li>
              <li>A heading reflecting the set stage (prod or pre-prod).</li>
              <li>A button to download the currently rendered table.</li>
              <li>The count of non-unique transactions in the table.</li>
            </ol>

          </div>
    
          <div className="section">
            <h2>Reasons Table</h2>
            <ol>
              <li>Select the filter method: preset button or manual selection.</li>
              <li>On the preset button page filter, you can click a button twice to see the results.</li>
              <li>On the manual selection filter, fill in the data, and a curated DB for it will be displayed.</li>
            </ol>
          </div>
        </div>
      );
};


/*

    >>> how the site works

        >> when you open the site it will fetch all the required api's which currently takes some time due to low ram lambda
        >> once the api's fetched , a transaction table will pop up which basically reflects the entire transaction DB
        >> from here on you can go forward Select the start and end dates , click on submit and play around
        >> following stuff represent following things 
            > Succesfull txn count : number of succesfull txns , a disabled button
            > UnSuccesfull txn count : number of UnSuccesfull txns , a disabled button
            > Succesfull txn Table : A table consisting of all the succesfull txns
            > UnSuccesfull txn Table : A table consisting of all the UnSuccesfull txns
            > Reasons for UnSuccesfull : analysis of why a txn is unsuccessfull and filtering acc to reason of failure
            > All Txn : table of all the transactions in dynamo DB

    >>> Home page 

        1. you set the date and time here starting which u want to fetch the DATA
        2. you set the date and time here till which u want to fetch the DATA
        3. when u click on submit button logic is computed and data is rendered on dashboard.
        4. this is the section where u can set whther u want prod or pre-prod data , this status is highlighted at 11. as heading
        5. a disabled button , at right of it is the count of number of succesfull unique transactions
        6. a disabled button , at right of it is the count of number of unsuccesfull unique transactions
        7. on clicking this button db of successfull transaction ids is displayed
        8. on clicking this button db of unsuccessfull transaction ids is displayed
        9. An Analysis of why a txn is unsuccessfull and filtering acc to reason of failure
        10. table of all the transactions in dynamo DB
        11. heading reflecting to the stage set.
        12. a button to download the table currently being rendered
        13. count of non unique transactions in thsi table

    >>> Reasons table 

        1. here you select if you want to filter using pre-set button or manually dynamically.
        2. on pre set button page filter , you can click a button twice and the results would be showcased
        3. on maunal selection filter , you can fill the data and a DB curated for it would be displayed
        4. explanation of filters 

            >> original table : to come back to original reasons DB table
            >> Failed State : to filter the DB for a failed state example : crypto_failed . enter the failed state 
            >> Failed state , failed desc , failed state are all similiar in this respect
            >> stuck : to filter a transaction for a stuck state , in this you enter the stuck state and 
                if you enter time = 0 , it will filter out transaction which did not have any state after that state
                else it will filter the transaction whose next primary state came after the specified time.
            

    

*/