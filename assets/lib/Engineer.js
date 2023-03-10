// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("../lib/Employee");

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
        // overriding role to be engineer
        this.role = "Engineer"
    }
    getGithub() {
        return this.github;
    }

    getRole() {
        return this.role;
    }
}


module.exports = Engineer;