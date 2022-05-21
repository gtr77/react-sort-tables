import "./styles.css";
import { useState, useEffect } from "react";
import { EditBox } from "./components/EditBox";
import { InputBox } from "./components/InputBox";
import { ErrorAmount } from "./components/ErrorAmount";

export default function App() {
  const [names, setNames] = useState([
    { id: 0, name: "Gustavo" },
    { id: 1, name: "Camila" },
    { id: 2, name: "Johnama" }
  ]);
  const [items, setItems] = useState([
    /*     [33, 20, 37],
    ["Gustavo", "Camila", "Andrea"],
    ["Software Eng", "Design", "kitchen"] */
    ["Camila", 20, "Dev"],
    ["Gustavo", 33, "Software Eng"],
    ["Andrea", 37, "kitchen"]
  ]);
  const [defaultNames, setDefaultValues] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState();
  const [textBoxValue, setTextBoxValue] = useState("");
  const [editBoxText, setEditBoxText] = useState("");

  const deepLinkUrl = (direction, columnName) => {
    let currentUrl = window.location.href.split("?")[0];
    let urlWithParams = `${currentUrl}sortBy=${direction}&column=${columnName}`;
    console.log(urlWithParams);
    window.location.href = urlWithParams;
  };

  useEffect(() => {
    setItems(items);
    console.table("TESTING: ", items);
    if (selectedAmount) {
      console.log("Final data updated , invoke your function");
    }
  }, [selectedAmount]);

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

  const handleEditBox = (e, input, rowIndex, colIndex) => {
    e.preventDefault();
    const text = e.target.value;
    let copyItems = [...items];
    copyItems[rowIndex][colIndex] = text;
    console.table("UP=>>>>>>>>", copyItems);
    setItems(copyItems);
    setEditBoxText(text);
  };

  const handleGridAmount = (e) => {
    e.preventDefault();
    let text = e.target.value;
    text = text ? parseInt(text) : null;
    setSelectedAmount(text);

    /*     let iterator = () => {
      console.log("Seleceted Amount =>", text);
      let objects = [];
      for (let index = 0; index < text; index++) {
        objects[index] = [
          ...Array(text).fill({
            id: index,
            name: "XXXXX",
            editable: true
          })
        ];
      }
      return objects;
    };
    iterator(); */
  };

  const sortByAsc = () => [...items].sort();
  const sortByDesc = () => [...items].sort().reverse();
  const deepSortByAsc = () => [...items].sort((a, b) => a - b);
  const deepSortbYDesc = () => [...items].sort((b, a) => a - b);

  const handleSorting = () => {
    //console.table("sortByAsc sortByAsc ==========> : ", sortByAsc());
    let upperCase = sortByAsc();

    const titleCase = (update) => {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          update[i][j] = update[i][j].toString().toLowerCase();
        }
      }
      return upperCase;
    };
    titleCase(upperCase);
    setItems(titleCase(upperCase));
    deepLinkUrl("ASC", "NAME");
  };

  useEffect(() => {
    setItems(items);
  }, [editBoxText]);

  const createGrid = (amount) => {
    let columnsAllowed = 12;

    return items.length > 0 && amount <= columnsAllowed ? (
      <div>
        <div>
          {[...Array(amount)].map((x, index) => {
            return (
              <button onClick={handleSorting}>{`Column ${++index}`}</button>
            );
          })}
        </div>
        {items.map((textbox, rowIndex) => {
          return (
            <div>
              {textbox.map((item, colIndex) => {
                return (
                  <EditBox
                    currentItem={item}
                    handleChange={(e) =>
                      handleEditBox(e, item, rowIndex, colIndex)
                    }
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    ) : (
      <ErrorAmount />
    );
  };

  return (
    <div className="App">
      <h5>How many boxes do you want?</h5>
      <InputBox
        addItem={addItem}
        handleChange={handleGridAmount}
        textBoxValue={selectedAmount}
      />
      {createGrid(selectedAmount)}
    </div>
  );
}
