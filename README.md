# h5-slider

## Variables Namespace

$ {schema.xxxxxxxx}
$ {event.xxxxxxxxx}
$ {store.xxxxxxxxx}

## Components



### Link

| Name      | Description      | Type               | Acceptable Value                                           | Default Value |
| --------- | ---------------- | ------------------ | ---------------------------------------------------------- | ------------- |
| type      | type of text     | `string`           | `danger` `secondary` `light` `primary` `success` `warning` |               |
| size      | size of the text | `string`           | `xs` `sm` `md` `lg` `xl` `xxl`                             | `md`          |
| ellipsis  | show ellipsis    | `boolean` `number` |                                                            | `false`       |
| disabled  | disabled         | `boolean`          |                                                            | `false`       |
| delete    | delete style     |                    |                                                            | false         |
| underline | underline style  |                    |                                                            | false         |
| center    | center style     |                    |                                                            | false         |
| strong    | strong style     |                    |                                                            | false         |

**Examples**

```json
{
  "type": "Link",
  "props": {
    "type": "danger",
    "size": "md",
    "delete": true
  },
  "children": "Children seem to have fun doing just about anything… even reading!"
}
```

### Title

| Name      | Description        | Type               | Acceptable Value                                           | Default Value |
| --------- | ------------------ | ------------------ | ---------------------------------------------------------- | ------------- |
| type      | type of text       | `string`           | `danger` `secondary` `light` `primary` `success` `warning` |               |
| size      | size of the text   | `string`           | `xs` `sm` `md` `lg` `xl` `xxl`                             | `md`          |
| ellipsis  | show ellipsis      | `boolean` `number` |                                                            | `false`       |
| disabled  | disabled           | `boolean`          |                                                            | `false`       |
| delete    | delete style       |                    |                                                            | false         |
| underline | underline style    |                    |                                                            | false         |
| center    | center style       |                    |                                                            | false         |
| strong    | strong style       |                    |                                                            | false         |
| level     | level of the title | `number`           |                                                            | 4             |

**Examples**

```json
{
  "type": "Title",
  "props": {
    "type": "secondary",
    "size": "md",
    "delete": true,
    "level": 3
  },
  "children": "Why Learn English with Children’s Books?"
}
```
### Text

| Name      | Description      | Type               | Acceptable Value                                           | Default Value |
| --------- | ---------------- | ------------------ | ---------------------------------------------------------- | ------------- |
| type      | type of text     | `string`           | `danger` `secondary` `light` `primary` `success` `warning` |               |
| size      | size of the text | `string`           | `xs` `sm` `md` `lg` `xl` `xxl`                             | `md`          |
| ellipsis  | show ellipsis    | `boolean` `number` |                                                            | `false`       |
| disabled  | disabled         | `boolean`          |                                                            | `false`       |
| delete    | delete style     |                    |                                                            | false         |
| underline | underline style  |                    |                                                            | false         |
| center    | center style     |                    |                                                            | false         |
| strong    | strong style     |                    |                                                            | false         |

**Examples**

```json
{
  "type": "Text",
  "props": {
    "type": "danger",
    "size": "md",
    "delete": true
  },
  "children": "Children seem to have fun doing just about anything… even reading!"
}
```

### Layouts

### FlexBox

| Name      | Description              | Type     | Acceptable Value                                             | Default Value |
| --------- | ------------------------ | -------- | ------------------------------------------------------------ | ------------- |
| gap       | gap of content           | `string` | `xs` `sm` `md` `lg` `xl` `xxl`                               | `md`          |
| size      | size of the text         | `string` | `xs` `sm` `md` `lg` `xl` `xxl`                               | `md`          |
| direction | direction for the layout | `string` | `horizontal` `vertical`                                      | `horizontal`  |
| align     | disabled                 | `string` | `start` `end` `center` `baseline`                            | `start`       |
| justify   | delete style             | `string` | `start` `end` `center` `between` `around` `evenly` `stretch` | `start`       |

**Examples**

```json
{
  "type": "Link",
  "props": {
    "type": "danger",
    "size": "md",
    "delete": true
  },
  "children": "Children seem to have fun doing just about anything… even reading!"
}
```


### Stage

#### props

+ children
## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
