var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../Initializer"),
    l = require("../../utils/UIUtils"),
    r = require("../../utils/Utils"),
    a = require("../../component/ChildSpine"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblFather = null;
            e.lblShenFen = null;
            e.lblShuXing = null;
            e.lblTime = null;
            e.list = null;
            e.chidSpine = null;
            e.tipNode = null;
            e.curData = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe("UPDATE_SON_ZHAO_QIN", this.onRefreshData, this);
            this.curData = this.node.openParam;
            if (this.curData) {
                n.sonProxy.sendShuaXinZQ(this.curData.id, this.curData.honor);
                this.lblName.string = this.curData.name;
                localcache.getItem(localdb.table_wife, this.curData.mom);
                this.lblFather.string = n.playerProxy.userData.name;
                this.lblShenFen.string = n.sonProxy.getHonourStr(
                    this.curData.honor
                );
                var t =
                    this.curData.ep.e1 +
                    this.curData.ep.e2 +
                    this.curData.ep.e3 +
                    this.curData.ep.e4;
                this.lblShuXing.string = t + "";
                this.chidSpine.setKid(this.curData.id, this.curData.sex);
                localcache.getItem(localdb.table_adult, this.curData.honor);
            }
            n.sonProxy.tiQinObj.marryType = 1;
            this.onRefreshData();
        };
        e.prototype.onRefreshData = function() {
            if (n.sonProxy.zhaoQinData) {
                this.tipNode.active = 0 == n.sonProxy.zhaoQinData.list.length;
                this.list.data = n.sonProxy.zhaoQinData.list;
                l.uiUtils.countDown(
                    n.sonProxy.zhaoQinData.otime.next,
                    this.lblTime,
                    function() {
                        n.playerProxy.sendAdok(
                            n.sonProxy.zhaoQinData.otime.label
                        );
                    }
                );
            }
        };
        e.prototype.onClickRefresh = function() {
            var t = this;
            r.utils.showConfirmItem(
                i18n.t("MARRY_REFERSH_QUICKLY", {
                    num: 100
                }),
                1,
                n.playerProxy.userData.cash,
                function() {
                    n.playerProxy.userData.cash >= 100
                        ? n.sonProxy.sendRefreshZhaoQin(
                              t.curData.id,
                              t.curData.honor
                          )
                        : r.alertUtil.alertItemLimit(1);
                },
                "MARRY_REFERSH_QUICKLY"
            );
        };
        e.prototype.onClickClose = function() {
            r.utils.closeView(this);
        };
        __decorate([_(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblFather", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblShenFen", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblShuXing", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([_(i.default)], e.prototype, "list", void 0);
        __decorate([_(a.default)], e.prototype, "chidSpine", void 0);
        __decorate([_(cc.Node)], e.prototype, "tipNode", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
