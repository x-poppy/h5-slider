import { registerComponent } from '../../utils/componentFactory';

import Block from './Block';
import ClickListener from './ClickListener';
import FlexBox from './FlexBox';
import Float from './Float';
import Module from './Module';
import Group from './Group';
import IFrame from './IFrame';
import Padding from './Padding';
import ToggleGroup from './ToggleGroup';
import Slide from './Slide';
import Slider from './Slider';
import Tack from './Tack';

registerComponent(Block, 'Block');
registerComponent(ClickListener, 'ClickListener');
registerComponent(FlexBox, 'FlexBox');
registerComponent(Float, 'Float');
registerComponent(Group, 'Group');
registerComponent(IFrame, 'IFrame');
registerComponent(Module, 'Module');
registerComponent(Padding, 'Padding');
registerComponent(Slide, 'Slide');
registerComponent(Slider, 'Slider');
registerComponent(Tack, 'Tack');
registerComponent(ToggleGroup, 'ToggleGroup');
