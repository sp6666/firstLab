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
            e.btnSend = null;
            e.nodeBlock = null;
            e.etBox = null;
            return e;
        }
        e.prototype.onLoad = function () {
            this.updateForbidden();
            facade.subscribe(n.chatProxy.UPDATE_FORBIDDEN_MSG, this.updateForbidden, this);

            this.schedule(this.updateForbidden, 60);
        };

        e.prototype.updateForbidden = function () {
            var bForbidden = n.chatProxy.bForbidden();
            this.btnSend.interactable = !bForbidden;
            if (!bForbidden) {
                this.etBox.placeholder = i18n.t('COMMON_INPUT_TXT');
                this.nodeBlock.active = false;

            } else {
                this.etBox.placeholder = n.chatProxy.getLeftForbiddenText();
                this.nodeBlock.active = true;
            }

        };
        __decorate([s(cc.Node)], e.prototype, "nodeBlock", void 0);
        __decorate([s(cc.Button)], e.prototype, "btnSend", void 0);
        __decorate([s(cc.EditBox)], e.prototype, "etBox", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;