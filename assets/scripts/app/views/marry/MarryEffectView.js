var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../Initializer"),
    l = require("../../component/ChildSpine"),
    r = require("../servant/ServantStarShow"),
    a = require("../../component/List"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName1 = null;
            e.lblFather1 = null;
            e.lblShuXing1 = null;
            e.lblName2 = null;
            e.lblFather2 = null;
            e.lblShuXing2 = null;
            e.roel1 = null;
            e.roel2 = null;
            e.lblSf1 = null;
            e.lblSf2 = null;
            e.stars1 = null;
            e.stars2 = null;
            e.list1 = null;
            e.list2 = null;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = this.node.openParam;
            if (t) {
                var e = n.sonProxy.getSon(t.sid);
                if (e) {
                    this.lblName1.string = e.name;
                    localcache.getItem(localdb.table_wife, e.mom);
                    this.lblFather1.string = n.playerProxy.userData.name;
                    var o = e.ep.e1 + e.ep.e2 + e.ep.e3 + e.ep.e4;
                    this.lblShuXing1.string = o + "";
                    this.lblName2.string = e.spouse.sname;
                    this.lblFather2.string = e.spouse.fname;
                    var i =
                        e.spouse.ep.e1 +
                        e.spouse.ep.e2 +
                        e.spouse.ep.e3 +
                        e.spouse.ep.e4;
                    this.lblShuXing2.string = i + "";
                    this.roel1.setMarry(e.id, e.sex);
                    this.roel2.setMarry(e.spouse.sonuid, e.spouse.sex);
                    this.lblSf1.string = n.sonProxy.getHonourStr(e.honor);
                    this.lblSf2.string = n.sonProxy.getHonourStr(
                        e.spouse.honor
                    );
                    this.stars1.setValue(e.talent);
                    this.stars2.setValue(e.spouse.talent);
                    this.list1.node.x = -this.list1.node.width / 2;
                    this.list2.node.x = -this.list2.node.width / 2;
                }
            }
        };
        e.prototype.onClickClose = function() {
            facade.send("MARRY_EFFECT_END");
            i.utils.closeView(this);
        };
        __decorate([_(cc.Label)], e.prototype, "lblName1", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblFather1", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblShuXing1", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblName2", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblFather2", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblShuXing2", void 0);
        __decorate([_(l.default)], e.prototype, "roel1", void 0);
        __decorate([_(l.default)], e.prototype, "roel2", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblSf1", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblSf2", void 0);
        __decorate([_(r.default)], e.prototype, "stars1", void 0);
        __decorate([_(r.default)], e.prototype, "stars2", void 0);
        __decorate([_(a.default)], e.prototype, "list1", void 0);
        __decorate([_(a.default)], e.prototype, "list2", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
