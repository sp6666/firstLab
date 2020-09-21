var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/List"),
    l = require("../../Initializer"),
    r = require("../../component/UrlLoad"),
    a = require("../../utils/UIUtils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.rwd = null;
            e.itemRwds = null;
            e.lbl = null;
            e.btn = null;
            e.curItem = null;
            e.nodePics = [];
            return e;
        }
        e.prototype.onLoad = function () {

            facade.subscribe(
                l.oldUsersProxy.OLD_USERS_BACK,
                this.onUpdateSHow,
                this
            );
            this.onUpdateSHow();
        };
        e.prototype.onUpdateSHow = function () {
            this.curItem = -1;


            var rwdData = l.oldUsersProxy.data.sign_rwd;

            this.list.data = rwdData;

            var sign_level = l.oldUsersProxy.regression.sign_level;
            for (
                var t = sign_level.length, e = 0; e < t; e++
            ) {
                var o = sign_level[e];
                if (2 != o.type) {
                    this.curItem = e;
                    break;
                }
            } -
            1 == this.curItem && (this.curItem = t - 1);
            this.showItem(rwdData[this.curItem]);
        };
        e.prototype.showItem = function (t) {
            if (t) {

                var sign = l.oldUsersProxy.regression.sign_level[t.id - 1];

                this.curItem = t.id - 1;
                this.rwd.url = a.uiHelps.getSevenDay(sign.day);
                this.itemRwds.data = t.items;
                this.lbl.url = a.uiHelps.getSevenDayLbl(sign.day);

                this.btn.interactable = sign.type === 1;
                this.btn.node.active = sign.type !== 2;

                this.nodePics[0].active = false;
                this.nodePics[1].active = false;
                this.nodePics[2].active = false;
                this.rwd.node.active = true;
                if (t.id === 1) {
                    this.nodePics[0].active = true;
                    this.rwd.node.active = false;
                }
                if (t.id === 3) {
                    this.nodePics[1].active = true;
                    this.rwd.node.active = false;
                }
                if (t.id === 5) {
                    this.nodePics[2].active = true;
                    this.rwd.node.active = false;
                }
            }
        };
        e.prototype.onClickItem = function (t, e) {
            var o = e.data;
            this.showItem(o);
        };
        e.prototype.onClickRwd = function () {
            var item = l.oldUsersProxy.regression.sign_level[this.curItem];

            item && 1 != item.type ?
                0 == item.type ?
                i.alertUtil.alert18n("SEVEN_DAY_RWD_LIMIT") :
                2 == item.type &&
                i.alertUtil.alert18n("SEVEN_DAY_RWDED") :
                l.oldUsersProxy.sendGetSevenDayRwd(item.day);
        };
        e.prototype.onClickClost = function () {
            i.utils.closeView(this);
        };
        __decorate([_(n.default)], e.prototype, "list", void 0);
        __decorate([_(r.default)], e.prototype, "rwd", void 0);
        __decorate([_(n.default)], e.prototype, "itemRwds", void 0);
        __decorate([_(r.default)], e.prototype, "lbl", void 0);
        __decorate([_(cc.Button)], e.prototype, "btn", void 0);
        __decorate([_([cc.Node])], e.prototype, "nodePics", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;