import { registerComponent } from '../../utils/componentFactory';
import BarChart from './BarChart';
import LineChart from './LineChart';
import PieChart from './PieChart';
import RadarChart from './RadarChart';

registerComponent(BarChart, 'BarChart');
registerComponent(LineChart, 'LineChart');
registerComponent(PieChart, 'PieChart');
registerComponent(RadarChart, 'RadarChart');
