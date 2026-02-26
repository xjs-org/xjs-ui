# xjs-ui

Material styled components using XJS library as core.

## Import:

```javascript
import * as Material from "https://cdn.jsdelivr.net/gh/xjs-org/xjs-ui@main/material/v0.1/index.min.js";
```

```html
<script
  src="https://cdn.jsdelivr.net/gh/xjs-org/xjs-ui@main/material/v0.1/index.min.js"
  crossorigin
></script>
```

## Using in your js file (i.e. app.js) file:

```javascript
const { Containers, Icons, Inputs, Layouts, Navigations, Selectors, Styles } =
  Material;

export const {
  App,
  Scaffold,
  ActionSheet,
  Card,
  Chip,
  CircularProgress,
  LinearProgress,
  PageView,
  Snackbar,
  Toast,
  Badge,
  Accordion,
  AlertDialog,
  Carousel,
} = Layouts;
export const {
  ListView,
  ListTile,
  Column,
  Container,
  Flex,
  GridView,
  Placeholder,
  Row,
  SizedBox,
} = Containers;
export const {
  Menu,
  Sidebar,
  TabBar,
  AppBar,
  Breadcrumbs,
  Pagination,
  ContextMenu,
  NavigationBar,
  NavigationDestination,
  NavigationRail,
  PopupMenu,
  BottomAppBar,
} = Navigations;
export const {
  FloatingButton,
  Text,
  TextField,
  EmailField,
  PasswordField,
  NumericField,
  Form,
  Button,
  IconButton,
  Logo,
  Switch,
  Checkbox,
  DatePicker,
  Image,
  Radio,
  Slider,
  InputField,
  TimePicker,
} = Inputs;
export const { SingleSelector, MultiSelector, SegmentedListSelector } =
  Selectors;
export const {
  Center,
  Margin,
  Movable,
  Align,
  Bold,
  Border,
  Divider,
  Expanded,
  Marker,
  Opacity,
  Padding,
  Transform,
} = Styles;
export const { Icon, SvgIcon } = Icons;
```
