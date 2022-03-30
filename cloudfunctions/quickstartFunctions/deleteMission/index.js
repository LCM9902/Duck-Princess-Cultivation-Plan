const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
  const data = event.data
  // 返回数据库查询结果
  return await db.collection('mission').where({
    _id: data.id
  }).update({
    data: {
      is_online: false
    }
  });
};
