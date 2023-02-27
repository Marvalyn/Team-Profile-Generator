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

function addManager() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "To get started please enter a Manager\'s name.",
        },
        {
            type: 'input',
            name: 'id',
            message: "Manager ID number",
        },
        {
            type: 'input',
            name: 'email',
            message: "Manager email address",
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "Manager office number",
        }
    ]).then(respone => {
        team.push(new Manager(respone.name, respone.id, respone.email, respone.officeNumber));
        addNextEmployee();
    })
}

function addNextEmployee() {
    inquirer.prompt([{
        //choose employee type to add
        type: 'list',
        name: 'employeeType',
        message: 'Which team member would you like to add?',
        choices: ['Engineer', 'Intern', 'Finish'],
    }
    ]).then(response => {
        // if (response.type === 'Manager') {
        //     addManager();
        // }
        if (response.type === "Engineer") {
            addEngineer();
        } else if (response.type === "Intern") {
            addIntern();
            //if no other employee is added call the function to generate the HTML page
        } else {
            createPage();
            console.log('Team Complete');
        }
    })
}

function addEngineer() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "Engineer Name",
        },
        {
            type: 'input',
            name: 'id',
            message: "Engineer ID number",
        },
        {
            type: 'input',
            name: 'email',
            message: "Engineer email address",
        },
        {
            type: 'input',
            name: 'github',
            message: "Engineer github username",
        }
    ]).then(respone => {
        team.push(new Engineer(respone.name, respone.id, respone.email, response.github));
        addNextEmployee();
    })
}

function addIntern() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "Intern Name",
        },
        {
            type: 'input',
            name: 'id',
            message: "Intern ID number",
        },
        {
            type: 'input',
            name: 'email',
            message: "Intern email address",
        },
        {
            type: 'input',
            name: 'school',
            message: "Intern\'s school",
        }
    ]).then(respone => {
        team.push(new Intern(respone.name, respone.id, respone.email, respone.school));
        addNextEmployee();
    })
}

function createPage() {
    const generatedHTML = render(team);

    fs.writeFile(outputPath, generatedHTML, (err) => 
        err ? console.log(err) : console.log('You have successfully generated your team, check your output folder for the team.html file'));
    
}

addManager();

// call addManager() function first
// add function to call inquirer prompt for user to choose which member they will add next, 
// if chosen engineer call addEngineer();
// if chosen intern addIntern();
// if chosen manager addManager();
// add function to generate html file