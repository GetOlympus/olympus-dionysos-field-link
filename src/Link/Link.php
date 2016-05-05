<?php

namespace GetOlympus\Field;

use GetOlympus\Hera\Field\Controller\Field;
use GetOlympus\Hera\Translate\Controller\Translate;

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
    protected $faIcon = 'fa-link';

    /**
     * @var string
     */
    protected $template = 'link.html.twig';

    /**
     * Prepare HTML component.
     *
     * @param array $content
     * @param array $details
     *
     * @since 0.0.1
     */
    protected function getVars($content, $details = [])
    {
        // Build defaults
        $defaults = [
            'id' => '',
            'title' => Translate::t('link.title', [], 'linkfield'),
            'default' => [],
            'description' => '',
            'expandable' => false,

            // details
            'post' => 0,
            'prefix' => '',
            'template' => 'pages',

            // texts
            't_add_link' => Translate::t('link.add_link', [], 'linkfield'),
            't_delete_all' => Translate::t('link.delete_all', [], 'linkfield'),
            't_relationship' => Translate::t('link.relationship.title', [], 'linkfield'),
            't_relationship_description' => Translate::t('link.relationship.description', [], 'linkfield'),
            't_target' => Translate::t('link.target.title', [], 'linkfield'),
            't_target_blank' => Translate::t('link.target.blank', [], 'linkfield'),
            't_target_self' => Translate::t('link.target.self', [], 'linkfield'),
            't_target_parent' => Translate::t('link.target.parent', [], 'linkfield'),
            't_target_top' => Translate::t('link.target.top', [], 'linkfield'),
            't_website' => Translate::t('link.website.title', [], 'linkfield'),
            't_website_address' => Translate::t('link.website.address', [], 'linkfield'),
            't_website_placeholder' => Translate::t('link.website.placeholder', [], 'linkfield'),
            't_website_goto' => Translate::t('link.website.goto', [], 'linkfield'),
        ];

        // Build defaults data
        $vars = array_merge($defaults, $content);

        // Retrieve field value
        $vars['val'] = $this->getValue($details, $vars['default'], $content['id'], true);
        $vars['val'] = is_array($vars['val']) ? $vars['val'] : [$template['val']];

        // Update vars
        $this->getField()->setVars($vars);
    }
}
