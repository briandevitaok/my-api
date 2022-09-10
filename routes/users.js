const express = require('express');
const servicesUsers = require('../services/servicesUsers')
const router = express.Router()
const {createUserSchema, updateUserSchema,getUserSchema } = require('../schema/schemaUsers')
const validatorHendler = require('../middleware/validator.hendler')




router.get('/', async (req, res, next)=> {
 try {
  const getUsers = await servicesUsers.getAllUsers(req, res)
  return res.send({getUsers})
 } catch (error) {
  next(error)
 }
})

router.get('/:id', validatorHendler(getUserSchema, 'params'),
  async (req, res, next)=> {
  try {
   const {id} = req.params
   const oneUser = await servicesUsers.findOne(id)
   res.json(oneUser)
  } catch (error) {
   next(error)
  }
 })





router.post('/', validatorHendler(createUserSchema, 'body'),
  async(req, res, next)=>{
  try {
    const body = req.body
    const newUser = await servicesUsers.createUser(body)
    return {newUser}
  } catch (error) {
    next(error)
  }
})


router.patch('/:id',validatorHendler(updateUserSchema, 'params'),
async(req, res, next)=>{
try {
  const {id} = req.params
  const body = req.body
  const updateUser = await servicesUsers.updateUser(id, body)
  return res.json(updateUser)
} catch (error) {
  next(error)
}
})



router.delete('/:id', async (req, res, next)=>{
  try {
    const {id} = req.params
    const userDelete = await servicesUsers.deleteUser({id})
    return res.json(userDelete)
  } catch (error) {
    next(error)
  }
})

module.exports = router;
