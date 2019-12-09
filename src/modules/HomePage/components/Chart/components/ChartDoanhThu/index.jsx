//libaries
import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import numeral from 'numeral';

//assets
import './style.css';

class ChartDoanhThu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			options:{
				
				labels: ['Số tiền đã mua','Số tiền đã bán'],
				colors: ['#546E7A', '#E91E63']
			},
			series: [20020, 11000],
		};
	}

	componentDidUpdate(prevProps,prevState){
		const {sotienban,sotienmua} = this.props;
		if(sotienban!==prevProps.sotienban || sotienmua !==prevProps.sotienmua){
			this.setState({
				series : [sotienmua,sotienban]
			});
		}

	}


	render() {
		const {sotienban,sotienmua}=this.props;
		const num_sotienban=numeral(sotienban).format('0,0.0');
		const num_sotienmua=numeral(sotienmua).format('0,0.0');

		return (
			<>
				<div className='chart-doanhthu'>
					<div style={{ display: 'flex', justifyContent: 'center', color: '#f45f1e', fontSize: '20px', fontWeight: '600' }}>
                    Báo cáo doanh thu
					</div>
					<Chart options={this.state.options} series={this.state.series} type='donut' width='400px'/>
					<div style={{display:'flex',flexDirection:'column'}}>
						<span style={{display:'flex',color:'#546E7A',fontWeight:'bold'}}>
								Số tiền đã mua:
							<p style={{fontWeight:'normal',marginLeft:10}}>{` ${num_sotienmua} vnđ`}</p>
						</span>
						<span style={{display:'flex',color:'#E91E63',fontWeight:'bold'}}>
								Số tiền đã bán:
							<p style={{fontWeight:'normal',marginLeft:10}} >{` ${num_sotienban} vnđ`}</p>
						</span>
					</div>
				</div>
			</>
		);
	}
}

export default ChartDoanhThu;
