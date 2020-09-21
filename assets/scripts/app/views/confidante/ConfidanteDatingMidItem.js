var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../utils/ShaderUtils"),
    init = require("../../Initializer"),
    utils = require("../../utils/Utils"),
    guideItem = require("../guide/GuideItem"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblJuQingName = null;
            e.bgs = [];
            e.btn = null;
            e.stars = [];
            e.lblStar = null;
            e.nodeStar = null;
            e.btn_not_open = null;
            e.isGuideID = false;
            return e;
        }
        e.prototype.onLoad = function() {
            this.addBtnEvent(this.btn);
        };
        e.prototype.showData = function() {
            //这里是小关数据
            var t = this._data;
            if (t == null) 
            {
                return;
            }

            if(this.isGuideID)
            {
                this.setGuideId();
            }

            //是否开放
            this.btn.interactable = t.isOpen;
            for (var i = 0; i < this.bgs.length; i++)
            {
                n.shaderUtils.setImageGray(this.bgs[i], !t.isOpen);
            }
            
            //未开放按钮
            this.btn_not_open.node.active = !t.isOpen;

            this.nodeStar.active = t.value.type == 2;   //只有观看显示星数
            this.lblJuQingName.node.active = t.value.type != 2;  //开头和结尾用这个标题
            switch(t.value.type)
            {
                case 1:
                    {
                        //序
                        this.lblName.string = i18n.t("CONFIDANTE_LBL_MID_TOP");
                        this.lblJuQingName.string = t.value.name;
                        break;
                    }
                case 2:
                    {
                        //关卡
                        this.lblName.string = i18n.t("CONFIDANTE_LBL_MID_MID", {first:t.chapter, second:t.lv - 1, name:t.value.name});

                        //星数
                        var starCount = 0;
                        if(t.isOpen)
                        {
                            starCount = init.confidanteProxy.getStarCount(t.chapter, t.lv);
                        }
                        this.lblStar.string = starCount + "/" + this.stars.length;
                        for(var idx = 0; idx < this.stars.length; idx++)
                        {
                            var starNode = this.stars[idx];
                            if(starNode.childrenCount == 2)
                            {
                                starNode.children[0].active = idx >= starCount;
                                starNode.children[1].active = idx < starCount;
                            }
                        }
                        break;
                    }
                case 3:
                    {
                        //结束
                        this.lblName.string = i18n.t("CONFIDANTE_LBL_MID_BOT");
                        this.lblJuQingName.string = t.value.name;
                        break;
                    }    
            }
            
        };
        e.prototype.setGuideId = function() {
            var t = this.node.getComponentInChildren(guideItem.default),
                e = this._data;

            if(t && e)
            {
                var key = e.chapter * 10000 + e.lv * 100 + e.value.tid;
                t.key = key;
            }
        };
        t.prototype.onClickNotOpen = function() {
            //提示请先通关前置章节
            utils.alertUtil.alert(i18n.t("CONFIDANTE_CONF_NEED_CROSS_PRE_LV"));
        };
        t.prototype.onClickItemMid = function() {
            //检查体力
            if(init.confidanteProxy.hero.count <= 0 && this._data.type == 2)
            {
                utils.alertUtil.alert(i18n.t("CONFIDANTE_CONF_STRENGTH_NOT_ENOUTH"));
                return;
            }
            //点击
            facade.send(init.confidanteProxy.ON_CON_DATING_CLICK_MID_ITEM, this._data);
        }; 
        __decorate([s(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblJuQingName", void 0);
        __decorate([s([cc.Sprite])], e.prototype, "bgs", void 0);
        __decorate([s(cc.Button)], e.prototype, "btn", void 0);
        __decorate([s(cc.Button)], e.prototype, "btn_not_open", void 0);    //未开放按钮
        __decorate([s([cc.Node])], e.prototype, "stars", void 0);   //星数
        __decorate([s(cc.Label)], e.prototype, "lblStar", void 0);  //星数
        __decorate([s(cc.Node)], e.prototype, "nodeStar", void 0);   //星数
        __decorate([s], e.prototype, "isGuideID", void 0);
        return (e = __decorate([a], e));
    })(i.default);
o.default = c;
