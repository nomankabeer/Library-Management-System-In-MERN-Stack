
const express = require ('express');
const router = express.Router();
const RackController = require("../controllers/RackController")
const BookController = require("../controllers/BookController")
router.all('/', (req, res) => {
    res.json({ authors: "its working" , user: req.user })
})


// router.get('/racks' ,RackController.getRacks)
// router.post('/create/rack', RackController.createRack)
// router.delete('/delete/rack', RackController.deleteRack)
// router.put('/update/rack/:rack_id', RackController.updateRack)

router.route('/racks/:rack_id?')
.get(RackController.getRacks)
.post(RackController.createRack)
.delete(RackController.deleteRack)
.put(RackController.updateRack)


router.route('/books/:book_id?')
.get(BookController.getBooks)
.post(BookController.createBook)
.delete(BookController.deleteBook)
.put(BookController.updateBook)


module.exports = router;