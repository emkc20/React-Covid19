import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { fetchDailyData } from '../api';

export const AreaChart = ({ country }) => {
    const [dailyData, setDailyData]=useState([]);

    useEffect(() => {
        const fecthCountryDailyData =async ()=>{
                const data = await fetchDailyData(country);
                setDailyData(data);
        };
        fecthCountryDailyData();
    },[country])

    return (
        <div id="chart">
            <Chart
               options={{
                    chart: {
                        height:100,
                       minHeight: 50
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: 'smooth'
                    },
                    xaxis: {
                        type: 'datetime',
                        categories: dailyData.map((item)=>item.Date),
                    },
                    tooltip: {
                        x: {
                            format: 'dd/MM/yy',
                        },
                    },
               }}

               series={[
                   {
                       name: 'Vaka',
                       data: dailyData.map(item => item.Confirmed)
                   }, 
                   {
                       name: 'İyileşen',
                       data: dailyData.map(item => item.Recovered)
                   },
                   {
                       name: 'Ölen',
                       data: dailyData.map(item => item.Deaths)
                   }
               ]}
               style={{
                   marginTop:50,
                   minHeight: 50
                  
               }}
               height={450}


               
           />
        </div>
    )
}




