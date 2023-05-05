import OrgChart from "react-orgchart";
import "react-orgchart/index.css";
import BasicExample from "./modelPopup";
import { useState } from "react";
import {
  updatePropertyByIdMultiple,
  deleteObjectById,
  initechOrg,
} from "../Utiles";
import ViewIcon from "../Util/ViewIcon.svg";
import EditIcon from "../Util/EditIcon.svg";
import AddIcon from "../Util/AddIcon.svg";
import DeleteIcon from "../Util/DeleteIcon.svg";
import profile from "../Util/profile.png";
import PlusIcon from "../Util/PlusIcon.svg";
import MinusIcon from "../Util/MinusIcon.svg";

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
    const onToggleHandler = (node) => {
      console.log("node -- ", node);
      let updatedNode = { ...node };
      if (!updatedNode.isCollapse) {
        updatedNode.isCollapse = true;
        updatedNode.hideChildren = [...updatedNode.children];
        updatedNode.children = [];
        const updateTreeData = updatePropertyByIdMultiple(
          updatedNode.id,
          treeData,
          updatedNode
        );
        console.log("updateTreeData -- ", updateTreeData);
        setTreeData({ ...updateTreeData });
      } else {
        updatedNode.isCollapse = false;
        updatedNode.children = [...updatedNode.hideChildren];
        updatedNode.hideChildren = [];
        const updateTreeData = updatePropertyByIdMultiple(
          updatedNode.id,
          treeData,
          updatedNode
        );
        console.log("updateTreeData -- ", updateTreeData);
        setTreeData({ ...updateTreeData });
      }
    };
    return (
      <>
        <div className="initechNode">
          <img
            src={node.image ? node.image : profile}
            alt="profile"
            width="100"
            height="100"
          />
          <div>{node.name}</div>
          <img
            src={ViewIcon}
            alt="svg icon"
            className="text-btn"
            onClick={() => onProfileClick(node, "info")}
          />
          <img
            src={EditIcon}
            alt="svg icon"
            className="text-btn"
            onClick={() => onProfileClick(node, "edit profile")}
          />

          {node.id !== treeData.id && (
            <img
              src={DeleteIcon}
              alt="svg icon"
              className="text-btn"
              onClick={() => onProfileClick(node, "delete")}
            />
          )}
          <img
            src={AddIcon}
            alt="svg icon"
            className="text-btn"
            onClick={() => onProfileClick(node, "add")}
          />
        </div>
        {node.children && (
          <div>
            {node.isCollapse ? (
              <img
                src={PlusIcon}
                alt="svg icon"
                className="text-btn isCollapse"
                onClick={() => onToggleHandler(node)}
              />
            ) : (
              <img
                src={MinusIcon}
                alt="svg icon"
                className="text-btn isCollapse"
                onClick={() => onToggleHandler(node)}
              />
            )}
          </div>
        )}
      </>
    );
  };

  const onSubmit = (updatedNode) => {
    setIsModelOpen(false);
    console.log("updatedNode -- ", updatedNode);
    const updateTreeData = updatePropertyByIdMultiple(
      updatedNode.id,
      treeData,
      updatedNode
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
    <div style={{ padding: 30 }}>
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
