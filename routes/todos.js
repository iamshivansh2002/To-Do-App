const { createTodo,updateTodo,getTodo,deleteTodo,getAggtodos } = require("../controllers/Todo");
const validate = require("../middleware/auth");

const router=require("express").Router();


router.use(validate)

router.post("/createTodo", createTodo);
router.put("/updateTodo", updateTodo);
router.get('/getTodo',getTodo);
router.delete('/deleteTodo',deleteTodo);
router.get('/getapptodos',getAggtodos);



module.exports=router;