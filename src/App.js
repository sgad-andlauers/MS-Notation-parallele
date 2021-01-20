/** REACT */
import React, { useContext, useState, useRef, useEffect, useMemo } from "react";
/** STYLE */
import { makeStyles } from "@material-ui/core/styles";
/** CORE */
import {
  Box,
  Paper,
  LinearProgress,
  TextField,
  InputAdornment,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Tooltip,
  Checkbox,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  ButtonGroup,
  Typography,
  Switch,
  Divider
} from "@material-ui/core";
/*
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography"; 
import Slider from "@material-ui/core/Slider"; 
import InputLabel from "@material-ui/core/InputLabel"; 
import MenuItem from "@material-ui/core/MenuItem"; 
import FormControl from "@material-ui/core/FormControl"; 
import Select from "@material-ui/core/Select"; */
/** LIBRAIRIE EXTERNE */
import clsx from "clsx";
/** ICON */
import CodeIcon from "@material-ui/icons/Code";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";
import SquareFootIcon from "@material-ui/icons/SquareFoot";
import FormatIndentIncreaseIcon from "@material-ui/icons/FormatIndentIncrease";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import EditIcon from "@material-ui/icons/Edit";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import PausePresentationIcon from "@material-ui/icons/PausePresentation";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
/** COMPOSANT */
/*import { NumberFormatCustom } from "../../assets/framework/format";*/
/** CONTEXT */
/*import { AppContext } from "../../context/AppContext"; 
import { ModalContext } from "../../context/ModalContext";*/

const NB_CHAMPS_VALIDATION = 15;
const VALEUR_ETAPE = 100 / NB_CHAMPS_VALIDATION;
const INDICE_ALPHA_POS = 3;
const INDICE_ALPHA_NEG = -3;
const INDICE_BETA_POS = 1;
const INDICE_BETA_NEG = -1;

const initMoyenSecours = {
  aDetectionGazFixe: {
    valeur: "",
    modeEdition: false,
    estValide: false,
    estNouveau: true,
    pointEtape: 0,
    pointValeur: 0
  },
  aSystemeExtinctionAuto: {
    valeur: "",
    modeEdition: false,
    estValide: false,
    estNouveau: true,
    pointEtape: 0,
    pointValeur: 0
  }
};

const useStyles = makeStyles((theme) => ({
  barre: {
    textDecoration: "line-through"
  }
}));

