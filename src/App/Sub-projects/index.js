import React, { Component } from "react";
import { connect } from "react-redux";
import { projectActions, projectOperation, projectSelectors } from '../../redux/modules/projects';
import { Col, Drawer, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import Topbar from "../components/Topbar";
import SubProjectsList from "../components/List";
import ListItem from "../components/ListItem";
import ListItemActions from "../components/ListItemActions";
import { Link } from "react-router-dom";
import {getSurveyIdByCategory, isoDateToHumanReadableDate} from "../../Util";
import SubProjectForm from "./components/Form";
import "./styles.css";
import { subProjectsActions, subProjectsSelectors } from "../../redux/modules/subProjects"
import { bindActionCreators } from "redux";
import { mapActions } from "../../redux/modules/map";
import PreviewOnMap from "./components/PreviewOnMap";
import SurveyForm from "./components/SurveyForm";
import DisplaySurveyForm from "../components/DisplaySurveyForm";


/* constants */
const subProjectNameSpan = { xxl: 3, xl: 4, lg: 4, md: 5, sm: 20, xs: 20 };
const projectIdSpan = { xxl: 2, xl: 2, lg: 2, md: 3, sm: 0, xs: 0 };
const itemsSpan = { xxl: 2, xl: 2, lg: 4, md: 0, sm: 0, xs: 0 };
const locationSpan = { xxl: 3, xl: 3, lg: 0, md: 0, sm: 0, xs: 0 };
const statusSpan = { xxl: 3, xl: 3, lg: 4, md: 3, sm: 0, xs: 0 };
const physicalProgressSpan = { xxl: 3, xl: 2, lg: 3, md: 3, sm: 0, xs: 0 };
const financialSpan = { xxl: 2, xl: 2, lg: 4, md: 2, sm: 0, xs: 0 };
const contractorSpan = { xxl: 3, xl: 3, lg: 3, md: 2, sm: 0, xs: 0 };

const { confirm } = Modal;

const headerLayout = [
  { ...subProjectNameSpan, header: "Name" },
  { ...projectIdSpan, header: "Project" },
  { ...itemsSpan, header: "Items" },
  { ...locationSpan, header: "Location" },
  { ...statusSpan, header: "Status" },
  { ...physicalProgressSpan, header: "Physical Progress" },
  { ...financialSpan, header: "Financial Progress" },
  { ...contractorSpan, header: "Contractors" },

];


/**
 * @class
 * @name SubProjects
 * @description Render actions list which have search box, actions and Sub Projects list
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class SubProjects extends Component {

  state = {
    showShare: false,
    isEditForm: false,
    cached: null,
    visible: false,
    previewOnMap: false,

  };

  componentDidMount() {
    const { fetchSubProjects } = this.props;
    fetchSubProjects();
  }


  /**
   * @function
   * @name handleMapPreview
   * @description Handle map preview
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleMapPreview = (item_id) => {
    const { getSubProject, match: { params } } = this.props;
    this.setState({ previewOnMap: true })
    getSubProject(item_id);
    console.log(item_id)
    let path = '/app/map';
    this.props.history.push(path);
  };


  /**
   * @function
   * @name createSurvey
   * @description creates new survey through kobotoolbox and  attach to sub project
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  createSurvey = (subProject) => {
    console.log('inside createSurvey', subProject)
  };



  /**
  * @function
  * @name handleViewDetails
  * @description Handle detail preview
  *
  * @version 0.1.0
  * @since 0.1.0
  */
  handleViewDetails = (item_id) => {
    const { getSubProject } = this.props;
    console.log(item_id)
    getSubProject(item_id);
    let path = `/app/sub_projects/${item_id}`;
    this.props.history.push(path);
  };



  /**
  * @function
  * @name fillSurvey
  * @description Opens  kobotoolbox survey form
  * @version 0.1.0
  * @since 0.1.0
  */
  fillSurvey = (subProject) => {
    const { openSurveyForm, selectSubProject } = this.props;
    selectSubProject(subProject)
    openSurveyForm();
  };

  /**
   * @function
   * @name showArchiveConfirm
   * @description show confirm modal before archiving a subproject
   * @param {object} item Resource item to be archived
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  showArchiveConfirm = (item) => {
    const { deleteSubproject } = this.props;
    confirm({
      title: `Are you sure you want to archive this record ?`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteSubproject(item.id);
      },
    });
  };

  /**
   * @function
   * @name openSubProjectForm
   * @description Open Create SubProject form
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openSubProjectForm = () => {
    const { openSubProjectForm } = this.props;
    openSubProjectForm();
  };

  /**
   * @function
   * @name openSubProjectSurveyForm
   * @description Open Create SubProject Survey form
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openSubProjectSurveyForm = (subProject) => {
    const { openCreateSurveyForm, selectSubProject } = this.props;
    selectSubProject(subProject)
    openCreateSurveyForm();
  };

  /**
   * @function
   * @name closeSubProjectForm
   * @description close Create SubProject form
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closeSubProjectForm = () => {
    this.setState({ isEditForm: false, visible: false });
    const { closeSubProjectForm, selectSubProject } = this.props;
    selectSubProject(null)
    closeSubProjectForm();
  };

  /**
   * @function
   * @name closeSubProjectSurveyForm
   * @description close Create Survey Form
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closeSubProjectSurveyForm = () => {
    const { closeSubProjectSurveyForm, selectSubProject } = this.props;
    selectSubProject(null)
    closeSubProjectSurveyForm();
  };

  /**
  * @function
  * @name handleEdit
  * @description Handle on Edit action for list item
  *
  * @param {object} subProject Action Catalogue to be edited
  *
  * @version 0.1.0
  * @since 0.1.0
  */
  handleEdit = (subProject) => {
    const { selectSubProject, openSubProjectForm, selected } = this.props;
    selectSubProject(subProject);
    this.setState({ isEditForm: true });
    openSubProjectForm();
  };

  /**
   * @function
   * @name handleRefreshSubProjects
   * @description Handle list refresh action
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleRefreshSubProjects = () => {
    const { page, paginateSubProject } = this.props;
    paginateSubProject(page);
  };

  /**   
  * @function
  * @name searchSubProject
  * @description Handle list refresh action
  *
  * @version 0.1.0
  * @since 0.1.0
  */
  searchSubProject = (searchData) => {
    const { searchSubProject } = this.props;
    searchSubProject(searchData);
  };

  render() {
    const {
      subProjects,
      searchQuery,
      loading,
      showForm,
      showSurveyForm,
      page,
      total,
      paginateSubProject,
      closeCreateSurveyForm,
      showCreateSurveyForm,
      closeSurveyForm,
      selected
    } = this.props;

    const survey_id = selected?.surveys ? getSurveyIdByCategory('field_notes', selected?.surveys) : null;


    const { isEditForm, previewOnMap } = this.state;
    return previewOnMap ? <PreviewOnMap data={selected} /> : (
      <div>
        {/* Topbar */}
        <Topbar
          search={{
            size: "large",
            placeholder: "Search for Sub-project here ...",
            onSearch: this.searchSubProject,
            // onChange:this.searchSubProject,
            value: searchQuery
          }}
          actions={[
            {
              label: "New Sub-project",
              icon: <PlusOutlined />,
              size: "large",
              title: "Add New Sub-project",
              onClick: this.openSubProjectForm,
            },
          ]}
        />
        {/* end Topbar */}

        {/* list starts */}
        <SubProjectsList
          itemName="Sub-projects"
          items={subProjects}
          page={page}
          itemCount={total}
          loading={loading}
          onPaginate={(nextPage) => {
            paginateSubProject(nextPage);
          }}
          onRefresh={this.handleRefreshSubProjects}
          headerLayout={headerLayout}
          renderListItem={({
            item,
            isSelected,
            onSelectItem,
            onDeselectItem,
          }) => (
              <ListItem
                key={item.id} // eslint-disable-line
                name={item.name}
                item={item}
                isSelected={isSelected}
                onSelectItem={onSelectItem}
                onDeselectItem={onDeselectItem}
                renderActions={() => (
                  <ListItemActions
                    edit={{
                      name: "Edit Sub-project",
                      title: "Update Sub-project details",
                      onClick: () => this.handleEdit(item),
                    }}
                    archive={{
                      name: "Archive Sub-project",
                      title:
                        "Remove Sub project from list of active Sub Projects",
                      onClick: () => this.showArchiveConfirm(item),
                    }}
                    view={
                      {
                        name: "View Details",
                        title: "View more detail of selected sub project",
                        onClick: () => this.handleViewDetails(item.id)
                      }
                    }
                    createSurvey={
                      {
                        name: "Create Survey",
                        title: "Create sub project survey",
                        onClick: () => this.openSubProjectSurveyForm(item)
                      }
                    }
                  />
                )}
              >
                {/* eslint-disable react/jsx-props-no-spreading */}

                <Col
                  {...subProjectNameSpan}
                  className="contentEllipse"
                  title={item.description}
                >
                  {" "}
                  <Link
                    to={{
                      pathname: `/app/sub_projects/${item.id}`,
                    }}
                    className="sub-project-list"
                  >
                    {item.name}
                  </Link>

                </Col>

                <Col {...projectIdSpan} className="contentEllipse">

                  {item?.project_id  ? item?.project_id : "N/A"}
                </Col>

                <Col {...itemsSpan} className="contentEllipse">
                  {item?.type ? item?.type?.name : 'N/A'}
                </Col>
                <Col {...locationSpan} className="contentEllipse">
                  {item.districts.length === 0 ? "N/A" : item.districts.map(({ name }, index) => {
                    return (index ? ", " : "") + name;
                  })}
                </Col>
                <Col {...statusSpan}>
                  {item?.status ? item?.status.name : 'N/A'}
                </Col>
                <Col {...physicalProgressSpan} className="contentEllipse">{item.details ? item.details.contractor.name : "N/A"}</Col>

                <Col {...financialSpan} className="contentEllipse" title={item?.details?.supervising_agency.name}>{item.details ? item.details.supervising_agency.name : "N/A"}</Col>
                <Col {...contractorSpan} >

                  {item.details ? item.details.contractor.name : "N/A"}
                </Col>
                {/* eslint-enable react/jsx-props-no-spreading */}
              </ListItem>
            )}
        />
        {/* end list */}

        {/* Sub project form */}
        <Drawer
          title={
            isEditForm ? "Edit Sub Projects" : "Add New Sub Projects"}
          width={550}
          onClose={this.closeSubProjectForm}
          footer={null}
          visible={showForm}
          bodyStyle={{ paddingBottom: 80 }}
          destroyOnClose
          maskClosable={false}
          afterClose={() => { }}
          className="subProjectForm"
        >
          <SubProjectForm isEditForm={isEditForm} onCancel={this.closeSubProjectForm} closeSubProjectForm={this.closeSubProjectForm} selected={selected} />
        </Drawer>

        {/* Create Survey form */}
        <Drawer
          width={550}
          onClose={closeCreateSurveyForm}
          footer={null}
          visible={showCreateSurveyForm}
          destroyOnClose
          maskClosable={false}
          className="surveyForm"
        >
          <SurveyForm onCancel={closeCreateSurveyForm} closeSubProjectSurveyForm={closeCreateSurveyForm} selected={selected} />
        </Drawer>

        {/* Survey form */}
        <Drawer
          width={550}
          onClose={closeSurveyForm}
          footer={null}
          visible={showSurveyForm}
          destroyOnClose
          maskClosable={false}
        >
          <DisplaySurveyForm survey_id={survey_id} />
        </Drawer>
      </div>
    );
  }
}

