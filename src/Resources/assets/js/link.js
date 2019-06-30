/*!
 * link.js v2.0.0
 * https://github.com/GetOlympus/olympus-link-field
 *
 * This plugin change dynamically the href attribute for the link URL.
 *
 * Example of JS:
 *      $('input[type="url"]').zeusLink({
 *          addbutton: '.add-link',                     //add link button
 *          color: '#ffaaaa',                           //background color used when deleting a social network
 *          container: 'fieldset',                      //node element containing all items
 *          delallbutton: '.del-all-links',             //delete all links button
 *          delbutton: '.del-link',                     //delete link button
 *          items: '.link-container',                   //node element which is used to count all elements
 *          linkbutton: 'input',                        //link button to make url clickable
 *          source: '#template-id'                      //node script element in DOM containing handlebars JS temlpate
 *      });
 *
 * Example of HTML:
 *      <div class="links">
 *          <fieldset>
 *              <div class="link-container">
 *                  <input type="url" />
 *              </div>
 *          </fieldset>
 *      </div>
 *
 * Copyright 2016 Achraf Chouk
 * Achraf Chouk (https://github.com/crewstyle)
 */

(function ($){
    "use strict";

    var Link = function ($el,options){
        //vars
        var _this = this;
        _this.$el = $el;
        _this.id = $el.attr('data-id');
        _this.options = options;

        //update container
        _this.$container = _this.$el.find(_this.options.container);

        //update number
        _this.num = _this.$container.find(_this.options.items).length;

        //bind click event
        _this.$el.find(_this.options.linkbutton).on('keyup', $.proxy(_this.linketize, _this));
        _this.$el.find(_this.options.addbutton).on('click', $.proxy(_this.add_block, _this));
        _this.$el.find(_this.options.delbutton).on('click', $.proxy(_this.remove_block, _this));
        _this.$el.find(_this.options.delallbutton).on('click', $.proxy(_this.remove_all, _this));
    };

    Link.prototype.$el = null;
    Link.prototype.$container = null;
    Link.prototype.id = null;
    Link.prototype.options = null;
    Link.prototype.num = 0;

    Link.prototype.linketize = function (e){
        e.preventDefault();
        var _this = this;

        //vars
        var $self = $(e.target || e.currentTarget);

        //change href attribute
        _this.$el.find(_this.options.gotobutton).attr('href', $self.val());
    };

    Link.prototype.add_block = function (e){
        e.preventDefault();
        var _this = this;

        //vars
        var $self = $(e.target || e.currentTarget);

        //update number
        _this.num++;

        //update modal content
        var _template = wp.template(_this.options.source),
            $html = $(_template({
                id: _this.num
            }));

        //append all to target
        _this.$container.append($html);

        //bind events
        var $link = _this.$container.find(_this.options.items).last();
        $link.find(_this.options.linkbutton).on('keyup', $.proxy(_this.linketize, _this));
        $link.find(_this.options.delbutton).on('click', $.proxy(_this.remove_block, _this));
    };

    Link.prototype.remove_all = function (e){
        e.preventDefault();
        var _this = this;

        //iterate on all
        _this.$el.find(_this.options.delbutton).click();
    };

    Link.prototype.remove_block = function (e){
        e.preventDefault();
        var _this = this;

        //vars
        var $self = $(e.target || e.currentTarget);
        var $parent = $self.closest(_this.options.items);

        //deleting animation
        $parent.css('background', _this.options.color);
        $parent.animate({
            opacity: '0'
        }, 'slow', function (){
            $parent.remove();
        });
    };

    var methods = {
        init: function (options){
            if (!this.length) {
                return false;
            }

            var settings = {
                addbutton: '.add-link',
                color: '#ffaaaa',
                container: 'fieldset',
                delallbutton: '.del-all-links',
                delbutton: '.del-link',
                gotobutton: '.goto',
                items: '.link-container',
                linkbutton: '.block-link input',
                source: 'template-id'
            };

            return this.each(function (){
                if (options) {
                    $.extend(settings, options);
                }

                new Link($(this), settings);
            });
        },
        update: function (){},
        destroy: function (){}
    };

    $.fn.zeusLink = function (method){
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else {
            $.error('Method '+method+' does not exist on zeusLink');
            return false;
        }
    };
})(window.jQuery);
