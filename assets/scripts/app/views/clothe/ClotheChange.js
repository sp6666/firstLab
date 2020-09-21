var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../user/UserClothe"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    c = require("../../utils/UIUtils"),
    r = cc._decorator,
    a = r.ccclass,
    s = (r.property,
    (function(t) {
        __extends(e, t);
        function e() {
            return (null !== t && t.apply(this, arguments)) || this;
        }
        e.prototype.onLoad = function() {
            this._curGate = this.node.openParam;
            var t = n.clothePveProxy.getScore(this._curGate.id);
            null == t &&
                null != (t = n.timeProxy.getLoacalValue("CLOTHE_PVE_SAVE")) &&
                (t = JSON.parse(t + ""));
            this.updateCurClothe(null == t ? n.playerProxy.userClothe : t);
            this.setRoleShow();
            this.onClickBack();
            facade.subscribe(
                n.playerProxy.PLAYER_CLOTH_UPDATE,
                this.updateShow,
                this
            );
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClost, this);
            this.nodeInfo.active = !1;

            var pveInfos = localcache.getItem(localdb.table_clothepve, this._curGate.gateid);
            this.tags = pveInfos.clothe_score;
            this.tags.sort(function (a, b) {
                return b.point - a.point;
            });

            this.tagNode.node.active = false;
            this.tagCtr = this.tagContainerNode.getComponent("TagInfo");
            this.initCureentTag();
            this.initSelectView();
            this.pvpType = 1;//普通
            this.selectTag = -1;//默认tag
        };
        e.prototype.onClickOver = function() {
            if (this.checkBuyItem()) {
                var t = {};
                t.ear = this._ear;
                t.body = this._body;
                t.animal = this._animal;
                t.background = this._bg;
                t.effect = this._eff;
                t.head = this._head;
                n.timeProxy.saveLocalValue(
                    "CLOTHE_PVE_SAVE",
                    JSON.stringify(t)
                );
                n.clothePveProxy.sendFight(
                    this._curGate.id,
                    t.head,
                    t.body,
                    t.ear,
                    t.background,
                    t.effect,
                    t.animal
                );
                this.onClickClost();
            }
        };
        e.prototype.onClickReferr = function() {
            n.clothePveProxy.sendReferr(this._curGate.id);
        };
        e.prototype.onClickClost = function() {
            l.utils.closeView(this, !0);
        };
        e.prototype.initCureentTag = function() {
            
            this.tag1.url = c.uiHelps.getTag(this.tags[0].tag);
            this.tag2.url = c.uiHelps.getTag(this.tags[1].tag);  
        };
        e.prototype.initSelectView = function() {
            if(this.selectView == null) return;
            this.selectTag = -1;
            this.selectTag1.url = c.uiHelps.getTag(this.tags[0].tag);
            this.selectTag2.url = c.uiHelps.getTag(this.tags[1].tag);
            this.selectTag3.url = c.uiHelps.getTag(this.tags[2].tag);
            this.selectTag4.url = c.uiHelps.getTag(this.tags[3].tag);
            this.selectTag5.url = c.uiHelps.getTag(this.tags[4].tag);
            this.selectTag6.url = c.uiHelps.getTag(this.tags[5].tag);
            this.selectView.active = false;
            this.btnReset.node.active = false;
            this.clotheDefaultNode.active = true;
            this.selectLabel.active = true;
            this.tagSelected.node.active = false;
            this.selectNode.active = false;
        };

        e.prototype.itemSelectClick = function(evt, customData) {
            var index = parseInt(customData);
            this.selectTag = this.tags[index].tag;
            this.tagSelected.url = c.uiHelps.getTag(this.tags[index].tag);
            this.tagSelected.node.active = true;
            this.btnReset.node.active = true;
            this.clotheDefaultNode.active = false;
            this.selectLabel.active = false;
            this.selectView.active = false;
            facade.send(n.playerProxy.PLAYER_CLOTH_UPDATE);
            if(this.showTag) {
                this.onClickTagInfo();
            }
        };

        e.prototype.resetClick = function() {
            this.selectTag = -1;
            this.btnReset.node.active = false;
            this.clotheDefaultNode.active = true;
            this.selectLabel.active = true;
            this.tagSelected.node.active = false;
            facade.send(n.playerProxy.PLAYER_CLOTH_UPDATE);
            if(this.showTag) {
                this.onClickTagInfo();
            }
        };

        e.prototype.selectClick = function() {
            this.selectView.active = true;
        };
        return (e = __decorate([a], e));
    })(i.default));
o.default = s;
