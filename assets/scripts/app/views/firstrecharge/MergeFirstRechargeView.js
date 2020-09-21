var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = require("../../utils/UIUtils"),
    a = require("../../utils/UIUtils"),
    s = require("../../models/TimeProxy"),
    ItemSlotUI = require("../../views/item/ItemSlotUI"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.topItems = [];
            e.bottomItems = [];
            e.list = null;
            e.btnRecharge = null;
            e.btnGet = null;
            e.lblcd = null;
            return e;
        }
        e.prototype.onLoad = function () {
            facade.subscribe(
                "MERGE_FIRST_RECHARGE_UPDATE",
                this.onFirstRechargeUpdate,
                this
            );
            this.onFirstRechargeUpdate();

        };
        e.prototype.onFirstRechargeUpdate = function () {

            this.showTime();

            if (l.mergeFirstRechargeProxy.data) {
                this.btnRecharge.node.active =
                    0 == l.mergeFirstRechargeProxy.data.type;
                this.btnGet.node.active = 1 == l.mergeFirstRechargeProxy.data.type;
            }

            var r = localcache.getItem(localdb.table_merge_shouchongReward, 1),
                s = [],
                c = [];
            for (i = 0; i < r.firstRwd.length; i++) {
                var _ = new a.ItemSlotData();
                _.id = r.firstRwd[i].id;
                _.count = r.firstRwd[i].count;
                _.kind = r.firstRwd[i].kind;
                1 == r.firstRwd[i].kind ?
                    s.push(_) :
                    c.push(_);
            }

            this.bottomItems[0].data = s[0];
            this.bottomItems[1].data = s[1];
            this.bottomItems[2].data = s[2];

            this.topItems[0].data = c[0];
            this.topItems[1].data = c[1];
        };
        e.prototype.onClickGetReward = function () {
            l.mergeFirstRechargeProxy.sendGetReward();
        };
        e.prototype.onClickRecharge = function () {
            s.funUtils.openView(s.funUtils.recharge.id);
        };
        e.prototype.onClickClose = function () {
            n.utils.closeView(this);
        };

        e.prototype.showTime = function () {
            if (!l.mergeFirstRechargeProxy.data) {
                return;
            }

            var t = this;
            r.uiUtils.countDown(
                l.mergeFirstRechargeProxy.data.etime,
                this.lblcd,
                function () {
                    t.lblcd.string = i18n.t("ACTHD_OVERDUE");
                },
                true,
                i18n.t("ACTIVITY_COUNT_DOWN_TXT") + ": "
            );

        };

        __decorate([d([ItemSlotUI.default])], e.prototype, "topItems", void 0);
        __decorate([d([ItemSlotUI.default])], e.prototype, "bottomItems", void 0);

        __decorate([d(cc.Label)], e.prototype, "lblcd", void 0);
        __decorate([d(cc.Button)], e.prototype, "btnRecharge", void 0);
        __decorate([d(cc.Button)], e.prototype, "btnGet", void 0);

        return (e = __decorate([_], e));
    })(cc.Component);
o.default = u;