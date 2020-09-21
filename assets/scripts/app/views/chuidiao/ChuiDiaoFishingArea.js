var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var uiutils = require("../../utils/UIUtils"),
    utils = require("../../utils/Utils"),
    ini = require("../../Initializer"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.area = null;  //活动区域
            e.hook = null;
            e.btnPlay = null;
            e.btnStop = null;
            e.nodeOne = null;   //点击收杆
            e.nodeTen = null;   //点击收网
            e.lblTip = null;    //tip
            e.playType = 1; //1次，10次
            e.timing = 10000;   //总权重10000
            return e;
        }
        e.prototype.onLoad = function() {

        };
        e.prototype.onShow = function(show){
            this.node.active = show;

            if(show)
            {
                this.btnStart(false);
                this.btnPlay.active = true
                this.initArrow();
            }
        };

        //箭头位置
        e.prototype.initArrow = function(){
            if(!utils.stringUtil.isBlank(this.hook))
            {
                //这里取proxy里的值
                var startPoint = [-1, -0.5];
                var start = uiutils.uiUtils.randomNum(startPoint[0] * 10,startPoint[1] * 10);
                var allLength = this.area.getContentSize().width / 2.0; //折半作为长度参考
                this.hook.setPosition(cc.v2(allLength * start / 10.0, this.hook.getPosition().y));
            }
        };

        //写tip
        e.prototype.setTip = function(text){
            this.lblTip.node.active = text.length > 0;
            this.lblTip.string = text;
        };
        //按钮显示状态
        e.prototype.btnStart = function(isStart){
            this.nodeOne.active = this.playType == 1;
            this.nodeTen.active = this.playType != 1;

            this.btnStop.active = isStart == true;
        };

        //node是移动的点， speed是从最左到最右的时间
        e.prototype.playArea = function(node, speed){
            if(node && this.area)
            {
                //
                var runArea = this.area;
                var leftPtx = runArea.getPosition().x - runArea.getContentSize().width / 2.0;
                var rightPtx = runArea.getPosition().x + runArea.getContentSize().width / 2.0;

                //当前位置
                var curNodePt = node.getPosition();
                var first = ((rightPtx - curNodePt.x) / (rightPtx - leftPtx)) * speed;
                node.stopAllActions();
                node.runAction(
                    cc.sequence(
                        //移动到末尾
                        cc.moveTo(first, new cc.Vec2(rightPtx, curNodePt.y)),
                        cc.callFunc(function(){
                            //停止前置动作，开始往复运动
                            node.stopAllActions();
                            uiutils.uiUtils.reciprocating(node, leftPtx, curNodePt.y, speed);
                            cc.log("play is finish");
                        })
                    )
                );
            }
        };
        //点击开始
        e.prototype.onPlayClick = function(){
            this.playArea(this.hook, ini.chuidiaoProxy.fishingSpeed);

            this.btnStart(true);
            this.btnPlay.active = false;
        };

        //点击停止
        e.prototype.onStopClick = function(){
            this.hook.stopAllActions();
            this.btnStart(false);

            //检查位置
            var allLength = this.area.getContentSize().width / 2.0; //折半作为长度参考
            var hookPt = Math.abs(this.hook.getPosition().x);
            var curPt = hookPt / allLength; //权重

            this.timing = Math.round(curPt * 10);
            
            this.scheduleOnce(this.onStopNode, 0.5);
        };

        e.prototype.onStopNode = function(){
            this.node.active = false;
            ini.chuidiaoProxy.sendFishing(this.playType, this.timing);
        };
        __decorate([a(cc.Node)], e.prototype, "area", void 0);
        __decorate([a(cc.Node)], e.prototype, "hook", void 0);
        __decorate([a(cc.Node)], e.prototype, "nodeOne", void 0);
        __decorate([a(cc.Node)], e.prototype, "nodeTen", void 0);
        __decorate([a(cc.Node)], e.prototype, "btnPlay", void 0);
        __decorate([a(cc.Node)], e.prototype, "btnStop", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblTip", void 0);
        return (e = __decorate([r], e));
    })(cc.Component);
o.default = s;
