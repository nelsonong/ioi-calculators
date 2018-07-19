import React from 'react';
import { connect } from 'react-redux';
import { deleteCalculator } from '../../actions/managementActions';
import styles from './CalculatorTopBar.css';

const CalculatorTopBar = ({
    type,
    inDVR,
    handleDelete
}) => {
    console.log(inDVR);
    const text = !inDVR ? `${type} Calculator` : `${type} Camera`;
    const button = !inDVR ? (
        <button className={styles.closeButton} type='button' onClick={handleDelete}>
            ✖
        </button>
    ) : '';

    return (
        <div>
            <div className={styles.root}>{text}</div>
            {button}
        </div>
    );
};

const mapStateToProps = (state, { type, dvrId }) => ({
    type,
    inDVR: !!dvrId
});

const mapDispatchToProps = (dispatch, { id, storage }) => {
    return {
        handleDelete: () => dispatch(deleteCalculator(id, !!storage))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorTopBar);