import React, { Component } from "react";
import { Col, Layout, Row, Spin } from 'antd';
import ItemsChat from "./Charts";
import ProjectSubProjects from "./SubProjectMilestone";
import SidebarSection from "./SideBar";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { projectOperation, projectSelectors } from "../../../../../redux/modules/projects";
import ProgressChart from "./ProgressChart";
import SubProjectEquipment from "./SubProjectEquipment";

import "./styles.css";
import SubProjectsMilestone from "./SubProjectMilestone";
import SubProjectHumanResource from "./SubProjectHumanResource";
import BaseMap from "../../../../Map/BaseMap";

const { Content, Sider } = Layout;

class SubProject extends Component {

  componentDidMount() {
    const { getSubProject, match: { params }
    } = this.props;
    getSubProject(params.id)
  }

  render() {
    const { sub_project, loading } = this.props;
    return (
      <Layout className="sub-project-layout">
        <Spin spinning={loading} tip="Loading..." >
          <Content style={{ padding: '0 50px' }}>
            <h3>{sub_project?.name}</h3>
            <Layout className="sub-project-inner-layout" >
              <Sider className="sider" width={350}>
                <div className="sidebar-header">
                  <h2 id="sider-title">Key Details</h2>
                  <Link
                    to={{
                      pathname: '/app/map/',
                    }}
                  >View on map
              </Link>
                </div>
                <SidebarSection sub_project={sub_project} />
              </Sider>
              <Content className="sub-project-contents">
                <Row>
                  <Col span={11} className="sub_project_map"  >
                    <BaseMap />
                  </Col>
                  <Col span={12} >
                  <SubProjectsMilestone sub_project={sub_project} offset={1} />
                  </Col>
                  <Col span={11} style={{ marginTop: 26 }}>
                    <SubProjectHumanResource sub_project={sub_project} />
                  </Col>
                  <Col span={12}  style={{ marginTop: 26 }}>
                    < SubProjectEquipment sub_project={sub_project}  offset={1}/>
                  </Col>
                </Row>
              </Content>
            </Layout>
          </Content>
        </Spin>
      </Layout>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    sub_project: projectSelectors.getSubProjectSelector(state),
    loading: projectSelectors.getSubProjectLoadingSelector(state)
  };
};

const mapDispatchToProps = {
  getSubProject: projectOperation.getSubProjectStart,
};

export default connect(mapStateToProps, mapDispatchToProps)(SubProject);


