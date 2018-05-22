var snowStorm = function(e, d) {
    function j(c, h) {
        if (isNaN(h)) h = 0;
        return Math.random() * c + h
    }
    function t() {
        if (this.excludeMobile && !u || !this.excludeMobile) e.setTimeout(function() {
                a.start(true)
            },
            20);
        a.events.remove(e, "load", t)
    }
    this.flakesMax = 100;
    this.flakesMaxActive = 64;
    this.animationInterval = 33;
    this.excludeMobile = false;
    this.flakeBottom = null;
    this.followMouse = true;//是否跟随鼠标改变左右方向
    this.snowColor = "#fff";
    this.snowCharacter = " ";
    this.snowStick = false;//到达网页底部后是否停留一会
    this.targetElement = null;
    this.useMeltEffect = false;
    this.usePositionFixed = this.useTwinkleEffect = false;//下落过程中是否闪动
    this.freezeOnBlur = false;//浏览器失去焦点是否变化
    this.flakeRightOffset = this.flakeLeftOffset = 0;
    this.flakeHeight = 5;
    this.flakeWidth = 5;
    this.vMaxX = 2;
    this.vMaxY = 7;
    this.zIndex = 0;
    var a = this,
        B = this,
        m = navigator.userAgent.match(/msie/i),
        C = navigator.userAgent.match(/msie 6/i),
        D = navigator.appVersion.match(/windows 98/i),
        u = navigator.userAgent.match(/mobile/i),
        E = m && d.compatMode === "BackCompat",
        v = u || E || C,
        k = null,
        n = null,
        l = null,
        p = null,
        w = null,
        x = null,
        r = 1,
        q = false,
        s;
    a: {
        try {
            d.createElement("div").style.opacity = "0.5"
        } catch(F) {
            s = false;
            break a
        }
        s = true
    }
    var y = false,
        z = d.createDocumentFragment();
    this.timers = [];
    this.flakes = [];
    this.active = this.disabled = false;
    this.meltFrameCount = 20;
    this.meltFrames = [];
    this.events = function() {
        function c(f) {
            f = g.call(f);
            var o = f.length;
            if (i) {
                f[1] = "on" + f[1];
                o > 3 && f.pop()
            } else o === 3 && f.push(false);
            return f
        }
        function h(f, o) {
            var A = f.shift()[b[o]];
            i ? A(f[0], f[1]) : A.apply(this, f)
        }
        var i = e.attachEvent,
            g = Array.prototype.slice,
            b = {
                add: i ? "attachEvent": "addEventListener",
                remove: i ? "detachEvent": "removeEventListener"
            };
        return {
            add: function() {
                h(c(arguments), "add")
            },
            remove: function() {
                h(c(arguments), "remove")
            }
        }
    } ();
    this.randomizeWind = function() {
        var c = j(a.vMaxX, 0.2);
        w = parseInt(j(2), 10) === 1 ? c * -1 : c;
        x = j(a.vMaxY, 0.2);
        if (this.flakes) for (c = 0; c < this.flakes.length; c++) this.flakes[c].active && this.flakes[c].setVelocities()
    };
    this.scrollHandler = function() {
        p = a.flakeBottom ? 0 : parseInt(e.scrollY || d.documentElement.scrollTop || d.body.scrollTop, 10);
        if (isNaN(p)) p = 0;
        if (!q && !a.flakeBottom && a.flakes) for (var c = a.flakes.length; c--;) a.flakes[c].active === 0 && a.flakes[c].stick()
    };
    this.resizeHandler = function() {
        if (e.innerWidth || e.innerHeight) {
            k = e.innerWidth - (!m ? 16 : 2) - a.flakeRightOffset;
            l = a.flakeBottom ? a.flakeBottom: e.innerHeight
        } else {
            k = (d.documentElement.clientWidth || d.body.clientWidth || d.body.scrollWidth) - (!m ? 8 : 0) - a.flakeRightOffset;
            l = a.flakeBottom ? a.flakeBottom: d.documentElement.clientHeight || d.body.clientHeight || d.body.scrollHeight
        }
        n = parseInt(k / 2, 10)
    };
    this.resizeHandlerAlt = function() {
        k = a.targetElement.offsetLeft + a.targetElement.offsetWidth - a.flakeRightOffset;
        l = a.flakeBottom ? a.flakeBottom: a.targetElement.offsetTop + a.targetElement.offsetHeight;
        n = parseInt(k / 2, 10)
    };
    this.freeze = function() {
        if (a.disabled) return false;
        else a.disabled = 1;
        for (var c = a.timers.length; c--;) clearInterval(a.timers[c])
    };
    this.resume = function() {
        if (a.disabled) a.disabled = 0;
        else return false;
        a.timerInit()
    };
    this.toggleSnow = function() {
        if (a.flakes.length) {
            a.active = !a.active;
            if (a.active) {
                a.show();
                a.resume()
            } else {
                a.stop();
                a.freeze()
            }
        } else a.start()
    };
    this.stop = function() {
        this.freeze();
        for (var c = this.flakes.length; c--;) this.flakes[c].o.style.display = "none";
        a.events.remove(e, "scroll", a.scrollHandler);
        a.events.remove(e, "resize", a.resizeHandler);
        if (a.freezeOnBlur) if (m) {
            a.events.remove(d, "focusout", a.freeze);
            a.events.remove(d, "focusin", a.resume)
        } else {
            a.events.remove(e, "blur", a.freeze);
            a.events.remove(e, "focus", a.resume)
        }
    };
    this.show = function() {
        for (var c = this.flakes.length; c--;) this.flakes[c].o.style.display = "block"
    };
    this.SnowFlake = function(c, h, i, g) {
        var b = this;
        this.type = h;
        this.x = i || parseInt(j(k - 20), 10);
        this.y = !isNaN(g) ? g: -j(l) - 12;
        this.vY = this.vX = null;
        this.vAmpTypes = [1, 1.2, 1.4, 1.6, 1.8];
        this.vAmp = this.vAmpTypes[this.type];
        this.melting = false;
        this.meltFrameCount = c.meltFrameCount;
        this.meltFrames = c.meltFrames;
        this.twinkleFrame = this.meltFrame = 0;
        this.active = 1;
        this.fontSize = 10 + this.type / 5 * 10;
        this.o = d.createElement("div");
        this.o.innerHTML = c.snowCharacter;
        this.o.style.color = c.snowColor;
        this.o.style.background = "linear-gradient(to bottom, transparent 0%, #FFF 100%) no-repeat scroll 0 0";
        this.o.style.borderRadius = '5px';
        this.o.style.position = q ? "fixed": "absolute";
        this.o.style.width = c.flakeWidth + "px";
        this.o.style.height = c.flakeHeight + "px";
        this.o.style.fontFamily = "arial,verdana";
        this.o.style.overflow = "hidden";
        this.o.style.fontWeight = "normal";
        this.o.style.zIndex = c.zIndex;
        z.appendChild(this.o);
        this.refresh = function() {
            if (isNaN(b.x) || isNaN(b.y)) return false;

            b.o.style.left = b.x + "px";
            b.o.style.top = b.y + "px"
        };
        this.stick = function() {
            if (v || c.targetElement !== d.documentElement && c.targetElement !== d.body) b.o.style.top = l + p - c.flakeHeight + "px";
            else if (c.flakeBottom) b.o.style.top = c.flakeBottom + "px";
            else {
                b.o.style.display = "none";
                b.o.style.top = "auto";
                b.o.style.bottom = "0px";
                b.o.style.position = "fixed";
                b.o.style.display = "block"
            }
        };
        this.vCheck = function() {
            if (b.vX >= 0 && b.vX < 0.2) b.vX = 0.2;
            else if (b.vX < 0 && b.vX > -0.2) b.vX = -0.2;
            if (b.vY >= 0 && b.vY < 0.2) b.vY = 0.2
        };
        this.move = function() {
            var f = b.vX * r;
            b.x += f;
            b.y += b.vY * b.vAmp;
            if (b.x >= k || k - b.x < c.flakeWidth) b.x = 0;
            else if (f < 0 && b.x - c.flakeLeftOffset < 0 - c.flakeWidth) b.x = k - c.flakeWidth - 1;
            b.refresh();
            if (l + p - b.y < c.flakeHeight) {
                b.active = 0;
                c.snowStick ? b.stick() : b.recycle()
            } else {
                if (c.useMeltEffect && b.active && b.type < 3 && !b.melting && Math.random() > 0.998) {
                    b.melting = true;
                    b.melt()
                }
                if (c.useTwinkleEffect) if (b.twinkleFrame) {
                    b.twinkleFrame--;
                    b.o.style.visibility = b.twinkleFrame && b.twinkleFrame % 2 === 0 ? "hidden": "visible"
                } else if (Math.random() > 0.9) b.twinkleFrame = parseInt(Math.random() * 20, 10)
            }
        };
        this.animate = function() {
            b.move()
        };
        this.setVelocities = function() {
            b.vX = w + j(c.vMaxX * 0.12, 0.1);
            b.vY = x + j(c.vMaxY * 0.12, 0.1)
        };
        this.setOpacity = function(f, o) {
            if (!s) return false;
            f.style.opacity = o
        };
        this.melt = function() {
            if (!c.useMeltEffect || !b.melting) b.recycle();
            else if (b.meltFrame < b.meltFrameCount) {
                b.meltFrame++;
                b.setOpacity(b.o, b.meltFrames[b.meltFrame]);
                b.o.style.fontSize = b.fontSize - b.fontSize * (b.meltFrame / b.meltFrameCount) + "px";
                b.o.style.lineHeight = c.flakeHeight + 2 + c.flakeHeight * 0.75 * (b.meltFrame / b.meltFrameCount) + "px"
            } else b.recycle()
        };
        this.recycle = function() {
            b.o.style.display = "none";
            b.o.style.position = q ? "fixed": "absolute";
            b.o.style.bottom = "auto";
            b.setVelocities();
            b.vCheck();
            b.meltFrame = 0;
            b.melting = false;
            b.setOpacity(b.o, 1);
            b.o.style.padding = "0px";
            b.o.style.margin = "0px";
            b.o.style.fontSize = b.fontSize + "px";
            b.o.style.lineHeight = c.flakeHeight + 2 + "px";
            b.o.style.textAlign = "center";
            b.o.style.verticalAlign = "baseline";
            b.x = parseInt(j(k - c.flakeWidth - 20), 10);
            b.y = parseInt(j(l) * -1, 10) - c.flakeHeight;
            b.refresh();
            b.o.style.display = "block";
            b.active = 1
        };
        this.recycle();
        this.refresh()
    };
    this.snow = function() {
        var c = 0,
            h = 0,
            i = 0,
            g = null;
        for (g = a.flakes.length; g--;) {
            if (a.flakes[g].active === 1) {
                a.flakes[g].move();
                c++
            } else if (a.flakes[g].active === 0) h++;
            else i++;
            a.flakes[g].melting && a.flakes[g].melt()
        }
        if (c < a.flakesMaxActive) {
            g = a.flakes[parseInt(j(a.flakes.length), 10)];
            if (g.active === 0) g.melting = true
        }
    };
    this.mouseMove = function(c) {
        if (!a.followMouse) return true;
        c = parseInt(c.clientX, 10);
        if (c < n) r = -2 + c / n * 2;
        else {
            c -= n;
            r = c / n * 2
        }
    };
    this.createSnow = function(c, h) {
        for (var i = 0; i < c; i++) {
            a.flakes[a.flakes.length] = new a.SnowFlake(a, parseInt(j(6), 10));
            if (h || i > a.flakesMaxActive) a.flakes[a.flakes.length - 1].active = -1
        }
        B.targetElement.appendChild(z)
    };
    this.timerInit = function() {
        a.timers = !D ? [setInterval(a.snow, a.animationInterval)] : [setInterval(a.snow, a.animationInterval * 3), setInterval(a.snow, a.animationInterval)]
    };
    this.init = function() {
        for (var c = 0; c < a.meltFrameCount; c++) a.meltFrames.push(1 - c / a.meltFrameCount);
        a.randomizeWind();
        a.createSnow(a.flakesMax);
        a.events.add(e, "resize", a.resizeHandler);
        a.events.add(e, "scroll", a.scrollHandler);
        if (a.freezeOnBlur) if (m) {
            a.events.add(d, "focusout", a.freeze);
            a.events.add(d, "focusin", a.resume)
        } else {
            a.events.add(e, "blur", a.freeze);
            a.events.add(e, "focus", a.resume)
        }
        a.resizeHandler();
        a.scrollHandler();
        if (a.followMouse) a.events.add(m ? d: e, "mousemove", a.mouseMove);
        a.animationInterval = Math.max(20, a.animationInterval);
        a.timerInit()
    };
    this.start = function(c) {
        if (y) {
            if (c) return true
        } else y = true;
        if (typeof a.targetElement === "string") {
            c = a.targetElement;
            a.targetElement = d.getElementById(c);
            if (!a.targetElement) throw Error('Snowstorm: Unable to get targetElement "' + c + '"');
        }
        if (!a.targetElement) a.targetElement = !m ? d.documentElement ? d.documentElement: d.body: d.body;
        if (a.targetElement !== d.documentElement && a.targetElement !== d.body) a.resizeHandler = a.resizeHandlerAlt;
        a.resizeHandler();
        a.usePositionFixed = a.usePositionFixed && !v;
        q = a.usePositionFixed;
        if (k && l && !a.disabled) {
            a.init();
            a.active = true
        }
    };
    a.events.add(e, "load", t, false);
    return this
} (window, document);