import { useState } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { resetPassword } from "../../../http/index";

const ResetPassword = () => {
    const { email } = useSelector((state) => state.authSlice);
    const [formData, setFormData] = useState({ email, otp: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const history = useHistory();

    const inputEvent = (e) => {
        const { name, value } = e.target;
        setFormData((old) => ({ ...old, [name]: value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const { email, otp, password } = formData;
        if (!email || !otp || !password) {
            setErrorMessage("All fields are required");
            return;
        }
        setErrorMessage(""); 
        setSuccessMessage(""); 

        const res = await resetPassword({ email, otp, password });
        if (res.success) {
            setSuccessMessage(res.message);
            setTimeout(() => history.push("/login"), 2000);
        } else {
            setErrorMessage(res.message);
        }
    };

    return (
        <div id="app">
            <section className="section">
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                            <div className="login-brand">
                                <img src="https://www.pockethrms.com/wp-content/uploads/2022/01/Happy-Workforce.jpg" alt="logo" width="200" />
                            </div>
                            <div className="card card-primary">
                                <div className="card-header"><h4>Reset Password</h4></div>
                                <div className="card-body">
                                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                                    <p className="text-muted">We have sent you an OTP to reset your password</p>
                                    <form onSubmit={onSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input id="email" value={formData.email} type="email" className="form-control" name="email" readOnly />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="otp">OTP</label>
                                            <input id="otp" onChange={inputEvent} value={formData.otp} type="number" className="form-control" name="otp" required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">New Password</label>
                                            <input id="password" onChange={inputEvent} value={formData.password} type="password" className="form-control" name="password" required />
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary btn-lg btn-block">Reset Password</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ResetPassword;
