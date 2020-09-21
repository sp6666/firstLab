
const i = require("../../component/RenderListItem");
const list =require("../../component/List");
const Initializer = require("../../Initializer");
cc.Class({
    extends: i.default,

    properties: {
        lblDesc:cc.Label,
        btnGet:cc.Button,
        items:list.default
    },

    showData(){
        var data =this._data;
        this.btnGet.node.active =!data.isGet;
        this.lblDesc.string =data.cfg.des+data.score;
        this.btnGet.interactable =data.statue;
        this.items.data =data.cfg.rwd;
    },
    btnGetRwd(){
        Initializer.jiJinChengZhangProxy.sendGetActivityRdw();
    },
    start () {

    },

    // update (dt) {},
});
