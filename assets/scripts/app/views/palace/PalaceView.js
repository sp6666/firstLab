var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("./PalaceRolePanel"),
    l = require("../../Initializer"),
    r = require("../../utils/Utils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.listView = null;
            e.myGuan = null;
            e.mySalary = null;
            e.roleDouble_1 = null;
            e.roleDouble_2 = null;
            e.roleSingle = null;
            e.singleNode = null;
            e.doubleNode = null;
            e.btnQingAn = null;
            e.btnNode = null;
            e.curList = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                l.palaceProxy.UPDATE_PALACE_QING_AN,
                this.onQingAnUpdate,
                this
            );
            this.listView.data = l.palaceProxy.list;
            var t = this;
            this.listView.selectHandle = function(e) {
                t.onShowData(e);
            };
            this.listView.selectIndex = 0;
            var e = localcache.getItem(
                localdb.table_officer,
                l.playerProxy.userData.level
            );
            this.myGuan.string = i18n.t("PALACE_MY_GUAN", {
                value: e.name
            });
            this.mySalary.string = i18n.t("PALACE_MY_MONEY", {
                value: e.qingAn
            });
            this.btnQingAn.active = 0 == l.palaceProxy.qingAnData.type;
        };
        e.prototype.onShowData = function(t) {
            t.key;
            var e = t.data;
            this.curIndex = 0;
            if (e && e.length > 0) {
                this.curList = e;
                this.curData = e[0];
                this.singleNode.active = !0;
                this.roleSingle.data = e[0];
                this.btnNode.active = e.length > 1;
            } else this.btnNode.active = !1;
        };
        e.prototype.onClickKing = function() {
            r.utils.openPrefabView("palace/Palace2", null, this.curData);
        };
        e.prototype.onClickLast = function() {
            0 == this.curIndex
                ? (this.curIndex = this.curList.length - 1)
                : this.curIndex--;
            this.roleSingle.data = this.curList[this.curIndex];
        };
        e.prototype.onClickNext = function() {
            this.curIndex == this.curList.length - 1
                ? (this.curIndex = 0)
                : this.curIndex++;
            this.roleSingle.data = this.curList[this.curIndex];
        };
        e.prototype.onClickQingAn = function() {
            l.palaceProxy.sendQingAn();
        };
        e.prototype.onClickQianMing = function() {
            r.utils.openPrefabView("palace/Palace6");
        };
        e.prototype.onQingAnUpdate = function() {
            this.btnQingAn.active = 0 == l.palaceProxy.qingAnData.type;
        };
        e.prototype.onClickClost = function() {
            r.utils.closeView(this);
        };
        __decorate([c(i.default)], e.prototype, "listView", void 0);
        __decorate([c(cc.Label)], e.prototype, "myGuan", void 0);
        __decorate([c(cc.Label)], e.prototype, "mySalary", void 0);
        __decorate([c(n.default)], e.prototype, "roleDouble_1", void 0);
        __decorate([c(n.default)], e.prototype, "roleDouble_2", void 0);
        __decorate([c(n.default)], e.prototype, "roleSingle", void 0);
        __decorate([c(cc.Node)], e.prototype, "singleNode", void 0);
        __decorate([c(cc.Node)], e.prototype, "doubleNode", void 0);
        __decorate([c(cc.Node)], e.prototype, "btnQingAn", void 0);
        __decorate([c(cc.Node)], e.prototype, "btnNode", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
