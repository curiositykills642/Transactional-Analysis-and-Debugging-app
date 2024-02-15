import "./Dashboard.css";
import { Pie } from 'react-chartjs-2';
import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import {Chart as ChartJs, Tooltip, Title, ArcElement, Legend} from 'chart.js';
import { Txn_Time_Chart_Maker } from "./Txn_Time_Chart_Maker";
import { Error_distribution_Chart_maker } from "./Error_distribution_Chart_maker";

ChartJs.register(
    Tooltip, Title, ArcElement, Legend
);

export function DashboardLocal({txnDB }){

  // timesArray = [period of stick , start epooch , end epooch]
      
  return(
     <>
        <div className="local">

          <div className="localLeft">
            <div style={{ paddingLeft : "5vh" , width : "100%"}}>
              <Error_distribution_Chart_maker txnDB={txnDB} />
            </div>
          </div>

          <div className="localRight">
            <div className="lineChartHeading">
              <h5>Successfull Transactions VS Time Chart</h5>
            </div>
            <div className="lineChart1">
              <h6 style={{textAlign : "right" , paddingRight : "4px" , paddingTop : "4px"}}>No.of txns</h6>
              <Txn_Time_Chart_Maker txnDB = {txnDB} />
              <h6 style={{textAlign : "center"}}>---- Time ----></h6>
            </div>
          </div>
        </div>
      </>
    )
}