const TeamModel = require('../models/team-model');

class TeamService{

    findCount = async filter => await TeamModel.find(filter).countDocuments();
    

}

module.exports = new TeamService();