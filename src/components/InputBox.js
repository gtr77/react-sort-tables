export const InputBox = ({ addItem, textBoxValue, handleChange }) => {
  return (
    <div>
      <h3>Welcome InputBox</h3>
      <h3>{textBoxValue}</h3>
      <input type="text" onChange={handleChange} value={textBoxValue} />
      <button onClick={addItem}>Add</button>
    </div>
  );
};
