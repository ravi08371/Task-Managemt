import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    width: "100%",
    maxWidth: "800px",
    margin: "0 16px",
    padding: "24px",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },
  titleInput: {
    fontSize: "1.125rem",
    fontWeight: 500,
    border: "none",
    padding: 0,
    width: "100%",
    "&:focus": {
      outline: "none",
    },
  },
  closeButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#666",
    "&:hover": {
      color: "#333",
    },
  },
  toolbar: {
    display: "flex",
    gap: "8px",
    marginBottom: "8px",
  },
  toolbarButton: {
    padding: "4px",
    background: "none",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  },
  description: {
    width: "100%",
    minHeight: "100px",
    resize: "none",
    border: "1px solid #ddd",
    borderRadius: "4px",
    padding: "8px",
    marginBottom: "4px",
    "&:focus": {
      outline: "none",
      borderColor: "#9333ea",
    },
  },
  charCount: {
    textAlign: "right",
    fontSize: "0.875rem",
    color: "#666",
  },
  formGrid: {
    display: "grid",
    gap: "16px",
    marginBottom: "24px",
  },
  fieldRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  label: {
    display: "block",
    fontSize: "0.875rem",
    fontWeight: 500,
    marginBottom: "4px",
  },
  categoryButtons: {
    display: "flex",
    gap: "8px",
  },
  categoryButton: {
    padding: "6px 16px",
    borderRadius: "20px",
    border: "1px solid #ddd",
    background: "none",
    cursor: "pointer",
    "&.active": {
      backgroundColor: "#9333ea",
      color: "#fff",
      border: "1px solid #9333ea",
    },
  },
  dateInput: {
    width: "100%",
    padding: "8px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    "&:focus": {
      outline: "none",
      borderColor: "#9333ea",
    },
  },
  statusSelect: {
    width: "100%",
    padding: "8px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    "&:focus": {
      outline: "none",
      borderColor: "#9333ea",
    },
  },
  activityCard: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
  },
  activityHeader: {
    fontWeight: 500,
    marginBottom: "12px",
  },
  activityList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  activityItem: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.875rem",
    "& span:first-child": {
      color: "#4b5563",
    },
    "& span:last-child": {
      color: "#6b7280",
    },
  },
  uploadArea: {
    marginTop: "24px",
  },
  dropZone: {
    border: "2px dashed #ddd",
    borderRadius: "8px",
    padding: "16px",
    textAlign: "center",
    color: "#666",
  },
  uploadLink: {
    color: "#3b82f6",
    cursor: "pointer",
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "8px",
    marginTop: "24px",
  },
  cancelButton: {
    padding: "8px 16px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    background: "none",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  },
  updateButton: {
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#9333ea",
    color: "#fff",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#7e22ce",
    },
  },
}));
