var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
//垂钓 活动主界面 step 2
var i = require("../../utils/Utils"),
    l = require("../../utils/UIUtils"),
    utils = require("../../utils/Utils"),
    a = require("../../Initializer"),
    buildItem = require("./ChuiDiaoPoint"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblTime = null; //倒数计时
            e.content = null; //
            e.pointItem = null; //城市
            e._oldId = 0; //下一个目标点的id
            e.curSpeed = 0.3; //初始化移动时间
            e.roleAnimation = null; //马车位置
            e.roleSpine = null; //马车的动画

            //new
            e.btnPlay = null; //随机移动按钮
            e.lblStamina = null; //体力
            e.lblRodsCount = null; //钓竿数量
            e.lblStaminaCountDown = null; //体力用完时显示倒数计时

            e.initPt = false; //检查进地图的时候是否本来就有未完成的place
            e.onMove = false; //检查马车是否正在移动
            return e;
        }
        e.prototype.onLoad = function () {
            //更新数据
            facade.subscribe(a.chuidiaoProxy.CHUIDIAO_DATA_UPDATE, this.onDataUpdate, this);
            //更新体力
            facade.subscribe(a.chuidiaoProxy.CHUIDIAO_ACT_UPDATE, this.onActUpdate, this);

            //更新物品数量
            facade.subscribe(a.bagProxy.UPDATE_BAG_ITEM, this.onItemUpdate, this);
            //点击地点
            facade.subscribe(a.chuidiaoProxy.ON_CHUIDIAO_CLICK_POINT, this.onPlayPoint, this);
            //开始移动
            facade.subscribe(a.chuidiaoProxy.ON_CHUIDIAO_ACT_BACK, this.onPlayBack, this);

            //钓鱼以后返回的时候把马车开回原点
            facade.subscribe(a.chuidiaoProxy.CHUIDIAO_FISHING_BACK, this.goBack, this);

            //请求数据
            a.chuidiaoProxy.sendOpenChuiDiao();
        };

        //new chuidiao
        //初始化数据
        e.prototype.init = function () {
            //初始化路点
            var pointList = localcache.getList(localdb.table_chuidiao_point);
            if (!pointList) {
                cc.log("配置读取错误");
                return;
            }
            for (var t = 0; t < pointList.length; t++) {
                var id = pointList[t].id;
                //加载服务器发过来的路点以及原点
                var item = a.chuidiaoProxy.cities[id];
                if (0 == id || item) {

                    var e = cc.instantiate(this.pointItem);
                    e.getComponent(buildItem.default).data = pointList[t];
                    e.active = true;
                    e.x = pointList[t].x;
                    e.y = pointList[t].y;
                    this.content.addChild(e);
                }
            }
            //把马车弄到最上层
            this.roleAnimation.node.setSiblingIndex(99);
        };

        //更新info数据
        e.prototype.onDataUpdate = function () {
            //初始化界面
            this.init();

            //倒数计时
            if (a.chuidiaoProxy.data) {
                var t = this;
                l.uiUtils.countDown(
                    a.chuidiaoProxy.data.info.eTime,
                    this.lblTime,
                    function () {
                        t.lblTime.string = i18n.t("ACTHD_OVERDUE");
                    },
                    !0,
                    "USER_REMAIN_TIME",
                    "d"
                );
            }

            //更新体力
            if (this.initPt) {
                this.updateStamina();
            }

            //更新钓竿
            this.onItemUpdate();
        };

        //更新ACT
        e.prototype.onActUpdate = function () {
            this.updateStamina();
            this.onStaminaCounDown();
        };

        //如果没有体力了显示倒数计时
        e.prototype.onStaminaCounDown = function () {
            this.lblStaminaCountDown.node.active = a.chuidiaoProxy.act.stamina < 1;
            this.lblStamina.node.active = a.chuidiaoProxy.act.stamina >= 1;

            if (a.chuidiaoProxy.act.stamina < 1) {
                var cur = utils.timeUtil.second + (1 - a.chuidiaoProxy.act.stamina) * a.chuidiaoProxy.data.settings.stamina.recover_per_second;

                l.uiUtils.countDown(
                    cur,
                    this.lblStaminaCountDown,
                    function () {
                        a.chuidiaoProxy.sendOpenChuiDiao();
                    },
                    !0,
                    //"USER_REMAIN_TIME",
                    //"d"
                );
            }
        };

        //更新act
        e.prototype.updateStamina = function () {
            if (a.chuidiaoProxy.data && a.chuidiaoProxy.act) {
                var curStamina = a.chuidiaoProxy.act.stamina;
                if (utils.stringUtil.isBlank(curStamina) || parseInt(curStamina).toString() == NaN) {
                    if (parseInt(curStamina).toString() == NaN) {
                        var i = 0;
                    }
                    curStamina = 0;
                }
                this.lblStamina.string =
                    parseInt(curStamina).toString() + " / " + a.chuidiaoProxy.data.settings.stamina.max.toString();

                //刚进地图如果有点，就直接放过去
                if (!this.initPt) {
                    //初始化马车位置
                    if (a.chuidiaoProxy.act.mid_place >= 0) {
                        this._oldId = a.chuidiaoProxy.act.mid_place;
                        var tab = localcache.getItem(localdb.table_chuidiao_point, this._oldId);
                        this.onArrived(tab);

                        this.initPt = true;
                    }
                } else {
                    if (a.chuidiaoProxy.act.type <= 0) {
                        //如果type = 0 说明没有移动
                        return;
                    }

                    //否则移动过去
                    if (a.chuidiaoProxy.act.mid_place) {
                        this.onPlayBack(a.chuidiaoProxy.act.mid_place);
                    }
                }
            }
        };

        //命中地点
        e.prototype.onPlayPoint = function (pt) {
            if (this.onMove) {
                utils.alertUtil.alert18n("CHUIDIAO_MAIN_WAIT_BACK");
                return;
            }

            if (pt.id <= 0) {
                this.goBack();
                return;
            }

            //如果当前点没有动，就直接进去
            if (a.chuidiaoProxy.act.mid_place == pt.id) {
                var t = localcache.getItem(localdb.table_chuidiao_point, pt.id);
                if (t) {
                    this.onArrived(t);
                }
                return;
            }
            //打开info
            i.utils.openPrefabView("chuidiao/ChuiDiaoBuildInfo", null, pt);
        };

        //开始向目标点移动
        e.prototype.onPlayBack = function (t) {
            //获得服务器返回，拿到新的目标id，开始移动
            this._oldId = t;
            this.moveBishu();
        };
        //返回原点
        e.prototype.goBack = function () {
            this._oldId = 0;
            this.moveBishu();
        };

        //移动
        e.prototype.moveBishu = function () {
            this.startMove(true);
            //目标
            var t = localcache.getItem(localdb.table_chuidiao_point, this._oldId);
            if (null != t) {
                var pt = this.roleAnimation.node.getPosition();
                var time = this.getMoveTime(cc.v2(pt.x, pt.y), cc.v2(t.x, t.y));

                this.setRunState(t.x, t.y); //调整姿势
                var self = this;
                this.roleAnimation.node.stopAllActions();
                this.roleAnimation.node.runAction(
                    cc.sequence(
                        cc.moveTo(time, new cc.Vec2(t.x, t.y)), //0.3秒移动到目标
                        cc.callFunc(function () {
                            self.roleAnimation.node.stopAllActions();
                            self.onArrived(t);
                        })
                    ));
            }
        };

        //抵达城市处理, 传入chuidiao_point表值
        e.prototype.onArrived = function (ptTab) {
            this.roleAnimation.node.x = ptTab.x;
            this.roleAnimation.node.y = ptTab.y;

            if (!this.initPt) {
                //这里策划需求刚进地图的时候只放位置不做进城的操作
                return;
            }
            var sevTab = a.chuidiaoProxy.cities[ptTab.id];
            if (sevTab) {
                //如果place 大于0说明需要钓鱼
                if (a.chuidiaoProxy.act.place > 0) {
                    //进城
                    this.openFishingView();
                } else {
                    //弹框
                    a.timeProxy.floatReward();
                    //这里需要把midplace和place置空
                    a.chuidiaoProxy.act.mid_place = 0;
                    a.chuidiaoProxy.act.place = 0;
                    this.goBack(1);
                }
            }

            this.startMove(false);
        };

        //获得当前移动坐标的距离
        e.prototype.getMoveTime = function (start, end) {
            var ptStart = cc.v2(start.x, start.y);
            var ptEnd = cc.v2(end.x, end.y);
            var vec = ptEnd.sub(ptStart);
            var distance = vec.mag();
            var time = distance / 100.0 * this.curSpeed;
            return time;
        };
        //按目标坐标调整动画方向
        e.prototype.setRunState = function (x, y) {
            var t = x - this.roleAnimation.node.x,
                e = y - this.roleAnimation.node.y;
            this.roleSpine.node.scaleX = t < 0 ? 1 : -1;
            if (Math.abs(e) < 25) this.roleSpine.animation = "run3";
            else if (e < 0) {
                if (Math.abs(t) < 25) {
                    this.roleSpine.animation = "run1";
                    return;
                }
                this.roleSpine.animation = "run2";
            } else
                Math.abs(t) < 25 ?
                (this.roleSpine.animation = "run5") :
                (this.roleSpine.animation = "run4");
        };

        //移动状态控制
        e.prototype.startMove = function (isMove) {
            this.onMove = isMove;
            this.btnPlay.interactable = !isMove; //不移动时才能点击
        };

        //点击随机移动
        e.prototype.onClickPlay = function (t, e) {
            if (this.onMove) {
                utils.alertUtil.alert18n("CHUIDIAO_MAIN_WAIT_BACK");
                return;
            }

            //如果此地尚未垂钓，就出提示
            if (a.chuidiaoProxy.act.place == a.chuidiaoProxy.act.mid_place && a.chuidiaoProxy.act.place > 0) {
                var self = this;
                i.utils.showConfirm(i18n.t("CHUIDIAO_MAIN_MOVE_TIP"), function () {
                    self.doPlay();
                });

                return;
            }

            this.doPlay();
        };
        //执行移动
        e.prototype.doPlay = function () {
            //如果没有在移动状态
            if (a.chuidiaoProxy.act) {
                if (parseInt(a.chuidiaoProxy.act.stamina) < a.chuidiaoProxy.data.settings.walk.random_cost) {
                    //体力不够
                    if (!i.utils.isOpenView("ChuiDiaoStaminaBuy")) {
                        i.utils.openPrefabView("chuidiao/ChuiDiaoStaminaBuy", null, null);
                    }
                    /*
                    i.utils.showConfirm(i18n.t("CHUIDIAO_MAIN_STAMINA_NOT_ENOUGH", {num: a.chuidiaoProxy.data.settings.stamina.price})
                    , function() {
                        a.chuidiaoProxy.sendBuyStamina();
                    });
                    */
                    return;
                }
            }

            //体力够用
            this.startMove(false);
            a.chuidiaoProxy.sendMove(0); //发消息随机移动
        };

        //打开钓鱼界面
        e.prototype.openFishingView = function () {
            if (!i.utils.isOpenView("ChuiDiaoFishingView")) {
                i.utils.openPrefabView("chuidiao/ChuiDiaoFishingView", null, a.chuidiaoProxy.act.place);
            }
        };

        //直接点击目的地
        e.prototype.onClickBuild = function (t, e) {
            if (this.onMove) {
                utils.alertUtil.alert18n("CHUIDIAO_MAIN_WAIT_BACK");
                return;
            }
            i.utils.openPrefabView("chuidiao/ChuiDiaoBuildInfo", null, e);
        };

        //更新物品数量
        e.prototype.onItemUpdate = function () {
            this.lblRodsCount.string = a.bagProxy.getItemCount(a.chuidiaoProxy.data.settings.fishing.rod) + "";
        };

        //关闭
        e.prototype.onClickClose = function () {
            a.bishuProxy.isSelf = !1;
            i.utils.closeView(this);
        };
        //end chuidiao

        e.prototype.onClickTab = function (t, e) {
            var o = this;
            if (this.onMove) {
                utils.alertUtil.alert18n("CHUIDIAO_MAIN_WAIT_BACK");
                return;
            }


            switch (e) {
                case "1":
                    i.utils.openPrefabView(
                        "chuidiao/ChuidiaoShopView",
                        null,
                        null //a.chuidiaoProxy.data.exchange
                    );
                    break;

                case "2":
                    i.utils.openPrefabView(
                        "limitactivity/LimitActivityView",
                        null, {
                            type: a.limitActivityProxy.CHUIDIAO_TYPE
                        }
                    );
                    break;

                case "3":
                    i.utils.openPrefabView("chuidiao/ChuiDiaoRwd");
                    break;

                case "4":
                    i.utils.openPrefabView("ActivitySpecialBuy", null, {
                        data: a.chuidiaoProxy.shop[0],
                        activityId: a.chuidiaoProxy.data.info.type
                    });
            }
        };

        e.prototype.colseTipWin = function () {
            if (i.utils.isOpenView("AlertItemMore")) {
                i.utils.closeNameView("AlertItemMore");
                i.utils.popNext(!1);
            } else if (i.utils.isOpenView("AlertItemShow")) {
                i.utils.closeNameView("AlertItemShow");
                i.utils.popNext(!1);
            }
        };
        __decorate([d(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblStaminaCountDown", void 0); //体力用完时倒数计时
        __decorate([d(cc.Node)], e.prototype, "content", void 0);
        __decorate([d(cc.Node)], e.prototype, "pointItem", void 0);
        __decorate([d(cc.Animation)], e.prototype, "roleAnimation", void 0);
        __decorate([d(sp.Skeleton)], e.prototype, "roleSpine", void 0);

        //new
        __decorate([d(cc.Button)], e.prototype, "btnPlay", void 0); //随机移动按钮
        __decorate([d(cc.Label)], e.prototype, "lblStamina", void 0); //体力
        __decorate([d(cc.Label)], e.prototype, "lblRodsCount", void 0); //钓竿数量
        return (e = __decorate([_], e));
    })(cc.Component);
o.default = u;