const { convertTextToBrf } = require('../controllers/brf.controller');

module.exports = (app) => {
  app.post('/api/convert-brf', convertTextToBrf);
};
