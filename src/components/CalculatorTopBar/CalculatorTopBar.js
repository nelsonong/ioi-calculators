import React from 'react';
import { connect } from 'react-redux';
import { deleteCalculator } from '../../actions/managementActions';
import cx from 'classnames';
import styles from './CalculatorTopBar.css';

const CalculatorTopBar = ({
    type,
    inDVR,
    storage,
    handleDelete
}) => {
    const text = !inDVR ? `${type} Calculator` : `${type} Camera`;
    const closeButton = cx(styles.closeButton, {
        [styles.storageCloseButton]: storage
    });
    const button = !inDVR ? (
        <button className={closeButton} type='button' onClick={handleDelete}>
            ✖
        </button>
    ) : '';

    const root = cx(styles.root, {
        [styles.storageRoot]: storage
    });
    return (
        <div>
            <div className={root}>{text}</div>
            {button}
        </div>
    );
};

const mapStateToProps = (state, {
    type,
    dvrId,
    storage
}) => ({
    type,
    inDVR: !!!dvrId,
    storage: !!storage
});

const mapDispatchToProps = (dispatch, {
    dvrId,
    storage
}) => {
    return {
        handleDelete: () => dispatch(deleteCalculator(dvrId, !!storage))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorTopBar);