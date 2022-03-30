const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
  const data = event.data
  // 返回数据库查询结果
  return await db.collection('goods').add({
    data: [{
      goods_content: data.goods_content,
      goods_integral: Number(data.goods_integral),
      goods_image: data.goods_image,
      is_online: true
    }]
  });
};
