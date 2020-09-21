var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/UrlLoad"),
    n = require("../../utils/Utils"),
    l = require("../../utils/UIUtils"),
    r = require("../../Initializer"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.l_consumeText = null;
            e.l_name = null;
            e.roleImg = null;
            e.btnGo = null;
            e.lblGo = null;
            e._curData = null;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = this.node.openParam;
            this._curData = t;
            if (t) {
                var e = localcache.getItem(localdb.table_prisoner_pic, t.id);
                this.l_consumeText.string = i18n.t("CELL_TEACH_COST", {
                    value: t.power
                });
                this.l_name.string = e.name;
                this.roleImg.url = l.uiHelps.getCellBody(e.mod1);
                this.btnGo.active = t.id == r.cellProxy.laoFangData.da;
                this.lblGo.active = t.id != r.cellProxy.laoFangData.da;
            }
        };
        e.prototype.onClickRwd = function() {
            n.utils.openPrefabView("cell/CellReward", !1, this._curData);
        };
        e.prototype.onClickClose = function() {
            n.utils.closeView(this);
        };
        __decorate([c(cc.Label)], e.prototype, "l_consumeText", void 0);
        __decorate([c(cc.Label)], e.prototype, "l_name", void 0);
        __decorate([c(i.default)], e.prototype, "roleImg", void 0);
        __decorate([c(cc.Node)], e.prototype, "btnGo", void 0);
        __decorate([c(cc.Node)], e.prototype, "lblGo", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
