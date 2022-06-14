import React, { useMemo } from 'react';
import { ResponsiveContainer, Radar, RadarChart as OriginRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend } from 'recharts';
import { useStore } from '../../../hooks/useStore';
import { SliderComponentProps } from '../../../types/Component';
import { getReferenceVariableValue } from '../../../utils/express';

interface RadarChartLegend {
  dataKey: string;
  name: string;
  stroke?: string;
  fill?: string;
  fillOpacity?: number;
}

interface RadarChartConfig {
  dataKey: string; 
  innerRadius?: number | string
  outerRadius?: number | string;
  angle?: number; 
  domain?: number[]; // range for props
  legends: RadarChartLegend[]
  grid?: boolean
  radiusAxis?: {
    angle?: number,
    domain?: any[]
  }
}

interface RadarChartProps extends SliderComponentProps {
  width: number | string;
  height: number | string;
  data?: any[] | string;
  config: RadarChartConfig; 
}

// https://recharts.org/en-US/examples/SimpleRadarChart
function RadarChart(props: RadarChartProps) {
  const store = useStore();

  const data = useMemo(() => {
    return getReferenceVariableValue(props.data, [], (key: string) => store.get(key));
  }, [props.data, store]);

  const config = props.config;

  return (
    <ResponsiveContainer 
      width={props.width} 
      height={props.height ?? 200}>
      <OriginRadarChart
        outerRadius={config.outerRadius} 
        innerRadius={config.innerRadius}
        data={data}>
          {(config.grid ?? true) &&  <PolarGrid /> }
          <PolarAngleAxis dataKey={config.dataKey} />
          { config.radiusAxis && <PolarRadiusAxis angle={config.radiusAxis.angle} domain={config.radiusAxis.domain} />}
          {  config.legends.map((legend) => {
              return (
                <Radar
                  key={legend.dataKey}
                  name={legend.name} 
                  dataKey={legend.dataKey}
                  stroke={legend.stroke}
                  fill={legend.fill}
                  fillOpacity={legend.fillOpacity} 
                />);
            })
          }
          <Legend />
      </OriginRadarChart>
    </ResponsiveContainer>
  )
}

export default RadarChart;
