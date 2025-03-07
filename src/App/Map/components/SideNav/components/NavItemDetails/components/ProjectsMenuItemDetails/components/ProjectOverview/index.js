import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mapActions, mapSelectors } from "../../../../../../../../../../redux/modules/map";
import { bindActionCreators } from "redux";
import { projectActions, projectSelectors } from "../../../../../../../../../../redux/modules/projects";
import { mapProjectActions } from "../../../../../../../../../../redux/modules/map/projects";
import TopSection from "../../../TopSection";
import SideNavItemOverview from "../SideNavItemOverview";
import ProjectStatusFilter from "../ProjectStatusFilter";
import ProjectsFilter from "../ProjectsFilter";
import RegionsFilter from "../RegionsFilter";
import { mapSubProjectActions, mapSubProjectSelectors } from "../../../../../../../../../../redux/modules/map/subProjects";
import SubProjectTypesFilter from "../SuProjectTypesFilter";

/**
 * @function
 * @name ProjectsOverview
 * @description renders projects overview information
 */
function ProjectsOverview(
    {
        projectsStatistics,
        getProjectsOverview,
        loadingStatistics,
        projects,
        getProjects,
        statuses,
        getProjectStatus,
        regions,
        getRegions,
        setProjectStatusFilter,
        setProjectIdFilter,
        getSubProjects,
        getProjectsFilters,
        getProject,
        setProjectRegionsFilter,
    
    }
) {

    // get project overview when
    // a  component has mounted
    useEffect(() => {
        getProjectsOverview();
        getProjects();
        getProjectsFilters();
        getProjectStatus();
        getRegions();
    }, []);

    const overViewData = projectsStatistics ? [
        { title: 'Projects', value: projectsStatistics.projects, },
        { title: 'Sub Projects', value: projectsStatistics.sub_projects },
        { title: 'Regions', value: projectsStatistics.regions },
    ] : [];

    return (
        <>
            <TopSection title="OVERVIEWS" />
            <SideNavItemOverview
                overViewData={overViewData}
                loadingStatistics={loadingStatistics}
            />
            <ProjectStatusFilter
                statuses={statuses}
                setProjectStatusFilter={setProjectStatusFilter}
            />
            <ProjectsFilter
                projects={projects}
                getSubProjects={getSubProjects}
                getProject={getProject}
                setProjectIdFilter={setProjectIdFilter}
            />
            <RegionsFilter
                regions={regions}
                setProjectRegionsFilter={setProjectRegionsFilter}
            />
    

        </>
    );
}

const mapStateToProps = state => ({
    projectsStatistics: mapSelectors.getProjectsStatistics(state),
    loadingStatistics: mapSelectors.getProjectsStatisticsLoading(state),
    projects: projectSelectors.getProjectsFilterSelector(state),
    statuses: projectSelectors.getProjectStatusSelector(state),
    regions: projectSelectors.getRegionsSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
    getProjectsOverview: bindActionCreators(mapActions.getProjectStatisticsStart, dispatch),
    getProject: bindActionCreators(mapProjectActions.getProjectStart, dispatch),
    getProjects: bindActionCreators(mapProjectActions.getProjectsStart, dispatch),
    getProjectsFilters: bindActionCreators(projectActions.getProjectFilterStart, dispatch),
    getProjectStatus: bindActionCreators(projectActions.getProjectStatusStart, dispatch),
    getRegions: bindActionCreators(projectActions.getRegionsStart, dispatch),
    setProjectStatusFilter: bindActionCreators(projectActions.setProjectStatusFilter, dispatch),
    setProjectIdFilter: bindActionCreators(projectActions.setProjectIdFilter, dispatch),
    setProjectRegionsFilter: bindActionCreators(projectActions.setProjectRegionsFilter, dispatch),
    getSubProjects: bindActionCreators(mapSubProjectActions.getSubProjectsStart, dispatch),
   
});


export default connect(mapStateToProps, mapDispatchToProps)(ProjectsOverview);

ProjectsOverview.propTypes = {
    projectsStatistics: PropTypes.object,
    projectsCountByRegion: PropTypes.array.isRequired,
    getProjectsOverview: PropTypes.func.isRequired,
    setShowNationalOverview: PropTypes.func.isRequired,
    setShowRegionalOverview: PropTypes.func.isRequired,
    getProject: PropTypes.func.isRequired,
    setProjectStatusFilter: PropTypes.array.isRequired,
    getSubProjects:PropTypes.func.isRequired,
    project:PropTypes.object.isRequired,
}

ProjectsOverview.defaultProps = {
    projectsStatistics: null,
}
