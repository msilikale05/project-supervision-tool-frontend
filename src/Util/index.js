import moment from "moment";

/**
 * converts ISO date string to human readable
 * date and time
 *
 * @function
 * @name isoDateToHumanReadableDate
 *
 * @param {string} isoFormattDate
 *
 * @returns {string} human readable date
 * @version 0.1.0
 * @since 0.1.0
 */
export const isoDateToHumanReadableDate = (isoFormattDate) => {
    return moment(isoFormattDate)
        .utc()
        .format('MMM Do YYYY');
}

/**
 * converts moment date  object to date string
 *
 * @function
 * @name generateDateString
 *
 * @param {Object} dateObject
 *
 * @returns {string} date string
 * @version 0.1.0
 * @since 0.1.0
 */
export const generateDateString = (dateObject) => {
    return moment(dateObject)
        .utc()
        .format('YYYY-MM-DD');
}

/**
 * converts moment date  object to date string
 *
 * @function
 * @name generateYearString
 *
 * @param {Object} dateObject
 *
 * @returns {string} date string
 * @version 0.1.0
 * @since 0.1.0
 */
export const generateYearString = (dateObject) => {
    return moment(dateObject)
        .utc()
        .format('YYYY');
}

/**
 * create moment date  object from ISO string
 *
 * @function
 * @name createDateFromString
 *
 * @param {String} dateString
 *
 * @returns {Object} date
 * @version 0.1.0
 * @since 0.1.0
 */
export const createDateFromString = (dateString) => {
    return moment(dateString);
}

/**
 * get Geojson Object from an  location object
 *
 * @function
 * @name getGeoJsonFromLocation
 *
 * @param {Object} data
 *
 * @returns {Object}
 * @version 0.1.0
 * @since 0.1.0
 */
export const getGeoJsonFromLocation = (data) => {
    const {location} = data;
    if (location.level === 'district') {
        const districtGeo = location?.district?.geo_json;
        const property = {level: location.level, id: location?.district.id}
        return {...districtGeo, property};
    } else {
        const regionGeo = location?.region?.geo_json;
        const property = {level: location.level, id: location?.region.id}
        return {...regionGeo, property};
    }
}

/**
 * get selected resources by level and geospatial id
 *
 * @function
 * @name getSelectedResources
 *
 * @param {string} level
 * @param {string} id
 * @param {Array} resources
 *
 * @returns {Object}
 * @version 0.1.0
 * @since 0.1.0
 */
export const getSelectedResources = (level, id, resources) => {
    if (level === 'district') {
        return resources.filter(({location}) => location?.district.id === id);
    } else {
        return resources.filter(({location}) => location?.region.id === id);

    }
}


/**
 * @function
 * @name makeActionCreator
 * @description generates action creator function
 * @param {String} type action type
 * @param {String} argNames properties applicable to action object
 */
export function makeActionCreator(type, ...argNames) {
    return function (...args) {
        const action = {type}
        argNames.forEach((arg, index) => {
            action[argNames[index]] = args[index]
        })
        return action
    }
}


/**
 * @function
 * @name generateColor
 * @description generates based on a number
 * @param {Number} num
 * @returns {String} color
 */
export const generateColor = (num) => {
    switch (num) {
        case 0:
            return "#97bffa";
        case 1:
            return "#7da5e0";
        case 2:
            return "#638bc6";
        case 3:
            return "#4971ac";
        case 4:
            return "#2f5792";
        case 5:
            return "#153d78";
        case 6:
            return "#BD0026";
        case 7:
            return "#800026";
        default:
            return "#800026";
    }
}

/**
 * @function
 * @name generateNumberRange
 * @description generates number range based on a number
 * @param {Number} num
 * @returns {Array} array of integers
 */
export const generateNumberRange = (num) => {
    const digitsCount = String(num).length;
    let factorString = 1 + '';

    while (factorString.length < digitsCount) {
        factorString = factorString + '0';
    }
    let factor = parseInt(factorString);

    return [0, 1, 3, 5, 7, 9].map(n => n * factor);
}

/**
 * @function
 * @name moneyFormat
 * @description generates number range based on a number
 * @param {Number} labelValue
 * @returns {String} rounded up number
 */
export const moneyFormat = (labelValue) => {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+9

        ? Math.abs(Number(labelValue)) / 1.0e+9 + "B"
        // Six Zeroes for Millions
        : Math.abs(Number(labelValue)) >= 1.0e+6

            ? Math.abs(Number(labelValue)) / 1.0e+6 + "M"
            // Three Zeroes for Thousands
            : Math.abs(Number(labelValue)) >= 1.0e+3

                ? Math.abs(Number(labelValue)) / 1.0e+3 + "K"

                : Math.abs(Number(labelValue));

}


/**
 * @function
 * @name chunkIntoSmallerArrays
 * @description chunk bigger array into smaller arrays
 * @param {Array} arr array to be chunked
 * @param {Number} size size of array chunks
 * @returns {Array} array of chunked arrays
 */
export const chunkIntoSmallerArrays = (arr, size) =>
    Array.from({length: Math.ceil(arr.length / size)}, (v, i) =>
        arr.slice(i * size, i * size + size)
    );


/**
 * @function
 * @name getSurveyIdByCategory
 * @description gets  kobotoolbox  survey id based  on category name
 * @param {String} categoryName survey category name
 * @param {Array} surveys list of surveys
 * @returns {String} survey id
 */
export const getSurveyIdByCategory = (categoryName, surveys = []) => {
    const filteredSurveys = surveys.filter(({category_name}) => categoryName === category_name);
    return filteredSurveys.length > 0 ? filteredSurveys[0].survey_id : null;
}


/**
 * @function
 * @name stringToGeoJson
 * @description converts string to geojson
 * @param {String} str spatial data
 * @param {String} spatialType spatial data type
 * @returns {Object} Geojson
 */
export const stringToGeoJson = (str,spatialType) => {
    if (!str) return ;
    const words = str.split(';');

    if (spatialType === 'geoshape') {

        const data = words.splice(0, words.length - 1);

        const coordinates = data.map((c) => c.split(' '));

        const stringToInts = coordinates.map((arr) => {
            const latLongArrString = arr.slice(0, 2).reverse();

            return latLongArrString.map((v) => parseFloat(v));
        });

        return {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "LineString",
                "coordinates": stringToInts
            }
        }


    } else if (spatialType === 'geotrace') {

        const coordinates = words.map((c) => c.split(' '));

        const strintToInts = coordinates.map((arr) => {
            const latLongArrString = arr.slice(0, 2).reverse();

            return latLongArrString.map((v) => parseFloat(v));
        });

        return {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "LineString",
                "coordinates": strintToInts
            }
        }
    }

    else {

        const coordinates = words.map((c) => c.split(' '));

        const strintToInts = coordinates.map((arr) => {
            const latLongArrString = arr.slice(0, 2).reverse();

            return latLongArrString.map((v) => parseFloat(v));
        });

        return {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": strintToInts.flat()
            }
        }
    }

}
