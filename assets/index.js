const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const inquirer = require("inquirer");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

function addManager() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "Manager Name",
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
    ])
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
    ])
}