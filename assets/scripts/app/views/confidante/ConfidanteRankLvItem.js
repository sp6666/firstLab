var item = require("../../component/RenderListItem");
var urlLoad = require("../../component/UrlLoad");
var uiUtils = require("../../utils/UIUtils");
var init = require("../../Initializer");
var shader = require("../../utils/ShaderUtils");
var head = require("../user/UserHeadItem");

cc.Class({
    extends: item.default,

    properties: {
        nodeNormal:{
            //普通
            default:null,
            type:cc.Node
        },
        nodeSelect:{
            //选中
            default:null,
            type:cc.Node
        },
        lblName:{
            //名字
            default:null,
            type:cc.Label
        },
        lblNameSelect:{
            //名字
            default:null,
            type:cc.Label
        }
    },

    showData() {
        var t = this._data;

        //名字
        this.lblName.string = t.rank;
        this.lblNameSelect.string = t.rank;

        //选中状态
        var select = init.confidanteProxy.curRankCpt == t.chapter && init.confidanteProxy.curRankLv == t.lv;
        this.nodeNormal.active = !select;
        this.nodeSelect.active = select;
    },

    onLoad() { 

    },

    onClickItem() {
        if(init.confidanteProxy.curRankCpt != this._data.chapter || init.confidanteProxy.curRankLv != this._data.lv)
        {
            init.confidanteProxy.sendRank(this._data.chapter, this._data.lv);
        }
    },
});
