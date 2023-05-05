import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ModalFooter } from "react-bootstrap";

function BasicExample({ mode, show, node, onSubmit, handleClose }) {
  const [data, setData] = useState(node);
  const [name, setName] = useState(mode === "edit profile" ? node.name : "");
  const [image, setImage] = useState(
    mode === "edit profile" ? node.image || "" : ""
  );
  const onChangeHandler = (e) => {
    if (e.target.name === "name") setName(e.target.value);
    if (e.target.name === "image") setImage(e.target.value);
    if (mode === "edit profile") {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };
  return (
    <Modal
      style={{
        paddingTop: "150px",
        textAlign: "center",
      }}
      show={show}
      onHide={handleClose}
    >
      <Modal.Header style={{ backgroundColor: "#039BE5" }} closeButton>
        <Modal.Title style={{ color: "#FFFFFF" }}>
          <b>{mode !== "add" ? mode.toUpperCase() : "ADD"}</b>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {(mode === "edit profile" || mode === "add") && (
          <Form
            onSubmit={(event) => {
              event.preventDefault();
              if (mode === "add") {
                let child = {
                  id: data.id + "." + data.children?.length,
                  actor: name,
                  name: name,
                  isCollapse: false,
                  ...(image && { image: image }),
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
              name="name"
              onChange={onChangeHandler}
            />{" "}
            <br />
            <Form.Control
              type="text"
              placeholder="Enter image URL"
              value={image}
              name="image"
              onChange={onChangeHandler}
            />
            <br />
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        )}
        {mode === "info" && (
          <div>
            <div>
              <b>{node.name}</b>
              {node.children?.length && (
                <div className="mb-3 text-muted">
                  {node.name} has {node.children.length} children
                </div>
              )}
              <h6>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </h6>
            </div>
          </div>
        )}
      </Modal.Body>
      <ModalFooter></ModalFooter>
    </Modal>
  );
}

export default BasicExample;
