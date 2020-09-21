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
            e.lblFather = null;
            e.lblCost = null;
            e.childSpine = null;
            e.lblShenFen = null;
            e.itemSys = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.lblName.string = t.sname;
                this.lblFather.string = t.fname;
                var e = localcache.getItem(localdb.table_adult, t.honor),
                    o = localcache.getItem(localdb.table_item, e.itemid);
                this.lblCost.string =
                    i18n.t("SON_MARRY_COST_ITEM", {
                        str: o.name
                    }) +
                    i18n.t("COMMON_NEED", {
                        f: n.bagProxy.getItemCount(o.id),
                        s: 1
                    });
                this.childSpine.setKid(t.sonuid, t.sex);
                this.curData = t;
                var i = t.ep.e1 + t.ep.e2 + t.ep.e3 + t.ep.e4;
                this.lblShuXing.string = i + "";
                this.lblShenFen.string = n.sonProxy.getHonourStr(t.honor);
                this.itemSys = localcache.getItem(localdb.table_item, e.itemid);
            }
        };
        e.prototype.onClickJuJue = function() {
            n.sonProxy.sendJuJueTiQin(this.curData.fuid, this.curData.sonuid);
        };
        e.prototype.onClickSelect = function(t, e) {
            if ("1" == e) {
                if (0 == n.bagProxy.getItemCount(this.itemSys.id)) {
                    l.alertUtil.alertItemLimit(this.itemSys.id);
                    return;
                }
                1 == n.sonProxy.tiQinObj.marryType
                    ? n.sonProxy.sendJieHun(
                          this.curData.fuid,
                          2,
                          this.curData.sonuid,
                          n.sonProxy.tiQinObj.mySid
                      )
                    : 2 == n.sonProxy.tiQinObj.marryType &&
                      n.sonProxy.sendAgree(
                          this.curData.fuid,
                          2,
                          this.curData.sonuid,
                          n.sonProxy.tiQinObj.mySid
                      );
            } else
                "2" == e &&
                    l.utils.openPrefabView(
                        "marry/MySonListView",
                        null,
                        this._data
                    );
        };
        __decorate([c(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblShuXing", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblFather", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblCost", void 0);
        __decorate([c(r.default)], e.prototype, "childSpine", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblShenFen", void 0);
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;
