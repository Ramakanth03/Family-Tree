import OrgChart from "react-orgchart";
import "react-orgchart/index.css";
import BasicExample from "./modelPopup";
import { useState } from "react";
import { updatePropertyById, deleteObjectById, initechOrg } from "../Utiles";
import ViewIcon from "../Util/ViewIcon.svg";
import EditIcon from "../Util/EditIcon.svg";
import AddIcon from "../Util/AddIcon.svg";
import DeleteIcon from "../Util/DeleteIcon.svg";

const ReactOrgChart = () => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [curentNode, setCurentNode] = useState({});
  const [mode, setMode] = useState("");
  const [treeData, setTreeData] = useState(initechOrg);

  const MyNodeComponent = ({ node }) => {
    const onProfileClick = (node, mode) => {
      if (mode === "delete") {
        const newData = { ...treeData };
        setMode(mode);
        if (window.confirm(`Are you sure you want to delete ${node.name}?`)) {
          const modifiedTreeData = deleteObjectById(newData, node.id);
          console.log(modifiedTreeData);
          setTreeData(newData);
        }
        console.log(node);
      } else {
        console.log(node);
        setCurentNode(node);
        setIsModelOpen(true);
        setMode(mode);
      }
    };
    return (
      <div className="initechNode">
        <img
          src={"https://picsum.photos/200"}
          alt="Girl in a jacket"
          width="100"
          height="100"
        />
        <div>{node.name}</div>
        <img
          src={ViewIcon}
          alt="svg icon"
          className="text-btn"
          onClick={() => onProfileClick(node, "view")}
        />
        <img
          src={EditIcon}
          alt="svg icon"
          className="text-btn"
          onClick={() => onProfileClick(node, "edit")}
        />
        <img
          src={AddIcon}
          alt="svg icon"
          className="text-btn"
          onClick={() => onProfileClick(node, "add")}
        />

        {node.id !== treeData.id && (
          <img
            src={DeleteIcon}
            alt="svg icon"
            className="text-btn"
            onClick={() => onProfileClick(node, "delete")}
          />
        )}
      </div>
    );
  };

  const onSubmit = (updatedNode) => {
    setIsModelOpen(false);
    console.log("updatedNode -- ", updatedNode);
    const updateTreeData = updatePropertyById(
      updatedNode.id,
      treeData,
      mode === "edit" ? "name" : "children",
      mode === "edit" ? updatedNode.name : updatedNode.children
    );
    setTreeData(updateTreeData);
    setMode("");
  };
  const handleClose = () => {
    setIsModelOpen(false);
    setCurentNode({});
    setMode("");
  };
  return (
    <div style={{ padding: 20 }}>
      <OrgChart tree={treeData} NodeComponent={MyNodeComponent} />
      {isModelOpen && (
        <BasicExample
          show={isModelOpen}
          mode={mode}
          node={curentNode}
          onSubmit={onSubmit}
          handleClose={handleClose}
        />
      )}
    </div>
  );
};
export default ReactOrgChart;
