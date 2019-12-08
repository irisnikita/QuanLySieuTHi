import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import _ from 'lodash';

//components
import ChartDoanhThu from './components/ChartDoanhThu';

class ClassChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			options: {
				chart: {
					id: 'basic-bar',
					
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
					data: [0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0],
				},
				{
					name: 'Hàng đã bán',
					data: [10, 20, 30, 12, 20, 20],
				},
			],
		};
	}


	componentDidUpdate(prevProps){
		const {listsolieu=[]}=this.props;
		if(!_.isEqual(listsolieu,prevProps.listsolieu)){
			const sortlistsolieu = _.sortBy(listsolieu,'month');
			console.log('sortlistsolieu',sortlistsolieu);
			let series=[];
			let data =[0, 0, 0,0, 0, 0, 0, 0,0,0,0,0];
			sortlistsolieu.map((item,index)=>{
				data[index]=item.sohang;
			});
			series=[
				{
					name: 'Hàng đã mua',
					data: data,
				},
				{
					name: 'Hàng đã bán',
					data: [2000, 1000, 3000, 1500, 2660, 2330,2567,233,4462,3445],
				},
			];
			this.setState({
				series :series
			});
		}
	}
	render() {
		return (
			<>
				<div className='app'>
					<div className='row'>
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
							<Chart options={this.state.options} series={this.state.series} type='area' width='700' height='300' />
						</div>
						<ChartDoanhThu />
					</div>
				</div>
			</>
		);
	}
}

export default ClassChart;
