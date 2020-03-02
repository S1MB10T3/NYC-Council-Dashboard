import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Table } from 'antd';
import * as actions from './actions'
import 'antd/dist/antd.css';

class Dashboard extends Component {

  componentDidMount() {
    this.props.getComplaints();
    this.props.getOpenComplaints();
    this.props.getCloseComplaints();
    this.props.getTopComplaint();
  }

  render() {

    const columns = [
      {
        title: 'Account',
        width: 100,
        dataIndex: 'account',
        key: 'account',
      },
      {
        title: 'Council District',
        dataIndex: 'council_dist',
        key: 'council_dist',
        width: 100,
        fixed: 'left'
      },
      {
        title: 'Complaint Type',
        dataIndex: 'complaint_type',
        key: 'complaint_type',
        width: 150,
      },
      { title: 'Description', dataIndex: 'descriptor', key: 'descriptor', width: 200, },
      {
        title: 'City',
        width: 100,
        dataIndex: 'city',
        key: 'city',
      },
      {
        title: 'Borough',
        dataIndex: 'borough',
        key: 'borough',
        width: 100,
      },
      {
        title: 'Community Board',
        dataIndex: 'community_board',
        key: 'community_board',
        width: 150,
      },
      {
        title: 'zip code',
        dataIndex: 'zip',
        key: 'zip',
        width: 100,
      },
      {
        title: 'Open Date',
        dataIndex: 'opendate',
        key: 'opendate',
        width: 150,
      },
      {
        title: 'Close Date',
        dataIndex: 'closedate',
        key: 'closedate',
        width: 150,
      }
    ];

    return (
      <div className="Dashboard">
        <h1>Dashboard</h1>
        <h2>Open Cases: {this.props.openCases} </h2>
        <h2>Closed Cases: {this.props.closedCases} </h2>
        <h2>Top Complaint Type: {this.props.topComplaint} </h2>
        <div className="Content">
          <Table tableLayout="auto" columns={columns} dataSource={this.props.complaints} rowKey="unique_key"  />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    complaints: state.complaints,
    topComplaint: state.topComplaint,
    closedCases: state.closedCases,
    openCases: state.openCases,
    fetching: state.fetching,
    fetched: state.fetched,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getComplaints: () => dispatch(actions.getComplaints()),
    getOpenComplaints: () => dispatch(actions.getOpenComplaints()),
    getCloseComplaints: () => dispatch(actions.getCloseComplaints()),
    getConstituentsComplaints: () => dispatch(actions.getConstituentsComplaints()),
    getTopComplaint: () => dispatch(actions.getTopComplaint())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
