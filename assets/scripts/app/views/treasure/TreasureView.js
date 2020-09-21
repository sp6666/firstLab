var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("./TreasureGroups"),
    l = require("../../Initializer"),
    r = require("../../utils/ShaderUtils"),
    a = require("../../utils/UIUtils"),
    s = require("../../models/TimeProxy"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.groups = null;
            e.clear = null;
            e.nodeLeft = null;
            e.ndoeRight = null;
            e.lblScore = null;
            e.lblAdd = null;
            e.curIndex = 0;
            e.maxIndex = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            this.maxIndex =
                Math.ceil(
                    l.treasureProxy.tGroupList.length / this.groups.items.length
                ) - 1;
            this.updateClear();
            this.showCur();
            facade.subscribe(
                l.treasureProxy.UPDATE_TREASURE_TREASURE,
                this.showCur,
                this
            );
            facade.subscribe(
                l.treasureProxy.UPDATE_TREASURE_CLEAR,
                this.updateClear,
                this
            );
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onMoveLeft, this);
            facade.subscribe("UI_TOUCH_MOVE_RIGHT", this.onMoveRight, this);
            this.ndoeRight.active = this.nodeLeft.active =
                l.treasureProxy.tGroupList.length > this.groups.items.length;
            a.uiUtils.scaleRepeat(this.ndoeRight, 0.95, 1.05);
            a.uiUtils.scaleRepeat(this.nodeLeft, 0.95, 1.05);
            this.checkOpenGet();
        };
        e.prototype.getAdd = function() {
            var t = l.treasureProxy.treasure
                    ? l.treasureProxy.treasure.length
                    : 1,
                e = localcache.getItem(localdb.table_treasureDay, t);
            return e ? e.reward[0].count : 0;
        };
        e.prototype.checkOpenGet = function() {
            for (
                var t = !1, e = i.utils.getParamInt("treasure_com_item"), o = 0;
                o < l.treasureProxy.tGroupList.length;
                o++
            ) {
                for (
                    var n = l.treasureProxy.tGroupList[o], r = 0, a = 0;
                    a < n.items.length;
                    a++
                ) {
                    var s = n.items[a];
                    if (l.bagProxy.getItemCount(s.data.itemid) > 0) {
                        t = !0;
                        break;
                    }
                    if (
                        l.bagProxy.getItemCount(s.data.tagid) >=
                            s.data.tagnum &&
                        (0 == s.rwd || s.data.tagid != e)
                    ) {
                        t = !0;
                        break;
                    }
                    r += 1 == s.rwd ? 1 : 0;
                }
                r >= n.items.length && 0 == n.rwd && (t = !0);
            }
            t && i.utils.openPrefabView("treasure/TreasureGet", !0);
        };
        e.prototype.onMoveLeft = function() {
            this.onClickShow(null, -1);
        };
        e.prototype.onMoveRight = function() {
            this.onClickShow(null, 1);
        };
        e.prototype.onClickShow = function(t, e) {
            var o = parseInt(e);
            if (0 != this.curIndex || -1 != o) {
                this.curIndex += o;
                this.curIndex =
                    this.curIndex < 0 ? this.maxIndex : this.curIndex;
                this.curIndex =
                    this.curIndex > this.maxIndex ? 0 : this.curIndex;
                this.showCur();
            } else this.onClickClost();
        };
        e.prototype.showCur = function() {
            for (var t = [], e = this.groups.items.length, o = 0; o < e; o++) {
                var n = this.curIndex * e + o;
                l.treasureProxy.tGroupList.length > n &&
                    t.push(l.treasureProxy.tGroupList[n]);
            }
            this.lblAdd.string = i18n.t("TREASURE_CLEAR_TIP", {
                v: i.utils.formatMoney(this.getAdd())
            });
            this.groups.data = t;
        };
        e.prototype.updateClear = function() {
            r.shaderUtils.setImageGray(this.clear, l.treasureProxy.isClear);
            this.lblScore.string = l.treasureProxy.score + "";
        };
        e.prototype.onClickClost = function() {
            i.utils.closeView(this, !0);
        };
        e.prototype.onClickClear = function() {
            0 != l.treasureProxy.treasure.length
                ? l.treasureProxy.isClear || l.treasureProxy.sendClear()
                : i.alertUtil.alert18n("TREASURE_CLEAR_LIMIT");
        };
        e.prototype.onClickTidy = function() {
            s.funUtils.openView(s.funUtils.treasureTidy.id);
        };
        e.prototype.onClickRank = function() {
            l.treasureProxy.sendRank();
        };
        __decorate([d(n.default)], e.prototype, "groups", void 0);
        __decorate([d(cc.Sprite)], e.prototype, "clear", void 0);
        __decorate([d(cc.Node)], e.prototype, "nodeLeft", void 0);
        __decorate([d(cc.Node)], e.prototype, "ndoeRight", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblScore", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblAdd", void 0);
        return (e = __decorate([_], e));
    })(cc.Component);
o.default = u;
