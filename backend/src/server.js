const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

console.log('****************************************');
console.log('***   MEAL BUSINESS MASTER BRANCH    ***');
console.log('***   STYLE: SEQUELIZE (ROHIT)       ***');
console.log('***   FEATURES: IMAGE UPLOAD (YOU)   ***');
console.log('****************************************');

app.listen(PORT, () => {
  console.log(`[MASTER SERVER] Running on port ${PORT}`);
});
