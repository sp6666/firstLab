var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = require("../../component/ChildSpine"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblShuXing = null;
            e.childSpine = null;
            e.lblShenFen = null;
            e.lblCost = null;
            e.itemSys = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            this.childSpine.clearKid();
            if (t) {
                this.lblName.string = t.name;
                var e = t.ep.e1 + t.ep.e2 + t.ep.e3 + t.ep.e4;
                this.lblShuXing.string = e + "";
                this.childSpine.setKid(t.id, t.sex);
                this.lblShenFen.string = n.sonProxy.getHonourStr(t.honor);
                this.curData = t;
                var o = localcache.getItem(localdb.table_adult, t.honor);
                this.itemSys = localcache.getItem(localdb.table_item, o.itemid);
                this.lblCost.string =
                    i18n.t("SON_MARRY_COST_ITEM", {
                        str: this.itemSys.name
                    }) +
                    i18n.t("COMMON_NEED", {
                        f: n.bagProxy.getItemCount(this.itemSys.id),
                        s: 1
                    });
            }
        };
        e.prototype.onClickButton = function() {
            0 != n.bagProxy.getItemCount(this.itemSys.id)
                ? 1 == n.sonProxy.tiQinObj.marryType
                    ? n.sonProxy.sendJieHun(
                          n.sonProxy.tiQinObj.tUid,
                          2,
                          n.sonProxy.tiQinObj.tSid,
                          this.curData.id
                      )
                    : 2 == n.sonProxy.tiQinObj.marryType &&
                      n.sonProxy.sendAgree(
                          n.sonProxy.tiQinObj.tUid,
                          2,
                          n.sonProxy.tiQinObj.tSid,
                          this.curData.id
                      )
                : l.alertUtil.alertItemLimit(this.itemSys.id);
        };
        __decorate([c(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblShuXing", void 0);
        __decorate([c(r.default)], e.prototype, "childSpine", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblShenFen", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblCost", void 0);
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;
