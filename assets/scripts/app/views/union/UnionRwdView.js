var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.lblDes = [];
            e.lblLessTip = null;
            e.lblGiftLessTip = null;
            return e;
        }
        e.prototype.onLoad = function () {
            facade.subscribe(n.unionProxy.UNION_Envelopes_DATA_UPDATE, this.onUpdateData, this);

            this.lblLessTip.node.active = false;
            n.unionProxy.sendEnvelopesInfo();
            n.unionProxy.envelopesIndex = 0;
        };
        e.prototype.onUpdateData = function () {

            this.lblDes[0].string = i18n.t('UNION_NEXT_REFRESH_TIME');
            this.lblDes[1].string = i18n.t('UNION_DAY_LEFT_SEND', {
                n1: n.unionProxy.envelopes.surplus_times,
                n2: n.unionProxy.envelopes.max_times
            });
            this.choseIndex(null, n.unionProxy.envelopesIndex);
        };
        e.prototype.choseIndex = function (t, e) {
            e = parseInt(e);
            n.unionProxy.envelopesIndex = e;

            if (n.unionProxy.envelopes) {
                if (e === 2) {
                    if (n.unionProxy.envelopes && n.unionProxy.envelopes.grant.length > 0) {
                        this.list.data = n.unionProxy.envelopes.grant;
                        this.lblGiftLessTip.active = false;
                    } else {
                        this.list.data = null;
                        this.lblGiftLessTip.active = true;
                    }

                } else if (e === 0) {
                    if (n.unionProxy.envelopes && n.unionProxy.envelopes.free.length > 0) {
                        this.list.data = n.unionProxy.envelopes.free;
                        this.lblLessTip.node.active = false;
                    } else {
                        this.list.data = null;
                        this.lblLessTip.node.active = true;

                        if (n.unionProxy.memberInfo.post <= 2) {
                            this.lblLessTip.string = i18n.t('UNION_CASH_LESS_TIP');
                            for (var node of this.lblLessTip.node.children) {
                                node.active = true;
                            }
                        } else {
                            this.lblLessTip.string = i18n.t('UNION_CASH_NONE_TIP');
                            for (var node of this.lblLessTip.node.children) {
                                node.active = false;
                            }
                        }


                    }
                } else {
                    var k = localcache.getItem(localdb.table_unionSend, n.unionProxy.clubInfo.level);
                    if (k) {
                        this.list.data = k.red_packet;
                    } else {
                        this.list.data = null;
                    }

                }
            }
        };

        e.prototype.sendEnvelopesCmd = function () {

            if (!l.utils.isOpenView("ConfirmView")) {
                var t = n.unionProxy.getUnionData(n.unionProxy.clubInfo.level);

                l.utils.showConfirm(i18n.t("UNION_COST_TIP", {
                    num: t.cost
                }), function () {
                    n.unionProxy.sendEnvelopesCmd(t.cost);
                });
            }
        };

        e.prototype.eventClose = function () {
            l.utils.closeView(this);
        };
        __decorate([s(i.default)], e.prototype, "list", void 0);
        __decorate([s([cc.Label])], e.prototype, "lblDes", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblLessTip", void 0);
        __decorate([s(cc.Node)], e.prototype, "lblGiftLessTip", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;