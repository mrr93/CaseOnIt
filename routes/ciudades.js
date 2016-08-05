// ciudades.js
//======================================================================================
module.exports = function(app) {

  var Ciudad = require('../models/ciudad.js');

  //GET - Devuelve todas las ciudades de la BBDD
  findAllCities = function(req, res) {
    console.log("GET - /ciudades");
  	return Ciudad.find(function(err, ciudad) {
  		if(!err) {
  			return res.send(ciudad);
  		} else {
        res.statusCode = 500;
  			console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
  		}
  	});
  };

  
  //GET - Devuelve un registro con un ID determinado
	findById = function(req, res) {
		console.log("GET - /ciudad/:id");
		return Ciudad.findById(req.params.id, function(err, ciudad) {
		  if(!ciudad) {
			res.statusCode = 404;
			return res.send({ error: 'Not found' });
		  }
		  if(!err) {
			// Send { status:OK, ciudad { ciudad values }}
			return res.send(ciudad);
			// Send {ciudad values}
			// return res.send(ciudad);
		  } else {
			res.statusCode = 500;
			console.log('Internal error(%d): %s',res.statusCode,err.message);
			return res.send({ error: 'Server error' });
		  }
		});
	  };
	  
	  
  //POST - Insertar un nuevo registro en la BBDD
  addRegistro = function(req, res) {
    console.log('POST - /ciudad');
    console.log(req.body);
 
    var ciudad = new Ciudad({
		ts: req.body.ts,
		city: req.body.city,
		population: req.body.population,
		age: req.body.age,
		count: req.body.count		
    });
 
    ciudad.save(function(err) {
      if(!err) {
        console.log("ciudad creada");
        return res.send({ciudad:ciudad });
      } else {
        console.log(err);
        if(err.name == 'ValidationError') {
          res.statusCode = 400;
          res.send({ error: 'Validation error' });
        } else {
          res.statusCode = 500;
          res.send({ error: 'Server error' });
        }
        console.log('Internal error(%d): %s',res.statusCode,err.message);
      }
    });
 
    res.send(ciudad);
  };
 

  //Link routes and functions
  app.get('/ciudades', findAllCities);
  app.get('/ciudad/:id', findById);
  app.post('/ciudad', addRegistro);

}