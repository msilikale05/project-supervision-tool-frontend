import { Col, Row } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import './styles.css';

/**
 * @function
 * @name ListHeader
 * @description List header component
 *
 * @param {object} props props object
 * @param {object[]} props.headerLayout list of header items configs
 * @param {Function} props.onSelectAll callback to handle select all checkbox
 * @param {Function} props.onDeselectAll callback to handle deselect all checkbox
 * @param {boolean} props.isBulkSelected flag to show if current page results are
 * selected
 * @returns {object} react element
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const ListHeader = ({
  headerLayout,
  onSelectAll,
  onDeselectAll,
  isBulkSelected,
}) => (
  <Row className="ListHeader">
    <Col xxl={1} xl={1} lg={1} md={2} sm={2} xs={2}>
      {/* <Checkbox
        className="checkbox"
        checked={isBulkSelected}
        onChange={(event) => {
          if (event.target.checked) {
            onSelectAll();
          } else {
            onDeselectAll();
          }
        }}
      /> */}
    </Col>

    {headerLayout.map((item) => (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Col key={item.header} {...item}>
        <h4 className="title">{item.header}</h4>
      </Col>
    ))}
  </Row>
);

/* props validation */
ListHeader.propTypes = {
  headerLayout: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelectAll: PropTypes.func.isRequired,
  onDeselectAll: PropTypes.func.isRequired,
  isBulkSelected: PropTypes.bool,
};

ListHeader.defaultProps = {
  isBulkSelected: false,
};

export default ListHeader;
