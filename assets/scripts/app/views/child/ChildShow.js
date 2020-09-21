var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/ChildSpine"),
    l = require("../../Initializer"),
    r = require("../servant/ServantStarShow"),
    a = require("../../component/List"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.childSpine = null;
            e.e1 = null;
            e.e2 = null;
            e.e3 = null;
            e.e4 = null;
            e.lblDes = null;
            e.stars = null;
            e.list = null;
            e.cList = [];
            e.curIndex = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            this.cList = this.node.openParam;
            this.showChild();
        };
        e.prototype.showChild = function() {
            var t = this.node.openParam;
            if (null != t) {
                var e = t[this.curIndex];
                if (e) {
                    var o = localcache.getItem(localdb.table_wife, e.wifeid);
                    this.lblDes.string = i18n.t(
                        "WIFE_CHU_YOU_CHILD_" + e.babysex,
                        {
                            name: o.wname2
                        }
                    );
                    var i = l.sonProxy.getSon(e.babyid);
                    this.e1.string = i.ep.e1 + "";
                    this.e2.string = i.ep.e2 + "";
                    this.e3.string = i.ep.e3 + "";
                    this.e4.string = i.ep.e4 + "";
                    this.childSpine.setKid(i.id, i.sex, !1);
                    this.stars.setValue(i.talent);
                    this.list.node.x = -this.list.node.width / 2;
                }
            }
        };
        e.prototype.onClickClose = function() {
            if (this.cList.length - 1 <= this.curIndex) i.utils.closeView(this);
            else {
                this.curIndex++;
                this.showChild();
            }
        };
        __decorate([_(n.default)], e.prototype, "childSpine", void 0);
        __decorate([_(cc.Label)], e.prototype, "e1", void 0);
        __decorate([_(cc.Label)], e.prototype, "e2", void 0);
        __decorate([_(cc.Label)], e.prototype, "e3", void 0);
        __decorate([_(cc.Label)], e.prototype, "e4", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblDes", void 0);
        __decorate([_(r.default)], e.prototype, "stars", void 0);
        __decorate([_(a.default)], e.prototype, "list", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
