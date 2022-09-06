const getConnection = require('../libs/postgres')

const getAllUsers = async (req, res) =>{
  const client = await getConnection()
  const response = await client.query('SELECT * FROM public.tasks')
  return response.rows;
}


module.exports = {
  getAllUsers
}
