import React, { useMemo } from 'react';
import { ResponsiveContainer, LineChart as OriginLineChart, Legend, CartesianGrid, XAxis, YAxis, Bar, Line } from 'recharts';
import { useStore } from '../../../hooks/useStore';
import { SliderComponentProps } from '../../../types/Component';
import { getReferenceVariableValue } from '../../../utils/express';

interface RadarChartLegend {
  dataKey: string;
  name: string;
  stroke?: string;
  strokeDasharray?: string;
}

interface LintChartConfig {
  dataKey: string; 
  legends: RadarChartLegend[];
  grid?: {
    strokeDasharray?: string
  }
  xAxis?: {
    dataKey: string;
  }
  yAxis?: boolean;
}

interface LineChartProps extends SliderComponentProps {
  width: number | string;
  height: number | string;
  data?: any[] | string;
  config: LintChartConfig; 
}

// https://recharts.org/en-US/examples/SimpleRadarChart
function LineChart(props: LineChartProps) {
  const store = useStore();

  const data = useMemo(() => {
    return getReferenceVariableValue(props.data, [], (key: string) => store.get(key));
  }, [props.data, store]);

  const config = props.config;

  return (
    <ResponsiveContainer 
      width={props.width} 
      height={props.height ?? 200}>
      <OriginLineChart 
        data={data}>
          { config.grid && <CartesianGrid strokeDasharray={config.grid.strokeDasharray} /> }
          { config.xAxis && <XAxis dataKey={config.xAxis.dataKey} />}
          { config.yAxis && <YAxis /> }
          <Legend />
          {  config.legends.map((legend) => {
              return (
                <Line 
                  key={legend.dataKey}
                  type="monotone"
                  name={legend.name} 
                  dataKey={legend.dataKey}
                  stroke={legend.stroke}
                  strokeDasharray={legend.strokeDasharray}
                />);
            })
          }
      </OriginLineChart>
    </ResponsiveContainer>
  )
}

export default LineChart;
