var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/List"),
    l = require("../../component/UrlLoad"),
    r = require("../../Initializer"),
    a = require("../../utils/UIUtils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.itemList = null;
            e.berNum = null;
            e.spec_1 = null;
            e.specNum = null;
            e.berValue = null;
            e.btns = [];
            e.type = null;
            e.treeNum = 0;
            e.typeList = [];
            return e;
        }
        e.prototype.onLoad = function() {
            var t = this.node.openParam;
            this.treeNum = t.index;
            this.typeList = localcache.getList(localdb.table_treeType);
            this.onShowTree();
        };
        e.prototype.onClickClose = function() {
            i.utils.closeView(this);
        };
        e.prototype.onShowTree = function() {
            this.type = this.typeList[this.treeNum];
            var t = localcache.getGroup(
                    localdb.table_heropve,
                    "tree",
                    this.typeList[this.treeNum].id
                ),
                e = r.jibanProxy.getTreeTypeCount(
                    this.typeList[this.treeNum].id
                ),
                o = t.length;
            this.berNum.string = i18n.t("COMMON_NUM", {
                f: e,
                s: o
            });
            this.berValue.progress = e / o;
            this.spec_1.url = a.uiHelps.getLangSp(this.type.prop[0].prop);
            this.specNum.string = "+" + this.type.prop[0].value;
            this.itemList.data = t;
            for (var i = 0; i < this.typeList.length; i++)
                this.btns[i].active = i == this.treeNum;
        };
        e.prototype.onClickTab = function(t, e) {
            var o = parseInt(e);
            this.treeNum =
                this.treeNum + o < 0
                    ? this.typeList.length - 1
                    : this.treeNum + o >= this.typeList.length
                    ? 0
                    : this.treeNum + o;
            if (this.treeNum < this.typeList.length) {
                var n = this.typeList[this.treeNum];
                i.alertUtil.alert(
                    i18n.t("WISHING_TU_JIAN_QIE_HUAN", {
                        name: n.treename
                    })
                );
            }
            this.onShowTree();
        };
        __decorate([_(n.default)], e.prototype, "itemList", void 0);
        __decorate([_(cc.Label)], e.prototype, "berNum", void 0);
        __decorate([_(l.default)], e.prototype, "spec_1", void 0);
        __decorate([_(cc.Label)], e.prototype, "specNum", void 0);
        __decorate([_(cc.ProgressBar)], e.prototype, "berValue", void 0);
        __decorate([_([cc.Node])], e.prototype, "btns", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
