// const request = require('request')
const axios = require('axios');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../error');

// const fetch = require('node-fetch')


const getAllCapsules = async(req, res)=>{

    
//   var config = {
//     method: 'get',
//     url: 'https://api.spacexdata.com/v4/capsules',
//     headers: { }
//   };

//  const data =  axios(config)
//   .then(function (response) {
//     console.log((response.data));
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

//   req.status(Status.OK).json({data})

  try{
    const response = await axios.get(`https://api.spacexdata.com/v4/capsules`)
    if(!response.data){
      throw new NotFoundError("Data Found ..!");
    }

    res.status(StatusCodes.OK).json({message: "Data Fetch sucessful", data: response.data})
  } catch(error){
    res.status(StatusCodes.NOT_FOUND).json({ message: "NOT Found 404.!!!", error})
  }

};

const getCapsule = async(req, res)=>{
  const param = req.params.id

  try{
    const response = await axios.get(`https://api.spacexdata.com/v3/capsules/${param}`)
    if(!response){
      throw new NotFoundError("Data was not Found..!!")
    }
    res.status(StatusCodes.OK).json({message: "Data Fetch sucessful", data: response.data})
  } catch(error){
    res.status(StatusCodes.NOT_FOUND).json({ message: "Not Found 404.!!!", error})
  }


};


module.exports = {
  getAllCapsules,
  getCapsule,

}
