import { registerWidget } from '../../utils/widgetFactory';

import ClickListener from './ClickListener';
import Group from './Group';
import NoImplement from './NoImplement';
import Sticky from './Sticky';

registerWidget(ClickListener, 'ClickListener');
registerWidget(Sticky, 'Sticky');
registerWidget(Group, 'Group');
registerWidget(NoImplement, 'NoImplement');


