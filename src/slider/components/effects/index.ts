import { registerComponent } from "../../utils/componentFactory";

import AlertEffect from './AlertEffect';
import DelayEffect from "./DelayEffect";
import QueueEffect from "./QueueEffect";
import NavigationEffect from "./NavigationEffect";
import SubmitStoreEffect from "./SubmitStoreEffect";
import UpdateStoreEffect from "./UpdateStoreEffect";

registerComponent(AlertEffect, 'AlertEffect', false);
registerComponent(DelayEffect, 'DelayEffect', false);
registerComponent(QueueEffect, 'QueueEffect', false);
registerComponent(NavigationEffect, 'NavigationEffect', false);
registerComponent(SubmitStoreEffect, 'SubmitStoreEffect', false);
registerComponent(UpdateStoreEffect, 'UpdateStoreEffect', false);
