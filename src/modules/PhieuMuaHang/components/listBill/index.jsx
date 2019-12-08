import React, { Component } from 'react';
import {connect} from 'react-redux';
import numeral from 'numeral';

//actions
import {onAddRowBill} from '../../actions';

//assets
import './style.css';

class ListBill extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: 0,
			tenmh: '',
			dvt: '',
			dongia: 0,
			soluong: 0,
			thanhtien: 0,
		};
	}


	render() {
		let { rowbill = {}, index = 0 } = this.props;
		let fmt_thanhtien = numeral(rowbill.thanhtien).format('0,0');
		return (
			<>
				<tr className='row100 body'>
					<td className='cell100' style={{ width: '100px', padding: '0 0 0 10px' }}>
						{index}
					</td>
					<td className='cell100' style={{ width: '128px' }}>
						<input
							type='text'
							name='id'
							value={rowbill.id}
							readOnly
							placeholder='Nhập mã số'
							style={{ width: '118px', fontFamily: 'Arial' }}
							onChange={this.onChange}
						/>
					</td>
					<td className='cell100 ' style={{ width: '177px' }}>
						<textarea
							className="outline-none"
							type='text'
							name='tenmh'
							value={rowbill.tenmh}
							readOnly
							placeholder='Nhập tên hàng'
							style={{ width: '118px', fontFamily: 'Arial' }}
							onChange={this.onChange}
						/>
					</td>
					<td className='cell100 ' style={{ width: '202px' }}>
						<input
							type='text'
							className="outline-none"
							name='dvt'
							value={rowbill.dvt}
							readOnly
							placeholder='Nhập đơn vị tính'
							style={{ width: '118px', fontFamily: 'Arial' }}
							onChange={this.onChange}
						/>
					</td>
					<td className='cell100' style={{ width: '157px' }}>
						<input
							type='number'
                            
							name='dongia'
							readOnly
							value={rowbill.dongia}
							placeholder='Nhập đơn giá'
							style={{ width: '118px', fontFamily: 'Arial' }}
							onChange={this.onChange}
						/>
					</td>
					<td className='cell100' style={{ width: '180px' }}>
						<input
							type='number'
							name='soluong'
							readOnly
							value={rowbill.soluong}
							placeholder='Nhập số lượng'
							style={{ width: '118px', fontFamily: 'Arial' }}
							onChange={this.onChange}
						/>
					</td>
					<td className='cell100' style={{ width: '197px' }}>
						<textarea
							type='number'
                            
							className="outline-none"
							placeholder={`${fmt_thanhtien} vnd`}
							readOnly
							style={{ width: '118px', fontFamily: 'Arial' }}
							onChange={this.onChange}
                            
						/>
					</td>
					<td className='cell100' style={{ width: '179px' }}>
                        
					</td>
				</tr>
			</>
		);
	}
}

function mapStateToProps (state){
	return{

	};
}

const mapDispatchToProps ={
	onAddRowBill
};

export default connect(mapStateToProps,mapDispatchToProps)(ListBill);
