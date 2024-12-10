const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { signup, login, updateVoterInfo, verifyVoter } = require('./controllers/voterProfileController');
const authMiddleware = require('./middleware/authMiddleware');
const db = require('./config/db');
const {sendEmail}=require("./utils/sendEmail");
const {authSuperAdmin} = require('./middleware/authSuperAdmin');
const { getElectionDetails,getCandidateDetails, castVote } = require('./controllers/voterElectionController');
const { initiateElection,updateElection,deleteElection, addCandidateToElection,
    removeCandidateFromElection,assignAdminToElection,
    deassignAdminFromElection, generateElectionReports  } = require('./controllers/superAdminElectionController');
const {createAdmin,deleteAdmin,updateAdmin} = require('./controllers/superAdminAdminController');
const app = express();
const { Superlogin } = require('./controllers/superAdminProfileController');


db.connect();

app.use(cors());
app.use(bodyParser.json());

// Root Route
app.get('/', (req, res) => {
    res.send('Welcome to the Express and MongoDB Application!');
});

//sendEmail("m.talhant666@gmail.com","I just wanted to say HI!", "Greate bro jhakas");

//Voter login, sign and update profile[]
app.post('/voter/signup', signup);
app.post('/voter/login', login);
app.put('/voter/update', authMiddleware, updateVoterInfo);
app.post('/voter/verify',authMiddleware, verifyVoter);

//Voter Election Routes
app.get('/voter/election-details', authMiddleware, getElectionDetails);
app.post('/voter/candidiate-details', authMiddleware,getCandidateDetails);
app.post('/voter/cast-vote', authMiddleware, castVote);


app.post('/voter/cast-vote', authMiddleware, castVote);

//Super admin Pannel]
app.post('/superAdmin/login', Superlogin);

app.post('/superAdmin/elections/initiate',authSuperAdmin, initiateElection);
app.put('/superAdmin/elections/update',authSuperAdmin, updateElection);
app.delete('/superAdmin/elections/delete',authSuperAdmin, deleteElection);
app.post('/superAdmin/elections/add-candidiate',authSuperAdmin, addCandidateToElection);
app.post('/superAdmin/elections/remove-candidiate',authSuperAdmin, removeCandidateFromElection);
app.post('/superAdmin/elections/assign-admin',authSuperAdmin, assignAdminToElection);
app.post('/superAdmin/elections/deassign-admin',authSuperAdmin, deassignAdminFromElection);
app.get('/superAdmin/elections/election-detail',authSuperAdmin, getElectionDetails);
//Admin Controllers
app.post('/superAdmin/admins/create',authSuperAdmin, createAdmin);
app.put('/superAdmin/admins/update',authSuperAdmin, updateAdmin);
app.delete('/superAdmin/admins/delete',authSuperAdmin, deleteAdmin);
module.exports = app;
