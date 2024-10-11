import React, { useState, useEffect } from "react";
import "./TherapyDetails.css";
import {
  Box,
  Typography,
  Divider,
  Menu,
  MenuItem,
  Modal,
  Button,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Header from "../../components/header/Header";
import stethoscope from "../../assets/images/contact/stethoscope.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { Close, Edit, ErrorOutline, ArrowBackIos} from "@mui/icons-material";
import { ITherapy } from "../../models/Therapy";
import { IMedicine } from "../../models/Medicine";
import { IPrescription } from "../../models/Prescription";
import { IContact } from "../../models/Contact";

const style = {
  display: "flex",
  flexDirection: "column",
  alignItem: "center",
  justifyContent: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  gap: 1,
  bgcolor: "background.paper",
  borderRadius: 10,
  boxShadow: 24,
  minWidth: 270,
  p: 4,
};

function TherapyDetails() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [medicines, setMedicines] = useState<IMedicine[]>([]);
  const [therapy, setTherapy] = useState<ITherapy>({
    id: 0,
    name: "",
    userId: 0,
    contact: 0,
  });
  const [error, setError] = useState<string>("");
  const [prescriptions, setPrescriptions] = useState<IPrescription[]>([]);
  const [doctor, setDoctor] = useState<IContact>({
    id: 0,
    name: "",
    notes: "",
    qualification: "",
    profession: "",
    phone: "",
    email: "",
    address: "",
  });
  const [openModal, setOpenModal] = React.useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { value } = location.state;

  const getTherapy = async (id: number) => {
    try {
      const result = await fetch(`http://localhost:3000/therapies?id=${id}`);
      const data = await result.json();
      setTherapy(data[0]);
      getDoctor(data[0].contact);
    } catch {
      setError("Something are wrong  when therapy are find, try againt ");
    }
  };

  const getPrescriptionsWithTherapyId = async (id: number) => {
    try {
      const prescriptions = await fetch(
        `http://localhost:3000/prescriptions?therapy=${id}`
      );
      const data = await prescriptions.json();
      setPrescriptions(data);
      getMedicines(data);
    } catch {
      setError("Something are wrong when prescriptions are found,try againt");
    }
  };

  const getMedicines = async (prescript: IPrescription[]) => {
    let med: IMedicine[] = [];
    try {
      const medicines = await fetch(`http://localhost:3000/medicines`);
      const data = await medicines.json();
      prescript.forEach((item) => {
        const filtered = data.filter(
          (med: IMedicine) => med.id == item.medicine
        );
        const [tempMed] = filtered;
        med = [...med, tempMed];
      });
      setMedicines(med);
    } catch {
      setError("Something are wrong when medicines are found, try againt");
    }
  };

  const getDoctor = async (id: number) => {
    try {
      const doctor = await fetch(`http://localhost:3000/contacts?id=${id}`);
      const data = await doctor.json();
      setDoctor(data[0]);
    } catch {
      setError("Something are wrong when doctor are found, try againt");
    }
  };

  useEffect(() => {
    getTherapy(value);
    getPrescriptionsWithTherapyId(value);
  }, []);
  const handleBack = () => {
    navigate(-1);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpenModal = () => setOpenModal(true);

  const handleCloseModal = () => setOpenModal(false);

  const handleDelete = async () => {
    try {
        const response = await fetch(`http://localhost:3000/therapies/${therapy.id}`, {
          method: 'DELETE', // méthode HTTP DELETE
          headers: {
            'Content-Type': 'application/json', // Spécifiez le type de contenu si nécessaire
          }
        });
    
        if (!response.ok) {
          throw new Error(`Erreur lors de la suppression : ${response.status}`);
        }
    
        console.log('Élément supprimé avec succès');
      } catch (error) {
        console.error('Erreur:', error);
      }
      navigate(-1);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMedicinesDetails = (id:number)=>{
    navigate("/medication/details", {state: {id: id}})
  }

  const handleContact = ()=>{
    navigate("/contacts/details", {state: {id: doctor.id}})
  }

  const handleEdit = () => {
    navigate("/therapies/edit", { state: { therapy, doctor, medicines } });
  };
  const open = Boolean(anchorEl);
  return (
    <>
      <Header
        title={therapy.name}
        showBackButton={true}
        showRightButton={true}
        onBackButtonClick={handleBack}
        onRightButtonClick={handleMenu}
      />
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 30,
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleEdit} sx={{ gap: 2 }}>
          <Edit width="24px" height="24px" /> Edit
        </MenuItem>
        <MenuItem onClick={handleOpenModal} sx={{ gap: 2 }}>
          <Close width="24px" height="24px" /> Delete
        </MenuItem>
      </Menu>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}  className="modal">
          <ErrorOutline />
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
          >
            Deletion  Confirmation
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} className="">
            Do you really want to delete this contact? All entered data will be
            lost and cannot be recovered.
          </Typography>
          <Box className="button-modal">
            <Button sx={{color:"black", gap:2}} onClick={handleCloseModal}><ArrowBackIos width="24px" height="24px"/>Back</Button>
            <Button sx={{color:"#f00", gap:2}} onClick={handleDelete}> <Close width="24px" height="24px"/> Delete</Button>
          </Box>
        </Box>
      </Modal>

      <div className="details-container">
        {medicines.map((item) => {
          return (
            <div key={item.id} className="details-element" onClick={()=>handleMedicinesDetails(item.id)}>
              <Box className="details-element-title">Medecines</Box>
              <Box className="details-element-container">
                <Typography className="details-element-content">
                  {item.name}
                </Typography>
                <ArrowForwardIosIcon width="24px" height="24px" />
              </Box>
            </div>
          );
        })}
        <Divider className="divider" />
        <div className="details-element" onClick={handleContact}>
          <Box className="details-element-title">Doctor</Box>
          <Box className="details-element-container">
            <img src={stethoscope} width="24px" height="24px" />
            <Typography className="details-element-content">
              {doctor.qualification}. {doctor.name}
            </Typography>
            <ArrowForwardIosIcon width="24px" height="24px" />
          </Box>
        </div>

        <div className="details-element">
          <Box className="details-element-title">Notes</Box>
          <Box className="details-element-container">
            <Box className="note">{therapy.notes}</Box>
          </Box>
        </div>
      </div>
    </>
  );
}

export default TherapyDetails;
