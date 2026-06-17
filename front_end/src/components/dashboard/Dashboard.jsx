import { useSelector } from "react-redux";
import HeaderSection from "../HeaderSection";
import Admin from "./Admin";
import Employee from "./Employee";

const Dashboard = () =>
{
  const {user} = useSelector(state=>state.authSlice);
    return(
        <div className="main-content">
        <section className="section">
         <HeaderSection title='Dashboard'/>
          {
            user.type==='Admin' ? <Admin/> : <Employee/>
          }
        </section>
      </div>
    )
}

export default Dashboard;