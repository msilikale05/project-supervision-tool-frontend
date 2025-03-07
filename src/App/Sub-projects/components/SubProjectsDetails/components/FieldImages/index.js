import React, {Component} from "react";
import {Col, Drawer, Modal} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import PropTypes from "prop-types";
import Topbar from "../../../../../components/Topbar";
import FieldImagesList from "../../../../../components/List";
import ListItem from "../../../../../components/ListItem";
import ListItemActions from "../../../../../components/ListItemActions";
import "./styles.css";
import API from '../../../../../../API';
import SurveyForm from "../../../SurveyForm";


/* constants */
const nameSpan = {xxl: 6, xl: 6, lg: 6, md: 6, sm: 20, xs: 20};
const descriptionSpan = {xxl: 12, xl: 12, lg: 12, md: 0, sm: 0, xs: 0};
const totalSubmissionsSpan = {xxl: 2, xl: 2, lg: 2, md: 2, sm: 0, xs: 0};

const {confirm} = Modal;

const headerLayout = [
    {...nameSpan, header: "Name"},
    {...descriptionSpan, header: "Description"},
    {...totalSubmissionsSpan, header: "Total submissions"},
];


/**
 * @class
 * @name Field Images
 * @description Render actions list which have search box, actions and List of field images
 * @version 0.1.0
 * @since 0.1.0
 */
class FieldImages extends Component {

    state = {
        showShare: false,
        isEditForm: false,
        cached: null,
        visible: false,
        total: 0,
        previewOnMap: false,
        showCreateSurveyForm: false,
        loading: false,
        surveys: []

    };

    componentDidMount() {
        this.handleGetFieldImages();
    }

    /**
     * @function
     * @name closeCreateSurveyForm
     * @version 0.1.0
     * @since 0.1.0
     */
    closeCreateSurveyForm = () => {
        const {getSubProject, subProject} = this.props;
        getSubProject(subProject.id);
        this.setState({showCreateSurveyForm: false});
    }

    /**
     * @function
     * @name openCreateSurveyForm
     * @version 0.1.0
     * @since 0.1.0
     */
    openCreateSurveyForm = () => this.setState({showCreateSurveyForm: true});

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
        const {getSubProject} = this.props;
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
        const {openSurveyForm, selectSubProject} = this.props;
        selectSubProject(subProject)
        openSurveyForm();
    };

    filterSurveys = (subProjectSurveys, kobotoolboxSurveys) => {
        const kobotoolboxSurveyIds = subProjectSurveys.map(({survey_id}) => survey_id);
        return kobotoolboxSurveys.filter(({uid}) => kobotoolboxSurveyIds.includes(uid));
    }

    archiveSurvey = (survey_id) => {
        const {subProject} = this.props;
        const survey = subProject.surveys.find((s) => s.survey_id === survey_id);
        API.deleteSubProjectSurvey(survey.id)
            .then(() => this.props.getSubProject(survey.sub_project_id));
        API.archiveDeployedAsset(survey_id)
            .then(() => console.log('survey deleted successful'));
    }

    /**
     * @function
     * @name showArchiveConfirm
     * @description show confirm modal before archiving a field image
     * @param {object} item Resource item to be archived
     *
     * @version 0.1.0
     * @since 0.1.0
     */
    showArchiveConfirm = (item) => {
        confirm({
            title: `Are you sure you want to archive this record ?`,
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk: () => this.archiveSurvey(item.uid),
        });
    };

    /**
     * @function
     * @name handleGetFieldImages
     * @description Handle list refresh action
     * @version 0.1.0
     * @since 0.1.0
     */
    handleGetFieldImages = () => {
        const {surveys} = this.props.subProject || [];
        const fieldImages = surveys.filter(({category_name}) => category_name === 'field_images');
        this.setState({loading: true});
        API.getAssets()
            .then(res => {
                const data = this.filterSurveys(fieldImages, res.results);
                this.setState({surveys: data, loading: false, total: data.length})
            });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.subProject !== this.props.subProject) {
            this.handleGetFieldImages();
        }
    }


    render() {

        const {showCreateSurveyForm, surveys, total, loading} = this.state;
        const {subProject} = this.props;
        return (
            <div>
                {/* Topbar */}
                <Topbar
                    search={{
                        size: "large",
                        placeholder: "Search for field images here...",
                        onSearch: () => {
                        },
                        value: ''
                    }}
                    actions={[
                        {
                            label: "New Field Image",
                            icon: <PlusOutlined/>,
                            size: "large",
                            title: "Add New Field Image",
                            onClick: this.openCreateSurveyForm,
                        },
                    ]}
                />
                {/* end Topbar */}

                {/* list starts */}
                <FieldImagesList
                    itemName="Field-Images"
                    items={surveys}
                    page={1}
                    itemCount={total}
                    loading={loading}
                    onRefresh={this.handleGetFieldImages}
                    headerLayout={headerLayout}
                    renderListItem={({
                                         item,
                                         isSelected,
                                         onSelectItem,
                                         onDeselectItem,
                                     }) => (
                        <ListItem
                            key={item.uid} // eslint-disable-line
                            name={item.name}
                            item={item}
                            isSelected={isSelected}
                            onSelectItem={onSelectItem}
                            onDeselectItem={onDeselectItem}
                            renderActions={() => (
                                <ListItemActions
                                    archive={{
                                        name: "Archive Field Image",
                                        title: "Remove Field Image from list of Field Images",
                                        onClick: () => this.showArchiveConfirm(item),
                                    }}
                                    view={{
                                        name: "View Details",
                                        title: "View more details of a selected Field Image",
                                        onClick: () => this.handleViewDetails(item.id)
                                    }
                                    }
                                />
                            )}
                        >
                            {/* eslint-disable react/jsx-props-no-spreading */}

                            <Col
                                {...nameSpan}
                                className="contentEllipse"
                                title={item.name}
                            >
                                {item.name}
                            </Col>

                            <Col {...descriptionSpan} className="contentEllipse"
                                 title={item.settings?.description || 'N/A'}>

                                {item.settings?.description || 'N/A'}
                            </Col>

                            <Col {...totalSubmissionsSpan} className="contentEllipse">
                                {item.deployment__submission_count}
                            </Col>
                            {/* eslint-enable react/jsx-props-no-spreading */}
                        </ListItem>
                    )}
                />
                {/* end list */}

                {/* Create Survey form */}
                <Drawer
                    width={550}
                    onClose={this.closeCreateSurveyForm}
                    footer={null}
                    visible={showCreateSurveyForm}
                    destroyOnClose
                    maskClosable={false}
                    className="surveyForm"
                >
                    <SurveyForm onCancel={this.closeCreateSurveyForm} selected={subProject}/>
                </Drawer>
            </div>
        );
    }
}

FieldImages.propTypes = {
    loading: PropTypes.bool.isRequired,
    subProject: PropTypes.object.isRequired,
    getSubject: PropTypes.func.isRequired,
};
export default FieldImages;



