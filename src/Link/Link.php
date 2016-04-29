<?php

namespace GetOlympus\Field;

use GetOlympus\Hera\Controllers\Field;
use GetOlympus\Hera\Controllers\Translate;

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
            'title' => Translate::t('link.title'),
            'default' => [],
            'description' => '',
            'expandable' => false,

            // details
            'post' => 0,
            'prefix' => '',
            'template' => 'pages',

            // texts
            't_add_link' => Translate::t('link.add_link'),
            't_delete_all' => Translate::t('link.delete_all'),
            't_relationship' => Translate::t('link.relationship.title'),
            't_relationship_description' => Translate::t('link.relationship.description'),
            't_target' => Translate::t('link.target.title'),
            't_target_blank' => Translate::t('link.target.blank'),
            't_target_self' => Translate::t('link.target.self'),
            't_target_parent' => Translate::t('link.target.parent'),
            't_target_top' => Translate::t('link.target.top'),
            't_website' => Translate::t('link.website.title'),
            't_website_address' => Translate::t('link.website.address'),
            't_website_placeholder' => Translate::t('link.website.placeholder'),
            't_website_goto' => Translate::t('link.website.goto'),
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
