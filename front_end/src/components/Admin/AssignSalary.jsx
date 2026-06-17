import { useEffect, useState } from "react";
import HeaderSection from "../../components/HeaderSection";
import { assignSalary, getEmployees } from "../../http";
import "react-datepicker/dist/react-datepicker.css";

const AssignSalary = () => {
  const initialState = { salary: "", bonus: "", reasonForBonus: "" };
  const [formData, setFormData] = useState(initialState);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const emps = await getEmployees();
        setEmployees([...emps.data]);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  const inputEvent = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { salary, bonus, reasonForBonus } = formData;
    
    if (!salary || !bonus || !reasonForBonus) {
      alert("All fields are required!");
      return;
    }

    if (!selectedEmployee) {
      alert("Please select an employee.");
      return;
    }

    const payload = { ...formData, employeeID: selectedEmployee };

    try {
      const res = await assignSalary(payload);
      console.log(res);

      if (res.success) {
        alert("Salary Assigned Successfully!");
        setFormData(initialState);
      } else {
        alert("Failed to assign salary. Please try again.");
      }
    } catch (error) {
      console.error("Error assigning salary:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="main-content">
      <section className="section">
        <HeaderSection title="Salary" />
        <div className="card">
          <div className="card-body pr-5 pl-5 m-1">
            <form className="row" onSubmit={onSubmit} id="addUserForm">
              <div className="form-group col-md-4">
                <label>Employees</label>
                <select
                  className="form-control select2"
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                >
                  <option value="">Select Employee</option>
                  {employees?.map((employee) => (
                    <option key={employee._id} value={employee.id}>
                      {employee.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group col-md-4">
                <label>Enter Salary</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i className="fas fa-pen"></i>
                    </div>
                  </div>
                  <input
                    onChange={inputEvent}
                    value={formData.salary}
                    type="number"
                    id="salary"
                    name="salary"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-group col-md-4">
                <label>Enter Bonus</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i className="fas fa-pen"></i>
                    </div>
                  </div>
                  <input
                    onChange={inputEvent}
                    value={formData.bonus}
                    type="number"
                    id="bonus"
                    name="bonus"
                    className="form-control"
                  />
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
                  <input
                    onChange={inputEvent}
                    value={formData.reasonForBonus}
                    type="text"
                    id="reasonForBonus"
                    name="reasonForBonus"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-group text-center col-md-12">
                <button
                  className="btn btn-primary btn-lg"
                  type="submit"
                  style={{ width: "30vh" }}
                >
                  Assign Salary
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AssignSalary;
