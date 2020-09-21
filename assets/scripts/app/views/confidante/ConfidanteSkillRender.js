var item = require("../../component/RenderListItem");
var urlLoad = require("../../component/UrlLoad");
var uiUtils = require("../../utils/UIUtils");
var utils = require("../../utils/Utils");
var init = require("../../Initializer");
var shader = require("../../utils/ShaderUtils");
var head = require("../user/UserHeadItem");

cc.Class({
    extends: item.default,

    properties: {
        btnUpgrade:{
            //升级按钮
            default:null,
            type:cc.Button
        },
        lblName:{
            //名字
            default:null,
            type:cc.Label
        },
        lblCurState:{
            //当前状态
            default:null,
            type:cc.Label
        },
        lblUnlockState:{
            //解锁状态
            default:null,
            type:cc.Label
        },
        lblUnlock:{
            //解锁条件
            default:null,
            type:cc.Label
        },
        lblNextState:{
            //升级后的状态
            default:null,
            type:cc.Label
        },
        lblUpNeed:{
            //升级条件
            default:null,
            type:cc.Label
        },
        nodeBGNormal:{
            //普通面板
            default:null,
            type:cc.Node
        },
        nodeBGNoOpen:{
            //未开放
            default:null,
            type:cc.Node
        },
        nodeUpNeed:{
            //升级节点
            default:null,
            type:cc.Node
        },
        nodeCurState:{
            //当前状态
            default:null,
            type:cc.Node
        },
        nodeUnlockState:{
            //解锁状态
            default:null,
            type:cc.Node
        },
        nodeNextState:{
            //下一级状态
            default:null,
            type:cc.Node
        },
        nodeUnlock:{
            //解锁条件
            default:null,
            type:cc.Node
        },
    },

    showData() {
        var t = this._data;
        if(t)
        {
            //名字
            this.lblName.string = t.order + "." + t.name;
        }

        this.nodeUpNeed.active = t.value != null;       //显示下一级所需
        this.btnUpgrade.node.active = t.value != null;  //显示按钮
        this.nodeBGNormal.active = t.value != null;     //显示正常面板
        this.nodeBGNoOpen.active = t.value == null;     //显示未打开面板

        this.nodeCurState.active = t.value != null; //显示当前效果
        this.nodeUnlockState.active = t.value == null; //显示解锁效果

        this.nodeNextState.active = t.value != null; //显示下一级状态
        this.nodeUnlock.active = t.value == null; //显示解锁条件

        if(t.value)
        {
            //有技能
            //按钮
            this.btnUpgrade.node.active = t.value.lv < 50;  

            //技能等级
            this.lblName.string += "( lv." + t.value.lv + " )";
            
            
            //当前状态
            this.lblCurState.string = this.getStateString(t.value.lv);

            if(t.value.lv < 50)
            {
                //下一级状态
                this.lblNextState.string = this.getStateString(t.value.lv + 1);

                //下一级所需经验
                this.lblUpNeed.string = t.value.next_exp;
            }
            else{
                //下一级状态
                this.lblNextState.string = i18n.t("CONFIDANTE_YI_MAN_JI");

                //下一级所需经验
                this.lblUpNeed.string = "";
                this.nodeUpNeed.active = false;
            }
        }
        else
        {
            //无技能
            var unlockLv = t.unlock.length > 0 ? t.unlock[0] : t.unlock;
            this.lblUnlock.string = i18n.t("CONFIDANTE_UNLOCK",{num:unlockLv});
            this.lblUnlockState.string = this.getStateString(1);
            this.lblNextState.string = "";
            this.lblUpNeed.string = "";
        }
        
    },

    onLoad() { 

    },

    getStateString(level) {
        var stateStr = "";
        var skillprop = localcache.getItem(localdb.table_confidante_skill_lv, this._data.skill);
        var skill = localcache.getItem(localdb.table_confidante_skill, this._data.id);
        if(!this._data || !skillprop || !skill)
        {
            return stateStr;
        }
        
        //最大等级50
        if(level > 50)
        {
            level = 50;
        }
        level -= 1; 

        if(level < 0)
        {
            level = 0; 
        }

        var specName = ""; //前面加空格
        for(var idx = 0; idx < this._data.spec.length; idx++)
        {
            specName += i18n.t("COMMON_PROP" + this._data.spec[idx]);   //伙伴类型名称
        }
        stateStr += i18n.t("CONFIDANTE_LBL_PROP",{props:specName});     //填入伙伴类型
        stateStr += i18n.t("COMMON_PROP" + skillprop.prop);             //增加的属性名
        var prop = 0;
        if(skillprop.type == 1)
        {
            //type 1 是直接增加
            prop = skillprop.base + level * skillprop.up;
            stateStr += " + " + prop + " ";
        }
        else
        {
            //type 2 默认所有
            prop = skillprop.base + level * skillprop.up;
            stateStr += " + " + prop / 100 + "% ";
        }

        return stateStr;
    },

    onClickUpSkill() {
        if(init.confidanteProxy.hero.heros.sy_num < this._data.unlock)
        {
            utils.alertUtil.alert(i18n.t("CONFIDANTE_SYNUM_SHORT_CAN_NOT_UP"));
            return;
        }
        init.confidanteProxy.sendUpSkill(this._data.skill);
    },
});
