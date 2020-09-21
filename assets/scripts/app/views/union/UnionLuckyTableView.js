var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../truntable/TrunTableItem"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = require("../../component/List"),
    a = require("../../utils/UIUtils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;

            e.items = [];
            e.curIndex = 0;
            e.roundIndex = 0;
            e.isFirst = !0;
            e.oldScore = 0;
            return e;
        }
        e.prototype.onLoad = function () {
            facade.subscribe(
                n.unionProxy.UNION_DRAW_DATA_UPDATE,
                this.onDataUpdate,
                this
            );
            this.onDataUpdate();

            this.temp = 0;
        };
        e.prototype.onDataUpdate = function () {

            var set = localcache.getList(localdb.table_unionDraw);

            for (var t = 0; t < this.items.length; t++) {
                if (t < set.length) {
                    this.items[t].data = set[t].items;
                    this.items[t].select = 0 == t;
                }
            }
            if (n.unionProxy.drawData) {
                this.curIndex = n.unionProxy.drawData.index;
                n.unionProxy.drawData = null;
                this.showEff(0);
            }
        };
        e.prototype.showEff = function (t) {
            this.unscheduleAllCallbacks();
            this.schedule(this.showSelect, t);
        };
        e.prototype.showSelect = function () {

            var len = this.items.length;
            for (
                var t = this.roundIndex % 10, e = 0; e < this.items.length; e++
            )
                this.items[e].select = t == e;
            this.roundIndex++;
            if (this.roundIndex >= len && this.roundIndex < len * 2)
                this.showEff(0.03);
            else if (this.roundIndex >= len * 2 && this.roundIndex < len * 3)
                this.showEff(0.03 + (this.roundIndex - len * 2) / 200);
            else if (this.roundIndex >= len * 3 + this.curIndex && this.roundIndex < 100) {
                this.roundIndex = 0;
                this.curIndex = 0;
                this.unscheduleAllCallbacks();
                n.timeProxy.floatReward();
                this.wholeData = null;
            }
        };
        e.prototype.onClickRoll = function (t, e) {
            /*
                        if (0 == this.curIndex) {
                            this.curIndex = this.temp % 10 + 1;
                            this.temp++;
                            this.showEff(0);
                        } else {
                            l.alertUtil.alert18n("UNION_TABLE_IS_ROLLING");
                        }


                        return;*/
            if (0 == this.curIndex) {
                var type = parseInt(e);
                var cost = localcache.getItem(localdb.table_unionDrawCost, type).total;
                if (n.unionProxy.memberInfo.leftgx < cost) {
                    l.alertUtil.alert18n("UNION_gongxian_LESS");

                } else n.unionProxy.sendDraw(type);
            } else l.alertUtil.alert18n("UNION_TABLE_IS_ROLLING");
        };

        e.prototype.onClickClose = function () {
            l.utils.closeView(this);
        };

        __decorate([_([i.default])], e.prototype, "items", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;