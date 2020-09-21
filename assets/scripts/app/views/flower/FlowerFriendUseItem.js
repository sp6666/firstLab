var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    s = require("../../component/SelectMax"),
    l = require("../../Initializer"),
    n = require("../user/UserHeadItem"),
    ii = require("../../utils/Utils"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.userHead = null;
            e.silder = null;
            e.lblName = null;
            e.lblFriend = null;
            return e;
        }

        e.prototype.onLoad = function () {

        };

        e.prototype.use = function () {
            var num = l.bagProxy.getItemCount(l.flowerFriendProxy.flowerInfo.id);
            if(this.silder.curValue > num) {
                ii.alertUtil.alert18n("ITEMS_NUMBER_SHORT");
                return;
            }
            l.flowerFriendProxy.sendZY(this.data.fuid, this.silder.curValue);
        };

        e.prototype.onClickRole = function () {

            l.playerProxy.sendGetOther(this.data.fuid);

        };

        e.prototype.showData = function () {

            this.silder.max = l.flowerFriendProxy.flowerInfo.count;

            var t = this.data;
            if (t) {
                this.lblFriend.string = i18n.t("HAOYOU_YOU_QING", {
                    count: t.fnum
                });
                this.lblName.string = t.name;
                this.userHead.setUserHead(t.job, t.headavatar);
            }
        };

        __decorate([d(s.default)], e.prototype, "silder", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblFriend", void 0);
        __decorate([d(n.default)], e.prototype, "userHead", void 0);
        return (e = __decorate([_], e));
    })(i.default);
o.default = u;