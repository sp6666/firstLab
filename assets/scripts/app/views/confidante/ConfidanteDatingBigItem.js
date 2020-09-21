var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    init = require("../../Initializer"),
    shader = require("../../utils/ShaderUtils"),
    utils = require("../../utils/Utils"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblItem = null;
            e.lblCount = null;
            e.itemBtn = null;
            e.nodeLvLock = null;
            e.lblLvLock = null;
            e.btn = null;
            e.btnLocked = null;
            e.btnLevelLocked = null;
            e.nodeLight = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(init.confidanteProxy.ON_CON_GET_RWD_BACK, this.showData, this);
            this.addBtnEvent(this.btn);
        };
        e.prototype.showData = function() {
            var t = this._data;
            if(t == null)
            {
                return;
            }

            this.lblItem.string = t.name;

            //检查本章节是否开放
            var lvOpen = init.confidanteProxy.checkCpLvUnlock(t.lv);
            this.nodeLvLock.active = !lvOpen;
            this.btnLocked.node.active = !lvOpen;
            if(!lvOpen)
            {
                var lockCp = localcache.getItem(localdb.table_confidante_level, t.lv);
                if(lockCp)
                {
                    this.lblLvLock.string = i18n.t("CONFIDANTE_CONF_LOCK",{name:lockCp.name});
                }
            }

            var isOpen = init.confidanteProxy.checkCpLevel(t.id, 1);
            if(!isOpen)
            {
                this.lblItem.node.color = cc.color(200, 200, 200);
                shader.shaderUtils.setImageGray(this.btn.node.getComponent(cc.Sprite), !isOpen);
                shader.shaderUtils.setImageGray(this.itemBtn.node.getComponent(cc.Sprite), !isOpen);
            }
            this.itemBtn.interactable = isOpen && lvOpen;

            //等级解锁，但是通关未解锁
            this.btnLevelLocked.node.active = lvOpen && !isOpen;

            //是否可领取
            var canRwd = this.checkMaxStar();
            
            //检查是否已领取
            var hasRwd = init.confidanteProxy.checkCpRwd(t.id);
            //已经领取的隐藏按钮
            this.btn.node.active = !hasRwd && isOpen && lvOpen; 

            //可领取并且未领取发光
            this.nodeLight.active = !hasRwd && canRwd;
        };
        e.prototype.checkMaxStar = function() {

            //检查是否有满星奖励
            //检查本章最后一节是否完成
            var cfgStarCount = 0;   //cfg下这章的总星数
            var infoStarCount = 0;  //动态数据下该章节总星数

            var cfgLst = init.confidanteProxy.getCtsById();
            for(var idx = 0; idx < cfgLst.length; idx++)
            {
                if(cfgLst[idx].id == this._data.lv)
                {
                    var lvs = cfgLst[idx];
                    for(var index = 0; index < lvs.length; index++)
                    {
                        if(lvs[index].type == 2)
                        {
                            //如果是通关的关卡才计算星数
                            cfgStarCount += 3;
                        }
                    }
                }
            }
            
            //如果最后一关开启的话，关卡就打完了，检查所有的本章星数
            var ct = init.confidanteProxy.hero.heros.cts;
            for(var key in ct)
            {
                var lv = key.split("_");
                if(lv.length > 0)
                {
                    if(lv[0] == this._data.lv + "")
                    {
                        var it = ct[key];
                        if(it.plot == 2)
                        {
                            infoStarCount += ct[key].star;
                        }
                    }
                }
            }

            return infoStarCount > 0 && infoStarCount >= cfgStarCount;
        };
        e.prototype.onClickItem = function() {
            facade.send(init.confidanteProxy.ON_CON_DATING_CLICK_BIG_ITEM, this._data);
        };
        e.prototype.onClickRwd = function() {
            //显示当前关卡奖励
            if(this.checkMaxStar())
            {
                //领奖
                init.confidanteProxy.sendRwd(2, this._data.lv, 0);
            }
            else{
                init.confidanteProxy.curShowRwd = this._data.rwd;
                utils.utils.openPrefabView("confidante/ConfidanteDatingRwdView");
            }
        };
        e.prototype.onClickLocked = function() {
            //出未解锁提示
            var lockCp = localcache.getItem(localdb.table_confidante_level, this._data.lv);
            if(lockCp)
            {
                utils.alertUtil.alert(i18n.t("CONFIDANTE_CONF_LOCK",{name:lockCp.name}));
            }
        };

        e.prototype.onClickLevelLocked = function() {
            //出未解锁提示
            utils.alertUtil.alert(i18n.t("CONFIDANTE_CONF_NEED_CROSS_PRE_LV"));
        };
        __decorate([a(cc.Label)], e.prototype, "lblItem", void 0);
        __decorate([a(cc.Button)], e.prototype, "itemBtn", void 0);
        __decorate([a(cc.Node)], e.prototype, "nodeLvLock", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblLvLock", void 0);
        __decorate([a(cc.Button)], e.prototype, "btn", void 0);
        __decorate([a(cc.Button)], e.prototype, "btnLevelLocked", void 0);    //等级解锁但是通关未解锁
        __decorate([a(cc.Button)], e.prototype, "btnLocked", void 0);
        __decorate([a(cc.Node)], e.prototype, "nodeLight", void 0);
        return (e = __decorate([r], e));
    })(i.default);
o.default = s;
