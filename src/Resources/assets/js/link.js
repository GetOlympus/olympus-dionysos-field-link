/*!
 * link.js v2.0.0
 * https://github.com/GetOlympus/olympus-link-field
 *
 * This plugin change dynamically the href attribute for the link URL.
 *
 * Example of JS:
 *      $('.links').dionysosLink({
 *          color: '#ffaaaa',               // background color used when deleting a social network
 *          elements: '.links-elements',    // node elements
 *          item: 'fieldset',               // child node item
 *          multiple: false,                // define to display multiple elements or not
 *          addbutton: '.add-button',       // node element which is used to add a new item
 *          editbutton: '.edit-button',     // node element which is used to edit item
 *          removebutton: '.remove-button', // node element which is used to remove item
 *          linkurl: '.link-url',           // node element which contains link element
 *          linklabel: '.link-label',       // node element which contains link label
 *          source: 'template-id',          // node script element in DOM containing handlebars JS temlpate
 *      });
 *
 * Example of HTML:
 *      <div class="links">
 *          <div class="links-elements">
 *              <fieldset data-u="ctm-1">
 *                  <input type="hidden" name="ctm[1][url]" value="https://www.domain.ext" id="ctm-1-url" />
 *                  <input type="hidden" name="ctm[1][label]" value="My title link" id="ctm-1-label" />
 *                  <input type="hidden" name="ctm[1][target]" value="_blank" id="ctm-1-target" />
 *
 *                  <span class="link-label">My title link</span>
 *                  <a href="https://www.domain.ext" class="link-url" target="_blank">https://www.domain.ext</a>
 *
 *                  <a href="#" class="edit-button">Edit</a>
 *                  <a href="#" class="remove-button">Remove</a>
 *              </fieldset>
 *          </div>
 *
 *          <div class="hide-if-no-js">
 *              <a href="#" class="add-button">Add item</a>
 *          </div>
 *      </div>
 *
 *      <script type="text/html" id="tmpl-template-id">
 *          <fieldset data-u="ctm-{{ data.id }}">
 *              <input type="hidden" name="ctm[{{ data.id }}][url]" id="ctm-{{ data.id }}-url" value="" />
 *              <input type="hidden" name="ctm[{{ data.id }}][label]" id="ctm-{{ data.id }}-label" value="" />
 *              <input type="hidden" name="ctm[{{ data.id }}][target]" id="ctm-{{ data.id }}-target" value="_blank" />
 *
 *              <span class="link-label">Click on the Edit button</span>
 *              <a href="" class="link-url" target="_blank"></a>
 *
 *              <a href="#" class="edit-button">Edit</a>
 *              <a href="#" class="remove-button">Remove</a>
 *          </fieldset>
 *      </script>
 *
 * Copyright 2016 Achraf Chouk
 * Achraf Chouk (https://github.com/crewstyle)
 */

