import { registerComponent } from "../../utils/componentFactory";

import AlertEffect from './AlertEffect';
import DelayEffect from "./DelayEffect";
import SlideNavigationEffect from "./SlideNavigationEffect";
import QueueEffect from "./QueueEffect";
import NavigationEffect from "./NavigationEffect";
import ScreenLockEffect from "./ScreenLockEffect";
import SubmitEffect from "./SubmitEffect";
import WriteStoreEffect from "./WriteStoreEffect";
import WriteLocalStorageEffect from "./WriteLocalStorageEffect";
import ScriptEffect from "./ScriptEffect";

registerComponent(AlertEffect, 'AlertEffect', false);
registerComponent(DelayEffect, 'DelayEffect', false);
registerComponent(SlideNavigationEffect, 'SlideNavigationEffect', false);
registerComponent(QueueEffect, 'QueueEffect', false);
registerComponent(NavigationEffect, 'NavigationEffect', false);
registerComponent(SubmitEffect, 'SubmitEffect', false);
registerComponent(ScreenLockEffect, 'ScreenLockEffect', false);
registerComponent(ScriptEffect, 'ScriptEffect', false);
registerComponent(WriteStoreEffect, 'WriteStoreEffect', false);
registerComponent(WriteLocalStorageEffect, 'WriteLocalStorageEffect', false);



