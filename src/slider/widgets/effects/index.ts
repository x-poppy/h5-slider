import { registerWidget } from "../../utils/widgetFactory";

import AlertEffect from './AlertEffect';
import DelayEffect from "./DelayEffect";
import GroupEffect from "./GroupEffect";
import NavigationEffect from "./NavigationEffect";
import SubmitStoreEffect from "./SubmitStoreEffect";
import SwitchEffect from "./ConditionEffect";
import UpdateStoreEffect from "./UpdateStoreEffect";
import ConditionEffect from "./ConditionEffect";

registerWidget(AlertEffect, 'AlertEffect');
registerWidget(ConditionEffect, 'ConditionEffect');
registerWidget(DelayEffect, 'DelayEffect');
registerWidget(GroupEffect, 'GroupEffect');
registerWidget(NavigationEffect, 'NavigationEffect');
registerWidget(SubmitStoreEffect, 'SubmitStoreEffect');
registerWidget(SwitchEffect, 'SwitchEffect');
registerWidget(UpdateStoreEffect, 'UpdateStoreEffect');


