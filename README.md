# 云开发 quickstart

## 数据库设计
https://bytedance.feishu.cn/docx/doxcnvk58QcRZxmOmHgogANvnQu

## 注意点
1. 确认project.config.json中的projectname和本地是否一致
2. miniprogram/envList.js中的环境配置改为自己的环境
3. 需要手动创建数据库表：云开发 -> 数据库

## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

## 搭建自己的小程序
1. 首先 你需要下载微信小程序开发工具 注册开发者账号 并且创建小程序 [官方文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/quick-start/miniprogram.html)

2. 下载 或 `Git Clone` 这个库 并且解压到文件夹
3. 打开开发工具 扫码登录你的管理员账号 并选择右上角的导入
4. 导入的文件夹目录要可以看到 miniprogram 和 cloudfunction
5. AppID 选择你刚刚建立好的自己的小程序AppID 游客AppID不可链接云函数！！！
6. 后端服务选择微信云开发
7. 找到project.config.json 然后更新appID。 
    - AppID可以在网页版小程序后台查询 顺序如下
        - 开发 
        - 开发管理
        - 开发设置
        - AppID
8. 找到miniprogram\envList.js 然后更新envID 为你的云服务ID 
    - 云服务ID 查询顺序如下
        - 打开编辑器
        - 云开发
        - 右边 环境ID
    - isMac 是为了正确显示需运行的文件(.sh/.ps1)
        - true 为显示 Mac环境需要运行的脚本
        - false 为显示 Windows环境需要运行的脚本

9. 部署云函数
    - Windows 用户请运行 uploadCloudFunction.ps1
    - MacOSX  用户请运行 uploadCloudFunction.sh

10. 在云开发后台 数据库页面 创建下列几个集合
    - goods
    - mission
    - sales
    - user
    - user_operator

11. 回到主编辑器 左边可视化界面 点击任意按钮可载入到子界面

12. 点击 真机调试 扫描二维码 手机就可以看到应用出现。

13. 电脑点击停止调试 手机下拉到小程序的主界面 还可以进入小程序 不需要公布到微信小程序商店

