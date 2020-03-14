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
    protected $adminscripts = ['wplink'];

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
            't_addblock_title' => parent::t('link.addblock_title', $this->textdomain),
            't_addblock_description' => parent::t('link.addblock_description', $this->textdomain),
            't_addblocks_description' => parent::t('link.addblocks_description', $this->textdomain),
            't_addblock_label' => parent::t('link.addblock_label', $this->textdomain),
            't_editblock_label' => parent::t('link.editblock_label', $this->textdomain),
            't_removeblock_label' => parent::t('link.removeblock_label', $this->textdomain),
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
