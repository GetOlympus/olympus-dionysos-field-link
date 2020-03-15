# Dionysos Link Field
> This component is a part of the **Olympus Dionysos fields** for **WordPress**.
> It uses the default `wpLink` WordPress javascript bundle to manage field.

```sh
composer require getolympus/olympus-dionysos-field-link
```

---

[![Olympus Component][olympus-image]][olympus-url]
[![CodeFactor Grade][codefactor-image]][codefactor-url]
[![Packagist Version][packagist-image]][packagist-url]
[![MIT][license-image]][license-blob]

---

<p align="center">
    <img src="https://github.com/GetOlympus/olympus-dionysos-field-link/blob/master/assets/field-link-64.png" />
</p>

---

## Field initialization

Use the following lines to add a `link field` in your **WordPress** admin pages or custom post type meta fields:

```php
return \GetOlympus\Dionysos\Field\Link::build('my_link_field_id', [
    'title'       => 'Never gonna give you up!',
    'default'     => [
        [
            'url'    => 'https://www.youtube.com/watch?v=oVTPg9iicy4',
            'label'  => 'Never gonna get you down!',
            'target' => '_blank',
        ],
    ],
    'description' => 'You\'ve been Rick rolled!',
    'multiple'    => false,

    /**
     * Texts definition
     * @see the `Texts definition` section below
     */
    't_addblock_title'        => 'Click on the edit button',
    't_addblock_description'  => 'Click on the "+" button to add your link.',
    't_addblocks_description' => 'Click on the "+" button to add a link item.',
    't_addblock_label'        => 'Add',
    't_editblock_label'       => 'Edit',
    't_removeblock_label'     => 'Remove',
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
| `t_addblock_title` | Click on the edit button | Message displayed on an item without link |
| `t_addblock_description` | Click on the "+" button to add your link. | Main helper to add a single item box |
| `t_addblocks_description` | Click on the "+" button to add a link item. | Main helper to add multiple items boxes |
| `t_addblock_label` | Add | Used as an Add button area title |
| `t_editblock_label` | Edit | Used as an Edit button area title |
| `t_removeblock_label` | Remove | Used as a Remove button area title |

## Retrive data

Retrieve your value from Database with a simple `get_option('my_link_field_id', [])` (see [WordPress reference][getoption-url]).  
Below, a `json_encode()` example to understand how data are stored in Database:

```json
{
  "1": {
    "url": "https://www.google.com",
    "label": "Google.com",
    "target": "_self"
  },
  "2": {
    "url": "https://www.yahoo.com",
    "label": "Yahoo.com",
    "target": "_blank"
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
        echo $link['label'];
        echo '</a>';
        echo '</li>';
    }

    echo '</ul>';
}
```

## Release History

0.0.20
- Fix display with new remove icon

0.0.19
- Display now compatible with new Zeus-Core version

0.0.18
- New fresh design with WordPress `wpLink` integration

## Contributing

1. Fork it (<https://github.com/GetOlympus/olympus-dionysos-field-link/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

---

**Built with ♥ by [Achraf Chouk](https://github.com/crewstyle "Achraf Chouk") ~ (c) since a long time.**

<!-- links & imgs dfn's -->
[olympus-image]: https://img.shields.io/badge/for-Olympus-44cc11.svg?style=flat-square
[olympus-url]: https://github.com/GetOlympus
[codefactor-image]: https://www.codefactor.io/repository/github/GetOlympus/olympus-dionysos-field-link/badge?style=flat-square
[codefactor-url]: https://www.codefactor.io/repository/github/getolympus/olympus-dionysos-field-link
[getoption-url]: https://developer.wordpress.org/reference/functions/get_option/
[license-blob]: https://github.com/GetOlympus/olympus-dionysos-field-link/blob/master/LICENSE
[license-image]: https://img.shields.io/badge/license-MIT_License-blue.svg?style=flat-square
[packagist-image]: https://img.shields.io/packagist/v/getolympus/olympus-dionysos-field-link.svg?style=flat-square
[packagist-url]: https://packagist.org/packages/getolympus/olympus-dionysos-field-link