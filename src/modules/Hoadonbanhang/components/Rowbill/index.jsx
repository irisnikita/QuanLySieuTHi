import React, { Component } from 'react';
import numeral from 'numeral';

class Rowbill extends Component {
	
	componentDidMount(){

	}

	render() {
		const {billsell,index}=this.props;
		const num_dongia=numeral(billsell.dongia).format('0,0.0');
		const num_thanhtien=numeral(billsell.thanhtien).format('0,0.0');
		return (
			<>
				<tr>
					<td>{index}</td>
					<td>{billsell.tenmh}</td>
					<td>{billsell.id}</td>
					<td>{billsell.loaimh}</td>
					<td>{billsell.dvt}</td>
					<td>{billsell.soluong}</td>
					<td>{`${num_dongia} vnd`}</td>
					<td>{`${num_thanhtien} vnd`}</td>
				</tr>
			</>
		);
	}
}

export default Rowbill;
