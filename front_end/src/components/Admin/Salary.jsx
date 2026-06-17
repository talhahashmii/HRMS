import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getEmployee, updateSalary, viewAllSalaries } from '../../http';
import Loading from '../Loading';
import HeaderSection from "../../components/HeaderSection";

const SalaryView = () => {
    const {id} = useParams();
    const [salary, setSalary] = useState();
    const [employee, setEmployee] = useState();
    const initialState = {salary:'', bonus:'', reasonForBonus:''}
    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        const fetchData = async () => {
            const obj = {
                "_id": id
            }
            const res = await viewAllSalaries(obj);
            const empRes = await getEmployee(res.data[0].employeeID);
            if(empRes.success) setEmployee(empRes.data);
            setSalary(res.data[0]);
        }
        fetchData();
    }, []);

    const inputEvent = (e) => {
        const {name, value} = e.target;
        setFormData((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const {salary, bonus, reasonForBonus} = formData;
        if (!salary || !bonus || !reasonForBonus) {
            alert('All fields are required');
            return;
        }

        const d = new Date();
        formData["employeeID"] = employee.id;

        // Custom logging: You can implement a logging function here
        log(formData);

        const res = await updateSalary(formData);
        const { success } = res;

        if(success) {
            alert("Salary Updated!");  
        }    

        setFormData(initialState);
    }

    // Custom logging function
    const log = (message) => {
        // You can replace this with a more advanced logging solution if needed
        console.debug("Custom Log: ", message);
    }

    return (
        <>
        {
            employee ? (
                <div className="main-content">
                    <section className="section">
                        <div className="card">
                            <div className="card-header d-flex justify-content-between">
                                <h4>Updated Salary from {salary?.assignedDate}</h4>
                            </div>
                        </div>

                        <div className="col-md-9">
                            <table className='table'>
                                <tbody>
                                    <tr>
                                        <th>Name</th>
                                        <td>{employee?.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <td>{employee?.email}</td>
                                    </tr>
                                    <tr>
                                        <th>Username</th>
                                        <td>{employee?.username}</td>
                                    </tr>
                                    <tr>
                                        <th>Mobile Number</th>
                                        <td>{employee?.mobile}</td>
                                    </tr>
                                    <tr>
                                        <th>Salary</th>
                                        <td>{salary?.salary}</td>
                                    </tr>
                                    <tr>
                                        <th>Bonus</th>
                                        <td>{salary?.bonus}</td>
                                    </tr>
                                    <tr>
                                        <th>Reason</th>
                                        <td>{salary?.reasonForBonus}</td>
                                    </tr>
                                    <tr>
                                        <th>Last Updated</th>
                                        <td>{salary?.assignedDate}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className="section">
                        <HeaderSection title='Update Salary'/>
                        <div className="card">
                            <div className="card-body pr-5 pl-5 m-1">
                                <form className='row' onSubmit={onSubmit} id='addUserForm'>
                                    <div className="form-group col-md-6">
                                        <label>Enter Salary</label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">
                                                    <i className="fas fa-pen"></i>
                                                </div>
                                            </div>
                                            <input onChange={inputEvent} value={formData.salary} type="number" id='salary' name='salary' className="form-control"/>
                                        </div>
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label>Enter Bonus</label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">
                                                    <i className="fas fa-pen"></i>
                                                </div>
                                            </div>
                                            <input onChange={inputEvent} value={formData.bonus} type="number" id='bonus' name='bonus' className="form-control"/>
                                        </div>
                                    </div>

                                    <div className="form-group col-md-12">
                                        <label>Enter Reason</label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">
                                                    <i className="fas fa-book"></i>
                                                </div>
                                            </div>
                                            <input onChange={inputEvent} value={formData.reasonForBonus} type="text" id='reasonForBonus' name='reasonForBonus' className="form-control"/>
                                        </div>
                                    </div>

                                    <div className="form-group text-center col-md-12">
                                        <button className='btn btn-primary btn-lg' type='submit' style={{width:'30vh'}}>Update Salary</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                </div>
            ) : <Loading />
        }
        </>
    )
}

export default SalaryView;
