var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = (function() {
    function t() {
        this.UPDATE_TRIGGER_GUIDE = "UPDATE_TRIGGER_GUIDE";
        this.UPDATE_TRIGGER = "UPDATE_TRIGGER";
        this.guideUI = null;
    }
    /*
    类型定义
    "trigger":10 约会关卡 大关|小关 例： 1|2
    "trigger":11 主线剧情编号 例： 515
    "trigger":12 换装 大关|小关|关卡换装类型，0头饰，1衣服，2耳饰 例： 1|2|0
    "trigger":13 获得人物id 例：18
    */
    t.prototype.sendGuide = function(t) {
        var e = new proto_cs.guide.guide();
        e.gnew = t;
        JsonHttp.send(e);
    };
    t.prototype.sendGuideUpGuan = function() {
        JsonHttp.send(new proto_cs.guide.guideUpguan());
    };
    return t;
})();
o.GuideProxy = i;
