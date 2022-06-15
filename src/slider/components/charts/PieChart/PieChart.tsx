import React, { useMemo } from 'react';
import { ResponsiveContainer, PieChart as OriginPieChart, Pie, Cell } from 'recharts';
import { useStore } from '../../../hooks/useStore';
import { SliderComponentProps } from '../../../types/Component';
import { getReferenceVariableValue } from '../../../utils/express';

interface PieChartLegend {
  dataKey: string;
  nameKey: string;
  fill?: string;
  label?: boolean;
  innerRadius?: number | string;
  outerRadius?: number | string;
  colorKey?: string;
}

interface PieChartConfig {
  legends?: PieChartLegend[]
}

interface PieChartProps extends SliderComponentProps {
  width: number | string;
  height: number | string;
  data?: any[] | string;
  config: PieChartConfig;
}

// https://recharts.org/en-US/examples/SimpleRadarChart
function PieChart(props: PieChartProps) {
  const store = useStore();

  const data = useMemo(() => {
    return getReferenceVariableValue(props.data, [], (key: string) => store.get(key));
  }, [props.data, store]);

  const config = props.config;

  return (
    <ResponsiveContainer 
      width={props.width} 
      height={props.height ?? 200}>
      <OriginPieChart>
        { config.legends && config.legends.map(legend => {
          return (
            <Pie
              key={legend.dataKey}
              data={data}
              dataKey={legend.dataKey} 
              nameKey={legend.nameKey} 
              fill={legend.fill} 
              label={legend.label} 
              innerRadius={legend.innerRadius}
              outerRadius={legend.outerRadius}
              >
              {
                data.map((dataItem: any, index: number) => {
                  return (
                    <Cell key={`cell-${index}`} fill={legend.colorKey ? (dataItem[legend.colorKey] ?? legend.fill) : legend.fill } />
                  );
                })
              }
              </Pie>
          );
        }) }
      </OriginPieChart>
    </ResponsiveContainer>
  )
}

export default PieChart;
