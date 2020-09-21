var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.voiceList = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe("VOICE_DATA_UPDATE", this.voiceDataUpdate, this);
            l.voiceProxy.sendOpenVoice();
        };
        e.prototype.voiceDataUpdate = function() {
            this.voiceList.data = l.voiceProxy.voiceCfg;
        };
        e.prototype.onClickClose = function() {
            n.utils.closeView(this);
        };
        __decorate([s(i.default)], e.prototype, "voiceList", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
