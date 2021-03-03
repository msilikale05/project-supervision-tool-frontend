import { subProjects } from "./reducers";

/**
 * @function
 * @name getSubProjectSelector
 * @param {Object} state redux state
 */
export const getSubProjectSelector = (state) => state.map.subProjects.selected?.data;


/**
 * @function
 * @name getSubProjectsStatistics
 * @param {Object} state redux state
 */
export const getSubProjectsStatistics = (state) => state?.map?.subProjects?.subProjectsStatistics?.data;

/**
 * @function
 * @name getSubProjectsStatisticsLoading
 * @param {Object} state redux state
 */
export const getSubProjectsStatisticsLoading = (state) => state?.map?.subProjects?.subProjectsStatistics.loading;

/**
 * @function
 * @name showSubProjectNationalOverview
 * @param {Object} state redux state
 */
export const showSubProjectNationalOverview = (state) => state?.map?.subProjects?.sideNavMenu?.showNationalOverview;

/**
 * @function
 * @name showSubProjectOverview
 * @param {Object} state redux state
 */
export const showSubProjectOverview = (state) => state?.map?.subProjects?.sideNavMenu?.showSubProjectOverview;

/**
 * @function
 * @name getSubProjectSelector
 * @param {Object} state redux state
 */
export const getSubProjectsOverviewSelector = (state) => state.map.subProjects.subProjectOverview?.dataoverview;

/**
 * @function
 * @name getMapLoadingSelector
 * @param {Object} state redux state
 */
export const getSubProjectMapLoadingSelector = (state) => state?.map?.subProjects.mapLoading;

/**
 * @function
 * @name getRegionSubProjectsStatistics
 * @param {Object} state redux state
 */
export const getRegionSubProjectsStatistics = (state) => state?.map?.subProjects?.regionSubProjectsStatistics?.data;

/**
 * @function
 * @name getRegionSubProjectsStatisticsLoader
 * @param {Object} state redux state
 */
export const getRegionSubProjectsStatisticsLoader = (state) => state?.map?.subProjects?.regionSubProjectsStatistics?.loading;

/**
 * @function
 * @name getRegionProjectsSelector
 * @param {Object} state redux state
 */
export const getRegionSubProjectsOverviewSelector = (state) => state?.map?.subProjects?.regionSubProjects?.data;
