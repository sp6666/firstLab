var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../Initializer"),
    n = require("../../utils/Utils"),
    l = require("./FlowerChenItem"),
    r = require("../../component/List"),
    a = require("../../utils/UIUtils"),
    cfg = require("../../Config"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.nodeContext = null;
            e.item = null;
            e.logList = null;
            e.ndoeUnlog = null;
            e.lblCount = null;
            e.AndroidLv = null;
            e._curIndex = 0;
            e._rends = [];
            e._itemW = 0;
            e._itemH = 0;
            e._wc = 0;
            e._hc = 0;
            e._randArr = [];
            e._objIDs = {};
            e._index = -1;
            return e;
        }
        e.prototype.onLoad = function () {
            i.flowerProxy.sendInfo();

            this.item.active = !1;
            this._itemW = this.item.width;
            this._itemH = this.item.height;
            this._wc = Math.ceil(this.nodeContext.width / (this._itemW + 20));
            this._hc = Math.ceil(this.nodeContext.height / (this._itemH + 20));
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClost, this);
            facade.subscribe("CLEAR_CHEN", this.onClearChen, this);
            facade.subscribe(
                i.flowerProxy.UPDATE_FLOWER_CHENLU,
                this.onUpdateShow,
                this
            );
            facade.subscribe(
                i.flowerProxy.UPDATE_FLOWER_LOGS,
                this.onUpdateLog,
                this
            );
            facade.subscribe(
                i.flowerProxy.UPDATE_FLOWER_CD,
                this.updateTime,
                this
            );

            //更新保护
            facade.subscribe(
                i.flowerProxy.UPDATE_FLOWER_PROTECT,
                this.onProtect,
                this
            );

            //关闭保护
            facade.subscribe(
                i.flowerProxy.UPDATE_FLOWER_PROTECT_COUNT_OVER,
                this.onProtectOver,
                this
            );
            for (var t = 0; t < this._wc * this._hc; t++) this._randArr.push(t);
            this._randArr.sort(function (t, e) {
                return 10 * Math.random() < 5 ? 1 : -1;
            });
            this.schedule(this.onDelayCreate, 0.05);
            this.updateTime();
            this.onUpdateLog();
            this.onProtect();
        };
        e.prototype.updateTime = function () {
            if (null != i.flowerProxy.cd) {
                var t = i.flowerProxy.cd,
                    e = n.utils.getParamInt("flower_count");
                t.num < e ?
                    a.uiUtils.countDown(
                        t.next,
                        this.lblCount,
                        function () {
                            i.playerProxy.sendAdok(t.label);
                        },
                        0 == t.num
                    ) :
                    this.lblCount.unscheduleAllCallbacks();
                t.num > 0 &&
                    (this.lblCount.string = i18n.t("COMMON_NUM", {
                        f: t.num,
                        s: e
                    }));
            }
        };



        e.prototype.onUpdateLog = function () {
            this.ndoeUnlog.active =
                null == i.flowerProxy.logs || 0 == i.flowerProxy.logs.length;
            this.logList.data = i.flowerProxy.logs;
        };
        e.prototype.onUpdateShow = function () {
            if (null != i.flowerProxy.chenlu) {
                (this._curIndex > i.flowerProxy.chenlu.length ||
                    this._rends.length >= this._wc * this._hc) &&
                this.onUpdateRendShow();
                this._rends.length < this._wc * this._hc &&
                    this._rends.length < i.flowerProxy.chenlu.length &&
                    0 == this._curIndex &&
                    this.schedule(this.onDelayCreate, 0.05);
            }
        };
        e.prototype.onClearChen = function (t) {
            this._objIDs[t] = 0;
            delete this._objIDs[t];
        };
        e.prototype.onUpdateRendShow = function () {
            for (
                var t = i.flowerProxy.chenlu, e = 0; e < this._rends.length; e++
            )
                if (null == this._rends[e].data)
                    for (var o = 0; o < t.length; o++)
                        if (1 != t[o].rwd && 1 != this._objIDs[t[o].id]) {
                            this._rends[e].data = t[o];
                            this._objIDs[t[o].id] = 1;
                            break;
                        }
        };
        e.prototype.onDelayCreate = function () {
            if (null != i.flowerProxy.chenlu) {
                var t = i.flowerProxy.chenlu;
                t.sort(this.sortChenlu);
                if (
                    this._curIndex >= t.length ||
                    this._rends.length >= this._wc * this._hc
                ) {
                    this.unscheduleAllCallbacks();
                    this._curIndex = 0;
                } else
                    for (
                        var e = Math.min(this._curIndex + 3, t.length),
                            o = this._curIndex; o < e; o++
                    ) {
                        var r = null;
                        if (this._rends.length > this._curIndex)
                            r = this._rends[this._curIndex];
                        else {
                            var a = cc.instantiate(this.item);
                            a.active = !0;
                            r = a.getComponent(l.default);
                            this._rends.push(r);
                            this.nodeContext.addChild(a);
                            var s = this._randArr[this._curIndex],
                                c = s % this._wc,
                                _ = Math.floor(s / this._wc);
                            a.x =
                                this._itemW * c +
                                10 * Math.random() +
                                this._itemW / 2;
                            a.y = -this._itemH * _ +
                                20 * Math.random() +
                                this.nodeContext.height / 2;
                        }
                        var d = t[this._curIndex];
                        r.data = d;
                        d.time > n.timeUtil.second && r.node.setSiblingIndex(0);
                        this._objIDs[d.id] = 1;
                        this._curIndex++;
                    }
            }
        };
        //保护状态
        e.prototype.onProtect = function () {
            var e = i.flowerProxy.getProtectLeftCd();
            var canUse = i.flowerProxy.lvCanUse();
            if (e > 0 && canUse == true) {
                //出小绿人
                this.AndroidLv.active = true;
            } else {
                this.onProtectOver();
            }

        };
        //关闭保护
        e.prototype.onProtectOver = function () {
            //隐藏绿人
            this.AndroidLv.active = false;
        };

        e.prototype.sortChenlu = function (t, e) {
            return t.time < e.time ? -1 : 1;
        };

        e.prototype.onClickFriendFlowerHouse = function () {

            var inView = function () {
                n.utils.openPrefabView("flower/FlowerFriendHouse");
            }
            i.flowerFriendProxy.sendInfo(inView);
        };

        e.prototype.onClickFeild = function () {
            n.utils.openPrefabView("flower/FlowerField");
        };
        e.prototype.onClickPoint = function () {
            n.utils.openPrefabView("flower/FlowerChen");
        };
        e.prototype.onClickProtect = function () {
            if (i.flowerProxy.getProtectLeftCd() > 0)
                n.alertUtil.alert18n("FLOWER_PROTECT_HAVE");
            else {
                i.flowerProxy.getProtectCoolCd() > 0 ?
                    n.alertUtil.alert18n("FLOWER_PROTECT_COOL_LIMIT") :
                    n.utils.openPrefabView("flower/FlowerProtectSelect");
            }
        };
        e.prototype.onClickTree = function () {
            null == i.flowerProxy.level || i.flowerProxy.level.lv < 5 ?
                n.alertUtil.alert18n("FLOWER_TREE_OPEN_LIMIT") :
                n.utils.openPrefabView("flower/FlowerTree");
        };
        e.prototype.onClickSteal = function () {
            i.flowerProxy.sendStealCheck();
        };
        e.prototype.onClickClost = function () {
            n.utils.closeView(this);
        };
        e.prototype.onClickYjsq = function () {
            if (i.playerProxy.userData.vip < 4)
                n.alertUtil.alert18n("FLOWER_YI_JIAN_JIE_SUO");
            else {
                for (var t = !1, e = this._rends, o = 0; o < e.length; o++) {
                    var l = e[o].data;
                    if (!(null == l || l.time > n.timeUtil.second)) {
                        t = !0;
                        l.rwd = 1;
                        e[o].data = null;
                        facade.send("CLEAR_CHEN", l.id);
                    }
                }
                t
                    ?
                    i.flowerProxy.sendYjsq() :
                    n.alertUtil.alert18n("FLOWER_MEI_YOU_KE_SHOU_QU");
            }
        };
        __decorate([_(cc.Node)], e.prototype, "nodeContext", void 0);
        __decorate([_(cc.Node)], e.prototype, "item", void 0);
        __decorate([_(r.default)], e.prototype, "logList", void 0);
        __decorate([_(cc.Node)], e.prototype, "ndoeUnlog", void 0);
        __decorate([_(cc.Node)], e.prototype, "AndroidLv", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblCount", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;