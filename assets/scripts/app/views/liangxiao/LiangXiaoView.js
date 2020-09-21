var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../utils/UIUtils"),
    l = require("../../utils/ShaderUtils"),
    r = require("../../Initializer"),
    cfg = require("../../Config"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblNum = null;
            e.lblTime = null;
            e.btnQiang = null;
            e.lblTip = null;
            e.startNode = null;
            e.tipNode = null;
            e.bg = null;

            //关闭节点
            e.btnFinish = null;
            e.lblFinish = null;

            //新的掉落
            e.flyNode = null;
            e.flyItem = null;
            e.flyItemList = []; //保存掉落月饼列表
            e.doCheckTime = 0;  //多少帧算一次

            //分数
            e.flyPoint = null;  //界面显示分数
            e.pointCount = 0;   //命中次数
            e.point = 0;        //按命中次数计算分数

            //准备开始
            e.startEffzh = null;    //简体
            e.startEfftw = null;    //繁体

            //计数
            e.allCount = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(r.liangxiaoProxy.LIANGXIAO_INFO_UPDATE, this.onInfo, this);  //获得数据
            facade.subscribe(r.liangxiaoProxy.LIANGXIAO_ITEM_CLICK, this.finishPlay, this);   //命中糕点
            
            //拉数据
            r.liangxiaoProxy.sendOpenActivity();

            //bg模糊
            l.shaderUtils.setBlur(this.bg); 

            //玩法提示
            this.lblTip.string = i18n.t("LIANGXIAO_WAN_FA");

            //隐藏动画
            this.showStartEff(false);

            //显示按钮
            this.initStartBtn();
        };
        e.prototype.showStartEff = function(show){
            //准备开始动画
            if(show)
            {
                //隐藏分数
                this.flyPoint.node.active = false;
                this.flyPoint.node.setScale(1.0, 1.0);
                var self = this;
                if(cfg.Config.lang == "zh-ch")
                {
                    //简体
                    this.startEffzh.node.active = true;
                    this.startEfftw.node.active = false;

                    i.utils.showSpine(this.startEffzh, "animation", false, function(){
                        //隐藏按钮
                        self.showStartEff(false);
                        self.startFall();
                    });
                }
                else
                {
                    //繁体
                    this.startEfftw.node.active = true;
                    this.startEffzh.node.active = false;

                    i.utils.showSpine(this.startEfftw, "animation", false, function(){
                        //隐藏按钮
                        self.showStartEff(false);
                        self.startFall();
                    });
                }
            }
            else
            {
                this.startEffzh.node.active = show;
                this.startEfftw.node.active = show;
            }
        };
        e.prototype.startBtnShow = function(show){
            this.btnQiang.interactable = show;
            this.btnQiang.node.active = show;
            this.flyNode.active = !show;

            if(show)
            {
                //如果显示的话，播放动画
                n.uiUtils.scaleRepeat(this.tipNode, 0.9, 1.1);
            }
        };
        e.prototype.onInfo = function() {
            var t = this;
            if(r.liangxiaoProxy.info)
            {
                n.uiUtils.countDown(
                    r.liangxiaoProxy.info.info.eTime, 
                    this.lblTime,
                    function() {
                        t.lblTime.string = i18n.t("ACTHD_OVERDUE");
                    },
                    !0,
                    "USER_REMAIN_TIME",
                    "d"
                );
            }

            if (i.timeUtil.second > r.liangxiaoProxy.info.info.eTime) {
                //如果活动已结束
                this.tipNode.active = this.startNode.active = !1;

                this.startBtnShow(false);
                this.flyNode.active = false;
            } 
        };
        //点击抢月饼
        e.prototype.onClickQiang = function() {
            if(!r.liangxiaoProxy.info)
            {
                //开始
                this.startEff();
                return;
            }

            if (r.liangxiaoProxy.info.info.eTime <= i.timeUtil.second){
                //检查活动是否已结束
                i.alertUtil.alert18n("ACTHD_OVERDUE");
            }
            else{
                var time = r.liangxiaoProxy.getCurPay();
                if(time < 0){
                    //开始
                    this.startEff();
                }
                else{
                    var self = this;
                    i.utils.showConfirmItem(
                        i18n.t("LIANGXIAO_PAY", {
                            num: time
                        }),
                        1,
                        r.playerProxy.userData.cash,
                        function() {
                            r.playerProxy.userData.cash < time
                                ? i.alertUtil.alertItemLimit(1)
                                : self.startEff();
                        }
                    );
                }
            }
        };

        //游戏开始
        e.prototype.startEff = function(){
            //去掉开始文本
            this.startBtnShow(false);

            //设定计时器
            this.unscheduleAllCallbacks();
            this.scheduleOnce(this.onTimer, r.liangxiaoProxy.timeRemain);
            cc.log("--------------" + r.liangxiaoProxy.timeRemain);

            //重置游戏
            this.initFall();
            
            //显示开始动画
            this.showStartEff(true);
        };
        //结束以后
        e.prototype.onTimer = function() {
            r.liangxiaoProxy.sendQiang(this.point);
            r.liangxiaoProxy.sendOpenActivity();    //刷新数据

            //隐藏掉落面板
            this.flyNode.active = false;

            //弹出提示文本
            var self = this;
            i.alertUtil.alert(i18n.t("LIANGXIAO_OVER",{ num: this.point}));
            this.lblFinish.node.runAction(
                cc.sequence(
                    cc.delayTime(2),    //2秒后消失
                    cc.callFunc(function() {
                        self.initStartBtn();
                    })
                )
            );
            
        };
        e.prototype.initStartBtn = function(){
            //初始化
            this.initFall();
                        
            //显示按钮
            this.startBtnShow(true);

            //隐藏结束提示
            this.btnFinish.node.active = false;
            this.lblFinish.node.stopAllActions();
        };
        //打开排行奖励
        e.prototype.onClickRank = function() {
            i.utils.openPrefabView("liangxiao/LiangXiaoReward");
        };
        //打开兑换商城
        e.prototype.onClickShop = function() {
            i.utils.openPrefabView(
                "ActivityShopView",
                null,
                r.liangxiaoProxy.dhShop
            );
        };
        e.prototype.onClickClose = function() {
            i.utils.closeView(this);
        };
        e.prototype.onClickFinished = function(){
            this.initStartBtn();
        };

        //新的掉落
        //开始掉落
        e.prototype.initFall = function(){
            //初始化
            this.pointCount = 0;
            this.point = 0;
            this.addPoint();
            this.stopFly();

            this.flyNode.active = true;
        };
        e.prototype.startFall = function(){
            this.initFall();
            if(this.flyItemList.length > 0)
            {
                //如果已经创建就重新开始一遍
                for(var idx = 0; idx < this.flyItemList.length; idx++)
                {
                    this.rePlay(this.flyItemList[idx]);
                }
                return;
            }

            for(var idx = 0; idx < r.liangxiaoProxy.startCount; idx++)
            {
                //创建
                this.createItem(idx);
            }
        };
        e.prototype.createItem = function(index){
            var it = cc.instantiate(this.flyItem);
            if(it)
            {
                it.openParam = index;
                it.id = index;
                it.active = true;
                this.flyNode.addChild(it);
                this.flyItemList.push(it);
                this.rePlay(it);
            }
        };

        //设定掉落
        e.prototype.oncePlay = function(item){
            if(item)
            {
                var random = n.uiUtils.randomNum(r.liangxiaoProxy.delay[0], r.liangxiaoProxy.delay[1]);
                var speed = n.uiUtils.randomNum(r.liangxiaoProxy.speed[0], r.liangxiaoProxy.speed[1]);
                var itPt = item.getPosition();

                var self = this;
                item.runAction(
                    cc.sequence(
                        cc.delayTime(random),
                        cc.moveTo(speed, new cc.Vec2(itPt.x, 0.0)),
                        cc.callFunc(function() {
                            self.rePlay(item);
                        })
                    )
                );
            }
        };
        e.prototype.stopFly = function(){
            //停止掉落
            if(this.flyItemList.length > 0)
            {
                for(var idx = 0; idx < this.flyItemList.length; idx++)
                {
                    this.flyItemList[idx].setPosition(this.flyItemList[idx].getPosition().x, 0);
                    this.flyItemList[idx].stopAllActions();
                }
            }
        };
        e.prototype.rePlay = function(item){
            if(item){
                this.allCount++;
                item.stopAllActions();
                //高度坐标就是flyNode的高度
                var height = this.flyNode.getContentSize().height;
                var width = this.flyNode.getContentSize().width;
                var pot = n.uiUtils.getRandomPosInRect( new cc.Vec2(width / 2.0, height), width, 50.0);
                item.setPosition(pot);
                this.oncePlay(item);
            }
        };
        //点击月饼回调
        e.prototype.finishPlay = function(idx){
            if(idx < this.flyItemList.length)
            {
                this.pointCount++;
                this.addPoint();
                this.rePlay(this.flyItemList[idx]);
            }
        };
        //增加分数
        e.prototype.addPoint = function(){
            if(this.flyPoint.node.active == false)
            {
                this.flyPoint.node.active = true;
            }

            //这里可以按公式做一个换算
            this.point = 1*this.pointCount; 
            this.flyPoint.string = this.point;
            n.uiUtils.scaleOnce(this.flyPoint.node, 0.9, 1.2, 0.05);
        };

        //活动时间
        __decorate([c(cc.Label)], e.prototype, "lblTime", void 0);
        
        //玩法提示
        __decorate([c(cc.Label)], e.prototype, "lblTip", void 0);
        __decorate([c(cc.Node)], e.prototype, "tipNode", void 0);

        //背景
        __decorate([c(cc.Sprite)], e.prototype, "bg", void 0);
        //结束节点
        __decorate([c(cc.Button)], e.prototype, "btnFinish", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblFinish", void 0);

        //开始按钮
        __decorate([c(cc.Button)], e.prototype, "btnQiang", void 0);
        //开始文本
        __decorate([c(cc.Node)], e.prototype, "startNode", void 0);

        //新的掉落
        __decorate([c(cc.Node)], e.prototype, "flyNode", void 0);   //掉落的面板
        __decorate([c(cc.Node)], e.prototype, "flyItem", void 0);   //掉落物品模板

        __decorate([c(cc.Label)], e.prototype, "flyPoint", void 0);  //获得分数

        //准备开始
        __decorate([c(sp.Skeleton)], e.prototype, "startEffzh", void 0);    //简体开始
        __decorate([c(sp.Skeleton)], e.prototype, "startEfftw", void 0);    //繁体开始
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
