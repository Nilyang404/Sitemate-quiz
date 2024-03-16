import { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
function App() {
  //States
  const [objects, setObjects] = useState(null);
  const [createForm, setCreateForm] = useState({
    id: "",
    title: "",
    description: "",
  });

  const [updateForm, setUpdateForm] = useState({
    _id: null,
    id: "",
    title: "",
    description: "",
  });

  //UseEffect
  useEffect(() => {
    fetchObjects();
  }, []);

  //Functions
  const fetchObjects = async () => {
    const res = await axios.get("http://localhost:3000/objects");
    setObjects(res.data.objects);
    console.log("Fetch objects:");
    console.log(res.data.objects);
  };
  // update form
  const updateCreateForm = (e) => {
    setCreateForm({ ...createForm, [e.target.name]: e.target.value });
  };
  const updateUpdateForm = (e) => {
    setUpdateForm({ ...updateForm, [e.target.name]: e.target.value });
  };

  const CreateObject = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:3000/object", createForm);
    console.log("Create object");
    console.log(res.data);
    setObjects([...objects, res.data]);
    setCreateForm({
      id: "",
      title: "",
      description: "",
    });
  };

  //edit
  const EditObject = async (object) => {
    setUpdateForm({
      _id: object._id,
      id: object.id,
      title: object.title,
      description: object.description,
    });
  };
  // update
  const UpdateObject = async (e) => {
    e.preventDefault();
    const { id, title, description } = updateForm;
    const res = await axios.put(
      `http://localhost:3000/object/${updateForm._id}`,
      { id, title, description }
    );
    console.log("Dpdate object");
    console.log(res.data);
    //update State
    setObjects(
      objects.map((object) =>
        object._id === updateForm._id ? { ...res.data } : object
      )
    );
  };
  //delete
  const DeleteObject = async (_id) => {
    const res = await axios.delete(`http://localhost:3000/object/${_id}`);
    console.log("Delete object");
    console.log(res.data);
    setObjects((newObjects) =>
      newObjects.filter((object) => object._id !== _id)
    );
  };

  //Return
  return (
    <div className="App">
      <h2>Create Object</h2>
      <form onSubmit={CreateObject}>
        <input
          onChange={updateCreateForm}
          value={createForm.id}
          name="id"
          type="text"
          placeholder="id"
        />
        <input
          onChange={updateCreateForm}
          value={createForm.title}
          name="title"
          type="text"
          placeholder="title"
        />
        <input
          onChange={updateCreateForm}
          value={createForm.description}
          name="description"
          type="text"
          placeholder="description"
        />
        <button type="submit">Create</button>
      </form>

      <h2>Update Object</h2>
      <form onSubmit={UpdateObject}>
        <input
          onChange={updateUpdateForm}
          value={updateForm.id}
          name="id"
          type="text"
          placeholder="id"
        />
        <input
          onChange={updateUpdateForm}
          value={updateForm.title}
          name="title"
          type="text"
          placeholder="title"
        />
        <input
          onChange={updateUpdateForm}
          value={updateForm.description}
          name="description"
          type="text"
          placeholder="description"
        />
        <button type="submit">Update</button>
      </form>
      <h2>Fetched Objects</h2>
      {objects &&
        objects.map((object) => (
          <div key={object._id}>
            <h3>id:{object.id}</h3>
            <p>title: {object.title}</p>
            <p>description: {object.description}</p>
            <button onClick={() => EditObject(object)}>Edit</button>
            <button onClick={() => DeleteObject(object._id)}>Delete</button>
          </div>
        ))}
    </div>
  );
}

export default App;
