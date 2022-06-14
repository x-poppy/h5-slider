import React, { useMemo } from 'react';
import { ResponsiveContainer, BarChart as OriginBarChart, Legend, CartesianGrid, XAxis, YAxis, Bar } from 'recharts';
import { useStore } from '../../../hooks/useStore';
import { SliderComponentProps } from '../../../types/Component';
import { getReferenceVariableValue } from '../../../utils/express';

interface RadarChartLegend {
  dataKey: string;
  name: string;
  fill?: string;
}

interface RadarChartConfig {
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

interface BarChartProps extends SliderComponentProps {
  width: number | string;
  height: number | string;
  data?: any[] | string;
  config: RadarChartConfig; 
}

// https://recharts.org/en-US/examples/SimpleRadarChart
function BarChart(props: BarChartProps) {
  const store = useStore();

  const data = useMemo(() => {
    return getReferenceVariableValue(props.data, [], (key: string) => store.get(key));
  }, [props.data, store]);

  const config = props.config;

  return (
    <ResponsiveContainer 
      width={props.width} 
      height={props.height ?? 200}>
      <OriginBarChart 
        data={data}>
          { config.grid &&  <CartesianGrid strokeDasharray={config.grid.strokeDasharray} /> }
          { config.xAxis && <XAxis dataKey={config.xAxis.dataKey} />}
          { config.yAxis && <YAxis /> }
          <Legend />
          {  config.legends.map((legend) => {
              return (
                <Bar 
                  key={legend.dataKey}
                  name={legend.name} 
                  dataKey={legend.dataKey}
                  fill={legend.fill}
                />);
            })
          }
      </OriginBarChart>
    </ResponsiveContainer>
  )
}

export default BarChart;
