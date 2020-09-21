var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/Utils"),
    r = require("../../Initializer"),
    a = require("../../utils/UIUtils"),
    s = require("../servant/ServantStarShow"),
    c = require("../item/ItemSlotUI"),
    _ = cc._decorator,
    d = _.ccclass,
    u = _.property,
    p = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblZz = null;
            e.tablentList = null;
            e.tablentNode = null;
            e.urlArr = [];
            e.nameArr = [];
            e.nodeArr = [];
            e.url_1 = null;
            e.url_2 = null;
            e.stars = null;
            e.itemSlot = null;
            e.lblLeader = null;
            e.lblCount = null;
            e.nodeOwned = null;
            e.nodeGeted = null;
            e.nodeGo = null;
            e.leaderNode = null;
            e.leader = null;
            e.lblTime = null;
            e.itemNum = null;
            e.curSelect = null;
            e.posY = {};
            e._curIndex = 0;
            e._leaderPosX = 0;
            e.isClick = !1;
            e.isMoving = !1;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                r.fourKingProxy.FOURKING_DATA_UPDATE,
                this.onDatUpdate,
                this
            );
            facade.subscribe(
                r.playerProxy.PLAYER_USER_UPDATE,
                this.onDatUpdate,
                this
            );
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClose, this);
            this.posY = {
                0: this.nodeArr[0].y,
                1: this.nodeArr[1].y,
                2: this.nodeArr[2].y,
                3: this.nodeArr[3].y
            };
            r.fourKingProxy.sendOpenPrince();
            this._leaderPosX = this.leaderNode.x;
        };
        e.prototype.onDatUpdate = function() {
            var t = this,
                e = r.fourKingProxy.data;
            if (e) {
                a.uiUtils.countDown(e.info.eTime, this.lblTime, function() {
                    l.timeUtil.second >= e.info.eTime &&
                        (t.lblTime.string = i18n.t("ACTHD_OVERDUE"));
                });
                for (var o = new Array(), i = 0; i < e.rwd.length; i++) {
                    if (i < this.urlArr.length) {
                        this.urlArr[i].url = a.uiHelps.getServantSpine(
                            e.rwd[i].heroid
                        );
                        this.nameArr[i].url = a.uiHelps.getStoryRoleName(
                            e.rwd[i].heroid
                        );
                    }
                    o.push(e.rwd[i].heroid);
                }
                this.itemSlot.data = {
                    id: e.rwd[this._curIndex].itemid
                };
                this.lblLeader.string = r.servantProxy.getFourKingActivieStr(
                    o[0]
                );
            }
        };
        e.prototype.onClickRecharge = function() {
            var t = r.fourKingProxy.data.rwd[this._curIndex];
            if (t) {
                if (r.bagProxy.getItemCount(t.itemid) < t.need) {
                    l.alertUtil.alertItemLimit(t.itemid);
                    return;
                }
                r.limitActivityProxy.sendGetActivityReward(
                    r.limitActivityProxy.FOURKING_ID,
                    0 == t.heroid ? t.heroid + 200 : t.heroid
                );
                this.onClickBg();
                this.onLoad();
            }
        };
        e.prototype.onClickRole = function(t, e) {
            this._curIndex = e;
            this.itemNum.active = !0;
            var o = r.fourKingProxy.data.rwd[this._curIndex];
            this.itemSlot.data = {
                id: o.itemid
            };
            var i = r.bagProxy.getItemCount(o.itemid);
            this.lblCount.string = i18n.t("COMMON_NUM", {
                f: i,
                s: o.need
            });
            for (var n = 0; n < this.nodeArr.length; n++) {
                if (parseInt(e) == n) {
                    this.nodeArr[n].setSiblingIndex(3);
                    this.nodeArr[n].y = this.posY[n + ""] - 82;
                } else {
                    0 == n || 3 == n
                        ? this.nodeArr[n].setSiblingIndex(0)
                        : 2 == n
                        ? this.nodeArr[n].setSiblingIndex(1)
                        : 1 == n && this.nodeArr[n].setSiblingIndex(2);
                    this.nodeArr[n].y = this.posY[n + ""];
                }
                this.nameArr[n].node.active = n == parseInt(e);
                this.urlArr[n].node.scale = n == parseInt(e) ? 0.62 : 0.52;
            }
            parseInt(e) < r.fourKingProxy.data.rwd.length &&
                (this.curSelect = r.fourKingProxy.data.rwd[parseInt(e)].heroid);
            this.showTanlent();
        };
        e.prototype.showTanlent = function() {
            var t = localcache.getItem(localdb.table_hero, this.curSelect),
                e = [];
            if (t) {
                this.lblName.string = t.name;
                for (var o = 0, i = 0; i < t.skills.length; i++) {
                    var n = localcache.getItem(
                        localdb.table_epSkill,
                        t.skills[i].id
                    );
                    o += n.star;
                    var l = {};
                    l.id = n.sid;
                    l.level = l.hlv = 0;
                    e.push(l);
                }
                this.lblZz.string = i18n.t("SERVANT_PROP_TOTAL", {
                    value: o
                });
                this.stars.setValue(t.star);
                this.url_1.url = a.uiHelps.getLangSp(t.spec[0]);
                this.url_2.node.active = t.spec.length > 1;
                t.spec.length > 1 &&
                    (this.url_2.url = a.uiHelps.getLangSp(t.spec[1]));
            }
            this.tablentList.data = e;
            this.tablentNode.active = !0;
            var s = r.servantProxy.getHeroData(this.curSelect);
            this.nodeOwned.active =
                null != s &&
                0 != r.fourKingProxy.data.rwd[this._curIndex].open &&
                r.fourKingProxy.data.rwd[this._curIndex].open != this.curSelect;
            this.nodeGeted.active =
                r.fourKingProxy.data.rwd[this._curIndex].open == this.curSelect;
            this.nodeGo.active =
                r.fourKingProxy.data.rwd[this._curIndex].open &&
                0 != r.fourKingProxy.data.rwd[this._curIndex].open;
        };
        e.prototype.onClickBg = function() {
            for (var t = 0; t < this.nodeArr.length; t++) {
                this.nodeArr[t].y = this.posY[t + ""];
                this.nameArr[t].node.active = !1;
                this.urlArr[t].node.scale = 0.52;
            }
            this.itemNum.active = !1;
            this.tablentNode.active = !1;
            this.nodeArr[0].setSiblingIndex(0);
            this.nodeArr[1].setSiblingIndex(2);
            this.nodeArr[2].setSiblingIndex(1);
            this.nodeArr[3].setSiblingIndex(0);
            this.curSelect = null;
        };
        e.prototype.onClickClose = function() {
            l.utils.closeView(this);
        };
        e.prototype.onClickLeader = function() {
            if (1 != this.isMoving) {
                this.isMoving = !0;
                if (0 == this.isClick) {
                    this.isClick = !0;
                    var t = cc.moveTo(1, cc.p(this.leader.x, this.leader.y));
                    this.leaderNode.runAction(t);
                    this.scheduleOnce(function() {
                        this.isMoving = !1;
                    }, 1);
                } else {
                    this.isClick = !1;
                    t = cc.moveTo(1, cc.p(this._leaderPosX, this.leader.y));
                    this.leaderNode.runAction(t);
                    this.scheduleOnce(function() {
                        this.isMoving = !1;
                    }, 1);
                }
            }
        };
        __decorate([u(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblZz", void 0);
        __decorate([u(i.default)], e.prototype, "tablentList", void 0);
        __decorate([u(cc.Node)], e.prototype, "tablentNode", void 0);
        __decorate([u([n.default])], e.prototype, "urlArr", void 0);
        __decorate([u([n.default])], e.prototype, "nameArr", void 0);
        __decorate([u([cc.Node])], e.prototype, "nodeArr", void 0);
        __decorate([u(n.default)], e.prototype, "url_1", void 0);
        __decorate([u(n.default)], e.prototype, "url_2", void 0);
        __decorate([u(s.default)], e.prototype, "stars", void 0);
        __decorate([u(c.default)], e.prototype, "itemSlot", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblLeader", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([u(cc.Node)], e.prototype, "nodeOwned", void 0);
        __decorate([u(cc.Node)], e.prototype, "nodeGeted", void 0);
        __decorate([u(cc.Node)], e.prototype, "nodeGo", void 0);
        __decorate([u(cc.Node)], e.prototype, "leaderNode", void 0);
        __decorate([u(cc.Node)], e.prototype, "leader", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([u(cc.Node)], e.prototype, "itemNum", void 0);
        return (e = __decorate([d], e));
    })(cc.Component);
o.default = p;
