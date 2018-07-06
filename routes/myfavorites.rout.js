var express = require('express');
var router = express.Router(); 
var request = require('request');  

/* GET "my favorites" page. */
router.get('/', function(req, res, next) {
    res.setHeader("Cache-Control", "private, max-age=600");
    res.render('myfavorites', { 
      pageTitle: ': My Favorites',
      subTitle: 'Your Favorited Albums'
  });
});

/* GET album info. */
router.get('/album/:albumId', function(req, res, next) {
  const jwtToken = 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik05OVpGUEMyR1UifQ.eyJpYXQiOjE1MjAyODgwNDQsImV4cCI6MTUzNTg0MDA0NCwiaXNzIjoiUzJaUDI1NlBQSyJ9.aHYYWnOKFNxP-l5gXFq8SUurmtDuGvf_ZklQfFXgT-IlPrlXtXUIvHLDUz_psHQNyVwQeN8SxdEcgzMNR2x9Kg';
  var thisAlbum = req.params.albumId;
  request.get(  
    {  
      url: `https://api.music.apple.com/v1/catalog/us/albums/${thisAlbum}`,  
      auth: {  
        bearer: jwtToken  
      },  
      json: true  
    },  
    (err, response, body) => {  
      if (err) {  
        console.log(err);  
      } else { 
        res.setHeader("Cache-Control", "private, max-age=600");
        res.json(body);
      }  
    }
  )
});

module.exports = router;
