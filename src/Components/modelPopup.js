import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";

function BasicExample({ mode, show, node, onSubmit, handleClose }) {
  const [data, setData] = useState(node);
  const [name, setName] = useState(mode === "edit" ? node.name : "");
  const onChangeHandler = (e) => {
    setName(e.target.value);
    if (mode === "edit") {
      setData({ ...data, name: e.target.value });
    }
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>
            <b>{mode !== "add" ? mode.toUpperCase() : "ADD CHILDREN to "}</b>{" "}
            {node.name}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {(mode === "edit" || mode === "add") && (
            <Form
              onSubmit={(event) => {
                event.preventDefault();
                if (mode === "add") {
                  let child = {
                    id: data.id + "1",
                    actor: name,
                    name: name,
                  };
                  let withNewchildren = [];
                  if (data.children) {
                    withNewchildren = data.children;
                    withNewchildren.push(child);
                  }
                  let dataChild = {
                    ...data,
                    ...(!data.children && {
                      children: [child],
                    }),
                    ...(data.children && {
                      children: withNewchildren,
                    }),
                  };
                  console.log("dataChild -- ", dataChild);
                  setData(dataChild);
                  onSubmit(dataChild);
                } else {
                  console.log("data -- ", data);
                  onSubmit(data);
                }
              }}
            >
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={onChangeHandler}
              />
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          )}
          {mode === "view" && (
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>{node.name}</Card.Title>
                {node.children?.length && (
                  <Card.Subtitle className="mb-2 text-muted">
                    {node.name} has {node.children.length} children
                  </Card.Subtitle>
                )}
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </Modal.Body>
      </Modal.Dialog>
    </Modal>
    // </div>
  );
}

export default BasicExample;
