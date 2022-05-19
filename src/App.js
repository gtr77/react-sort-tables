import "./styles.css";
import { useState, useEffect } from "react";
import { EditBox } from "./components/EditBox";
import { InputBox } from "./components/InputBox";

export default function App() {
  const [names, setNames] = useState([
    { id: 0, name: "Gustavo" },
    { id: 1, name: "Camila" },
    { id: 2, name: "Johnama" }
  ]);
  const [defaultNames, setDefaultValues] = useState([
    {
      id: null,
      name: "GT",
      editable: false
    }
  ]);
  const [selectedAmount, setSelectedAmount] = useState("");
  const [textBoxValue, setTextBoxValue] = useState("");
  const [editBoxText, setEditBoxText] = useState("");
  //const [editable, setEditable] = useState(false);

  useEffect(() => {
    let mutableNames = [...names];
    let defaultValues = [...defaultNames];
    let newArray = mutableNames.map((x) => {
      let obj = {
        id: x.id,
        name: x.name,
        editable: false
      };
      return obj;
    });
    setNames(newArray);
    setDefaultValues(defaultValues);
  }, [textBoxValue]);

  const addItem = () => {
    let namesArray = [...names];
    let amountItems = namesArray.length;
    let getIdValue = namesArray[amountItems - 1].id;
    let incrementedId = ++getIdValue;

    if (textBoxValue !== "") {
      let item = {
        id: incrementedId,
        name: textBoxValue
      };
      setNames([...names, item]);
      setTextBoxValue("");
    }
  };

  const editItem = (id) => {
    let namesArray = [...names];
    let editInput = namesArray[id].name;
    namesArray[id].editable = true;
    setNames(namesArray);
    setEditBoxText(editInput);
    //setEditable(!editable);
    //setEdit(!shouldEdit);
  };

  const saveItem = (id) => {
    let namesArray = [...names];
    namesArray[id].name = editBoxText;
    namesArray[id].editable = false;
    setNames(namesArray);
    // SHOULD UPDATE THE STATE
    // SHOULD HIDE THE EDITBOX FIELD
  };

  const getAllNames = () => {
    return (
      <ul>
        {names.map((x, index) => (
          <li>
            {x.editable ? (
              <EditBox currentItem={editBoxText} handleChange={handleEditBox} />
            ) : (
              <span>
                {x.id} - {x.name} -{" "}
              </span>
            )}

            <button onClick={() => editItem(index)}>Edit</button>
            <button onClick={() => saveItem(index)}>Save</button>
          </li>
        ))}
      </ul>
    );
  };

  const handleChange = (e) => {
    e.preventDefault();
    const text = e.target.value;
    setTextBoxValue(text);
  };

  const handleEditBox = (e) => {
    e.preventDefault();
    const text = e.target.value;
    setEditBoxText(text);
  };
  const handleGridAmount = (e) => {
    e.preventDefault();
    let text = e.target.value;
    text = text ? parseInt(text) : "";
    setSelectedAmount(text);
  };

  /*   let hola = Array(5).fill("");
  console.log("hola", hola);
  console.log("Em", hola[2]);
  hola[2] = 17;
  console.log("G", hola[2]); */

  const createGrid = (amount) => {
    //let allItems = [...Array(amount)].map(() => Array(amount).fill("A"));
    //console.log("GetAlls", allItems);

    return (
      <table>
        {[...Array(amount)].map((x, index) => {
          return (
            <tr>
              {[...Array(amount)].map((item, idx) => {
                return <td>{getAllNames()}</td>;
              })}
            </tr>
          );
        })}
      </table>
    );
  };

  return (
    <div className="App">
      <label>How many boxes do you want?</label>
      <input
        type="text"
        placeholder="How many boxes?"
        value={selectedAmount}
        onChange={handleGridAmount}
      />
      <InputBox
        addItem={addItem}
        handleChange={handleChange}
        textBoxValue={textBoxValue}
      />

      {selectedAmount && createGrid(selectedAmount)}
      {/*       {createGrid(5)}
      {createGrid(5)}
      {createGrid(5)}
      {createGrid(5)} */}
    </div>
  );
}
