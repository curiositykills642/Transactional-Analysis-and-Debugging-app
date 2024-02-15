import { Pie } from 'react-chartjs-2';
import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import {Chart as ChartJs, Tooltip, Title, ArcElement, Legend} from 'chart.js';
import { wrongStateDistribution } from "../../Logic/wrongStateDistribution";
import { successfullTxns } from "../../Logic/succesfullTxns";

export function Error_distribution_Chart_maker({ txnDB }) {

  // curating the data for error distribution pie chart
  
  let errData = wrongStateDistribution(txnDB);
  errData["Successfull Txns"] = successfullTxns(txnDB);

  const keys = Object.keys(errData);
  const values = Object.values(errData);

  const data = {
    labels: keys,
    datasets: [
      {
        data: values,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#8FBC8F',
          '#BA55D3',
          '#FF8C00',
          '#ADFF2F',
          '#FF1493',
          '#00FFFF',
          '#FFA500',
          '#7FFFD4',
          '#FF4500',
          '#EE82EE',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Chart.js Pie Chart',
        font: {
          size: 18,
          weight: 'bold',
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
}
