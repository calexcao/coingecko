import Highcharts, { format } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useGetChartDataQuery } from '../services/cryptoApi';
import millify from 'millify';

const Chart = ({ id, days, type }) => {
  const { data, isFetching } = useGetChartDataQuery({ id, days });

  if (isFetching) return <div className="bg-[#0d1217] min-h-screen"></div>;

  console.log(data);

  const chartData = data?.[type] || [];

  const isRed = chartData[0][1] > chartData[chartData.length - 1][1];

  const formatNumber = (num) => {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 8,
    });
  };

  const chartOptions = {
    chart: {
      backgroundColor: '#0d1217',
    },
    title: {
      text: null
    },
    xAxis: {
      type: 'datetime',
      title: {
        text: null
      },
      labels: {
        style: {
          color: '#9eb0c7'
        }
      }
    },
    yAxis: {
      title: {
        text: null
      },
      opposite: true,
      gridLineColor: '#1b232d',
      gridLineThickness: 0.5,
      labels: {
        style: {
          color: '#9eb0c7'
        },
        formatter: function () {
          return '$' + millify(this.value);
        }
      },
      min: Math.min(...chartData.map(data => data[1])) * 0.99,
      max: Math.max(...chartData.map(data => data[1])) * 1.01
    },
    credits: {
      enabled: false
    },
    tooltip: {
      backgroundColor: '#1b232d',
      style: {
        color: '#ffffff'
      },
      formatter: function () {
        const valueName = type === 'prices' ? 'Price' : 'Market Cap';
        return '<b style="color: #7a8a9e">' + Highcharts.dateFormat('%b, %d, %Y %H:%M:%S EDT', this.x) + '</b><br/>' +
               '<br/>' + 
               '<span style="color: #7a8a9e">' + valueName + ': </span>' + 
               '<span style="color: #dfe5ec">$' + formatNumber(this.y) + '</span>';
      }      
    },
    plotOptions: {
      area: {
        color: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, isRed ? 'rgba(255, 58, 51, 0.4)' : 'rgba(50, 202, 91, 0.4)'],
            [1, isRed ? 'rgba(255, 58, 51, 0)' : 'rgba(50, 202, 91, 0)']
          ]
        },
        threshold: 0,
        lineWidth: 2,
      },
      series: {
        lineColor: isRed ? '#ff3a33' : '#32ca5b',
        lineWidth: 2
      }
    },
    series: [{
      name: null,
      data: chartData.map(data => [data[0], data[1]]),
      showInLegend: false,
      type: 'area'
    }]
  };

  return (
    <div className="chart-container">
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
}

export default Chart;
