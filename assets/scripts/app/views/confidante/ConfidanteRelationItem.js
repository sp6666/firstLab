var item = require("../../component/RenderListItem");
var urlLoad = require("../../component/UrlLoad");
var uiUtils = require("../../utils/UIUtils");
var utils = require("../../utils/Utils");
var init = require("../../Initializer");
var shader = require("../../utils/ShaderUtils");
var list=require("../../component/List");

cc.Class({
    extends: item.default,

    properties: {
        nodeInfo:{
            //信息面板
            default:null,
            type:cc.Node
        },
        lblIntimacy:{
            //亲密度
            default:null,
            type:cc.Label
        },
        lblLevel:{
            //等级name
            default:null,
            type:cc.Label
        },
        lblCurExp:{
            //当前经验
            default:null,
            type:cc.Label
        },
        lblMaxExp:{
            //最高经验
            default:null,
            type:cc.Label
        },
        nodeLock:{
            //锁
            default:null,
            type:cc.Node
        },
        nodeLight:{
            //光
            default:null,
            type:cc.Node
        },
        nodeGot:{
            //已领取标签
            default:null,
            type:cc.Node
        },
        lstProp:{
            //属性列表
            default:null,
            type:list.default
        },
        lblProp:{
            //增加属性
            default:null,
            type:cc.Label
        }
    },

    showData() {
        var t = this._data;

        //亲密等级
        this.lblLevel.string = t.name;

        //是否可以领奖(升到下一级，到顶级后亲密度满)检查这个皇子这个等级是否可领取 0可领取，1未能领取（锁），2已领取, 3可显示不可领取
        var unLock = init.confidanteProxy.checkLevel(t.lv);

        var level = localcache.getItem(localdb.table_confidante_level, t.lv + "");
        if(level)
        {
            this.lblIntimacy.string = level.intimacy_max;

            switch(unLock)
            {
                case 0:
                    {
                        //可领取，已满
                        this.lblCurExp.string = level.intimacy_max + "/";
                        this.lblMaxExp.string = level.intimacy_max;
                        break;
                    }
                case 1:
                    {
                        //不可领，未开
                        this.lblCurExp.string = 0 + "/";
                        this.lblMaxExp.string = level.intimacy_max;
                        break;
                    }
                case 2:
                    {
                        //已领取，已满
                        this.lblCurExp.string = level.intimacy_max + "/";
                        this.lblMaxExp.string = level.intimacy_max;
                        break;
                    }
                case 3:
                    {
                        //不可领取，未满
                        this.lblCurExp.string = init.confidanteProxy.hero.heros.curr + "/";
                        this.lblMaxExp.string = level.intimacy_max;

                        this.lblIntimacy.string = init.confidanteProxy.hero.heros.curr;
                        break;
                    }
                                    
            }
        }

        //是否显示亲密度
        this.lblIntimacy.node.active = unLock != 1;  
        //是否显示锁
        this.nodeLock.active = unLock == 1; //只在不能领不能看的时候上锁

        //奖励
        this.nodeLight.active = unLock == 0;    //光
        this.nodeGot.active = unLock == 2;      //已领取标签

        //灰态
        if(unLock == 1 && unLock != 3)
        {
            shader.shaderUtils.setNodeGray(this.nodeInfo);
        }
        else
        {
            shader.shaderUtils.clearNodeShader(this.nodeInfo);
        }

        //属性
        if(t.prop.length > 0)
        {
            if(t.prop_type == 1)
            {
                this.lblProp.string = "+" + t.prop[0].value;
            }
            else
            {
                this.lblProp.string = "+" + t.prop[0].value / 100 + "%";
            }
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

        var unLock = init.confidanteProxy.checkLevel(t.lv);
        if(unLock == 0)
        {
            //领奖励
            init.confidanteProxy.sendIntimacy(t.lv);
        }
        else
        {
            var rwd = null;
            for(var key in t.lists)
            {
                if(t.lists[key].hid == init.confidanteProxy.hero.id)
                {
                    rwd = t.lists[key].rwd;
                }
            }
            if(rwd.length > 0)
            {
                init.confidanteProxy.curShowRwd = rwd;
                utils.utils.openPrefabView("confidante/ConfidanteDatingRwdView");
            }
            
        }
    },
});
