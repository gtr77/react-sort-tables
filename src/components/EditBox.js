import TextField from "@mui/material/TextField";

export const EditBox = ({ handleChange, currentItem }) => {
  return (
    <TextField
      id="outlined-size-small"
      value={currentItem}
      size="small"
      onChange={handleChange}
      placeholder="cells"
      style={{ margin: "5px" }}
    />
  );
};
