


exports.register = function (plugin, options, next) {
    
  const secret_key = require('./config/auth');

  plugin.auth.strategy('jwt', 'jwt', {
    key: secret_key, // Secret key
    verifyOptions: {
      algorithms: ['HS256']
    },
    // Implement validation function
    validateFunc: (decoded, request, callback) => {
      // NOTE: This is purely for demonstration purposes!
      var users = [
        {
          id: 1,
          name: 'Mike'
        }
      ];
      
      if (users.find(u => u.id === decoded.id)) {
        return callback(null, true);
      }
      else {
        return callback(null, false);
      }
    }
  });

  // Uncomment this to apply default auth to all routes
  //plugin.auth.default('jwt');

  next();
};

exports.register.attributes = {
  name: 'auth'
};