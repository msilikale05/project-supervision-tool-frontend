import L from "leaflet";
import {GeoJSON, withLeaflet} from "react-leaflet";
import React from "react";
import PropTypes from 'prop-types';
import {Modal} from "antd";
import BaseMap from "../../Map/BaseMap";
import './styles.css';

function ShowFeature({data, leaflet}) {

    const onEachFeature = (feature, layer) => {
        if (feature.geometry.type === 'Point') {
            const latLng = L.GeoJSON.coordsToLatLng(feature.geometry.coordinates)
            return leaflet.map.setView(latLng, 18);
        }

        return leaflet.map.fitBounds(layer.getBounds());
    }

    const randerGeoJson = (geoJsons) => geoJsons.map((geoJson) => <GeoJSON data={geoJson}/>);

    return data.length === 1 ? (<GeoJSON data={data[0]} onEachFeature={onEachFeature}/>) : randerGeoJson(data);
}

const WrappedInMap = withLeaflet(ShowFeature);

function ViewOnMap({data, showMApModal, handleOnCancel}) {


    return  (
        <div>
            <Modal
                style={{'top': 0}}
                bodyStyle={{padding: 0, margin: 0}}
                wrapClassName='map-modal-survey-results'
                width='100%'
                mask={false}
                footer={null}
                onCancel={() => handleOnCancel()}
                visible={showMApModal}
            >
                <BaseMap>
                    <WrappedInMap data={data}/>
                </BaseMap>
            </Modal>
        </div>
    );

}

export default ViewOnMap;

ViewOnMap.propTypes = {
    data: PropTypes.array.isRequired,
    showMApModal: PropTypes.bool.isRequired,
    handleOnCancel: PropTypes.func.isRequired,
}
