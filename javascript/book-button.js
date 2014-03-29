
/*
* Timely BookButton plugin
* Example usage:
* var button = new timelyButton('doedayspa');
*
* Booking process can be kicked off manually by calling the start method on the button instance e.g.
* button.start();
*
*/

// Need this for legacy support of older versions of the BookingButton
var timelyButton;

(function () {
    
    "use strict";
    var context = window;
    
    var mobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i) ? true : false;
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i) ? true : false;
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPod/i) ? true : false;
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i) ? true : false;
        },
        any: function () {
            return (mobile.Android() || mobile.BlackBerry() || mobile.iOS() || mobile.Windows());
        }
    };


    timelyButton = function (id, opts) {

        var options = opts || {};
        var body = document.getElementsByTagName('body')[0];
        var businessId = id;
        var resellerCode = options.reseller || resellerCode || '';
        var productId = options.product || productId || '';
        var categoryId = options.category || categoryId || '';
        var staffId = options.staff || staffId || '';
        var locationId = options.location || locationId || '';
        window.timelyBookFrame = {};
        var XD;
        var style = options.style || 'light';
        var buttonId = options.buttonId || 'timelyScript';
        var bookButton;

        var scriptSource = (function() {
            var script = document.getElementById('timelyScript');
            if (script.getAttribute.length !== undefined) {
                return script.src;
            }
            return script.getAttribute('src', -1);
        }());
        var imgSrc = options.imgSrc || getDomain() + '/images/book-buttons/book-now-' + style + '.png';
        
        function init() {
            bookButton = document.createElement('a');
            bookButton.href = 'javascript:void(0)';
            bookButton.onclick = eventHandler.prototype.Book;
            bookButton.innerHTML = '<img src=\'' + imgSrc + '\' border=\'0\' />';
            insertAfter(bookButton, document.getElementById(buttonId));
        }

        function getDomain() {
            return ('https:' == document.location.protocol ? 'https://' : 'http://') + scriptSource.match( /:\/\/(.[^/]+)/ )[1];
        }

        function startBooking() {
            var url = "";
            if (resellerCode) {
                url += '&reseller=' + resellerCode;
            }
            if (productId) {
                url += '&productId=' + productId;
            }
            if (categoryId) {
                url += '&categoryId=' + categoryId;
            }
            if (staffId) {
                url += '&staffId=' + staffId;
            }
            if (locationId) {
                url += '&locationId=' + locationId;
            }
            
            if (window.innerWidth < 800 || mobile.any()) {
                url = getDomain() + '/booking/location/' + businessId + "?mobile=true" + url;
                window.location.href = url;
                return;
            }
            window.timelyBookFrame = document.createElement('iframe');
            window.timelyBookFrame.className = 'timely-book-frame';
            window.timelyBookFrame.style.cssText = 'width: 100%; height: 100%; position: fixed; top: 0; left: 0; z-index: 99999999;';
            window.timelyBookFrame.setAttribute('frameBorder', 0);
            window.timelyBookFrame.setAttribute('allowTransparency', 'true');
            url = getDomain() + '/booking/overlay/' + businessId + '?x' + url;
            url += '#' + encodeURIComponent(document.location.href);
            window.timelyBookFrame.src = url;
            window.timelyBookFrame.style.display = 'none';
            body.appendChild(window.timelyBookFrame);
            var element = document.getElementById('timely-lightbox');
            if (typeof(element) != 'undefined' && element != null) {
                $('#timely-lightbox').fadeOut();
            }
        }

        function insertAfter(f, n) {
            var p = n.parentNode;
            if (n.nextSibling) {
                p.insertBefore(f, n.nextSibling);
            } else {
                p.appendChild(f);
            }
        }
        
        function eventHandler() {
            // prototype instance
        }

        eventHandler.prototype.Book = function() {
            startBooking();
        };

        // everything is wrapped in the XD function to reduce namespace collisions
        XD = function () {
            
            var interval_id,
                last_hash,
                cache_bust = 1,
                attached_callback,
                window = context;

            return {
                postMessage: function (message, target_url, target) {
                    if (!target_url) {
                        return;
                    }
                    target = target || parent; // default to parent
                    if (window['postMessage']) {
                        // the browser supports window.postMessage, so call it with a targetOrigin
                        // set appropriately, based on the target_url parameter.
                        target['postMessage'](message, target_url.replace(/([^:]+:\/\/[^\/]+).*/, '$1'));
                    } else if (target_url) {
                        // the browser does not support window.postMessage, so use the window.location.hash fragment hack
                        target.location = target_url.replace(/#.*$/, '') + '#' + (+new Date) + (cache_bust++) + '&' + message;
                    }
                },
                receiveMessage: function (callback, source_origin) {
                    // browser supports window.postMessage
                    if (window['postMessage']) {
                        // bind the callback to the actual event associated with window.postMessage
                        if (callback) {
                            attached_callback = function (e) {
                                if ((typeof source_origin === 'string' && e.origin !== source_origin)
                                    || (Object.prototype.toString.call(source_origin) === "[object Function]" && source_origin(e.origin) === !1)) {
                                    return !1;
                                }
                                callback(e);
                            };
                        }
                        if (window['addEventListener']) {
                            window[callback ? 'addEventListener' : 'removeEventListener']('message', attached_callback, !1);
                        } else {
                            window[callback ? 'attachEvent' : 'detachEvent']('onmessage', attached_callback);
                        }
                    } else {
                        // a polling loop is started & callback is called whenever the location.hash changes
                        interval_id && clearInterval(interval_id);
                        interval_id = null;
                        if (callback) {
                            interval_id = setInterval(function () {
                                var hash = document.location.hash,
                                    re = /^#?\d+&/;
                                if (hash !== last_hash && re.test(hash)) {
                                    last_hash = hash;
                                    callback({ data: hash.replace(re, '') });
                                }
                            }, 100);
                        }
                    }
                }
            };
        }();

        // setup a callback to handle the dispatched MessageEvent. if window.postMessage is supported the passed
        // event will have .data, .origin and .source properties. otherwise, it will only have the .data property.
        XD.receiveMessage(function (message) {
            
            if (message.data == 'close') {
                var element = document.getElementById('timely-lightbox');
                if (typeof (element) != 'undefined' && element != null) {
                    $('#timely-lightbox').show();
                }
                if (window.timelyBookFrame && window.timelyBookFrame.parentNode) window.timelyBookFrame.parentNode.removeChild(window.timelyBookFrame);
            }
            if (message.data == 'open' && window.timelyBookFrame) {
                window.timelyBookFrame.style.display = 'block';
            }
        }, getDomain());

        init();

        // expose the BookButton API
        return {
            start: function() {
                startBooking();
            }
        };
    };
    
})();

