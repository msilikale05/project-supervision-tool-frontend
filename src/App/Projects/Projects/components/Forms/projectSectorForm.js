import React, { Component } from "react";
import {
  Button,
  Form,
  Select,
  Input,
} from "antd";
import { connect } from "react-redux";
import { projectSectorsOperator, projectSectorsSelectors } from "../../../ProjectsSectors/duck";
import { projectSelectors } from "../../../duck";

/* state actions */

/* ui */
const labelCol = {
  xs: { span: 24 },
  sm: { span: 24 },
  md: { span: 24 },
  lg: { span: 24 },
  xl: { span: 24 },
  xxl: { span: 24 },
};
const wrapperCol = {
  xs: { span: 24 },
  sm: { span: 24 },
  md: { span: 24 },
  lg: { span: 24 },
  xl: { span: 24 },
  xxl: { span: 24 },
};



class ProjectSectorForm extends Component {

  state = {
    showShare: false,
    isEditForm: false,
    cached: null,
    visible: false,
  };

  // form finish(submit) handler
  onFinish = (values) => {
    const { project, handleConfirmButton, updateprojects } = this.props
    const { id } = project;
    const payload = { ...values, project_id: id };
    debugger
    if (this.props.isEditForm) {
      updateprojects(payload, this.props.selected.id);
    } else {
      handleConfirmButton(payload);
    }
  };

  componentDidMount() {
    const { getSectors } = this.props;
    getSectors()
  }

  render() {
    const {
      selected,
      sectors,
      handleBackButton
    } = this.props;


    return (
      <Form
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        onFinish={this.onFinish}
        projectsValues={{
          projects_id: selected?.projects_id,
          percent: selected?.percent,
          sector_id: selected?.sector_id,
        }}
        autoComplete="off"
        className="ProjectSectorForm"
      >

        {/* start:sector */}
        <Form.Item
          label="Sector"
          name="sector_id"
          title="Project Sector e.g water"
          rules={[
            {
              required: true,
              message: "Project sector is required",
            },
          ]}
        >
          <Select>
            {sectors.map((sector) => (
              <Select.Option value={sector.id}>{sector.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        {/* end:sector */}

        <Form.Item
          label="Percent"
          name="percent"
          title="Project percent e.g 25"
          rules={[
            {
              required: true,
              message: "Project percent is required",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: "right" }}>
          <Button type="default" onClick={handleBackButton} >
            Back
           </Button>
          <Button type="primary" htmlType="submit" style={{ marginLeft: 8 }}
          >
            Confirm
            </Button>
        </Form.Item>
        {/* end:project id */}
      </Form>
    );
  }

}


const mapStateToProps = (state) => {
  return {
    sectors: projectSectorsSelectors.getSectors(state),
    project: projectSelectors.getCreatedProjectSelector(state)
  };
};

const mapDispatchToProps = {
  getSectors: projectSectorsOperator.getSectorsStart

}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectSectorForm);
