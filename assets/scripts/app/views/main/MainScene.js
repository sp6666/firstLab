var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/UIUtils"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = require("../../models/TimeProxy"),
    a = require("../../component/UrlLoad"),
    s = require("../../Config"),
    c = require("../../component/RoleSpine"),
    _ = require("../../utils/ShaderUtils"),
    d = cc._decorator,
    u = d.ccclass,
    p = d.property,
    h = (function (t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.email = null;
            e.nodeHougong = null;
            e.nodeZW = null;
            e.nodeJY = null;
            e.nodeXF = null;
            e.nodeJinban = null;
            e.nodeTreasure = null;
            e.nodeClothe = null;
            e.nodeFriends = null;
            e.nodeHG = null;
            e.imgConfidante = null;
            e.nodeConfidante = null;
            e.nodeConfidanteLabel = null;
            e.jyUrl = null;
            e.jyUrlSh = null;
            //add by cjf 
            e.zwUrl = null;
            e.scroll = null;
            e.roleSpine = null;
            e.imgClothe = null;
            e.imgJingYing = null;
            e.imgZhengwu = null;
            e.imgHaoYou = null;
            e._speed = new cc.Vec2(0, 0);
            e._off = null;
            e._offMax = null;
            e.conUrl = null;
            return e;
        }
        e.prototype.onLoad = function () {
            facade.subscribe("UPDATE_READ", this.updateEmailShow, this);
            facade.subscribe(
                n.playerProxy.PLAYER_USER_UPDATE,
                this.updateTitleShow,
                this
            );
            facade.subscribe(
                n.wifeProxy.WIFE_LIST_UPDATE,
                this.updateTitleShow,
                this
            );
            facade.subscribe(
                n.playerProxy.PLAYER_HERO_SHOW,
                this.updateJyUrl,
                this
            );
            facade.subscribe(
                "MAIN_SET_ACTION_CHANGE",
                this.setActionChange,
                this
            );
            facade.subscribe(
                n.playerProxy.PLAYER_SHOW_CHANGE_UPDATE,
                this.onRoleShow,
                this
            );
            facade.subscribe(
                n.playerProxy.PLAYER_RESET_JOB,
                this.onRoleShow,
                this
            );
            facade.subscribe(
                n.playerProxy.PLAYER_LEVEL_UPDATE,
                this.onRoleShow,
                this
            );
            facade.subscribe("MOON_CARD_BUY_UPDATE", this.moonCardUpdate, this);
            //陪伴皇子 
            facade.subscribe(n.confidanteProxy.ON_GET_MAIN_CONFIDANTE, this.onConfidanteShow, this);
            facade.subscribe(n.confidanteProxy.ON_GET_CONFIDANTE_INFO, this.onConfidanteViewShow, this);
            this.onConfidanteShow();

            i.uiUtils.floatPos(this.nodeHougong.node, 0, 10, 2);
            i.uiUtils.floatPos(this.nodeZW.node, 0, 10, 2);
            i.uiUtils.floatPos(this.nodeJY.node, 0, 10, 3);
            i.uiUtils.floatPos(this.nodeXF.node, 0, 10, 4);
            i.uiUtils.floatPos(this.nodeJinban.node, 0, 10, 3);
            i.uiUtils.floatPos(this.nodeTreasure.node, 0, 10, 3);
            i.uiUtils.floatPos(this.email, 0, 10, 4);
            i.uiUtils.floatPos(this.nodeClothe.node, 0, 10, 4);
            i.uiUtils.floatPos(this.nodeFriends.node, 0, 10, 2);
            i.uiUtils.floatPos(this.nodeConfidanteLabel, 0, 10, 4);
            this.updateJyUrl();
            this.updateTitleShow();
            this.scroll.content.height > s.Config.showHeight + 120 &&
                (this.scroll.content.height = s.Config.showHeight + 120);
            this._off = this.scroll.getScrollOffset();
            this._offMax = this.scroll.getMaxScrollOffset();
            cc.sys.isMobile && this.addEvent();
            n.treasureProxy.updateTreasureRed();
            n.limitActivityProxy.isHaveTypeActive(
                n.limitActivityProxy.TANG_YUAN_ID
            ) && n.tangyuanProxy.sendOpenActivity();
            n.limitActivityProxy.isHaveTypeActive(
                n.limitActivityProxy.GAO_DIAN_ID
            ) && n.gaodianProxy.sendOpenActivity();
            this.scheduleOnce(()=>{
                n.jiJinChengZhangProxy.openInfo()
                console.log("send");
            },1.5);
        };
        e.prototype.onRoleShow = function () {
            this.roleSpine.updatePlayerShow();
        };
        e.prototype.onConfidanteShow = function () {
            var t = n.confidanteProxy.info;
            //更新陪伴皇子
            this.nodeConfidante.active = t.id > 0;

            var clothe = t.id;
            for (var key in t.heros) {
                if (t.heros[key].id == t.id) {
                    clothe = t.heros[key].clothes_id > 0 ? t.heros[key].clothes_id : t.id;
                    break;
                }
            }

            var tmp = localcache.getItem(localdb.table_confidante_clothe, clothe);
            if (tmp) {
                this.conUrl.url = i.uiHelps.getServantSpine(tmp.res);
            }
            else {
                this.conUrl.url = i.uiHelps.getServantSpine(clothe);
            }

            //情愫文本灰态
            _.shaderUtils.setImageGray(
                this.imgConfidante,
                n.confidanteProxy.info.heros.length <= 0
            );
        };
        e.prototype.setActionChange = function () {
            cc.inputManager.setAccelerometerEnabled(
                s.Config.main_tuoluo_action
            );
        };
        e.prototype.addEvent = function () {
            cc.inputManager.setAccelerometerEnabled(
                s.Config.main_tuoluo_action
            );
            var t = this,
                e = cc.EventListener.create({
                    event: cc.EventListener.ACCELERATION,
                    callback: function (e, o) {
                        if (s.Config.main_tuoluo_action) {
                            t._speed.x = e.x;
                            t._speed.y = e.y;
                            if (
                                Math.abs(t._speed.x) > 0.5 ||
                                Math.abs(t._speed.y) > 0.5
                            ) {
                                t._speed.x = t._speed.x < -1 ? -1 : t._speed.x;
                                t._speed.x = t._speed.x > 1 ? 1 : t._speed.x;
                                t._speed.y = t._speed.y < -1 ? -1 : t._speed.y;
                                t._speed.y = t._speed.y > 1 ? 1 : t._speed.y;
                                t.updateScroll();
                            }
                        }
                    }.bind(this)
                });
            cc.eventManager.addListener(e, this.node);
        };
        e.prototype.updateScroll = function () {
            this._off = this.scroll.getScrollOffset();
            this._off.x =
                ((this._speed.x / 50) * this._offMax.x) / 2 - this._off.x;
            this._off.y =
                ((-(this._speed.y + 0.5) / 40) * this._offMax.y) / 2 +
                this._off.y;
            this._off.x = this._off.x < 0 ? 0 : this._off.x;
            this._off.y = this._off.y < 0 ? 0 : this._off.y;
            this._off.x =
                this._off.x > this._offMax.x ? this._offMax.x : this._off.x;
            this._off.y =
                this._off.y > this._offMax.y ? this._offMax.y : this._off.y;
            this.scroll.scrollToOffset(this._off);
        };

        e.prototype.updateJyUrl = function () {
            var t = this;
            if (this.jyUrlSh) {
                this.jyUrlSh.loadHandle = function () {
                    var e = t.jyUrlSh.node.children[0];
                    e && (e = e.children[0]) && (e.color = l.utils.BLACK);
                };
                var e = "";
                if (n.playerProxy.heroShow > 200) {
                    var o = localcache.getItem(
                        localdb.table_wife,
                        n.playerProxy.heroShow - 200
                    );
                    o && o.res && (e = i.uiHelps.getWifeBody(o.res));
                } else e = i.uiHelps.getServantSpine(n.playerProxy.heroShow);
                this.jyUrl.url = e;
                this.jyUrlSh.url = e;
            }
            //add by cjf 主场景日常角色模型变化
            if (this.zwUrl) {
                this.zwUrl.loadHandle = function () {
                    var e = t.zwUrl.node.children[0];
                    e && (e = e.children[0]) && (e.color = l.utils.BLACK);
                };
                e = "";
                if (n.playerProxy.zwHeroShow > 200) {
                    o = localcache.getItem(
                        localdb.table_wife,
                        n.playerProxy.zwHeroShow - 200
                    );
                    o && o.res && (e = i.uiHelps.getWifeBody(o.res));
                } else e = i.uiHelps.getServantSpine(n.playerProxy.zwHeroShow);
                this.zwUrl.url = e;
            }
        };

        e.prototype.updateTitleShow = function () {
            this.nodeHG.active = this.nodeHougong.node.active =
                r.funUtils.isOpenFun(r.funUtils.wifeView) || s.Config.DEBUG;

            //this.nodeFriends.interactable = r.funUtils.isOpenFun(r.funUtils.haoyou);  //好友
            this.nodeJY.interactable = r.funUtils.isOpenFun(
                r.funUtils.jingyingView
            );
            this.nodeZW.interactable = r.funUtils.isOpenFun(
                r.funUtils.zhengwuView
            );
            this.nodeClothe.interactable = r.funUtils.isOpenFun(
                r.funUtils.userClothe
            );
            _.shaderUtils.setImageGray(
                this.imgZhengwu,
                !this.nodeZW.interactable
            );
            _.shaderUtils.setImageGray(
                this.imgJingYing,
                !this.nodeJY.interactable
            );
            _.shaderUtils.setImageGray(
                this.imgClothe,
                !this.nodeClothe.interactable
            );
            _.shaderUtils.setImageGray(
                this.imgHaoYou,
                !r.funUtils.isOpenFun(r.funUtils.haoyou)
            );
            this.nodeXF.node.active = r.funUtils.isOpenFun(
                r.funUtils.xunFangView
            );
            this.nodeTreasure.node.active = r.funUtils.isOpenFun(
                r.funUtils.treasureView
            );
            this.nodeJinban.node.active = r.funUtils.isOpenFun(
                r.funUtils.jibanView
            );
        };
        e.prototype.updateEmailShow = function () { };
        e.prototype.onClickOpenUnEffect = function (t, e) {
            r.funUtils.openViewUrl(e + "");
        };
        e.prototype.onClickOpen = function (t, e) {
            facade.send("SHOW_CLOSE_EFFECT", e);
        };
        e.prototype.onClickLianMeng = function () {
            n.unionProxy.clubInfo
                ? l.utils.openPrefabView("union/UnionMain")
                : l.utils.openPrefabView("union/UnionView");
        };
        e.prototype.moonCardUpdate = function () {
            this.scheduleOnce(this.onTimerMoon, 3);
        };
        e.prototype.onTimerMoon = function () {
            n.welfareProxy.sendOrderBack();
        };
        e.prototype.onClickConfidante = function () {
            if(n.confidanteProxy.info)
            {
                this.onConfidanteViewShow();
            }
        };
        e.prototype.onConfidanteViewShow = function () {
            this.onClickOpenUnEffect(null, "renmai/RenMaiView");
        };
        __decorate([p(cc.Node)], e.prototype, "email", void 0);
        __decorate([p(cc.Button)], e.prototype, "nodeHougong", void 0);
        __decorate([p(cc.Button)], e.prototype, "nodeZW", void 0);
        __decorate([p(cc.Button)], e.prototype, "nodeJY", void 0);
        __decorate([p(cc.Button)], e.prototype, "nodeXF", void 0);
        __decorate([p(cc.Button)], e.prototype, "nodeJinban", void 0);
        __decorate([p(cc.Button)], e.prototype, "nodeTreasure", void 0);
        __decorate([p(cc.Button)], e.prototype, "nodeClothe", void 0);
        __decorate([p(cc.Button)], e.prototype, "nodeFriends", void 0);
        __decorate([p(cc.Node)], e.prototype, "nodeHG", void 0);
        __decorate([p(a.default)], e.prototype, "jyUrl", void 0);
        __decorate([p(a.default)], e.prototype, "jyUrlSh", void 0);
        //add by cjf 
        __decorate([p(a.default)], e.prototype, "zwUrl", void 0);
        __decorate([p(cc.ScrollView)], e.prototype, "scroll", void 0);
        __decorate([p(c.default)], e.prototype, "roleSpine", void 0);
        __decorate([p(cc.Sprite)], e.prototype, "imgClothe", void 0);
        __decorate([p(cc.Sprite)], e.prototype, "imgJingYing", void 0);
        __decorate([p(cc.Sprite)], e.prototype, "imgZhengwu", void 0);
        __decorate([p(cc.Sprite)], e.prototype, "imgHaoYou", void 0);
        __decorate([p(a.default)], e.prototype, "conUrl", void 0);     //
        __decorate([p(cc.Sprite)], e.prototype, "imgConfidante", void 0);
        __decorate([p(cc.Node)], e.prototype, "nodeConfidanteLabel", void 0);    //
        __decorate([p(cc.Node)], e.prototype, "nodeConfidante", void 0);    //
        return (e = __decorate([u], e));
    })(cc.Component);
o.default = h;
