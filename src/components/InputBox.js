import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export const InputBox = ({ textBoxValue, handleChange }) => {
  return (
    <Box style={{ marginBottom: "20px" }}>
      <TextField
        label="Cells"
        id="outlined-size-small"
        defaultValue={textBoxValue}
        size="medium"
        onChange={handleChange}
        placeholder="max 12 boxes"
      />
    </Box>
  );
};
