var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../Initializer"),
    l = require("../../utils/UIUtils"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.editbox = null;
            e.lblName = null;
            e.lblType = null;
            e.lblSeat = null;
            e.lblTime = null;
            e.nodeLbl = null;
            e.btnGo = null;
            e.lblAdd = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.editbox.placeholder = i18n.t("COMMON_INPUT_TXT");
            n.jiulouProxy.yhBaseInfo = null;
            this.updateLook();
            facade.subscribe("JIU_LOU_BASE_INFO", this.updateLook, this);
        };
        e.prototype.updateLook = function() {
            var t = n.jiulouProxy.yhBaseInfo;
            this.nodeLbl.active = null != t;
            this.btnGo.interactable = null != t;
            if (this.nodeLbl.active) {
                this.lblName.string = t.fname;
                this.lblSeat.string = i18n.t("COMMON_NUM", {
                    f: t.xiwei,
                    s: t.maxXiWei
                });
                this.lblType.string = t.yhname;
                this.lblAdd.string = t.addPer / 100 + "%";
                0 != t.ltime.next
                    ? l.uiUtils.countDown(t.ltime.next, this.lblTime)
                    : this.lblTime.unscheduleAllCallbacks();
            }
        };
        e.prototype.onClickGo = function() {
            n.jiulouProxy.selectData = null;
            n.jiulouProxy.sendYhGo(parseInt(this.editbox.string));
            i.utils.openPrefabView("jiulou/JiulouDinnce");
        };
        e.prototype.onClickFind = function() {
            i.stringUtil.isBlank(this.editbox.string)
                ? i.alertUtil.alert(i18n.t("JIULOU_INPUT_NO"))
                : n.jiulouProxy.sendYhFind(parseInt(this.editbox.string));
        };
        e.prototype.onClickClost = function() {
            i.utils.closeView(this);
        };
        __decorate([s(cc.EditBox)], e.prototype, "editbox", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblType", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblSeat", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([s(cc.Node)], e.prototype, "nodeLbl", void 0);
        __decorate([s(cc.Button)], e.prototype, "btnGo", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblAdd", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