SubProjects.propTypes = {
  loading: PropTypes.bool.isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
    .isRequired,
  page: PropTypes.number.isRequired,
  searchQuery: PropTypes.string,
  total: PropTypes.number.isRequired,
};

SubProjects.defaultProps = {
  projects: null,
  searchQuery: undefined,
  loading: null,
};

const mapStateToProps = (state) => {
  return {
    subProjects: subProjectsSelectors.getSubProjectsSelector(state),
    loading: subProjectsSelectors.getSubProjectsLoadingSelector(state),
    showForm: projectSelectors.getSubProjectShowFormSelector(state),
    showSurveyForm: projectSelectors.getShowSurveyFormSelector(state),
    showCreateSurveyForm: projectSelectors.getShowCreateSurveyFormSelector(state),
    page: subProjectsSelectors.getSubProjectsPageSelector(state),
    total: subProjectsSelectors.getSubProjectsTotalSelector(state),
    selected: subProjectsSelectors.selectedSubProject(state)

  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchSubProjects: bindActionCreators(subProjectsActions.getSubProjectsStart, dispatch),
  deleteSubproject: bindActionCreators(projectOperation.deleteSubProjectStart, dispatch),
  paginateSubProject(page) {
    dispatch(subProjectsActions.getSubProjectsStart({ page }));
  },
  searchSubProject(searchQuery) {
    dispatch(subProjectsActions.getSubProjectsStart({ searchQuery }));
  },
  getSubProject: bindActionCreators(projectActions.getSubProjectStart, dispatch),
  openSubProjectForm: bindActionCreators(projectActions.openSubProjectForm, dispatch),
  openCreateSurveyForm: bindActionCreators(projectActions.openSubProjectSurveyForm, dispatch),
  closeCreateSurveyForm: bindActionCreators(projectActions.closeSubProjectSurveyForm, dispatch),
  openSurveyForm: bindActionCreators(projectActions.openSurveyForm, dispatch),
  closeSurveyForm: bindActionCreators(projectActions.closeSurveyForm, dispatch),
  closeSubProjectForm: bindActionCreators(projectActions.closeSubProjectForm, dispatch),
  selectSubProject: bindActionCreators(subProjectsActions.selectedSubProject, dispatch),
  getWfsLayerData: bindActionCreators(mapActions.getWfsLayerDataStart, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubProjects);


