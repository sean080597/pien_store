import React from 'react'
import ReactApexCharts from 'react-apexcharts'

export default function AreaChart(props) {
    const options = {
        chart: {
          type: 'area',
          height: 350,
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: 'Fundamental Analysis of Stocks',
          align: 'left'
        },
        subtitle: {
          text: 'Price Movements',
          align: 'left'
        },
        labels: ['16 NOV', '17 NOV', '18 NOV', '19 NOV', '20 NOV', '21 NOV', '22 NOV'],
        xaxis: {
          type: 'datetime',
        },
        yaxis: {
          opposite: true
        },
        legend: {
          show: true
        }
    }
    const series = [{
        name: "STOCK ABC",
        data: [25,5125,255,275,467,235,6555,6115]
    }]
    return (
        <ReactApexCharts options={options} series={series} type='area'/>
    )
}
