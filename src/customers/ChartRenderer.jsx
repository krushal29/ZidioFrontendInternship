import React from 'react';
import {  useRef , useEffect } from 'react';
import { Bar, Line, Pie, Doughnut, Scatter } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const ChartRenderer = ({ type, data, xLabel, yLabel , onChartReady}) => {
  const chartRef = useRef(null);
  const labels = data.map((item) => item.x);
  const values = data.map((item) => item.y);
  const percentages = data.map((item) => item.percentage);


  const dataset = {
    labels,
    datasets: [
      {
        label: type === 'pie' || type === 'donut' ? `${xLabel}` : `${yLabel} vs ${xLabel}`,
        data: type === 'scatter' ? data : values,
        backgroundColor: [
          // 'rgba(75,192,192,0.6)',
          // 'rgba(255,99,132,0.6)',
          // 'rgba(54,162,235,0.6)',
          // 'rgba(255,206,86,0.6)',
          // 'rgba(153,102,255,0.6)',
          '#ff6384',
  '#36a2eb',
  '#cc65fe',
  '#ffce56',
  '#4bc0c0',
        ],
        
        // borderColor: 'rgba(75,192,192,1)',
        borderColor:['#ff6384',
  '#36a2eb',
  '#cc65fe',
  '#ffce56',
  '#4bc0c0',],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const percentage = percentages[context.dataIndex];
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  useEffect(() => {
    if (chartRef.current && onChartReady) {
      const chartInstance = chartRef.current;
      const canvas = chartInstance.canvas;
      onChartReady(canvas);
    }
  }, [onChartReady, type, data]);

  const chartProps = {
    ref: chartRef,
    data: type === 'scatter' ? { datasets: dataset.datasets } : dataset,
    options,
    height: 500,
    width: 900,
  };

  switch (type) {
     case 'bar':
      return <Bar {...chartProps} />;
    case 'line':
      return <Line {...chartProps} />;
    case 'pie':
      return <Pie {...chartProps} />;
    case 'donut':
      return <Doughnut {...chartProps} />;
    case 'scatter':
      return <Scatter {...chartProps} />;
    default:
      return <p>No chart type selected</p>;
  }
};

export default ChartRenderer;
