import { registerComponent } from "../../utils/componentFactory";

import AlertEffect from './AlertEffect';
import DelayEffect from "./DelayEffect";
import NavigationEffect from "./NavigationEffect";
import QueueEffect from "./QueueEffect";
import RedirectLocationEffect from "./RedirectLocationEffect";
import ScreenLockEffect from "./ScreenLockEffect";
import SubmitStoreEffect from "./SubmitStoreEffect";
import UpdateStoreEffect from "./UpdateStoreEffect";

registerComponent(AlertEffect, 'AlertEffect', false);
registerComponent(DelayEffect, 'DelayEffect', false);
registerComponent(NavigationEffect, 'NavigationEffect', false);
registerComponent(QueueEffect, 'QueueEffect', false);
registerComponent(RedirectLocationEffect, 'RedirectLocationEffect', false);
registerComponent(SubmitStoreEffect, 'SubmitStoreEffect', false);
registerComponent(ScreenLockEffect, 'ScreenLockEffect', false);
registerComponent(UpdateStoreEffect, 'UpdateStoreEffect', false);


