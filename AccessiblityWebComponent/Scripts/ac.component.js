$(document).ready(function () {
    $('.ac-button').on('click', function () {
        var $ac_panel = $('#ac_component.ac-container');
        if (!$ac_panel.hasClass('active')) {
            $ac_panel.addClass('active');
        }
        else {
            $ac_panel.removeClass('active');
        }
    });

    $('.increase-text').on('click', TextSize.IncreaseText);
    $('.decrease-text').on('click', TextSize.DecreaseText);
    $('.ac-high-contrast').on('click', Contrast.HighContrast);
    $('.ac-low-contrast').on('click', Contrast.LowContrast);
    $('.ac-normal-contrast').on('click', Contrast.NormalContrast);
    $('.ac-keyboard-navigation').on('click', Component.KeyboardNavigation);
    $('.ac-tooltip-layer').on('click', Tooltip.ToggleTooltip);
    $('.ac-no-transition').on('click', Component.ToggleTransition);
    $(document).on('focus', '#ac_component > *', function () {
        if (!$('#ac_component.ac-container').hasClass('active')) {
            $('#ac_component.ac-container').addClass('active');
        }
    });

    $(document).on('blur', '#ac_component > *', function () { $('#ac_component.ac-container').removeClass('active') });
});
var Component = {
    KeyboardNavigation: function () {
        var $this = $('.ac-keyboard-navigation');
        $this.toggleClass('active');
        if ($this.hasClass('active')) {
            Component.InitTabindexes();
        }
        else { Component.UnInitTabindexes(); }
    },
    InitTabindexes: function () {
        $("body").find("*:not(div):not(nav):not(li):not(ul):not(hr)").each(function (i) { $(this).attr('tabindex', i + 1); });
    },
    UnInitTabindexes: function () {
        $("body").find("*:not(div):not(nav):not(li):not(ul):not(hr)").each(function (i) { $(this).removeAttr('tabindex'); });
    },
    ToggleTransition: function () {
        $('.ac-no-transition').toggleClass('active');
        $('*').toggleClass('no-transition');
    }
};
var TextSize = {
    status: 0, // 0 - normal, 1 - medium, 2- large
    changeSize: function () {
        switch (TextSize.status) {
            case 0:
                TextSize.status = 0;
                $('.decrease-text').css({ 'pointer-events': 'none' });
                $('p').removeClass(function (index, className) {
                    return (className.match(/(^|\s)ac-level-\S+/g) || []).join(' ');
                });
                break;
            case 1:
                TextSize.status = 1;
                $('p').removeClass(function (index, className) {
                    return (className.match(/(^|\s)ac-level-\S+/g) || []).join(' ');
                });

                $('p').each(function () { $(this).addClass('ac-level-1'); });
                $('.decrease-text').css({ 'pointer-events': 'unset' });
                break;
            case 2:
                TextSize.status = 2;
                $('p').removeClass(function (index, className) {
                    return (className.match(/(^|\s)ac-level-\S+/g) || []).join(' ');
                });
                $('p').each(function () { $(this).addClass('ac-level-2'); });
                break;
        }
    },
    IncreaseText: function () {
        if (TextSize.status != 2) {
            console.log(TextSize.status);
            TextSize.status = TextSize.status < 2 ? (TextSize.status + 1) : 2;
            TextSize.changeSize();
        }
    },
    DecreaseText: function () {
        TextSize.status = TextSize.status > 0 ? (TextSize.status - 1) : 0;
        TextSize.changeSize();
    }
};
var Contrast = {
    status: 0, //  0 - normal, 1 - low, 2- high
    changeContrast: function (level) {
        console.log(level);
        switch (level) {
            case 0:
                Contrast.status = 0;
                $('html').attr('data-contrast', '');
                break;
            case 1:
                Contrast.status = 1;
                $('html').attr('data-contrast', 'low');
                break;
            case 2:
                Contrast.status = 2;
                $('html').attr('data-contrast', 'high');
                break;
        }
    },
    NormalContrast: function () {
        Contrast.changeContrast(0);
    },
    LowContrast: function () {
        Contrast.changeContrast(1);
    },
    HighContrast: function () {
        Contrast.changeContrast(2);
    }
};
var Tooltip = {
    ToggleTooltip: function () {
        var $this = $('.ac-tooltip-layer');
        $this.toggleClass('active');
        if ($this.hasClass('active')) {
            Tooltip.InitTooltip();
        }
        else { Tooltip.UnInitTooltip(); }
    },
    InitTooltip: function () {
        var tipsElements = $('[data-title]');
        $.each(tipsElements, function (i, val) {
            $(this).addClass('ac-tooltip');
            var tip = $('<span />', {
                'class': 'tooltiptext',
                id: i,
                'data-value': $(val).data('title'),
                text: $(val).html().replace(/<[^>]*>/g, "")
            });
            $(this).append(tip);
        });
    },
    UnInitTooltip: function () {
        $('.tooltiptext').remove();
    },
    onTooltipFocus: function (e) {
        var $this = $(e.target).closest('span').find('.tooltiptext');
        $this.addClass('active');
    },
    onTooltipBlur: function (e) {
        var $this = $(e.target).closest('span').find('.tooltiptext');
        $this.removeClass('active');
    },
};