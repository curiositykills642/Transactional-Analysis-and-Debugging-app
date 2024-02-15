import { crypto_init_epooch_array_creator } from '../../Logic/Crypto_init_epooch_array_creator';
import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

function ChartMaker({data}){
	const chartContainerRef = useRef();

    useEffect( () => {
        const handleResize = () => {
            chart.applyOptions({ width: chartContainerRef.current.clientWidth });
        };

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: '#fff2e5' },
                textColor : 'black',
            },
            width: chartContainerRef.current.clientWidth,
            height: 350,
        });

        chart.timeScale().fitContent();

        const newSeries = chart.addAreaSeries(
            { 
                lineColor : '#2962FF', 
                topColor: "#2962FF", 
                bottomColor: 'rgba(41, 98, 255, 0.28)' 
            }
        );
            if(data)
			    newSeries.setData(data);

			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);

				chart.remove();
			};
        },[data]
    );

    return (
		<div
			ref={chartContainerRef}
		/>
	);
};


export function Txn_Time_Chart_Maker(txnDB ) {
    let chartDB = crypto_init_epooch_array_creator(txnDB);

    return <ChartMaker data={chartDB}/>

}
