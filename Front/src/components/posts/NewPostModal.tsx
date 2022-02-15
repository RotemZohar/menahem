import React, { useState } from "react";
import {
    Fab,
    Modal,
    Card,
    CardContent,
    Container,
    Snackbar,
    IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import NewPostForm from "./NewPostForm";

const NewPostModal = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleSnackbarOpen = () => {
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = (
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setSnackbarOpen(false);
    };

    const fabStyle = {
        position: "fixed",
        bottom: 20,
        right: 20,
    };

    const action = (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackbarClose}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
    );

    return (
        <div>
            <Fab
                color="primary"
                aria-label="add"
                sx={fabStyle}
                onClick={handleModalOpen}
            >
                <AddIcon />
            </Fab>

            <Modal
                open={modalOpen}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Container>
                    <Card
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                        }}
                    >
                        <CardContent>
                            <NewPostForm
                                handleModalClose={handleModalClose}
                                handleSnackbarOpen={handleSnackbarOpen}
                            />
                        </CardContent>
                    </Card>
                </Container>
            </Modal>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                message="Post added"
                onClose={handleSnackbarClose}
                action={action}
            />
        </div>
    );
};

export default NewPostModal;
