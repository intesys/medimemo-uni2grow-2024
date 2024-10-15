import React, { useState } from "react";
import { MoreVert } from "@mui/icons-material";
import { Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { IMoreContact } from "../../models/MoreContact";
import ModalDialog from "../modalDialog/ModalDialog";

import edit from "../../assets/images/edit.svg";
import ClearIcon from "@mui/icons-material/Clear";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

function ContactMoreComponent(props: IMoreContact): JSX.Element {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    navigate(`${props.edit}`, { state: { id: props.id } });
    handleClose();
  };

  const handleAgree = async () => {
    try {
      const response = await fetch(`${props.delete}`, {
        method: "DELETE"
      });

      if (response.ok) {
        navigate("/contacts");
      } else {
        console.error("Failed to delete the contact");
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const handleDelete = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div onClick={handleClick}>
        <MoreVert />
      </div>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        sx={{ width: 2000 }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        {props.edit && (
          <MenuItem onClick={handleEdit} sx={{ gap: 3 }}>
            <img src={edit} alt="edit" />
            Edit
          </MenuItem>
        )}
        <MenuItem onClick={handleDelete} sx={{ gap: 3 }}>
          <ClearIcon />
          Delete
        </MenuItem>
      </Menu>

      {openModal && (
        <ModalDialog
          open={openModal}
          icon={<ReportGmailerrorredIcon />}
          title="Deletion Confirmation"
          content="Do you really want to delete this contact? All entered data wilL be lost and cannot be recovered."
          agreeIcon={<ClearIcon sx={{ width: 15, height: 15 }} />}
          disagreeIcon={<ArrowBackIosNewIcon sx={{ width: 15, height: 15 }} />}
          onAgree={handleAgree}
          onDisagree={handleModalClose}
          agreeMessage="Delete"
          disagreeMessage="Back"
        />
      )}
    </>
  );
}

export default ContactMoreComponent;
