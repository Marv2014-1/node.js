const express = require("express");
const router = express.Router();
const employeesController = require("../../controllers/employeesController");

router
    .route("/")
    // relay the crud operations to the controller rather then overwhelming the router
    .get(employeesController.getAllEmployees)
    .post(employeesController.createNewEmployee)
    .put(employeesController.updateEmployee)
    .delete(employeesController.deleteEmployee);

router.route("/:id").get(employeesController.getEmployee);

module.exports = router;

/*
(create a new employee)
    post :
    {
        "firstname":"Alex",
        "lastname":"Cole"
    }

(update an employee with id 3 and change the firstname to Camille)
    put :
    {
        id : 3,
        "firstname":"Camille",
    }

(delete an employee with id 4)
    delete:
    {
        id : 4
    }
*/
