var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/UIUtils"),
    init = require("../../utils/Utils"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblAdd = null;
            e.prop = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.prop.url = l.uiHelps.getLangSp(t.prop);
                if(init.stringUtil.isBlank(t.type))
                {
                    this.lblAdd.string = "+" + t.value;
                }
                else
                {
                    if(t.type == 1)
                    {
                        this.lblAdd.string = "+" + t.value;
                    }
                    else
                    {
                        this.lblAdd.string = "+" + t.value / 100 + "%";
                    }
                }
                
            }
        };
        __decorate([s(cc.Label)], e.prototype, "lblAdd", void 0);
        __decorate([s(n.default)], e.prototype, "prop", void 0);
        return (e = __decorate([a], e));
    })(i.default);
o.default = c;
