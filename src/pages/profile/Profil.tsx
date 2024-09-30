import React from "react";
import "./Profil.css";

// Elements importation
import {
  Typography,
  IconButton,
  Avatar,
  Box,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";

// icons importation
import {
  ArrowBack,
  Edit,
  AccountBox,
  MedicalServices,
  Phone,
  Mail,
  Home,
} from "@mui/icons-material";

// images importation
import AvatarImg from "../../assets/images/3d_avatar_12.png";

export function Profil() {
  return (
    <>
      <div className="containerProfil">
        <div className="headerProfil">
          <IconButton component={Link} to="link_here">
            <ArrowBack />
          </IconButton>

          <Typography className="myPropfil" textAlign="center" fontWeight={700}>
            My Profile
          </Typography>

          <IconButton component={Link} to="link_url">
            <Edit />
          </IconButton>
        </div>

        <div className="profilPanel">
          <div className="imageProfil">
            <Box display="flex" justifyContent="center" mb={2}>
              <Avatar
                sx={{ width: 120, height: 120 }}
                alt="user avatar"
                src={AvatarImg}
              />
            </Box>
          </div>

          <div className="profilInfos">
            <Box textAlign="center">
              <Typography Variant="h6" fontWeight={700}>Francesca Greco</Typography>
            </Box>

            <Divider sx={{ my: 0.5 }} />

            <List className="infosList" sx={{ marginInline: "10px" }}>
              <ListItem>
                <ListItemIcon>
                  <AccountBox />
                </ListItemIcon>
                <ListItemText primary="GRCFNCXXXXXXXXXXXX" />
              </ListItem>
              
              <Divider sx={{ my: 0.5 }} />
              <Divider sx={{ my: 0.5 }} />

              <ListItem>
                <ListItemIcon>
                  <MedicalServices />
                </ListItemIcon>
                <ListItemText primary="No allergies" />
              </ListItem>

              <Divider sx={{ my: 0.5 }} />
              <Divider sx={{ my: 0.5 }} />

              <ListItem>
                <ListItemIcon>
                  <Phone />
                </ListItemIcon>
                <ListItemText primary="(555) 123-4567" />
              </ListItem>

              <Divider sx={{ my: 0.5 }} />
              <Divider sx={{ my: 0.5 }} />

              <ListItem>
                <ListItemIcon>
                  <Mail />
                </ListItemIcon>
                <ListItemText primary="francesca.greco@example.com" />
              </ListItem>

              <Divider sx={{ my: 0.5 }} />
              <Divider sx={{ my: 0.5 }} />

              <ListItem>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="123 Vision Lane, Suite 200, Cityville, ST 12345" />
              </ListItem>

              <Divider sx={{ my: 0.5 }} />
              
            </List>
          </div>

          {/* <Divider sx={{ my: 2 }}></Divider> */}

          <Button
            fullWidth
            variant="contained"
            color="error"
            sx={{
              backgroundColor: "red",
              fontWeight: "bold",
              padding: "1,5",
              color: "white",
            }}
          >
            LOGOUT
          </Button>
        </div>
      </div>
    </>
  );
}

////////////////////////////////////////////////////////////
///////////////////////////////////////////////////

