/**
 * Show tips
 *
 * @param Dom|jQDom|String target
 * @param Json opts
 * @example
 * 	 $("#ins").tooltip("hello world!", {
 *      context_position : "left top+15",
 *      target_position: "left bottom",
 *		arrow_tip : {
 *			direction : 'left',
 *			offset : 50%,
 *			height : 5
 *		},
 *     hover_active: false,
 *     track: false
 *	})
 */

$.fn.tooltip = function(target, opts, onShow, onClose) {
    if ($(this).data('tooltipObject')) {
        var oldTarget = $(this).data('tooltipObject');
        oldTarget.close();
        oldTarget.off('mouseover', oldTarget._mouseoverFunction)
                .off('mouseleave', oldTarget._mouseleaveFunction)
                .off('mousemove', oldTarget._trackFunction);
    }

    this.show = function(autoClose) {
        if (currentObject.autoClose) {
            clearTimeout(currentObject.autoClose);
            currentObject.autoClose = false;
        }
        if (tipTarget.is(":visible")) {
            closeStatus && clearTimeout(closeStatus);
            closeStatus = false;
            if (autoClose !== undefined && parseInt(autoClose) > 0) {
                currentObject.autoClose = setTimeout(function() {
                    currentObject.close();
                }, parseInt(autoClose));
            }
            return true;
        }
        $(".tooltip").remove();
        // tipTarget position top for body
        var _atTop = 0;

        // tipTarget position left for body
        var _atLeft = 0;

        var _myPosition = $$.offset();
        var _myTop = _myPosition.top;
        var _myLeft = _myPosition.left;
        var _myHeight = $$.outerHeight();
        var _myWidth = $$.outerWidth();
        var _temp = $.trim(opts.context_position);
        var _myPosition = _temp.split(/( )+/);
        var _myX = _myPosition[0];
        var _myY = 'center';
        if (_myPosition[2] !== undefined) {
            _myY = _myPosition[2];
        } else if (_myPosition[1] !== undefined) {
            _myY = _myPosition[1];
        }

        // convert string to num
        _myX = _myX.replace('left', 0);
        _myX = _myX.replace('center', _myWidth * 0.5);
        _myX = _myX.replace('right', _myWidth);
        _myX = _myX.replace(/(\d+)\%/, _myWidth + '*' + '($1/100)');
        _myX = _myLeft + eval(_myX);

        _myY = _myY.replace('top', 0);
        _myY = _myY.replace('center', _myHeight * 0.5);
        _myY = _myY.replace('bottom', _myHeight);
        _myY = _myY.replace(/(\d+)\%/, _myHeight + '*' + '($1/100)');

        _myY = _myTop + eval(_myY);

        // Get dot for adjust position
        var _myDotY = _myTop + _myHeight * 0.5;
        var _myDotX = _myLeft + _myWidth * 0.5;

        tipTarget.css({position: 'absolute', top: 0, left: 0}).show().appendTo('body');
        $(target).show();

        var _atHeight = tipTarget.outerHeight();
        var _atWidth = tipTarget.outerWidth();
        var _atMinWidth = parseFloat(tipTarget.css('min-width')) + 40;
        _atMinWidth = _atMinWidth > _atWidth ? _atWidth : _atMinWidth;
        if (!_atMinWidth) {
            _atMinWidth = _atWidth;
        }
        var _temp = $.trim(opts.target_position);
        var _atPosition = _temp.split(/( )+/);
        var _atX = _atPosition[0];
        var _atY = 'center';
        if (_atPosition[2] !== undefined) {
            _atY = _atPosition[2];
        } else if (_atPosition[1] !== undefined) {
            _atY = _atPosition[1];
        }

        // convert string to num
        _atX = _atX.replace('left', 0);
        _atX = _atX.replace('center', _atWidth * 0.5);
        _atX = _atX.replace('right', _atWidth);
        _atX = _atX.replace(/(\d+)\%/, _atWidth + '*' + '($1/100)');
        _atX = eval(_atX);

        _atY = _atY.replace('top', 0);
        _atY = _atY.replace('center', _atHeight * 0.5);
        _atY = _atY.replace('bottom', _atHeight);
        _atY = _atY.replace(/(\d+)\%/, _atHeight + '*' + '($1/100)');
        _atY = eval(_atY);

        _atTop = _myY - _atY;
        _atLeft = _myX - _atX;

        var _atDotY = _atHeight * 0.5;
        var _atDotX = _atWidth * 0.5;

        // Adjust Position
        //var _newMyY, _newMyX, _newAtY, _newAtX;
        var offset = false;
        var re = /\d+\%$/;
        if (re.exec(opts.arrow_tip.offset)) {
            offset = parseInt(opts.arrow_tip.offset) / 100;
        }
        var baseNum = false;
        var newPosition = opts.arrow_tip !== undefined ? opts.arrow_tip.direction : false;
        var arrowNewPosition = offset ? offset : parseInt(opts.arrow_tip.offset);
        if (offset) {
            baseNum = 1;
        } else if (newPosition === 'top' || newPosition === 'bottom') {
            baseNum = _atWidth;
        } else if (newPosition === 'left' || newPosition === 'right') {
            baseNum = _atHeight;
        }

        var isForceChangeYAxis = false;
        if ((_atTop + _atHeight) > ($(window).height() + $(window).scrollTop())) {
            _myY = 2 * _myDotY - _myY;
            _atY = 2 * _atDotY - _atY;
            _atTop = _myY - _atY;
            isForceChangeYAxis = (_atTop + _atHeight) - ($(window).height() + $(window).scrollTop());
            if (newPosition === 'top') {
                newPosition = 'bottom';
            } else if (newPosition === 'bottom') {
                newPosition = 'top';
            } else if (newPosition === 'left' || newPosition === 'right') {
                arrowNewPosition = baseNum - arrowNewPosition;
            }
        }

        var isForceXAxis = false;
        if ((_atLeft + _atMinWidth) > ($(window).width() + $(window).scrollLeft())) {
            _myX = 2 * _myDotX - _myX;
            _atX = 2 * _atDotX - _atX;
            _atLeft = _myX - _atX;
            isForceXAxis = (_atLeft + _atMinWidth) - ($(window).width() + $(window).scrollLeft());
            if (newPosition === 'left') {
                newPosition = 'right';
            } else if (newPosition === 'right') {
                newPosition = 'left';
            } else if (newPosition === 'top' || newPosition === 'bottom') {
                arrowNewPosition = baseNum - arrowNewPosition;
            }
        }

        if (_atTop < $(window).scrollTop() && (isForceChangeYAxis === false || (($(window).scrollTop() - _atTop) < isForceChangeYAxis) || _atTop < 0)) {
            _myY = 2 * _myDotY - _myY;
            _atY = 2 * _atDotY - _atY;
            _atTop = _myY - _atY;

            if (newPosition === 'top') {
                newPosition = 'bottom';
            }
            else if (newPosition === 'bottom') {
                newPosition = 'top';
            } else if (newPosition === 'left' || newPosition === 'right') {
                arrowNewPosition = baseNum - arrowNewPosition;
            }
        }

        if (_atLeft < $(window).scrollLeft() && (isForceXAxis === false || (($(window).scrollLeft() - _atLeft) < isForceXAxis))) {
            _myX = 2 * _myDotX - _myX;
            _atX = 2 * _atDotX - _atX;
            _atLeft = _myX - _atX;
            if (newPosition === 'left') {
                newPosition = 'right';
            } else if (newPosition === 'right') {
                newPosition = 'left';
            } else if (newPosition === 'top' || newPosition === 'bottom') {
                arrowNewPosition = baseNum - arrowNewPosition;
            }
        }
        var _atDiffDis = 0;
        if (_atLeft < 3 && (newPosition === 'top' ||  newPosition === 'bottom')) {
            _atDiffDis = 3 - _atLeft;
            _atLeft = 3;
        }

        if (_atTop < 3 && (newPosition === 'left' ||  newPosition === 'right')) {
            _atDiffDis = 3 - _atTop;
            _atTop = 3;
        }

        // arrow
        if (opts.arrow_tip !== false && $.browser.transform) {
            var arrow = $('<div class="arrow-wrapper"></div>');
            var subArrow = $('<div class="arrow"></div>');
            arrow.append(subArrow);

//            if (opts.arrow_tip.height < 15) {
//                subArrow.css('box-shadow', '0 0 0 black');
//            }
            var t = $.fn.tooltip._calculatorBox(opts.arrow_tip.height);
            if (newPosition === 'top') {
                arrow.css({
                    height: t.box_short,
                    width: t.box_long,
                    top: -1 * t.box_short,
                    left: (offset ? parseInt(arrowNewPosition * _atWidth - t.box_long / 2) : parseInt(arrowNewPosition - t.box_long / 2)) - _atDiffDis
                });

                subArrow.css({
                    left: t.arrow_side,
                    top: t.arrow_top,
                    width: t.arrow_long,
                    height: t.arrow_long
                });
                //.css('box-shadow', (-1 * t.arrow_shadow) + 'px ' + (-1 * t.arrow_shadow) + 'px 7px -4px black');
            } else if (newPosition === 'right') {
                arrow.css({
                    height: t.box_long,
                    width: t.box_short,
                    right: -1 * t.box_short,
                    top: (offset ? parseInt(arrowNewPosition * _atHeight - t.box_long / 2) : parseInt(arrowNewPosition - t.box_long / 2)) - _atDiffDis
                });

                subArrow.css({
                    right: t.arrow_top,
                    top: t.arrow_side,
                    width: t.arrow_long,
                    height: t.arrow_long
                });
                //.css('box-shadow', t.arrow_shadow + 'px ' + (-1 * t.arrow_shadow) + 'px 7px -4px black');
            } else if (newPosition === 'bottom') {
                arrow.css({
                    height: t.box_short,
                    width: t.box_long,
                    bottom: -1 * t.box_short,
                    left: (offset ? parseInt(arrowNewPosition * _atWidth - t.box_long / 2) : parseInt(arrowNewPosition - t.box_long / 2)) - _atDiffDis
                });

                subArrow.css({
                    left: t.arrow_side,
                    bottom: t.arrow_top,
                    width: t.arrow_long,
                    height: t.arrow_long
                });
                //.css('box-shadow', t.arrow_shadow + 'px ' + t.arrow_shadow + 'px 7px -4px black');

            } else if (newPosition === 'left') {
                arrow.css({
                    height: t.box_long,
                    width: t.box_short,
                    left: -1 * t.box_short,
                    top: (offset ? parseInt(arrowNewPosition * _atHeight - t.box_long / 2) : parseInt(arrowNewPosition - t.box_long / 2)) - _atDiffDis
                });

                subArrow.css({
                    top: t.arrow_side,
                    left: t.arrow_top,
                    width: t.arrow_long,
                    height: t.arrow_long
                });
                //.css('box-shadow', (-1 * t.arrow_shadow) + 'px ' + t.arrow_shadow + 'px 7px -4px black');
            }
            tipTarget.find('.arrow-wrapper').remove();
            tipTarget.append(arrow);
        }
        else if (opts.arrow_tip !== false) {
            var arrow = $('<div class="arrow-wrapper-normal"></div>');
            var subArrow = $('<div class="arrow-normal"></div>');
            var height = opts.arrow_tip.height;
            if (newPosition === 'top') {
                arrow.add(subArrow).css({
                    borderWidth: height
                }).addClass('arrow-top');

                arrow.css({
                    left: (offset ? parseInt(arrowNewPosition * _atWidth - height) : parseInt(arrowNewPosition - height)) - _atDiffDis,
                    top: height * -1
                });

                subArrow.css({
                    left: (offset ? parseInt(arrowNewPosition * _atWidth - height) : parseInt(arrowNewPosition - height)) - _atDiffDis,
                    top: (height - opts._arrow_tip_border) * -1
                });
            } else if (newPosition === 'left') {
                arrow.add(subArrow).css(
                        'border-width', height
                        ).addClass('arrow-left');
                arrow.css({
                    top: (offset ? parseInt(arrowNewPosition * _atHeight - height) : parseInt(arrowNewPosition - height)) - _atDiffDis,
                    left: -1 * height
                });

                subArrow.css({
                    top: (offset ? parseInt(arrowNewPosition * _atHeight - height) : parseInt(arrowNewPosition - height)) - _atDiffDis,
                    left: (height - opts._arrow_tip_border) * -1
                });
            } else if (newPosition === 'right') {
                arrow.add(subArrow).css(
                        'border-width', height
                        ).addClass('arrow-right');

                arrow.css({
                    top: (offset ? parseInt(arrowNewPosition * _atHeight - height) : parseInt(arrowNewPosition - height)) - _atDiffDis,
                    right: height * -1
                });

                subArrow.css({
                    top: (offset ? parseInt(arrowNewPosition * _atHeight - height) : parseInt(arrowNewPosition - height)) - _atDiffDis,
                    right: (height - opts._arrow_tip_border) * -1
                });
            } else if (newPosition === 'bottom') {
                arrow.add(subArrow).css(
                        'border-width', height
                        ).addClass('arrow-bottom');

                arrow.css({
                    left: (offset ? parseInt(arrowNewPosition * _atWidth - height) : parseInt(arrowNewPosition - height)) - _atDiffDis,
                    bottom: height * -1
                });

                subArrow.css({
                    left: (offset ? parseInt(arrowNewPosition * _atWidth - height) : parseInt(arrowNewPosition - height)) - _atDiffDis,
                    bottom: (height - opts._arrow_tip_border) * -1
                });
            }
            tipTarget.find($('.arrow-wrapper, .arrow-wrapper-normal, .arrow-normal')).remove();
            tipTarget.append(arrow).append(subArrow);
        }

        tipTarget.css({position: 'absolute', top: _atTop, left: _atLeft});

        if (tipTarget.outerHeight() !== _atHeight) {
            if (tipTarget.offset().top < _myTop) {
                _atTop -= tipTarget.outerHeight() - _atHeight;
            }
            tipTarget.css({top: _atTop});
        }

        var popTargetLeft = parseInt(tipTarget.css('left'));

        tipTarget.css({
            left: (popTargetLeft - 5)
        }).show().animate({
            left: popTargetLeft
        }, 'fast');

        opts.hover_active && tipTarget.on('mouseover', function() {
            closeStatus && clearTimeout(closeStatus);
            closeStatus = false;
        });

        opts.hover_active && tipTarget.on('mouseleave', function() {
            closeStatus = setTimeout(function() {
                currentObject.close();
                closeStatus = false;
            }, 100);
        });
        if (autoClose !== undefined && parseInt(autoClose) > 0) {
            currentObject.autoClose = setTimeout(function() {
                currentObject.close();
            }, parseInt(autoClose));
        }
        if (typeof $(this).data('onShow') === 'function') {
            $(this).data('onShow').call();
        }
    };

    this.close = function() {
        tipTarget.finish().remove();
        if (typeof $(this).data('onClose') === 'function') {
            $(this).data('onClose').call();
        }
    };

    this.autoClose = false;

    this.setContent = function(con, append) {
        if (typeof append == 'undefined')
            append = false;
        if (append) {
            tipTarget.children('.tool-tip-content').append(con);
        } else {
            tipTarget.children('.tool-tip-content').empty().append(con);
        }
        return tipTarget;
    };

    var $$ = $(this);
    if ($$.size() < 1) {
        return false;
    }
    var re = /^(#|\.)[a-zA-Z\-0-9]*$/;
    if ('string' === typeof target && re.exec(target)) {
        var target = $(target);
    } else if ('string' === typeof target) {
        var target = $('<div\/>').html(target);
    } else if ('object' === typeof target) {
        if (target instanceof  $) {
            var target = target.get(0);
        }
    }
    $(this).data('onShow', null);
    $(this).data('onClose', null);
    if (typeof onShow === 'function') {
        $(this).data('onShow', onShow);
    }

    if (typeof onClose === 'function') {
        $(this).data('onClose', onClose);
    }

    var opts = $.extend({}, $.fn.tooltip.defaults, opts || {});
    var closeStatus = false;

    // tip Target
    var tipTarget = '';

    tipTarget = $("<div></div>");
    tipTarget.addClass('tooltip');
    if (opts.close_button) {
        tipTarget.append('<div class="tool-tip-close">Close</div>');
        tipTarget.children('.tool-tip-close').on('touchstart click', function() {
            currentObject.close();
        });
    }
    tipTarget.append('<div class="tool-tip-content"></div>');
    tipTarget.children('.tool-tip-content').append(target);
    if (opts.class_name !== false) {
        tipTarget.addClass(opts.class_name);
    }

    var currentObject = this;
    this._mouseoverFunction = function() {
        currentObject.show();
    };
    !opts.track && opts.hover_active && $$.on('mouseover', this._mouseoverFunction);

    this._mouseleaveFunction = function() {
        if (opts.target_hover) {
            closeStatus = setTimeout(function() {
                currentObject.close();
                closeStatus = false;
            }, 100);
        } else {
            currentObject.close();
            closeStatus = false;
        }
    };

    (opts.hover_active || opts.track) && $$.on('mouseleave', this._mouseleaveFunction);

    this._trackFunction = function(e) {
        tipTarget.children('.arrow').remove();
        tipTarget.appendTo('body').show();
        tipTarget.show();
        $(target).show();

        var tipHeight = tipTarget.outerHeight();
        var tipWidth = tipTarget.outerWidth();
        var distance = 5;

        //var mouseClientX = e.clientX;
        var horizontalX = 'right'; // option(left, center, right)
        var verticalY = 'bottom'; // option(top, center, bottom)

        var scrollTop = $(window).scrollTop();
        var scrollLeft = $(window).scrollLeft();
        if ((e.clientX + tipWidth + distance) > $(window).width()) {
            horizontalX = 'left';
            if (e.clientX - tipWidth - distance < 0) {
                horizontalX = 'center';
            }
        }

        if ((e.clientY + tipHeight + distance) > $(window).height()) {
            verticalY = 'top';
            if ((e.clientY - tipHeight - distance) < 0) {
                verticalY = 'center';
            }
        }

        if (horizontalX === verticalY === 'center') {
            horizontalX = 'center';
            verticalY = 'bottom';
        }

        var absoluteLeft = 0;
        var absoluteTop = 0;
        // Calculate position
        switch (horizontalX + '-' + verticalY) {
            case 'left-top' :
                absoluteLeft = e.clientX - distance - tipWidth;
                absoluteTop = e.clientY - tipHeight - distance;
                break;
            case 'left-center' :
                absoluteLeft = e.clientX - distance - tipWidth;
                absoluteTop = e.clientY - tipHeight / 2;
                break;
            case 'left-bottom':
                absoluteLeft = e.clientX - distance - tipWidth;
                absoluteTop = e.clientY + distance;
                break;
            case 'center-top':
                absoluteLeft = e.clientX - tipWidth / 2;
                absoluteTop = e.clientY - tipHeight - distance;
                break;
            case 'center-bottom':
                absoluteLeft = e.clientX - tipWidth / 2;
                absoluteTop = e.clientY + distance;
                break;
            case 'right-top':
                absoluteLeft = e.clientX + distance;
                absoluteTop = e.clientY - distance - tipHeight;
                break;
            case 'right-center':
                absoluteLeft = e.clientX + distance;
                absoluteTop = e.clientY - tipHeight / 2;
                break;
            case 'right-bottom':
                absoluteLeft = e.clientX + distance;
                absoluteTop = e.clientY + distance;
                break;
        }

        absoluteLeft = parseInt(absoluteLeft) + scrollLeft;
        absoluteTop = parseInt(absoluteTop) + scrollTop;
        tipTarget.css({position: 'absolute', top: absoluteTop, left: absoluteLeft}).show();
    };
    opts.track && $$.on('mousemove', this._trackFunction);
    $(this).data('tooltipObject', currentObject);
    return currentObject;
};

$.fn.tooltip.defaults = {
    context_position: 'right center',
    target_position: 'left-20 center',
    class_name: false,
    arrow_tip: false,
    hover_active: true,
    track: false,
    _arrow_tip_border: 2,
    close_button: false,
    target_hover: true
};

/**
 * Calculator the box and arrow data
 * Only be used in arrow function
 *
 * @param int height
 * @returns Json
 */
$.fn.tooltip._calculatorBox = function(height) {
    var t = {
        box_long: 0,
        box_short: 0,
        arrow_long: 0,
        arrow_top: 0,
        arrow_side: 0,
        arrow_shadow: 0
    };

    var side = 4;
    var top = 3;
    height = parseInt(height);
    if (height < 1) {
        height = 5;
    }
    radius = height + top;
    t.arrow_long = Math.sqrt(radius * radius * 2);
    t.arrow_top = radius - t.arrow_long / 2 + top;
    t.box_long = (radius - top) * 2 + 2 * side;
    t.box_short = radius;
    t.arrow_side = (t.box_long - t.arrow_long) / 2;

    // conside the border size.
    t.arrow_long = new Number(t.arrow_long).toFixed(0) * 1;
    t.arrow_long -= 1;
    t.arrow_side = new Number(t.arrow_side).toFixed(0) * 1;
    t.arrow_top = new Number(t.arrow_top).toFixed(0) * 1;
    t.box_long = new Number(t.box_long).toFixed(0) * 1;
    t.arrow_shadow = parseInt(Math.sqrt((side + 1) * (side + 1) / 2));

    return t;
};

$(window).on("orientationchange", function() {
    $(".tooltip").remove();
});

$(window).on('resize', function() {
    if(device === 'desktop') {
        $(".tooltip").remove();
    } else {
        if(!$(document.activeElement).is(":focus")) {
            $(".tooltip").remove();
        }
    }
});

$(document).on('click', '.tooltip', function(event) {
    event.stopPropagation();
});

if(!('ontouchend' in document)) {
    $(document).on('click', function() {
        $(".tooltip").remove();
    });
}
