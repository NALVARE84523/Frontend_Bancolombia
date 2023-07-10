import React from "react";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
/* import Box from '@mui/material/Box'; */
import Container from "@mui/material/Container";

const styleContainer = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
}
const style = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const ModalCustom = ({ children, handleClose, open }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <>
        <CssBaseline />
        <Container maxWidth="sm" sx={styleContainer}>
          <Box sx={style}>{children}</Box>
        </Container>
      </>
    </Modal>
  );
};
ModalCustom.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ModalCustom;
