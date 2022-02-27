import { Component } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'New Join By Period',
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 1,
            precision: 0
          }
        }]
      }
    }
  };
  
  let labels = [''];
  
  export let data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [1,2,3],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };
  
  export function App3(line:{ seq:number, yearmonth:string, totalnewjoin:string}[]) {
    var yearmonths:string[] = [] 
    var totalnewjoin:number[] = [] 
    
    if(line != undefined && line.length > 0){
        for(var i=0;i<=line.length-1;i++){
            yearmonths.push(line[i].yearmonth);
            totalnewjoin.push(parseInt(line[i].totalnewjoin));
        }

        labels=yearmonths;
    }

    data.labels = labels;
    data.datasets = [
        {
          label: 'Employee New Join',
          data: totalnewjoin,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
      ]

    return <Line options={options} data={data} />;
  }