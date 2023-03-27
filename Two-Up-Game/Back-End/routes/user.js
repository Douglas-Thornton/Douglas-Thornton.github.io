const express = require('express');
const router = express.Router();
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const con = mysql.createConnection({
  host: "localhost",
  user: "two-up-game-service-account",
  password: "password",
  database: "two-up-game"
});

/* 
Register new account.
  Validates user's email.
  Tries to find existing users with the same username;
  If a username is found rejects registration.
  md5 hashes password to prevent database data being human readable.
  If successfull send success as a response.
*/
router.post('/register', async function (req, res, next) {
  try {
    let { username, email, password } = req.body; 
   
    if(validateEmail(email))
    {
      const hashed_password = md5(password.toString())
      const checkUsername = `Select username FROM users WHERE username = ?`;
      console.log("regi")
      con.query(checkUsername, [username], (err, result, fields) => 
      {
        console.log(result.length);
          if(!result.length)
          {
            const sql = `Insert Into users (username, email, password) VALUES ( ?, ?, ? )`
            con.query
            (
              sql, [username, email, hashed_password],
              (err, result, fields) =>
              {
                if(err)
                {
                  res.send({ status: 0, data: err });
                }
                else
                {
                  let token = jwt.sign({ data: result }, 'secret')
                  res.send({ status: 1, data: result, token : token });
                }
              }
            )
          }
      else
      {
        console.log("Username in use");
        res.send({ status: 0, data:  "Username in use"});
      }
    });
    }
    else
    {
			res.send({ status: 0, data:  "invalid email"});
    }
  } catch (error) {
    res.send({ status: 0, error: error });
  }
});

/*
Login from nav bar.
Tries to find a user where username and password match input.
Hashes password to match what is in the database.
If a user was found send the result as a response.
*/
router.post('/app', async function (req, res, next) {
  try {
    let { username, password } = req.body; 
    console.log("Login post: " + username +" "+ password)
    const hashed_password = md5(password.toString())
    const sql = `SELECT username, score, favColorHex FROM users WHERE username = ? AND password = ?`
    con.query(
      sql, [username, hashed_password],
    function(err, result, fields){
      if(err){
        res.send({ status: 0, data: "Login failed" });
      }else{
        if(result.length != 0)
        {
          let token = jwt.sign({ data: result }, 'secret')
          res.send({ status: 1, data: result, token: token });
        }
        else{
          res.send({ status: 0, data: "Login failed" });
        }
      }
     
    })
  } catch (error) {
    res.send({ status: 0, error: error });
  }
});

/*
Login from login page.
Tries to find a user where username and password match input.
Hashes password to match what is in the database.
If a user was found send the result as a response.
*/
router.post('/login', async function (req, res, next) {
  try {
    let { username, password } = req.body; 
    console.log("Login post: " + username +" "+ password)
    const hashed_password = md5(password.toString())
    const sql = `SELECT username, score, favColorHex FROM users WHERE username = ? AND password = ?`
    con.query(
      sql, [username, hashed_password],
    function(err, result, fields){
      if(err){
        res.send({ status: 0, data: "Login failed" });
      }else{
        if(result.length != 0)
        {
          let token = jwt.sign({ data: result }, 'secret')
          res.send({ status: 1, data: result, token: token });
        }
        else{
          res.send({ status: 0, data: "Login failed" });
        }
      }
     
    })
  } catch (error) {
    res.send({ status: 0, error: error });
  }
});

/*
Updates a user's data
including score and favoriteColourHex.
If successfull respond with success.
*/
router.post('/gui', async function (req, res, next) {
  try 
  {
    console.log(req.body);
    let { username, score, favColourHex} = req.body;
    console.log(username);
    console.log(score);
    console.log(favColourHex);
    const sqlUpdate = `UPDATE users SET score = ?, favColourHex = ? where username = ?;`
    con.query(
      sqlUpdate, [score, favColourHex, username],
    function(err, result, fields){
      if(err){
        res.send({ status: 0, data: err });
      }
    })
    const sqlGet = `SELECT * FROM users WHERE username = ?`
    con.query(
      sqlGet, [username],
    function(err, result, fields){
      if(err){
        res.send({ status: 0, data: err });
      }else{
        let token = jwt.sign({ data: result }, 'secret')
        res.send({ status: 1, data: result, token: token });
      }  
    })  
  } 
  catch (error) 
  {
    res.send({ status: 0, error: error });
  }
});
  
/*
Get username, score and favorite colour of the top 10 users (ordered by score) from the database.
Responds with the top 10 users.
*/
router.post('/leaderboard', async function (req, res, next) {
  try 
  {
    const sqlLeaderboardGet = `select username, score, favColorHex from users order by score desc limit 10;`
    con.query(
      sqlLeaderboardGet,
    function(err, result, fields){
      if(err){
        res.send({ status: 0, data: err });
      }
      else{
        let token = jwt.sign({ data: result }, 'secret')
        res.send({ status: 1, data: result, token: token });
      }  
    })
  } 
  catch (error) 
  {
    res.send({ status: 0, error: error });
  }
});

/*
Get username, score and favorite colour of the top user (ordered by score) from the database.
Responds with the top user.
*/
router.post('/home', async function (req, res, next) {
  try 
  {
    const sqlLeaderboardGet = `select username, score, favColorHex from users order by score desc limit 1;`
    con.query(
      sqlLeaderboardGet,
    function(err, result, fields){
      if(err){
        res.send({ status: 0, data: err });
      }
      else{
        let token = jwt.sign({ data: result }, 'secret')
        res.send({ status: 1, data: result, token: token });
      }  
    })
  } 
  catch (error) 
  {
    res.send({ status: 0, error: error });
  }
});

module.exports = router;

/* 
Validates a users email address when registering an account.
*/
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};