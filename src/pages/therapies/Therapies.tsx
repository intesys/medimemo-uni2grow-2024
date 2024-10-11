import { useState, useEffect } from "react";
import "./Therapies.css";
import { Typography, IconButton, InputBase, Paper } from "@mui/material";
import addIcon from "../../assets/images/therapie/add_circle.png";
import SearchIcon from "../../assets/images/therapie/Icon.png";
import forwardIcon from "../../assets/images/therapie/arrow_forward_ios.png";
import { ITherapy } from "../../models/Therapy";
import Header from "../../components/header/Header";
import { useNavigate } from "react-router-dom";

export function Therapies() {
  const [therapies, setTherapies] = useState<ITherapy[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate(); 

  useEffect(() => {
    const getTherapies = async (): Promise<void> => {
      try {
        const response = await fetch("http://localhost:3000/therapies");
        const data: ITherapy[] = await response.json();
        setTherapies(data);
      } catch {
        setError("Erreur lors de la récupération des thérapies:");
      }
    };

    getTherapies();
  }, []);

  const filteredTherapies = therapies?.filter((therapie: ITherapy) =>
    therapie.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function emptyTherapies(therapies: ITherapy[]): boolean {
    return therapies.length === 0;
  }
  function isNull(error: string): boolean {
    return error === "";
  }

  const handleDetails = (id: number ) => {
    navigate('details', {state: {value: id}})
  }

  const handleAdd = () => {
    navigate("add");
  }

  return (
    <>
      <Header title="My Therapies" />
      <div className="therapies-container">
        <div className="searchContainer">
          <Paper
            component="div"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: "90%",
              borderRadius: 20,
              backgroundColor: "#FFEFEF",
              maxHeight: 300,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search theraphy"
              inputProps={{ "aria-label": "search therapy" }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <img src={SearchIcon} alt="search icon" />
            </IconButton>
          </Paper>

          <div className="listContact">
            {!isNull(error) ? (
              <Typography sx={{ color: "red" }}>{error}</Typography>
            ) : emptyTherapies(therapies) ? (
              <Typography>No therapy available</Typography>
            ) : (
              filteredTherapies.map((therapie: ITherapy) => (
                <Paper
                  key={therapie.id}
                  component="form"
                  sx={{
                    p: "2px 4px",
                    display: "flex",
                    width: "90%",
                    justifyContent: "space-between",
                    backgroundColor: "#F4F4F4",
                    paddingTop: 1.5,
                    paddingBottom: 1.5,
                  }}
                  onClick={()=>handleDetails(therapie.id)}
                >
                  <div className="therapyName">
                    <Typography
                      sx={{ fontSize: 17, fontWeight: 700 }}
                      className="typography1"
                    >
                      {therapie.name}
                    </Typography>
                  </div>

                  <IconButton
                    type="button"
                    sx={{ p: "10px" }}
                    aria-label="arrowBack"
                  >
                    <img src={forwardIcon} alt="arrowBack icon" />
                  </IconButton>
                </Paper>
              ))
            )}
          </div>
        </div>

        <div className="addContainer" onClick={handleAdd}>
          <img src={addIcon} alt="add icon" />
        </div>
      </div>
    </>
  );
}
