<?php

namespace GetOlympus\Dionysos\Field;

use GetOlympus\Zeus\Field\Field;

/**
 * Builds Link field.
 *
 * @package    DionysosField
 * @subpackage Link
 * @author     Achraf Chouk <achrafchouk@gmail.com>
 * @since      0.0.1
 *
 */

class Link extends Field
{
    /**
     * @var array
     */
    protected $adminscripts = ['wp-util'];

    /**
     * @var string
     */
    protected $script = 'js'.S.'link.js';

    /**
     * @var string
     */
    protected $style = 'css'.S.'link.css';

    /**
     * @var string
     */
    protected $template = 'link.html.twig';

    /**
     * @var string
     */
    protected $textdomain = 'linkfield';

    /**
     * Prepare defaults.
     *
     * @return array
     */
    protected function getDefaults() : array
    {
        return [
            'title' => parent::t('link.title', $this->textdomain),
            'default' => [],
            'description' => '',
            'multiple' => false,

            // texts
            't_add_link' => parent::t('link.add_link', $this->textdomain),
            't_delete_all' => parent::t('link.delete_all', $this->textdomain),
            't_label' => parent::t('link.label.title', $this->textdomain),
            't_label_placeholder' => parent::t('link.label.placeholder', $this->textdomain),
            't_relationship' => parent::t('link.relationship.title', $this->textdomain),
            't_relationship_description' => parent::t('link.relationship.description', $this->textdomain),
            't_target' => parent::t('link.target.title', $this->textdomain),
            't_target_blank' => parent::t('link.target.blank', $this->textdomain),
            't_target_self' => parent::t('link.target.self', $this->textdomain),
            't_target_parent' => parent::t('link.target.parent', $this->textdomain),
            't_target_top' => parent::t('link.target.top', $this->textdomain),
            't_website' => parent::t('link.website.title', $this->textdomain),
            't_website_placeholder' => parent::t('link.website.placeholder', $this->textdomain),
            't_website_goto' => parent::t('link.website.goto', $this->textdomain),
            't_website_url' => parent::t('link.website.url', $this->textdomain),
        ];
    }

    /**
     * Prepare variables.
     *
     * @param  object  $value
     * @param  array   $contents
     *
     * @return array
     */
    protected function getVars($value, $contents) : array
    {
        // Get contents
        $vars = $contents;

        // Retrieve field value
        $vars['value'] = !is_array($value) ? [$value] : (isset($value['url']) ? [$value] : $value);

        // Update vars
        return $vars;
    }
}
