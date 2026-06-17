import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { viewEmployeeSalary } from '../../http';
import Loading from '../Loading';

const Salary = () => {
  const { user } = useSelector(state => state.authSlice);
  const [salary, setSalary] = useState();

  useEffect(() => {
    const obj = { "employeeID": user.id };
    
    const fetchData = async () => {
      const res = await viewEmployeeSalary(obj);
      const { data } = res;
      
      if (data.length > 0) {
        setSalary(res.data[0]);
      } else {
        alert(`${user.name}'s Salary not found`);
      }
    };
    
    fetchData();
  }, []);

  return (
    <>
      {
        salary ? (
          <div className="main-content">
            <section className="section">
              <div className="card">
                <div className="card-header d-flex justify-content-between">
                  <h4>Updated Salary from {salary?.assignedDate || "N/A"}</h4>
                </div>
              </div>

              <div className="card">
                <div className="card-body row">
                  <div className="col-md-3">
                    <img className='img-fluid img-thumbnail' src={user.image} alt="Employee" />
                  </div>
                  <div className="col-md-9">
                    <table className='table'>
                      <tbody>
                        <tr>
                          <th>Name</th>
                          <td>{user.name}</td>
                        </tr>
                        <tr>
                          <th>Email</th>
                          <td>{user.email}</td>
                        </tr>
                        <tr>
                          <th>Mobile</th>
                          <td>{user.mobile}</td>
                        </tr>
                        <tr>
                          <th>Address</th>
                          <td>{user.address}</td>
                        </tr>
                        <tr>
                          <th>Salary</th>
                          <td>Rs. {salary?.salary || "N/A"}</td>
                        </tr>
                        <tr>
                          <th>Bonus</th>
                          <td>Rs. {salary?.bonus || "N/A"}</td>
                        </tr>
                        <tr>
                          <th>Reason for Bonus</th>
                          <td>{salary?.reasonForBonus || "N/A"}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : <Loading />
      }
    </>
  );
};

export default Salary;