(function ($){
    "use strict";

    /**
     * Constructor
     * @param {nodeElement} $el
     * @param {array}       options
     */
    var Link = function ($el,options){
        // vars
        var _this = this;

        // this plugin works ONLY with WordPress wpTemplate and wpLink function
        if (!wp || !wp.template || !wpLink) {
            return;
        }

        _this.$el = $el;
        _this.options = options;

        // update elements list
        _this.$elements = _this.$el.find(_this.options.elements);

        // update length
        _this.length = _this.$elements.find(_this.options.item).length;

        // update add button
        _this.$addbutton = _this.$el.find(_this.options.addbutton);
        _this.$submitbox = _this.$addbutton.parent();

        // bind click event
        _this.$addbutton.on('click', $.proxy(_this.add_block, _this));
        _this.$elements.find(_this.options.editbutton).on('click', $.proxy(_this.edit_block, _this));
        _this.$elements.find(_this.options.removebutton).on('click', $.proxy(_this.remove_block, _this));

        // update buttons
        _this.update_buttons();
    };

    /**
     * Add block button
     * @type {nodeElement}
     */
    Link.prototype.$addbutton = null;

    /**
     * Main element
     * @type {nodeElement}
     */
    Link.prototype.$el = null;

    /**
     * List items
     * @type {array}
     */
    Link.prototype.$elements = null;

    /**
     * Elements item length
     * @type {int}
     */
    Link.prototype.length = 0;

    /**
     * Main options array
     * @type {array}
     */
    Link.prototype.options = null;

    /**
     * Submit box element
     * @type {nodeElement}
     */
    Link.prototype.$submitbox = null;

    /**
     * Creates a new block element in the items list, based on source template
     * @param {event} e
     */
    Link.prototype.add_block = function (e){
        e.preventDefault();
        var _this = this;

        // vars
        var $self = $(e.target || e.currentTarget);

        _this.length++;

        // create content from template and append to container
        var _template = wp.template(_this.options.source);
        var $html = $(_template({
            id: _this.length
        }));

        // bind events and append
        $html.find(_this.options.editbutton).on('click', $.proxy(_this.edit_block, _this));
        $html.find(_this.options.removebutton).on('click', $.proxy(_this.remove_block, _this));
        _this.$elements.append($html);

        // update buttons
        _this.update_buttons();
    };

    /**
     * Edits an item block contents
     * @param {event} e
     */
    Link.prototype.edit_block = function (e){
        e.preventDefault();
        var _this = this;

        // vars
        var $self = $(e.target || e.currentTarget),
            $parent = $self.closest(_this.options.item),
            _id = $parent.attr('data-u');

        // ids
        var $url = $parent.find('#' + _id + '-url'),
            $label = $parent.find('#' + _id + '-label'),
            $target = $parent.find('#' + _id + '-target');

        // open wpLink modal
        wpLink.open(_id + '-url', '', '');

        // update popin contents
        $('#wp-link-url').val($url.val());
        $('#wp-link-text').val($label.val());
        $('#wp-link-target').prop('checked', $target.val() === '_blank');

        // hook HTML update after modal validation
        wpLink.htmlUpdate = function (){
            var attrs = wpLink.getAttrs();

            _this.update_inputs(
                $parent,
                $('#wp-link-url').val(),
                $('#wp-link-text').val(),
                $('#wp-link-target').prop('checked') ? '_blank' : '_self'
            );

            wpLink.close();
        }
    };

    /**
     * Removes an item block contents
     * @param {event} e
     */
    Link.prototype.remove_block = function (e){
        e.preventDefault();
        var _this = this;

        // vars
        var $self = $(e.target || e.currentTarget),
            $parent = $self.closest(_this.options.item);

        // deleting animation
        $parent.css('background', _this.options.color);
        $parent.animate({
            opacity: '0'
        }, 'slow', function (){
            // remove parent and update buttons
            $parent.remove();
            _this.update_buttons();
        });
    };

    /**
     * Displays or hides interactive buttons
     */
    Link.prototype.update_buttons = function (){
        var _this = this;

        // single case
        if (1 <= _this.length && !_this.options.multiple) {
            _this.$submitbox.hide();
        }

        // other cases
        if (!_this.length || _this.options.multiple) {
            _this.$submitbox.show();
        }
    };

    /**
     * Updates targetted inputs values
     * @param {nodeElement} $item
     * @param {string}      url
     * @param {string}      label
     * @param {string}      target
     */
    Link.prototype.update_inputs = function ($item,url,label,target){
        var _this = this;
        var _id = $item.attr('data-u');

        // update values
        $item.find('#' + _id + '-url').val(url);
        $item.find('#' + _id + '-label').val(label);
        $item.find('#' + _id + '-target').val(target);

        // update HTML
        $item.find(_this.options.linklabel).text(label);
        $item.find(_this.options.linkurl).attr('href', url);
        $item.find(_this.options.linkurl).attr('target', '_blank');
        $item.find(_this.options.linkurl).text(url);
    };

    var methods = {
        init: function (options){
            if (!this.length) {
                return false;
            }

            var settings = {
                // configurations
                color: '#ffaaaa',
                elements: '.links-elements',
                item: 'fieldset',
                multiple: false,
                // buttons
                addbutton: '.add-button',
                editbutton: '.edit-button',
                removebutton: '.remove-button',
                // link
                linkurl: '.link-url',
                linklabel: '.link-label',
                // source
                source: 'template-id',
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

    $.fn.dionysosLink = function (method){
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else {
            $.error('Method '+method+' does not exist on dionysosLink');
            return false;
        }
    };
})(window.jQuery);
