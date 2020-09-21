var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/UrlLoad"),
    n = require("../../utils/UIUtils"),
    l = require("../../utils/Utils"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.roleImg = null;
            e.l_descText = null;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = this.node.openParam.data;
            if (t) {
                var e = localcache.getItem(localdb.table_prisoner_pic, t.id);
                this.roleImg.url = n.uiHelps.getCellBody(e.mod1);
                this.l_descText.string = "";
            }
        };
        e.prototype.onClickClost = function() {
            l.utils.closeView(this);
        };
        __decorate([s(i.default)], e.prototype, "roleImg", void 0);
        __decorate([s(cc.Label)], e.prototype, "l_descText", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
