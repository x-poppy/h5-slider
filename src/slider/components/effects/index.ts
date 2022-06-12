import { registerComponent } from "../../utils/componentFactory";

import AlertEffect from './AlertEffect';
import DelayEffect from "./DelayEffect";
import QueueEffect from "./QueueEffect";
import NavigationEffect from "./NavigationEffect";
import SubmitStoreEffect from "./SubmitStoreEffect";
import SwitchEffect from "./ConditionEffect";
import UpdateStoreEffect from "./UpdateStoreEffect";
import ConditionEffect from "./ConditionEffect";

registerComponent(AlertEffect, 'AlertEffect');
registerComponent(ConditionEffect, 'ConditionEffect');
registerComponent(DelayEffect, 'DelayEffect');
registerComponent(QueueEffect, 'GroupEffect');
registerComponent(NavigationEffect, 'NavigationEffect');
registerComponent(SubmitStoreEffect, 'SubmitStoreEffect');
registerComponent(SwitchEffect, 'SwitchEffect');
registerComponent(UpdateStoreEffect, 'UpdateStoreEffect');


