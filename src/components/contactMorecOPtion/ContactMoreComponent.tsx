import React, { useState } from "react";
import { MoreVert } from "@mui/icons-material";
import { Menu, MenuItem, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { IMoreContact } from "../../models/MoreContact";

import edit from "../../assets/images/edit.svg";
import ClearIcon from "@mui/icons-material/Clear";

function ContactMoreComponent(props: IMoreContact): JSX.Element {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    navigate(`${props.edit}`);
    handleClose();
  };

  const handleDelete = async () => {
    // Confirm with the user before deleting
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this contact?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${props.delete}`, {
        method: "DELETE"
      });

      if (response.ok) {
        console.log("Contact deleted successfully");
        // Navigate back to contacts list after deletion
        navigate("/contacts");
      } else {
        console.error("Failed to delete the contact");
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
    }

    handleClose();
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
        <MenuItem onClick={handleEdit} sx={{ gap: 3 }}>
          <img src={edit} alt="edit" />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ gap: 3 }}>
          <ClearIcon />
          Delete
        </MenuItem>
      </Menu>
    </>
  );
}

export default ContactMoreComponent;
