import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class ChartDoanhThu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			options: {
				labels: ['Doanh số đã mua', 'Oranges', 'Bananas', 'Berries'],
				radialBar: {
					dataLabels: {
						name: {
							fontSize: '22px',
						},
						value: {
							fontSize: '16px',
						},
						total: {
							show: true,
							label: 'Total',
							formatter: function(w) {
								// By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
								return 249;
							},
						},
					},
				},
			},
			series: [44, 55, 67, 83],
		};
	}


	render() {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '100px' }}>
				<div style={{ display: 'flex', justifyContent: 'center', color: '#f45f1e', fontSize: '20px', fontWeight: '600' }}>
                    Báo cáo doanh thu
				</div>
				<Chart options={this.state.options} series={this.state.series} type='radialBar' height='350' />
			</div>
		);
	}
}

export default ChartDoanhThu;
