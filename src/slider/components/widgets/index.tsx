import { registerComponent } from "../../utils/componentFactory";

import ActionBar from "./ActionBar";
import ScreenLock from "./ScreenLock";
import SlideIndicator from "./SlideIndicator";

registerComponent(ActionBar, 'ActionBar');
registerComponent(SlideIndicator, 'SlideIndicator');
registerComponent(ScreenLock, 'ScreenLock');
