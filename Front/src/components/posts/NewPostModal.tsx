import React, { useState } from "react";
import { Fab, Modal, Card, CardContent, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NewPostForm from "./NewPostForm";

const NewPostModal = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const fabStyle = {
        position: "fixed",
        bottom: 20,
        right: 20,
    };

    return (
        <div>
            <Fab
                color="primary"
                aria-label="add"
                sx={fabStyle}
                onClick={handleOpen}
            >
                <AddIcon />
            </Fab>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Container maxWidth="md">
                    <Card
                        sx={{
                            width: 500,
                            minheight: 420,
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                        }}
                    >
                        <CardContent>
                            <NewPostForm />
                        </CardContent>
                    </Card>
                </Container>
            </Modal>
        </div>
    );
};

export default NewPostModal;
