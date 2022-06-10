import { registerWidget } from "../../utils/widgetFactory";

import ActionBar from './ActionBar';
import AudioPlayer from './AudioPlayer';
import Divider from "./Divider";
import Gap from "./Gap";
import Image from './Image';
import Link from './Link';
import NavigationButton from "./NavigationButton";
import RichText from "./RichText";
import SlideIndicator from "./SlideIndicator";
import Text from './Text';
import Title from './Title';
import VideoPlayer from "./VideoPlayer";

registerWidget(ActionBar, 'ActionBar');
registerWidget(AudioPlayer, 'AudioPlayer');
registerWidget(Divider, 'Divider');
registerWidget(Gap, 'Gap');
registerWidget(Image, 'Image');
registerWidget(Link, 'Link');
registerWidget(NavigationButton, 'NavigationButton');
registerWidget(RichText, 'RichText');
registerWidget(SlideIndicator, 'SlideIndicator');
registerWidget(Text, 'Text');
registerWidget(Title, 'Title');
registerWidget(VideoPlayer, 'VideoPlayer');
