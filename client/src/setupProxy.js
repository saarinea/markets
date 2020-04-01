const proxy = require('http-proxy-middleware')
 
module.exports = function(app) {
    app.use(proxy(['/api', '/auth/google', '/data/stocks'], { target: 'http://localhost:5000' }));
};
