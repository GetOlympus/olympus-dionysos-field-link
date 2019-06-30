<?php

namespace GetOlympus\Field;

use GetOlympus\Zeus\Field\Controller\Field;
use GetOlympus\Zeus\Translate\Controller\Translate;

/**
 * Builds Link field.
 *
 * @package Field
 * @subpackage Link
 * @author Achraf Chouk <achrafchouk@gmail.com>
 * @since 0.0.1
 *
 * @see https://olympus.readme.io/v1.0/docs/link-field
 *
 */

class Link extends Field
{
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
    protected function getDefaults()
    {
        return [
            'title' => Translate::t('link.title', $this->textdomain),
            'default' => [],
            'description' => '',
            'multiple' => false,

            // texts
            't_add_link' => Translate::t('link.add_link', $this->textdomain),
            't_delete_all' => Translate::t('link.delete_all', $this->textdomain),
            't_label' => Translate::t('link.label.title', $this->textdomain),
            't_label_placeholder' => Translate::t('link.label.placeholder', $this->textdomain),
            't_relationship' => Translate::t('link.relationship.title', $this->textdomain),
            't_relationship_description' => Translate::t('link.relationship.description', $this->textdomain),
            't_target' => Translate::t('link.target.title', $this->textdomain),
            't_target_blank' => Translate::t('link.target.blank', $this->textdomain),
            't_target_self' => Translate::t('link.target.self', $this->textdomain),
            't_target_parent' => Translate::t('link.target.parent', $this->textdomain),
            't_target_top' => Translate::t('link.target.top', $this->textdomain),
            't_website' => Translate::t('link.website.title', $this->textdomain),
            't_website_placeholder' => Translate::t('link.website.placeholder', $this->textdomain),
            't_website_goto' => Translate::t('link.website.goto', $this->textdomain),
            't_website_url' => Translate::t('link.website.url', $this->textdomain),
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
    protected function getVars($value, $contents)
    {
        // Get contents
        $vars = $contents;

        // Retrieve field value
        $vars['value'] = !is_array($value) ? [$value] : $value;

        // Update vars
        return $vars;
    }
}
