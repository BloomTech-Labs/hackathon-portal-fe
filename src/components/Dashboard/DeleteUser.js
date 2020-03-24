//Deletes a hackathon

import React, { useState } from 'react';
import { useAuth0 } from '../../auth0-hooks/react-auth0-spa';
import {
    Dialog,
    DialogActions,
    DialogTitle
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';


// ACTIONS
import { deleteUser } from '../../actions/actions'

import { style } from '../../MUI-Styles/deleteHackathonStyles';

const useStyles = makeStyles(theme => style)

export default function DeleteDashboardModal(props) {
    const dispatch = useDispatch();

    const [deleteOpen, setDeleteOpen] = useState(false);

    const { logout } = useAuth0();

    const classes = useStyles();

    const handleDeleteClick = () => {
        setDeleteOpen(true);
    };

    const handleDeleteClose = () => {
        setDeleteOpen(false);
    };

    const handleSubmit = () => {
        dispatch(deleteUser(props.userId))
        setDeleteOpen(false)
        logout();
    }
    return (
        <div>
            <p onClick={handleDeleteClick}>{props.email}</p>
            {console.log(deleteOpen)}
            <Dialog
                open={deleteOpen}
                onClose={handleDeleteClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'Are you sure you want to delete this account? This cannot be undone.'}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleDeleteClose} color="primary">
                        NO, CANCEL
               </Button>
                    <Button
                        onClick={handleSubmit}
                        color="primary"
                        autoFocus
                    >
                        YES, DELETE
               </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}