export default function AccordionPanelInformations() {
  const [valueProgressModalInfo, setValueProgressModalInfo] = useState(0);
  const selectedBuilding = {
    properties: {
      batiment: {
        estNouveau: true,
        moyenSecours: {
          aDetectionGazFixe: "",
          aSystemeExtinctionAuto: ""
        }
      }
    }
  };
  const classes = useStyles();
  /*const { selectedBuilding } = useContext(AppContext);
  const { setValueProgressModalInfo } = useContext(ModalContext);*/
  const [updatedMoyenSecours, setUpdatedMoyenSecours] = useState(
    initMoyenSecours
  );
  const [previousMoyenSecours, setPreviousMoyenSecours] = useState(
    updatedMoyenSecours
  );
  const refBuilding = useRef(selectedBuilding.properties.batiment.moyenSecours);

  useEffect(
    () => {
      console.log("useEffect_calculation");
      calculationValueProgressModalInfo();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      updatedMoyenSecours.aDetectionGazFixe.pointEtape,
      updatedMoyenSecours.aSystemeExtinctionAuto.pointEtape
    ]
  );
  useEffect(
    () => {
      console.log("useEffect_temp");
      console.warn("updatingBatiment", updatedMoyenSecours);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      updatedMoyenSecours.aDetectionGazFixe,
      updatedMoyenSecours.aSystemeExtinctionAuto
    ]
  );

  /** Initialisation des valeurs du batiment */
  useEffect(
    () => {
      console.log("useEffect_init");
      console.warn("selectedBuilding", selectedBuilding);
      setUpdatedMoyenSecours({
        ...updatedMoyenSecours,
        aDetectionGazFixe: {
          ...updatedMoyenSecours.aDetectionGazFixe,
          modeEdition:
            selectedBuilding.properties.batiment.estNouveau &&
            selectedBuilding.properties.batiment.moyenSecours
              .aDetectionGazFixe === "",
          estNouveau: selectedBuilding.properties.batiment.estNouveau,
          pointEtape:
            selectedBuilding.properties.batiment.estNouveau ||
            selectedBuilding.properties.batiment.moyenSecours
              .aDetectionGazFixe === ""
              ? 0
              : VALEUR_ETAPE,
          valeur:
            selectedBuilding.properties.batiment.moyenSecours.aDetectionGazFixe,
          pointValeur:
            selectedBuilding.properties.batiment.moyenSecours
              .aDetectionGazFixe !== ""
              ? selectedBuilding.properties.batiment.moyenSecours
                  .aDetectionGazFixe === "Oui"
                ? INDICE_BETA_POS
                : INDICE_BETA_NEG
              : 0,
          estValide: !(
            selectedBuilding.properties.batiment.estNouveau ||
            selectedBuilding.properties.batiment.moyenSecours
              .aDetectionGazFixe === ""
          )
        },
        aSystemeExtinctionAuto: {
          ...updatedMoyenSecours.aSystemeExtinctionAuto,
          modeEdition:
            selectedBuilding.properties.batiment.estNouveau &&
            selectedBuilding.properties.batiment.moyenSecours
              .aSystemeExtinctionAuto === "",
          estNouveau: selectedBuilding.properties.batiment.estNouveau,
          pointEtape:
            selectedBuilding.properties.batiment.estNouveau ||
            selectedBuilding.properties.batiment.moyenSecours
              .aSystemeExtinctionAuto === ""
              ? 0
              : VALEUR_ETAPE,
          valeur:
            selectedBuilding.properties.batiment.moyenSecours
              .aSystemeExtinctionAuto,
          pointValeur:
            selectedBuilding.properties.batiment.moyenSecours
              .aSystemeExtinctionAuto !== ""
              ? selectedBuilding.properties.batiment.moyenSecours
                  .aSystemeExtinctionAuto === "Oui"
                ? INDICE_ALPHA_POS
                : INDICE_ALPHA_NEG
              : 0,
          estValide: !(
            selectedBuilding.properties.batiment.estNouveau ||
            selectedBuilding.properties.batiment.moyenSecours
              .aSystemeExtinctionAuto === ""
          )
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const indiceIntermediaire =
    updatedMoyenSecours.aDetectionGazFixe.pointValeur +
    updatedMoyenSecours.aSystemeExtinctionAuto.pointValeur;
  const indiceBatimentMs = () => {
    let indice;
    if (indiceIntermediaire > 0) {
      indice = "+";
    } else if (indiceIntermediaire < 0) {
      indice = "-";
    } else {
      indice = "NR";
    }
    return indice;
  };
  const handleClickEdit = (e, currentForm) => {
    console.log("handleClickEdit");
    setPreviousMoyenSecours({
      ...previousMoyenSecours,
      [currentForm]: { ...updatedMoyenSecours[currentForm] }
    });
    setUpdatedMoyenSecours({
      ...updatedMoyenSecours,
      [currentForm]: {
        ...updatedMoyenSecours[currentForm],
        modeEdition: true,
        estValide: false,
        pointEtape: 0,
        pointValeur: 0
      }
    });
  };
  const handleClickSave = (e, currentForm) => {
    console.log("handleClickSave");
    setUpdatedMoyenSecours({
      ...updatedMoyenSecours,
      [currentForm]: {
        ...updatedMoyenSecours[currentForm],
        modeEdition: false,
        estNouveau: false,
        pointEtape: VALEUR_ETAPE
      }
    });
  };
  const handleClickClose = (e, currentForm) => {
    console.log("handleClickClose");
    console.log(updatedMoyenSecours[currentForm]);
    // var etape = refBuilding.current.aDetectionGazFixe === "" ? 0 : VALEUR_ETAPE;

    setUpdatedMoyenSecours({
      ...updatedMoyenSecours,

      [currentForm]: { ...previousMoyenSecours[currentForm] }
    });
    /*setUpdatedMoyenSecours({
      ...updatedMoyenSecours,
      [currentForm]: {
        ...updatedMoyenSecours[currentForm],
        modeEdition: false,
        etape: step,
        value: prevName
      }
    });*/
  };
  const handleCheck = (event, currentForm, value, point) => {
    setUpdatedMoyenSecours({
      ...updatedMoyenSecours,
      [currentForm]: {
        ...updatedMoyenSecours[currentForm],
        valeur: value,
        estValide: true,
        pointValeur: point
      }
    });
  };
  const calculationValueProgressModalInfo = () => {
    const sumPointEtape =
      updatedMoyenSecours.aDetectionGazFixe.pointEtape +
      updatedMoyenSecours.aSystemeExtinctionAuto.pointEtape;
    setValueProgressModalInfo(sumPointEtape);
    console.warn("debug", sumPointEtape);
  };

  return (
    <Box width={360}>
      {/** Moyen de secours du batiment */}
      <Box component="span" display="flex" alignItems="center">
        <Paper
          style={{
            width: 24,
            height: 24,
            borderRadius: 4,
            backgroundColor: "#2196f3",
            textAlign: "center",
            paddingTop: 2
          }} //blue500
          className={classes.paper}
        >
          <Typography
            variant="caption"
            style={{
              color: "#fff",
              fontWeight: 700
            }}
          >
            {indiceBatimentMs()}
          </Typography>
        </Paper>

        <Box width={100} mr={1} ml={2}>
          <LinearProgress
            variant="determinate"
            value={valueProgressModalInfo}
          />
        </Box>
        <Box minWidth={35}>
          <Typography variant="caption" color="textSecondary">{`${Math.round(
            valueProgressModalInfo
          )}%`}</Typography>
        </Box>
      </Box>
      {/** detection gaz fixe */}
      <Box
        display="flex"
        lineHeight={2.5}
        alignItems="center"
        justifyContent="space-between"
      >
        <Box display="flex" lineHeight={2.5} alignItems="center">
          <ArrowRightIcon />
          <Box
            mr={2}
            className={clsx({
              [classes.barre]:
                updatedMoyenSecours.aDetectionGazFixe.modeEdition ||
                (updatedMoyenSecours.aDetectionGazFixe.valid &&
                  updatedMoyenSecours.aDetectionGazFixe.valeur !==
                    refBuilding.current.aDetectionGazFixe)
            })}
          >
            <Typography variant="caption" color="textSecondary">
              {`Détection de gaz fixe? #${updatedMoyenSecours.aDetectionGazFixe.pointValeur}`}
            </Typography>
          </Box>
          {updatedMoyenSecours.aDetectionGazFixe.valeur !== "" ? (
            <Switch
              size="small"
              disabled={updatedMoyenSecours.aDetectionGazFixe.modeEdition}
              color="primary"
              checked={
                updatedMoyenSecours.aDetectionGazFixe.valeur === "Oui"
                  ? true
                  : false
              }
            />
          ) : (
            <PausePresentationIcon fontSize="small" color="disabled" />
          )}
        </Box>
        <Box>
          {updatedMoyenSecours.aDetectionGazFixe.modeEdition ? (
            <>
              <IconButton
                disabled={!updatedMoyenSecours.aDetectionGazFixe.estValide}
                size="small"
                edge="end"
                onClick={(e) => handleClickSave(e, "aDetectionGazFixe")}
              >
                <SaveIcon
                  fontSize="small"
                  color={
                    updatedMoyenSecours.aDetectionGazFixe.estValide
                      ? "secondary"
                      : "disabled"
                  }
                />
              </IconButton>
              <IconButton
                /** disabled =  disabled={true}
                 *  enabled =   disabled={false}
                 */
                disabled={updatedMoyenSecours.aDetectionGazFixe.estNouveau}
                size="small"
                edge="end"
                onClick={(e) => handleClickClose(e, "aDetectionGazFixe")}
              >
                <CloseIcon
                  fontSize="small"
                  color={
                    updatedMoyenSecours.aDetectionGazFixe.estNouveau
                      ? "disabled"
                      : "secondary"
                  }
                />
              </IconButton>
            </>
          ) : (
            <IconButton
              size="small"
              edge="end"
              onClick={(e) => handleClickEdit(e, "aDetectionGazFixe")}
            >
              <EditIcon color="secondary" fontSize="small" />
            </IconButton>
          )}
        </Box>
      </Box>
      <Box
        display={
          updatedMoyenSecours.aDetectionGazFixe.modeEdition ||
          !updatedMoyenSecours.aDetectionGazFixe.estValide
            ? "block"
            : "none"
        }
      >
        <Box display="flex" justifyContent="space-between">
          <ButtonGroup
            color="primary"
            aria-label="check aDetectionGazFixe"
            style={{ marginLeft: 116 }}
          >
            <Button
              style={{ minWidth: 64 }}
              variant={
                updatedMoyenSecours.aDetectionGazFixe.valeur === "" ||
                updatedMoyenSecours.aDetectionGazFixe.valeur === "Oui"
                  ? "outlined"
                  : "contained"
              }
              onClick={(event) =>
                handleCheck(event, "aDetectionGazFixe", "Non", INDICE_BETA_NEG)
              }
            >
              non
            </Button>
            <Button
              style={{ minWidth: 64 }}
              variant={
                updatedMoyenSecours.aDetectionGazFixe.valeur === "" ||
                updatedMoyenSecours.aDetectionGazFixe.valeur === "Non"
                  ? "outlined"
                  : "contained"
              }
              onClick={(event) =>
                handleCheck(event, "aDetectionGazFixe", "Oui", INDICE_BETA_POS)
              }
            >
              oui
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
      <Box mt={2} mb={1}>
        <Divider variant="middle" />
      </Box>
      {/** Systeme D'extinction Automatique */}
      <Box
        display="flex"
        lineHeight={2.5}
        alignItems="center"
        justifyContent="space-between"
      >
        <Box display="flex" lineHeight={2.5} alignItems="center">
          <ArrowRightIcon />
          <Box
            mr={2}
            className={clsx({
              [classes.barre]:
                updatedMoyenSecours.aSystemeExtinctionAuto.modeEdition ||
                (updatedMoyenSecours.aSystemeExtinctionAuto.valid &&
                  updatedMoyenSecours.aSystemeExtinctionAuto.valeur !==
                    refBuilding.current.aSystemeExtinctionAuto)
            })}
          >
            <Typography variant="caption" color="textSecondary">
              {`Systeme d'extinction automatique ? #${updatedMoyenSecours.aSystemeExtinctionAuto.pointValeur}`}
            </Typography>
          </Box>
          {updatedMoyenSecours.aSystemeExtinctionAuto.valeur !== "" ? (
            <Switch
              size="small"
              disabled={updatedMoyenSecours.aSystemeExtinctionAuto.modeEdition}
              color="primary"
              checked={
                updatedMoyenSecours.aSystemeExtinctionAuto.valeur === "Oui"
                  ? true
                  : false
              }
            />
          ) : (
            <ErrorOutlineIcon fontSize="small" color="disabled" />
          )}
        </Box>
        <Box>
          {updatedMoyenSecours.aSystemeExtinctionAuto.modeEdition ? (
            <>
              <IconButton
                disabled={!updatedMoyenSecours.aSystemeExtinctionAuto.estValide}
                size="small"
                edge="end"
                onClick={(e) => handleClickSave(e, "aSystemeExtinctionAuto")}
              >
                <SaveIcon
                  fontSize="small"
                  color={
                    updatedMoyenSecours.aSystemeExtinctionAuto.estValide
                      ? "secondary"
                      : "disabled"
                  }
                />
              </IconButton>
              <IconButton
                /** disabled =  disabled={true}
                 *  enabled =   disabled={false}
                 */
                disabled={updatedMoyenSecours.aSystemeExtinctionAuto.estNouveau}
                size="small"
                edge="end"
                onClick={(e) => handleClickClose(e, "aSystemeExtinctionAuto")}
              >
                <CloseIcon
                  fontSize="small"
                  color={
                    updatedMoyenSecours.aSystemeExtinctionAuto.estNouveau
                      ? "disabled"
                      : "secondary"
                  }
                />
              </IconButton>
            </>
          ) : (
            <IconButton
              size="small"
              edge="end"
              onClick={(e) => handleClickEdit(e, "aSystemeExtinctionAuto")}
            >
              <EditIcon color="secondary" fontSize="small" />
            </IconButton>
          )}
        </Box>
      </Box>
      <Box
        display={
          updatedMoyenSecours.aSystemeExtinctionAuto.modeEdition ||
          !updatedMoyenSecours.aSystemeExtinctionAuto.estValide
            ? "block"
            : "none"
        }
      >
        <Box display="flex" justifyContent="space-between">
          <ButtonGroup
            color="primary"
            aria-label="check  aSystemeExtinctionAuto"
            style={{ marginLeft: 116 }}
          >
            <Button
              style={{ minWidth: 64 }}
              variant={
                updatedMoyenSecours.aSystemeExtinctionAuto.valeur === "" ||
                updatedMoyenSecours.aSystemeExtinctionAuto.valeur === "Oui"
                  ? "outlined"
                  : "contained"
              }
              onClick={(event) =>
                handleCheck(
                  event,
                  "aSystemeExtinctionAuto",
                  "Non",
                  INDICE_ALPHA_NEG
                )
              }
            >
              non
            </Button>
            <Button
              style={{ minWidth: 64 }}
              variant={
                updatedMoyenSecours.aSystemeExtinctionAuto.valeur === "" ||
                updatedMoyenSecours.aSystemeExtinctionAuto.valeur === "Non"
                  ? "outlined"
                  : "contained"
              }
              onClick={(event) =>
                handleCheck(
                  event,
                  "aSystemeExtinctionAuto",
                  "Oui",
                  INDICE_ALPHA_POS
                )
              }
            >
              oui
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    </Box>
  );
}
