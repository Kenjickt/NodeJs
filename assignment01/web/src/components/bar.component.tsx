import { Component } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
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
        text: 'Salary By Department',
      },
    },
  };
  
  let labels = ['default'];
  
  export let data = {
    labels,
    datasets: [
      {
        label: 'default',
        data: [0],
        backgroundColor: [
        'rgba(54, 162, 235, 1)'
        ]
      }
    ],
  };
  
  export function App2(bar:{ departmentcode: string, totalsalary: number }[]) {
    var departments:string[] = [] 
    var salary:number[] = [] 
    debugger;
    if(bar != undefined && bar.length > 0){
        for(var i=0;i<=bar.length-1;i++){
            departments.push(bar[i].departmentcode);
            salary.push(bar[i].totalsalary);
        }

        labels=departments;
    }

    data.labels = labels;
    data.datasets = [
        {
          label: 'Salary',
          data: salary,
          backgroundColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 51, 0, 1)',
          'rgba(255, 214, 51, 1)',
          'rgba(51, 204, 51, 1)'
          ]
        }
      ]

    return <Bar options={options} data={data} />;
  }

