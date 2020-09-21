var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("shader"),
    n = (function() {
        function t() {}
        t.prototype.setGray = function(t) {
            null == t || cc.sys.isBrowser || i.setShader(t, "gray");
        };
        t.prototype.clearShader = function(t) {
            null == t || cc.sys.isBrowser || i.setShader(t, "default");
        };
        t.prototype.setBlur = function(t) {
            null == t || cc.sys.isBrowser || i.setShaderBlur(t, "blur", 1);
        };
        t.prototype.setImageGray = function(t, e) {
            void 0 === e && (e = !0);
            t && t._sgNode.setState(e ? 1 : 0);
        };
        t.prototype.setSlowBlur = function(t, e, o) {
            void 0 === e && (e = !1);
            void 0 === o && (o = 30);
            if (null != t && !cc.sys.isBrowser) {
                var n = 1,
                    l = 1.5;
                t.unscheduleAllCallbacks();
                t.schedule(r, 0.03);
                t.blur &&
                    (n =
                        (n =
                            (n =
                                t.blur <= 0.1
                                    ? 1
                                    : Math.ceil((t.blur / l) * o)) <= 0
                                ? 1
                                : n) > o
                            ? o
                            : n);
                e && (n = o - n);
                r();
            }
            function r() {
                var r = n++ / o;
                r = e ? 1 - r : r;
                r *= l;
                i.setShaderBlur(t, "blur", r, 1);
                t.blur = r;
                n >= o && t.unscheduleAllCallbacks();
            }
        };
        t.prototype.setWaveVH = function(t, e, o) {
            void 0 === e && (e = 15);
            void 0 === o && (o = 0.02);
            if (null != t && !cc.sys.isBrowser) {
                t.unscheduleAllCallbacks();
                t.schedule(l, 0.04);
                o = 0;
                var n = [];
                n.push({
                    type: "float",
                    key: "angle",
                    value: e
                });
                n.push({
                    type: "float",
                    key: "motion",
                    value: o
                });
                l();
            }
            function l() {
                (o += 0.02) > 2e4 && (this._motion = 0);
                n[1].value = o;
                i.setShaderParam(t, "wave_vh", n);
            }
        };
        t.prototype.setBright = function(t, e, o, n) {
            void 0 === e && (e = 0.05);
            void 0 === o && (o = 0.01);
            void 0 === n && (n = 0.2);
            if (null != t && !cc.sys.isBrowser) {
                t.unscheduleAllCallbacks();
                t.schedule(s, 0.04);
                var l = cc.sys.now(),
                    r = 0,
                    a = [];
                a.push({
                    type: "float",
                    key: "sys_time",
                    value: r
                });
                a.push({
                    type: "float",
                    key: "width",
                    value: e
                });
                a.push({
                    type: "float",
                    key: "strength",
                    value: o
                });
                a.push({
                    type: "float",
                    key: "offset",
                    value: n
                });
                s();
            }
            function s() {
                if ((r = Math.sin((cc.sys.now() - l) / 1e3)) > 0.99) {
                    r = 0;
                    l = cc.sys.now();
                }
                a[0].value = r;
                i.setShaderParam(t, "bright", a);
            }
        };
        t.prototype.setNodeGray = function(t) {
            var e = t.getComponent(cc._RendererUnderSG);
            e && e._sgNode && this.setGray(e);
            for (
                var o = t.getComponentsInChildren(cc._RendererUnderSG), i = 0;
                i < o.length;
                i++
            )
                null != o[i]._sgNode && this.setGray(o[i]);
        };
        t.prototype.clearNodeShader = function(t) {
            var e = t.getComponent(cc._RendererUnderSG);
            e && e._sgNode && this.clearShader(e);
            for (
                var o = t.getComponentsInChildren(cc._RendererUnderSG), i = 0;
                i < o.length;
                i++
            )
                null != o[i]._sgNode && this.clearShader(o[i]);
        };
        return t;
    })();
o.ShaderUtils = n;
o.shaderUtils = new n();
