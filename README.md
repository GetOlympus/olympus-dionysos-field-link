<p align="center">
    <img src="https://img.icons8.com/nolan/2x/external-link.png">
</p>

# Link Field
> This component is a part of the [**Olympus Zeus Core**][zeus-url] **WordPress** framework.

[![Olympus Component][olympus-image]][olympus-url]
[![CodeFactor Grade][codefactor-image]][codefactor-url]
[![Packagist Version][packagist-image]][packagist-url]

## Installation

Using `composer` in your PHP project:

```sh
composer require getolympus/olympus-link-field
```

## Field initialization

Use the following lines to add a `link field` in your **WordPress** admin pages or custom post type meta fields:

```php
return \GetOlympus\Field\Link::build('my_link_field_id', [
    'title' => 'Never gonna give you up!',
    'default' => [
        [
            'url'    => 'https://www.youtube.com/watch?v=oVTPg9iicy4',
            'label'  => 'Never gonna get you down!',
            'target' => '_blank',
            'rel'    => 'nofollow',
        ],
    ],
    'description' => 'You\'ve been Rick rolled!',
    'multiple' => false,

    /**
     * Texts definition
     * @see the `Texts definition` section below
     */
    't_add_link' => 'Add link',
    't_delete_all' => 'Delete all links',
    't_label' => 'Label',
    't_label_placeholder' => 'Put your link label here.',
    't_relationship' => 'Relationship',
    't_relationship_description' => 'You can set the <code>nofollow</code> value to avoid bots following the linked document.',
    't_target' => 'Target',
    't_target_blank' => 'New window or tab',
    't_target_self' => 'Same frame as it was clicked',
    't_target_parent' => 'Parent frame',
    't_target_top' => 'Full body of the window',
    't_website_placeholder' => 'https:// or http://',
    't_website_goto' => 'Go to',
    't_website_url' => 'Website url',
]);
```

## Variables definition

| Variable      | Type    | Default value if not set | Accepted values |
| ------------- | ------- | ------------------------ | --------------- |
| `title`       | String  | `'Hypertext link'` | *empty* |
| `default`     | Array   | *empty* | *empty* |
| `description` | String  | *empty* | *empty* |
| `multiple`    | Boolean | `false` | `true` or `false` |

Notes:
* Set `multiple` to `true` to enable the "Add link" button

## Texts definition

| Code | Default value | Definition |
| ---- | ------------- | ---------- |
| `t_add_link` | Add link | Used as a add link label button |
| `t_delete_all` | Delete all links | Used as a delete all links label button |
| `t_label` | Label | Used as a link label title field |
| `t_label_placeholder` | Put your link label here. | Used as a link placeholder title field |
| `t_relationship` | Relationship | Used as a link relationship title field |
| `t_relationship_description` | You can set the `nofollow` value<br/>to avoid bots following the linked<br/>document. | Used as a link relationship description field |
| `t_target` | Target | Used as a link target title field |
| `t_target_blank` | New window or tab | `_blank` target field description |
| `t_target_self` | Same frame as it was clicked | `_self` target field description |
| `t_target_parent` | Parent frame | `_parent` target field description |
| `t_target_top` | Full body of the window | `_top` target field description |
| `t_website_placeholder` | https:// or http:// | Used as a link website placeholder field |
| `t_website_goto` | Go to | Used as a link website go to label |
| `t_website_url` | Website url | Used as a link website label field |

## Retrive data

Retrieve your value from Database with a simple `get_option('my_link_field_id', [])` (see [WordPress reference][getoption-url]).  
Below, a `json_encode()` example to understand how data are stored in Database:

```json
{
  "1": {
    "url": "https://www.google.com",
    "label": "Google.com",
    "target": "_parent",
    "rel": "dofollow"
  },
  "2": {
    "url": "https://www.yahoo.com",
    "label": "Yahoo.com",
    "target": "_blank",
    "rel": "nofollow"
  }
}
```

And below, a simple example to show how to iterate on the data array in `PHP`:

```php
// Get links from Database
$links = get_option('my_link_field_id', []);

// Check if links are empty
if (!empty($links)) {
    // Build HTML list
    echo '<ul>';

    foreach ($links as $link) {
        // Build HTML items
        echo '<li>';
        echo '<a href="'.$link['url'].'" target="'.$link['target'].'" title="'.esc_html($link['label']).'">';
        echo $link['target'];
        echo '</a>';
        echo '</li>';
    }

    echo '</ul>';
}
```

## Release History

* 0.0.15
- [x] FIX: remove twig dependency from composer

* 0.0.14
- [x] FIX: remove zeus-core dependency from composer

* 0.0.13
- [x] FIX: add `wp-util` integration to make JS works fine

* 0.0.12
- [x] FIX: update JS file with wpTemplate integration
- [x] ADD: new version compatible with Zeus-Core latest version

## Authors and Copyright

Achraf Chouk  
[![@crewstyle][twitter-image]][twitter-url]

Please, read [LICENSE][license-blob] for more information.  
[![MIT][license-image]][license-url]

<https://github.com/crewstyle>  
<https://fr.linkedin.com/in/achrafchouk>

## Contributing

1. Fork it (<https://github.com/GetOlympus/olympus-link-field/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

---

**Built with ♥ by [Achraf Chouk](http://github.com/crewstyle "Achraf Chouk") ~ (c) since a long time.**

<!-- links & imgs dfn's -->
[olympus-image]: https://img.shields.io/badge/for-Olympus-44cc11.svg?style=flat-square
[olympus-url]: https://github.com/GetOlympus
[zeus-url]: https://github.com/GetOlympus/Zeus-Core
[codefactor-image]: https://www.codefactor.io/repository/github/GetOlympus/olympus-link-field/badge?style=flat-square
[codefactor-url]: https://www.codefactor.io/repository/github/getolympus/olympus-link-field
[getoption-url]: https://developer.wordpress.org/reference/functions/get_option/
[license-blob]: https://github.com/GetOlympus/olympus-link-field/blob/master/LICENSE
[license-image]: https://img.shields.io/badge/license-MIT_License-blue.svg?style=flat-square
[license-url]: http://opensource.org/licenses/MIT
[packagist-image]: https://img.shields.io/packagist/v/getolympus/olympus-link-field.svg?style=flat-square
[packagist-url]: https://packagist.org/packages/getolympus/olympus-link-field
[twitter-image]: https://img.shields.io/badge/crewstyle-blue.svg?style=social&logo=twitter
[twitter-url]: http://twitter.com/crewstyle