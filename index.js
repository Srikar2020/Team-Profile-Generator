const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const fs = require('fs');
const generateHTML = require('./src/generate-html.js');



// Prompt the user for the manager info
const promptManager = teamData => {
    return inquirer.prompt([
        {
          type: 'input',
          name: 'managerName',
          message: "Enter the Team Manager's Name (Required)",
          validate: nameInput => {
            if (nameInput) {
              return true;
            } else{
              console.log('Please enter your Team Manager Name!');
              return false;
            }
          }
        },
        {
          type: 'input',
          name: 'managerID',
          message: "Enter the Team manager's employee ID (Required)",
          validate: idInput => {
            if (idInput) {
              return true;
            } else{
              console.log("Please enter the team manager's employee ID!");
              return false;
            }
          }
        },
        {
            type: 'input',
            name: 'managerEmail',
            message: "Enter the team manager's email (Required)",
            validate: emailInput => {
              if (emailInput) {
                return true;
              } else{
                console.log("Please enter the team manager's email!");
                return false;
              }
            }
        },
        {
            type: 'input',
            name: 'managerOfficeNumber',
            message: "Enter the team manager's office number (Required)",
            validate: officeNumberInput => {
              if (officeNumberInput) {
                return true;
              } else{
                console.log("Please enter the team manager's office number!");
                return false;
              }
            }
        },
    ])
    .then(managerData => {
      const manager = new Manager(managerData.managerName,managerData.managerID,managerData.managerEmail,managerData.managerOfficeNumber);
      teamData.push(manager);
      
      return teamData;
    })
}

// Prompt the user for information on engineers and interns on the teams!
// Also validating while were at it. 

const promptTeam = teamData => {

console.log(`
=================
Add a New Team Member
=================
`);
  return inquirer.prompt([
    {
      type: 'list',
      name: 'role',
      message: 'Select the role type of the employee (Required)',
      choices: ['Engineer','Intern']
    },
    {
      type: 'input',
      name: 'name',
      message: "Enter the employee's name (Required)",
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else{
          console.log("Please enter your employee's name!");
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'id',
      message: "Enter the employee's ID (Required)",
      validate: idInput => {
        if (idInput) {
          return true;
        } else{
          console.log("Please enter the employee's ID!");
          return false;
        }
      }
    },
    {
        type: 'input',
        name: 'email',
        message: "Enter the employee's email (Required)",
        validate: emailInput => {
          if (emailInput) {
            return true;
          } else{
            console.log("Please enter the employee's email!");
            return false;
          }
        }
    },
    {
        type: 'input',
        name: 'github',
        message: "Enter the engineer's GitHub username (Required)",
        validate: githubInput => {
          if (githubInput) {
            return true;
          } else{
            console.log("Please enter the engineer's GitHub username!");
            return false;
          }
        },
        when: ({role}) => role == 'Engineer'
    },
    {
      type: 'input',
      name: 'school',
      message: "Enter the Intern's school (Required)",
      validate: schoolInput => {
        if (schoolInput) {
          return true;
        } else{
          console.log("Please enter the Intern's school!");
          return false;
        }
      },
      when: ({role}) => role == 'Intern'
    },
    {
      type: 'confirm',
      name: 'confirmAddEmployee',
      message: 'Would you like to enter another Employee to the Team?',
      default: false
    }
  ]).then(employeeData => {
    if(employeeData.role == 'Engineer'){
      const engineer = new Engineer(employeeData.name,employeeData.id,employeeData.email,employeeData.github);
      teamData.push(engineer);
    }
    else{
      const intern = new Intern(employeeData.name,employeeData.id,employeeData.email,employeeData.school);
      teamData.push(intern);
    }

    if (employeeData.confirmAddEmployee) {
      return promptTeam(teamData);
    } else {
      return teamData;
    }
  })
}

// Display user input into the HTML.

promptManager([])
    .then(promptTeam)
    .then(teamData => {
      const html = generateHTML(teamData);
      fs.writeFile('./dist/team.html', html, err => {
        if (err) throw new Error(err);
  
        console.log('Team Profile Page Created!')
      });
    })
    .catch(err => {
        console.log(err);
    });

