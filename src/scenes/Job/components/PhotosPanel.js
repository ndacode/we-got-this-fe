import React, { useState, useEffect } from 'react';
import {
    Box,
    ButtonBase,
    Dialog,
    DialogActions,
    Button,
    Paper,
    Grid,
    DialogContent,
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

import { NewPhoto } from './LightBox';
import DialogWrapper from '../../../components/dialogs/DialogWrapper';

const Image = styled(({ url, ...other }) => <ButtonBase {...other} />)({
    width: '100%',
    height: 200,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundImage: props => `url(${props.url})`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
});

const PhotosPanel = ({ value, index, job }) => {
    console.log('The job passed to PhotosPanel: ', job);
    const [selectedImg, setSelectedImg] = useState(null);
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box hidden={value !== index}>
            {!job.photos || !job.photos.length ? (
                <p>No Photos</p>
            ) : (
                <Grid container spacing={2} justify="space-between">
                    {job.photos.map(photo => (
                        <>
                            <Grid item xs={6}>
                                <DialogWrapper
                                    trigger={click => (
                                        <Paper>
                                            <Image
                                                onClick={() => click()}
                                                url={photo.url}
                                            />
                                            <div style={{ padding: 5 }}>
                                                <h3
                                                    style={{
                                                        textAlign: 'left',
                                                    }}
                                                >
                                                    <strong>{photo.tag}</strong>
                                                </h3>
                                                <p>{photo.note}</p>
                                            </div>
                                        </Paper>
                                    )}
                                    dialogContent={close => (
                                        <NewPhoto
                                            handleClose={close}
                                            photo={photo}
                                        />
                                    )}
                                    title="New Photo"
                                    size="xs"
                                    showTitle={false}
                                    noPadding={true}
                                />
                            </Grid>
                        </>
                    ))}
                </Grid>
            )}

            {/* <ButtonBase
                onClick={() => {
                    setOpen(true);
                    setSelectedImg(job.approved_checklist_url);
                }}
            >
                <Grid container spacing={2}>
                    {job.photos ? (
                        job.photos.map(photo => (
                            <Grid item xs={6} spacing={1}>
                                <Paper>
                                    <img
                                        src={photo.url}
                                        width="200"
                                        height="200"
                                    />
                                    <p>{photo.note}</p>
                                </Paper>
                            </Grid>
                        ))
                    ) : (
                        <Grid item>
                            <Paper>No Photos</Paper>
                        </Grid>
                    )}
                </Grid>
            </ButtonBase> */}
            <Dialog open={open}>
                <DialogContent>
                    <img src={selectedImg} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Close</Button>
                    <Button>Add Note</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default PhotosPanel;