## 美间 sp 19

cms 后台接口地址 https://doc.qunhequnhe.com/project/3627/interface/api/cat_51345

https://doc.qunhequnhe.com/project/3487/interface/api/cat_51643 主站
https://doc.qunhequnhe.com/project/3627/interface/api/cat_51634 cms

cf prd https://cf.qunhequnhe.com/pages/viewpage.action?pageId=80353504911

效果图 http://ued.qunhequnhe.com/01%E4%BA%A4%E4%BA%92/liuyuan/%E7%BE%8E%E9%97%B4/S19-%E7%BE%8E%E9%97%B4%E8%BD%AF%E8%A3%85%E8%AF%81%E4%B9%A6/

前端埋点

- 用户行为
- userId
- modulesName 和 router
- 业务事件

# 美间 sp 21

prd: 访问个性化落地页触发酷家乐激励体系事件

prd: 个性化新用户落地页 优化 https://cf.qunhequnhe.com/pages/viewpage.action?pageId=80362766977&kpm=JPBL.3851fd3cdd8982c9.23c83dc.1640228145333

设计稿：http://ued.qunhequnhe.com/01交互/liuyuan/美间/S21-落地页优化/

cms - 5.5
编辑工具视频介绍模块 1
用户落地页模块兼容处理 1.5
编辑搜索视频介绍 3

web - 10
工具介绍落地页 2
搜索视频介绍落地页 4
banner、navBar 搜索框 动画交互联动 2
自测+联调 2

# 美间 sp 22

cms 5.5 1.弹窗管理布局(上架和下架) 2 2.创建/编辑弹窗 2 参考(https://sit-cms.meijian.io/mj/meijian/cms/content/popup) 3.可见用户群 1.5

前台 3
广告弹窗 1
任务弹窗 2

prd https://cf.qunhequnhe.com/pages/viewpage.action?pageId=80369315276
效果图 http://ued.qunhequnhe.com/%E7%BE%8E%E9%97%B41.0/%E7%BE%8E%E9%97%B4%E6%88%90%E9%95%BF%E4%BD%93%E7%B3%BB0701/#artboard2

https://juejin.cn/post/6971116221521461262

API https://doc.qunhequnhe.com/project/3627/interface/api/cat_52846

美间大前端 规划 https://cf.qunhequnhe.com/pages/viewpage.action?pageId=80364640530
美间需求 规划 https://cf.qunhequnhe.com/pages/viewpage.action?pageId=80358814818

# 美间 sp 23

prd:
1、https://cf.qunhequnhe.com/pages/viewpage.action?pageId=80378914476
2、https://cf.qunhequnhe.com/pages/viewpage.action?pageId=80380538149

设计稿: https://mindlink.qunhequnhe.com/#/share?id=337&group=153

- 弹窗 2 期 devDesign(微应用、使用方式、SSE 设计)
- cms 弹窗 2 期 - 新增奖励类型、触发行为(列) 2
- 弹窗微应用形式 2
- 奖励弹窗布局 2
- 跳转和领取奖励逻辑
-
- 其他弹窗的冲突管理 2

// url: `${Api.giftPacks.newUserGifts}/${giftKey}` 领取礼包

postMessageService.addTab({
    url: PATH_NAMES.RESOURCES_LIBRARY_FOLDER.replace(
    ':folderId',
    comebackGifts?.itemGift?.folderId
    )
});

<!-- 会员中心 -->

postMessageService.addTab({ url: PATH_NAMES.SETTINGS_PRO });




