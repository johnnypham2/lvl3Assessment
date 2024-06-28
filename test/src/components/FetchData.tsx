import { useEffect, useState } from "react";
import { Button, ListGroup, ListGroupItem, Modal } from "react-bootstrap";

interface iList {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const FetchData = () => {
  const [data, setData] = useState<iList[]>([]);
  const [input, setInput] = useState("");

  //Add
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //update
  const [showUpdate, setShowUpdate] = useState(false);
  const [inputUpdate, setInputUpdate] = useState("");
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  const fetchListData = () => {
    fetch("https://jsonplaceholder.typicode.com/todos/")
      .then((response) => response.json())
      .then((json) => setData(json));
  };

  useEffect(() => {
    fetchListData();
  }, []);

  //delete function
  const deleteData = (item: iList) => {
    setData(data.filter((data) => data.id !== item.id));
  };

  //add function
  const AddItem = () => {
    const newItem: iList = {
      userId: 0,
      id: data.length + 1,
      title: input,
      completed: false,
    };
    const tempList: iList[] = [newItem, ...data];

    setData(tempList);
  };

  return (
    <>
    {/* Add Item */}
      <Button variant="outline-success" onClick={handleShow}>
        Add Item
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Title</h3>
          <input onChange={(e) => setInput(e.target.value)}></input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              AddItem();
              handleClose();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Updating */}
      <Modal show={showUpdate} onHide={handleCloseUpdate} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Update Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Title</h3>
          <input onChange={(e) => setInputUpdate(e.target.value)}></input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdate}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <ListGroup>
        {data.map((data) => (
          <ListGroupItem key={data.id}>
            <div className="d-flex justify-content-between"></div>
            <p>{data.title}</p>
            <div>
              <div>
                <Button variant="outline-primary">Update</Button>
                <Button
                  onClick={() => deleteData(data)}
                  variant="outline-danger"
                >
                  Delete
                </Button>
              </div>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </>
  );
};

export default FetchData;
