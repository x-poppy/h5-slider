import { registerComponent } from "../../utils/componentFactory";

import AlertEffect from './AlertEffect';
import DelayEffect from "./DelayEffect";
import NavigationEffect from "./NavigationEffect";
import QueueEffect from "./QueueEffect";
import RedirectLocationEffect from "./RedirectLocationEffect";
import SubmitStoreEffect from "./SubmitStoreEffect";
import UpdateStoreEffect from "./UpdateStoreEffect";

registerComponent(AlertEffect, 'AlertEffect', false);
registerComponent(DelayEffect, 'DelayEffect', false);
registerComponent(QueueEffect, 'QueueEffect', false);
registerComponent(RedirectLocationEffect, 'RedirectLocationEffect', false);
registerComponent(SubmitStoreEffect, 'SubmitStoreEffect', false);
registerComponent(UpdateStoreEffect, 'UpdateStoreEffect', false);
registerComponent(NavigationEffect, 'NavigationEffect', false);

