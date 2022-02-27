import { Component } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Head count By Department',
    },
  },
};


// export let testData = {
// }

let dataCount: number[] = [];
let bgColor: string[] = ['rgba(255, 99, 132, 0.2)',
'rgba(54, 162, 235, 0.2)',
'rgba(255, 206, 86, 0.2)',
'rgb(0,128,0,0.2)'
];
let bdrColor: string[] = ['rgba(255, 99, 132, 1)',
'rgba(54, 162, 235, 1)',
'rgba(255, 206, 86, 1)',
'rgb(0,128,0,1)'
];

export let data = {
  labels: ['a'],
  datasets: [
    {
      label: '# of Votes',
      data: dataCount,
      backgroundColor: bgColor,
      borderColor: bdrColor,
      borderWidth: 1,
    },
  ],
};

export function App(employees:{ employeecode: string, employeename: string, departmentcode: string,
    joindate: Date, salary: number
  }[]) {
    
    var departments:string[] = [] 

    if(employees != undefined && employees.length > 0){
        for(var i=0;i<=employees.length-1;i++){
            if(!departments.includes(employees[i].departmentcode)){
                departments.push(employees[i].departmentcode);
            }
        }
    }

    var departmentCounts:number[] = []

    if(departments != undefined && departments.length > 0){
        for(var i=0;i<=departments.length-1;i++){
            var count = employees.filter(x => x.departmentcode == departments[i]).length;

            departmentCounts.push(count);
        }
    }

    data.labels = departments;
    data.datasets = [
        {
          label: '# of Votes',
          data: departmentCounts,
          backgroundColor: bgColor,
          borderColor: bdrColor,
          borderWidth: 1,
        },
      ]
    // testData = {
    //     labels: departments,
    //     datasets: [
    //         {
    //           label: '# of Votes',
    //           data: departmentCounts,
    //           backgroundColor: [
    //             'rgba(255, 99, 132, 0.2)',
    //             'rgba(54, 162, 235, 0.2)',
    //             'rgba(255, 206, 86, 0.2)'
    //           ],
    //           borderColor: [
    //             'rgba(255, 99, 132, 1)',
    //             'rgba(54, 162, 235, 1)',
    //             'rgba(255, 206, 86, 1)'
    //           ],
    //           borderWidth: 1,
    //         },
    //       ]
    // };

    console.log(data,'data');
    console.log(Math.floor(Math.random() * 10));
    
  return <Pie options={options} data={data} />;
}