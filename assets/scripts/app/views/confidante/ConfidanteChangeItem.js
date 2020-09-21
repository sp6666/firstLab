var item = require("../../component/RenderListItem");
var urlLoad = require("../../component/UrlLoad");
var uiUtils = require("../../utils/UIUtils");
var init = require("../../Initializer");
var shader = require("../../utils/ShaderUtils");

cc.Class({
    extends: item.default,

    properties: {
        urlIcon:{
            //衣服icon
            default:null,
            type:urlLoad.default
        },
        nodeSelect:{
            //选中的标记
            default:null,
            type:cc.Node
        },
        nodeUsed:{
            //已穿戴的标记
            default:null,
            type:cc.Node
        },
        lblName:{
            //衣服name
            default:null,
            type:cc.Label
        },
        nodeLock:{
            //锁
            default:null,
            type:cc.Node
        },
        lblLock:{
            //解锁条件
            default:null,
            type:cc.Label
        },
        urlTag:{
            //标签
            default:null,
            type:urlLoad.default
        },
    },

    showData() {
        var t = this._data;
        var hero = init.confidanteProxy.hero;
        if(t == null || hero == null)
        {
            return;
        }

        //url
        this.urlIcon.url = uiUtils.uiHelps.getConfidanteIcon(t.res);

        //name
        this.lblName.string = t.name;

        //select显示选中标签
        this.nodeSelect.active = t.id == init.confidanteProxy.curClothe;

        //cur显示身上穿的标签
        this.nodeUsed.active = t.id == hero.heros.clothes_id;

        //标签
        var cfg = localcache.getItem(localdb.table_confidante_clothe, t.id + "");
        if(cfg)
        {
            var highTag = 0;
            var highPt = 0;
            for(var idx = 0; idx < cfg.tag.length; idx++)
            {
                if(cfg.tag[idx].score > highPt)
                {
                    highTag = cfg.tag[idx].tag;
                }
            }
            
            this.urlTag.node.active = highTag > 0;
            if(highTag > 0)
            {
                this.urlTag.url = uiUtils.uiHelps.getTag(highTag);
            }
        }

        //lock
        this.nodeLock.active = init.confidanteProxy.checkUse(t.id) <= 0;
        if(this.nodeLock.active)
        {
            //此时没有解锁
            shader.shaderUtils.setNodeGray(this.node);

            if(cfg)
            {
                switch(cfg.is_unlock)
                {
                    case 1:
                        {
                            //亲密度解锁
                            this.lblLock.string = i18n.t("CONFIDANTE_TIP_CHANGE_UNLOCK_1", {lv:cfg.lv});
                            break;
                        }
                    case 2:
                        {
                            //道具解锁
                            if(cfg.need.length > 0)
                            {
                                var need = cfg.need[0];
                                var item = localcache.getItem(localdb.table_item, need.item);
                                if(item)
                                {
                                    this.lblLock.string = i18n.t("CONFIDANTE_TIP_CHANGE_UNLOCK_2", {num:need.count, name:item.name});
                                }
                            }
                            break;
                        }
                }
            }
        }
        else
        {
            //已解锁
            shader.shaderUtils.clearNodeShader(this.node);
        }
    },

    onLoad() { 

    },

    onClickItem() {
        var t = this._data;
        if(t == null)
        {
            return;
        }

        //显示穿在身上
        init.confidanteProxy.curClothe = t.id;

        //换衣服上身
        init.confidanteProxy.sendFashion(init.confidanteProxy.curClothe);
        facade.send(init.confidanteProxy.ON_CON_CHANGE_CLOTHE);
    },
});
