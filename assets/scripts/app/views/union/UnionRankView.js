var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = require("./UnionRankItem"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblname = null;
            e.lblrank = null;
            e.list = null;
            e.item_1 = null;
            e.item_2 = null;
            e.item_3 = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.UPDATE_CLUB_RANK();
            this.UPDATE_MY_RANK();
        };
        e.prototype.eventClose = function() {
            n.utils.closeView(this);
        };
        e.prototype.onClickApply = function(t, e) {
            var o = e.data;
            if (o) {
                l.unionProxy.sendApplyUnion(o.id);
                this.eventClose();
            }
        };
        e.prototype.onClickName = function(t, e) {
            var o = e.data;
            if (o) {
                l.unionProxy.lookClubInfo = o;
                n.utils.openPrefabView("");
            }
        };
        e.prototype.UPDATE_MY_RANK = function() {
            this.lblname.string = l.unionProxy.myClubRank
                ? l.unionProxy.myClubRank.cName
                : "";
            this.lblrank.string = l.unionProxy.myClubRank
                ? l.unionProxy.myClubRank.cRid + ""
                : "";
        };
        e.prototype.UPDATE_CLUB_RANK = function() {
            this.item_1.data =
                l.unionProxy.clubList.length >= 1
                    ? l.unionProxy.clubList[0]
                    : null;
            this.item_2.data =
                l.unionProxy.clubList.length >= 2
                    ? l.unionProxy.clubList[1]
                    : null;
            this.item_3.data =
                l.unionProxy.clubList.length >= 3
                    ? l.unionProxy.clubList[2]
                    : null;
            var t = l.unionProxy.clubList.splice(
                3,
                l.unionProxy.clubList.length - 1
            );
            this.list.data = t;
        };
        __decorate([c(cc.Label)], e.prototype, "lblname", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblrank", void 0);
        __decorate([c(i.default)], e.prototype, "list", void 0);
        __decorate([c(r.default)], e.prototype, "item_1", void 0);
        __decorate([c(r.default)], e.prototype, "item_2", void 0);
        __decorate([c(r.default)], e.prototype, "item_3", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
