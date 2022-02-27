import { Component } from "react";
import EmployeeService from "../services/employee.service";
import {App} from '../components/chart.component';
import {App2} from '../components/bar.component';
import {App3} from '../components/line.component';

type Props = {
    
};
type State = {
    content: string,
    employees: { employeecode: string, employeename: string, departmentcode: string,
      joindate: Date, salary: number
    }[],
    bar: { departmentcode: string, totalsalary: number }[],
    line: { seq:number, yearmonth:string, totalnewjoin:string}[],
    dateFrom: string,
    dateTo: string,
    department: string
};

  export default class DAEmployee extends Component<Props, State> {
  
  constructor(props: Props) {
    super(props);
    this.state = {
        content: '',
        employees: [],
        bar:[],
        line:[],
        dateFrom: '',
        dateTo: '',
        department: ''
      };

      this.search = this.search.bind(this);
      this.onDateFromChange = this.onDateFromChange.bind(this);
      this.onDateToChange = this.onDateToChange.bind(this);
      this.onDepartmentChange = this.onDepartmentChange.bind(this);
  }

  onDateFromChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    this.setState({
      dateFrom: newValue
    });
  }

  onDateToChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    this.setState({
      dateTo: newValue
    });
  }

  onDepartmentChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    this.setState({
      department: newValue
    });
  }

  componentDidMount() {
    
    EmployeeService.getEmployee({joindatefrom: this.state.dateFrom, joindateto: this.state.dateTo,
      departmentcode: this.state.department
    }).then(
      response => {
          
        this.setState({
          employees: response.data,
            content: 'success'
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
    EmployeeService.getEmployeeSalaryDepartment({joindatefrom: this.state.dateFrom, joindateto: this.state.dateTo,
      departmentcode: this.state.department
    }).then(
      response => {
        
        this.setState({
          bar: response.data,
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );

    EmployeeService.getEmployeeCount({joindatefrom: this.state.dateFrom, joindateto: this.state.dateTo,
      departmentcode: this.state.department
    }).then(
      response => {
          
        this.setState({
          line: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    const tableStyle = {
        width: '100%',
        border: 'solid 0.1px'
    };

    const headerStyle = {
        border: 'solid 0.1px',
        fontWeight:'bold'
    }

    const tdStyle = {
        border: 'solid 0.1px'
    }

    const pieStyle = {
      width: '90%'
    }

    const barStyle = {
      height: '80%'
    }

    return (
      <div className="container">
        <div className='row' style={{padding: 10, border: 'solid'}}>
          <div className='col-md-3'>
            Department
            <br />
            <input
              type="text" name='Department' id='Department' onChange={this.onDepartmentChange}
              value={this.state.department}
            />
          </div>
          <div className='col-md-3'>
            Date From
            <br />
            <input
              type="text" name='DateFrom' id='DateFrom' onChange={this.onDateFromChange}
              value={this.state.dateFrom}
            />
          </div>
          <div className='col-md-3'>
            Date To
            <br />
            <input
                type="text" name='DateTo' id='DateTo' onChange={this.onDateToChange}
                value={this.state.dateTo}
              />
          </div>
          <div className='col-md-1'>
            <br />
            <button onClick={this.search}>Apply</button>
          </div>
        </div>
        <div className='row'>
            <div className='col-md-3'>
            <div style={pieStyle}>
              {App(this.state.employees)}
            </div>
            </div>
            <div className='col-md-4'>
            <div style={barStyle}>
              {App2(this.state.bar)}
            </div>
            </div>
            <div className='col-md-4'>
            <div>
              {App3(this.state.line)}
            </div>
            </div>
        </div>
        <div style={{marginTop: 20,marginBottom:50}}>
          <table style={tableStyle}>
          <tr><td style={headerStyle}>Emp Code</td><td style={headerStyle}>Emp Name</td><td style={headerStyle}>Department</td><td style={headerStyle}>Joined Date</td><td style={headerStyle}>Salary</td></tr>
          {this.state.employees.map(column => <tr><td style={tdStyle}>{column.employeecode}</td><td style={tdStyle}>{column.employeename}</td><td style={tdStyle}>{column.departmentcode}</td><td style={tdStyle}>{column.joindate}</td><td style={tdStyle}>{column.salary}</td></tr>)}
          </table>
        </div>
      </div>
    );

  }

  search() {
    this.componentDidMount();
    this.render();
  }
}