import { registerComponent } from "../../utils/componentFactory";

import AudioPlayer from './AudioPlayer';
import Button from "./Button";
import ClickListener from "../containers/ClickListener";
import Divider from "./Divider";
import Gap from "./Gap";
import Image from './Image';
import Link from './Link';
import NoImplement from "./NoImplement";
import Option, { OptionGroup } from "./Option";
import QRCode from "./QRCode";
import RichText from "./RichText";
import Sticky from "./Sticky";
import Text from './Text';
import Title from './Title';
import VideoPlayer from "./VideoPlayer";
import Switch from "./Switch";
import Rate from "./Rate";
import CircleProgress from "./CircleProgress";
import SVGImage from "./SVGImage";
import Empty from "./Empty/Empty";
import Icon from "./Icon/Icon";

registerComponent(AudioPlayer, 'AudioPlayer');
registerComponent(Button, 'Button');
registerComponent(CircleProgress, 'CircleProgress');
registerComponent(ClickListener, 'ClickListener');
registerComponent(Divider, 'Divider');
registerComponent(Empty, 'Empty');
registerComponent(Gap, 'Gap');
registerComponent(Image, 'Image');
registerComponent(Icon, 'Icon');
registerComponent(Link, 'Link');
registerComponent(NoImplement, 'NoImplement');
registerComponent(Option, 'Option');
registerComponent(OptionGroup, 'OptionGroup');
registerComponent(QRCode, 'QRCode');
registerComponent(Rate, 'Rate');
registerComponent(RichText, 'RichText');
registerComponent(Sticky, 'Sticky');
registerComponent(SVGImage, 'SVGImage');
registerComponent(Switch, 'Switch');
registerComponent(Text, 'Text');
registerComponent(Title, 'Title');
registerComponent(VideoPlayer, 'VideoPlayer');




