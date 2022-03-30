const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
  const data = event.data
  // 返回数据库查询结果
  const user = await db.collection('user').where({user_name: '高高'}).get();
  return await db.collection('user').where({user_name: '高高'}).update({data:{user_integral: user.data[0].user_integral + data.integral}})
};
