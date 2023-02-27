// TODO: Write code to define and export the Employee class
// setting constructor class for Employee

class Employee {
    //passing parameters for name, id, email and role
    constructor(name, id, email, role) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.role = role;
    }

    //getName() required
    getName() {
        return this.name;
    }
    //getID() required
    getId() {
        return this.id;
    }
    //getEmail() required
    getEmail() {
        return this.email;
    }
    //getRole() required -- returns 'Employee'
    getRole() {
        return "Employee";
    }
}

module.exports = Employee;