var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../Initializer"),
    r = require("../../utils/Utils"),
    a = require("../../utils/UIUtils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.nameText = null;
            e.fatherText = null;
            e.honorText = null;
            e.slText = null;
            e.childImg = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.nameText.string = t.sname;
                this.fatherText.string = i18n.t("SON_FATHER_NAME", {
                    name: t.fname
                });
                this.honorText.string = i18n.t("SON_HONOUR_TEXT", {
                    str: l.sonProxy.getHonourStr(t.honor)
                });
                var e = t.ep.e1 + t.ep.e2 + t.ep.e3 + t.ep.e4;
                this.slText.string = i18n.t("SON_TOTAL_PROP", {
                    value: e
                });
                this.childImg.url = a.uiHelps.getKejuBody(t.honor, t.sex);
                l.sonProxy.tiQinObj.tUid = t.fuid;
                l.sonProxy.tiQinObj.tSid = t.sonuid;
            }
        };
        e.prototype.onClickSelect = function() {
            r.utils.openPrefabView("marry/MySonListView", null, this._data);
        };
        __decorate([_(cc.Label)], e.prototype, "nameText", void 0);
        __decorate([_(cc.Label)], e.prototype, "fatherText", void 0);
        __decorate([_(cc.Label)], e.prototype, "honorText", void 0);
        __decorate([_(cc.Label)], e.prototype, "slText", void 0);
        __decorate([_(n.default)], e.prototype, "childImg", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;
