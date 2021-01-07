
import projectsAPI from './projects';
import focalPeopleAPI from './focal_people';
import locationsAPI from './locations';
import sectorAPI from  './sectors';
import subProjectsAPI from  './sub_projects';
import agenciesAPI from './agencies';
import subProjectElementsAPI from  './sub_project_elements';

export default {
    ...projectsAPI,
    ...focalPeopleAPI,
    ...locationsAPI,
    ...sectorAPI,
    ...subProjectsAPI,
    ...agenciesAPI,
    ...subProjectElementsAPI,
}
