const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.get('/', controller.getUsers);           // list + pagination + search
router.get('/export', controller.exportUsers);  // export CSV
router.post('/', controller.createUser);        // create
router.get('/:id', controller.getUserById);     // read
router.put('/:id', controller.updateUser);     // update
router.delete('/:id', controller.deleteUser);  // delete

module.exports = router;
