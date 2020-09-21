var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RoleSpine"),
    n = require("../../Initializer"),
    l = require("./FlowerStealItem"),
    r = require("../../utils/Utils"),
    a = require("../../utils/UIUtils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.nodeContext = null;
            e.item = null;
            e.role = null;
            e.lblName = null;
            e.lblName1 = null;
            e.talk = null;
            e.lblTalk = null;
            e.lblCount = null;
            e._curIndex = 0;
            e._rends = [];
            e._itemW = 0;
            e._itemH = 0;
            e._wc = 0;
            e._hc = 0;
            e._randArr = [];
            e._objIDs = {};
            return e;
        }
        e.prototype.onLoad = function() {
            this.item.active = !1;
            this._itemW = this.item.width;
            this._itemH = this.item.height;
            this._wc = Math.ceil(this.nodeContext.width / (this._itemW + 20));
            this._hc = Math.ceil(this.nodeContext.height / (this._itemH + 20));
            facade.subscribe("CLEAR_CHEN", this.onClearChen, this);
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClost, this);
            facade.subscribe(
                n.flowerProxy.UPDATE_FLOWER_STEAL,
                this.updateSteal,
                this
            );
            facade.subscribe(
                n.flowerProxy.UPDATE_FLOWER_CD,
                this.updateTime,
                this
            );
            for (var t = 0; t < this._wc * this._hc; t++) this._randArr.push(t);
            this._randArr.sort(function(t, e) {
                return 10 * Math.random() < 5 ? 1 : -1;
            });
            this.updateTime();
            this.updateSteal();
            this.updateText();
        };
        e.prototype.updateText = function() {
            var t = localcache.getList(localdb.table_flowerTalk),
                e = Math.floor(Math.random() * t.length);
            this.talk.active = !0;
            r.utils.showNodeEffect(this.talk);
            this.lblTalk.string = t[e].talk;
            this.scheduleOnce(this.hideTalk, 3);
        };
        e.prototype.hideTalk = function() {
            this.talk.active = !1;
        };
        e.prototype.updateSteal = function() {
            this.updateText();
            this._objIDs = {};
            var t = n.flowerProxy.steal.fuser;
            this.role.setClothes(t.sex, t.job, t.level, t.clothe);
            this.lblName.string = this.lblName1.string = t.name;
            for (var e = 0; e < this._rends.length; e++)
                this._rends[e].data = null;
            if (
                this._rends.length < n.flowerProxy.steal.types.length &&
                this._rends.length < this._wc * this._hc
            ) {
                this._curIndex = 0;
                this.schedule(this.onDelayCreate, 0.05);
            } else this.onUpdateRendShow();
        };
        e.prototype.updateTime = function() {
            if (null != n.flowerProxy.cd) {
                var t = n.flowerProxy.cd,
                    e = r.utils.getParamInt("flower_count");
                t.num < e
                    ? a.uiUtils.countDown(
                          t.next,
                          this.lblCount,
                          function() {
                              n.playerProxy.sendAdok(t.label);
                          },
                          0 == t.num
                      )
                    : this.lblCount.unscheduleAllCallbacks();
                t.num > 0 &&
                    (this.lblCount.string = i18n.t("COMMON_NUM", {
                        f: t.num,
                        s: e
                    }));
            }
        };
        e.prototype.onClearChen = function(t) {
            this._objIDs[t] = 0;
            delete this._objIDs[t];
            this.onUpdateRendShow();
        };
        e.prototype.onUpdateRendShow = function() {
            for (
                var t = n.flowerProxy.steal.types, e = 0;
                e < this._rends.length;
                e++
            )
                if (null == this._rends[e].data)
                    for (var o = 0; o < t.length; o++)
                        if (1 != t[o].rwd && 1 != this._objIDs[t[o].id]) {
                            this._rends[e].data = t[o];
                            this._objIDs[t[o].id] = 1;
                            break;
                        }
        };
        e.prototype.onDelayCreate = function() {
            if (
                null != n.flowerProxy.steal &&
                null != n.flowerProxy.steal.types
            ) {
                var t = n.flowerProxy.steal.types;
                if (
                    this._curIndex >= t.length ||
                    this._rends.length >= this._wc * this._hc
                ) {
                    this.unscheduleAllCallbacks();
                    this._curIndex = 0;
                    this.scheduleOnce(this.hideTalk, 3);
                } else
                    for (
                        var e = Math.min(this._curIndex + 3, t.length),
                            o = this._curIndex;
                        o < e;
                        o++
                    ) {
                        var i = null;
                        if (this._rends.length > this._curIndex)
                            i = this._rends[this._curIndex];
                        else {
                            var a = cc.instantiate(this.item);
                            a.active = !0;
                            i = a.getComponent(l.default);
                            this._rends.push(i);
                            this.nodeContext.addChild(a);
                            var s = this._randArr[this._curIndex],
                                c = s % this._wc,
                                _ = Math.floor(s / this._wc);
                            a.x =
                                this._itemW * c +
                                10 * Math.random() +
                                this._itemW / 2;
                            a.y =
                                -this._itemH * _ +
                                20 * Math.random() +
                                this.nodeContext.height / 2;
                        }
                        var d = t[this._curIndex];
                        i.data = d;
                        d.time > r.timeUtil.second && i.node.setSiblingIndex(0);
                        this._objIDs[d.id] = 1;
                        this._curIndex++;
                    }
            }
        };
        e.prototype.onClickFeild = function() {
            r.utils.openPrefabView("flower/FlowerField");
            r.utils.openPrefabView("flower/FlowerSteal");
        };
        e.prototype.onClickSteal = function() {
            n.flowerProxy.sendStealCheck();
        };
        e.prototype.onClickClost = function() {
            r.utils.closeView(this);
        };
        __decorate([_(cc.Node)], e.prototype, "nodeContext", void 0);
        __decorate([_(cc.Node)], e.prototype, "item", void 0);
        __decorate([_(i.default)], e.prototype, "role", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblName1", void 0);
        __decorate([_(cc.Node)], e.prototype, "talk", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblTalk", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblCount", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
