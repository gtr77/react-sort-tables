export const EditBox = ({ handleChange, currentItem }) => {
  return (
    <div>
      <input type="text" onChange={handleChange} value={currentItem} />
    </div>
  );
};
