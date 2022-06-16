import { registerComponent } from "../../utils/componentFactory";

import ActionBar from "./ActionBar";
import FloatingBall from "./FloatingBall";
import NavigationMenu from "./NavigationMenu";
import ScreenLock from "./ScreenLock";
import SlideIndicator from "./SlideIndicator";

registerComponent(ActionBar, 'ActionBar');
registerComponent(FloatingBall, 'FloatingBall');
registerComponent(NavigationMenu, 'NavigationMenu');
registerComponent(SlideIndicator, 'SlideIndicator');
registerComponent(ScreenLock, 'ScreenLock');
