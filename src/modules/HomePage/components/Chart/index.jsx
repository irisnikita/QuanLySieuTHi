import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import _ from 'lodash';

//components
import ChartDoanhThu from './components/ChartDoanhThu';

//assets
import './style.css';

class ClassChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			options: {
				yaxis: {
					title: {
						text: 'Số lượng',
					},
					min: 0,
				},
				xaxis: {
					categories: [
						'Tháng 1',
						'Tháng 2',
						'Tháng 3',
						'Tháng 4',
						'Tháng 5',
						'Tháng 6',
						'Tháng 7',
						'Tháng 8',
						'Tháng 9',
						'Tháng 10',
						'Tháng 11',
						'Tháng 12',
					],
				},
				colors: ['#F44336', '#29fbd6', '#9C27B0'],
			},
			series: [
				{
					name: 'Hàng đã mua',
					data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				},
				{
					name: 'Hàng đã bán',
					data: [10, 20, 30, 12, 20, 20],
				},
			],
		};
	}

	componentDidUpdate(prevProps) {
		const { listsolieu = [] } = this.props;
		const { listsolieuhoadon = [] } = this.props;

		if (!_.isEqual(listsolieu, prevProps.listsolieu) || !_.isEqual(listsolieuhoadon, prevProps.listsolieuhoadon)) {
			const sortlistsolieu = _.sortBy(listsolieu, 'month');
			const sortlistsolieuhoadon = _.sortBy(listsolieuhoadon, 'month');

			let series = [];
			let data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			let data2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

			sortlistsolieu.forEach((item, index) => {
				data[index] = item.sohang;
			});

			sortlistsolieuhoadon.forEach((item, index) => {
				data2[index] = item.sohang;
			});

			series = [
				{
					name: 'Hàng đã mua',
					type: 'area',
					data: data,
				},
				{
					name: 'Hàng đã bán',
					type: 'area',
					data: data2,
				},
			];

			this.setState({
				series: series,
			});
		}
	}
	render() {
		return (
			<>
				<div className='mixed-chart'>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: '#37ccb1',
							fontSize: '20px',
							fontWeight: '600',
						}}
					>
                        Báo cáo số liệu
					</div>
					<Chart options={this.state.options} series={this.state.series} type="area" width='700' height='300' />
				</div>
			</>
		);
	}
}

export default ClassChart;
