var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../Initializer"),
    n = require("../../component/RenderListItem"),
    l = require("../../utils/Utils"),
    r = require("../user/UserHeadItem"),
    a = require("../chenghao/ChengHaoItem"),
    s = require("../../Config"),
    c = require("../../models/TimeProxy"),
    _ = cc._decorator,
    d = _.ccclass,
    u = _.property,
    p = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblShili = null;
            e.lblLv = null;
            e.lblGX = null;
            e.lblTime = null;
            e.imgRank = null;
            e.ranks = [];
            e.btnApply = null;
            e.nodeChange = null;
            e.head = null;
            e.chengHao = null;
            return e;
        }
        e.prototype.onLoad = function () {
            this.btnApply &&
                this.btnApply.clickEvents &&
                this.btnApply.clickEvents.length > 0 &&
                (this.btnApply.clickEvents[0].customEventData = this);
        };
        e.prototype.showData = function () {
            var t = this._data;
            if (t) {
                if (
                    s.Config.isShowChengHao &&
                    c.funUtils.isOpenFun(c.funUtils.chenghao)
                ) {
                    var e = localcache.getItem(
                        localdb.table_fashion,
                        t.chenghao
                    );
                    this.chengHao.data = e;
                }
                this.nodeChange &&
                    (this.nodeChange.active =
                        i.unionProxy.memberInfo.post <= 3 &&
                        i.unionProxy.memberInfo.post < t.post);
                0 == t.sex || t.sex, parseInt(t.job + "");
                this.lblName.string =
                    t.name + "(" + i.unionProxy.getPostion(t.post) + ")";
                this.lblShili.string = l.utils.formatMoney(t.shili);
                var o = localcache.getItem(localdb.table_officer, t.level);
                this.lblLv.string = o ? o.name : "";
                this.lblGX.string = t.allGx + "";
                this.lblTime.string = l.timeUtil.getDateDiff(t.loginTime);
                this.head.setUserHead(t.job, t.headavatar);
            }
        };
        e.prototype.onClickHead = function () {
            var t = this._data;
            t && i.playerProxy.sendGetOther(t.id);
        };
        __decorate([u(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblShili", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblLv", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblGX", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([u(cc.Sprite)], e.prototype, "imgRank", void 0);
        __decorate([u([cc.SpriteFrame])], e.prototype, "ranks", void 0);
        __decorate([u(cc.Button)], e.prototype, "btnApply", void 0);
        __decorate([u(cc.Node)], e.prototype, "nodeChange", void 0);
        __decorate([u(r.default)], e.prototype, "head", void 0);
        __decorate([u(a.default)], e.prototype, "chengHao", void 0);
        return (e = __decorate([d], e));
    })(n.default);
o.default = p;