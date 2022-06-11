import { registerWidget } from "../../utils/widgetFactory";

import ActionBar from './ActionBar';
import AudioPlayer from './AudioPlayer';
import Button from "./Button";
import ClickListener from "../container/ClickListener";
import Divider from "./Divider";
import Gap from "./Gap";
import Image from './Image';
import Link from './Link';
import NavigationButton from "./NavigationButton";
import NoImplement from "./NoImplement";
import Option, { OptionGroup } from "./Option";
import QRCode from "./QRCode";
import RichText from "./RichText";
import SlideIndicator from "./SlideIndicator";
import Sticky from "./Sticky";
import Text from './Text';
import Title from './Title';
import VideoPlayer from "./VideoPlayer";
import { Rate } from "react-vant";

registerWidget(ActionBar, 'ActionBar');
registerWidget(AudioPlayer, 'AudioPlayer');
registerWidget(Button, 'Button');
registerWidget(ClickListener, 'ClickListener');
registerWidget(Divider, 'Divider');
registerWidget(Gap, 'Gap');
registerWidget(Image, 'Image');
registerWidget(Link, 'Link');
registerWidget(NavigationButton, 'NavigationButton');
registerWidget(NoImplement, 'NoImplement');
registerWidget(Option, 'Option');
registerWidget(OptionGroup, 'OptionGroup');
registerWidget(QRCode, 'QRCode');
registerWidget(Rate, 'Rate');
registerWidget(RichText, 'RichText');
registerWidget(SlideIndicator, 'SlideIndicator');
registerWidget(Sticky, 'Sticky');
registerWidget(Text, 'Text');
registerWidget(Title, 'Title');
registerWidget(VideoPlayer, 'VideoPlayer');




