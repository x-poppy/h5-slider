import { registerWidget } from '../../utils/widgetFactory';

import Block from './Block';
import ShowableGroup from './ShowableGroup';
import FlexBox from './FlexBox';
import Group from './Group';
import Padding from './Padding';
import Slide from './Slide';
import Slider from './Slider';
import Module from './Module';

registerWidget(Block, 'Block');
registerWidget(FlexBox, 'FlexBox');
registerWidget(Group, 'Group');
registerWidget(Module, 'Module');
registerWidget(Padding, 'Padding');
registerWidget(Slide, 'Slide');
registerWidget(Slider, 'Slider');
registerWidget(ShowableGroup, 'ShowableGroup');




