const teamService = require('../services/team-service');
const userService = require('../services/user-service');


class TeamController {

    getCounts = async (req,res,next) =>
    {
        const admin = await userService.findCount({type:'admin'});
        const employee = await userService.findCount({type:'employee'});
        const data = {
            admin,
            employee
        }
        res.json({success:true,message:'Counts Found',data})
    }

}

module.exports = new TeamController();