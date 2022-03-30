const selectRecord = require('./selectRecord/index');
const selectOperator = require('./selectOperator/index');
const setOperator = require('./setOperator/index');
const selectGoods = require('./selectGoods/index');
const selectMission = require('./selectMission/index');
const selectUser = require('./selectUser/index');
const updateUser = require('./updateUser/index');
const updateMission = require('./updateMission/index');
const resetMission = require('./resetMission/index');
const addGoods = require('./addGoods/index');
const deleteGoods = require('./deleteGoods/index');
const addMission = require('./addMission/index');
const deleteMission = require('./deleteMission/index');

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'selectRecord':
      return await selectRecord.main(event, context);
    case 'selectOperator':
      return await selectOperator.main(event, context);
    case 'setOperator':
      return await setOperator.main(event, context); 
    case 'selectGoods':
      return await selectGoods.main(event, context);
    case 'selectMission':
      return await selectMission.main(event, context);
    case 'selectUser':
      return await selectUser.main(event, context);  
    case 'updateUser':
      return await updateUser.main(event, context);  
    case 'updateMission':
      return await updateMission.main(event, context);  
    case 'resetMission':
      return await resetMission.main(event, context);  
    case 'addGoods':
      return await addGoods.main(event, context);  
    case 'deleteGoods':
      return await deleteGoods.main(event, context);  
    case 'addMission':
      return await addMission.main(event, context);  
    case 'deleteMission':
      return await deleteMission.main(event, context);  
  }
};
