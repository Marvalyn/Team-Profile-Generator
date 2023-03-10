const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const team = [];
// TODO: Write Code to gather information about the development team members, and render the HTML file.
// function to prompt for manager info
function addManager() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "To get started please enter a Manager\'s name.",
            validate: managerNameInput => {
                if (managerNameInput) {
                    return true;
                } else {
                    console.log('Please enter a name');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: "Manager ID number",
            validate: managerIdInput => {
                if (!isNaN(parseInt(managerIdInput))) {
                    return true;
                } else {
                    console.log('Please enter a number');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "Manager email address",
                validate: managerEmailInput => {
                const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                if (managerEmailInput.match(validRegex)) {
                    return true;
                } else {
                    console.log('Please enter an email');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "Manager office number",
            validate: managerOfficeInput => {
                if (!isNaN(parseInt(managerOfficeInput))) {
                    return true;
                } else {
                    console.log('Please enter a number');
                    return false;
                }
            }
        }
    ]).then(response => {
        team.push(new Manager(response.name, response.id, response.email, response.officeNumber));
        addNextEmployee();
    })
}

function addNextEmployee() {
    inquirer.prompt([{
        //choose employee type to add
        type: 'list',
        name: 'employeeType',
        message: 'Which team member would you like to add?',
        choices: ['Manager','Engineer', 'Intern', 'Finish'],
    }
    ]).then(response => {
        switch (response.employeeType) {
            case "Manager":
                addManager();
                break;
            case "Engineer":
                addEngineer();
                break;
            case "Intern":
                addIntern();
                break;
            case "Finish":
                createPage();
                console.log('Team Complete')
        }
    })
}

// function to prompt for engineer info
function addEngineer() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "Engineer Name",
            validate: engineerNameInput => {
                if (engineerNameInput) {
                    return true;
                } else {
                    console.log('Please enter a name');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: "Engineer ID number",
            validate: engineerIdInput => {
                if (!isNaN(parseInt(engineerIdInput))) {
                    return true;
                } else {
                    console.log('Please enter a number');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "Engineer email address",
            validate: engineerEmailInput => {
                const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                if (engineerEmailInput.match(validRegex)) {
                    return true;
                } else {
                    console.log('Please enter an email');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: "Engineer github username",
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log('Please enter a github username');
                    return false;
                }
            }
        }
    ]).then(response => {
        team.push(new Engineer(response.name, response.id, response.email, response.github));
        addNextEmployee();
    })
}

//function to prompt for intern info
function addIntern() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "Intern Name",
            validate: internNameInput => {
                if (internNameInput) {
                    return true;
                } else {
                    console.log('Please enter a name');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: "Intern ID number",
            validate: internIdInput => {
                if (!isNaN(parseInt(internIdInput))) {
                    return true;
                } else {
                    console.log('Please enter a number');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "Intern email address",
            validate: internEmailInput => {
                const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                if (internEmailInput.match(validRegex)) {
                    return true;
                } else {
                    console.log('Please enter an email');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'school',
            message: "Intern\'s school",
            validate: internSchoolInput => {
                if (internSchoolInput) {
                    return true;
                } else {
                    console.log('Please enter a school');
                    return false;
                }
            }
        }
    ]).then(response => {
        team.push(new Intern(response.name, response.id, response.email, response.school));
        addNextEmployee();
    })
}

//function to call for generating html page
function createPage() {
    const generatedHTML = render(team);

    fs.writeFile(outputPath, generatedHTML, (err) =>
        err ? console.log(err) : console.log('You have successfully generated your team, check your output folder for the team.html file'));

}

addManager();

