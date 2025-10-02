import React, { useRef, useState } from "react";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";

const DynamicInputs = () => {
  const [inputs, setInputs] = useState([{ id: Date.now(), value: "" }]);
  const reffer = useRef([]);

  const addInput = () => {
    const lastInputValue = reffer.current[inputs.length - 1]?.value || "";

    
    if (!lastInputValue.trim()) {
      alert("Iltimos, oxirgi inputni to‘ldiring!");
      return;
    }

    const newID = Date.now();
    setInputs((prev) => [...prev, { id: newID, value: "" }]);
  };

  const removeInput = (id) => {
    setInputs((prev) => prev.filter((inp) => inp.id !== id));
  };

  const handleChange = (e, index) => {
    const newInputs = [...inputs];
    newInputs[index].value = e.target.value;
    setInputs(newInputs);
  };

  return (
    <div className="flex items-start justify-center pt-10 min-h-screen bg-gray-100">
      <div className="h-fit shadow-lg w-[500px] bg-white rounded-xl p-5 flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center text-gray-700">Dynamic Inputs</h2>

        {inputs.map((inp, i) => (
          <div key={inp.id} className="flex items-center gap-2">
            <input
              ref={(el) => (reffer.current[i] = el)}
              type="text"
              value={inp.value}
              onChange={(e) => handleChange(e, i)}
              placeholder={`Lesson ${i + 1}`}
              className="flex-1 border border-gray-300 p-[5px] rounded-md placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition duration-300"
            />

            {i === inputs.length - 1 ? (
              <button
                onClick={addInput}
                className="bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600 transition duration-300"
                title="Add new input"
              >
                <AiOutlinePlus size={20} />
              </button>
            ) : (
              <button
                onClick={() => removeInput(inp.id)}
                className="bg-red-500 p-2 rounded-full text-white hover:bg-red-600 transition duration-300"
                title="Remove input"
              >
                <AiOutlineClose size={20} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicInputs;
