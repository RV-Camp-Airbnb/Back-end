# back-end





https://deplyrvpark.herokuapp.com

Register a user
https://deplyrvpark.herokuapp.com/api/auth/register
{
    "username": "lambdaschool6"
    "password": "lambdaschool6"
}

login a user
https://deplyrvpark.herokuapp.com/api/auth/login

{
    "username": "lambdaschool6"
    "password": "lambdaschool6"
}


/**********************************************/
get landOwners
https://deplyrvpark.herokuapp.com/api/landOwner

should return 
  {
    "id": 1,
    "owner_id": null,
    "name": "lambdaschool2",
    "password": "$2a$08$GigLSvYjTcKERkq682ViF.BixtH.YMAm/mfvnJfp6zskcOgOwIYwe",
    "description": null,
    "site": null,
    "state": null,
    "address": null,
    "has_electicty": 0,
    "has_water": 0,
    "has_toilets": 0,
    "price": null,
    "img_url": null
  },

register landOwner
https://deplyrvpark.herokuapp.com/api/landOwner/register

{
	"name": "users4",
	"password": "users4"
	
}