import { useState } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import styled from "styled-components";

const initechOrg = {
  name: "Bill Lumbergh",
  actor: "Gary Cole",
  isExpand: true,
  children: [
    {
      name: "Peter Gibbons",
      actor: "Ron Livingston",
      children: [
        {
          name: "And More!!",
          actor:
            "This is just to show how to build a complex tree with multiple levels of children. Enjoy!",
        },
      ],
    },
    {
      name: "Milton Waddams",
      actor: "Stephen Root",
    },
    {
      name: "Bob Slydell",
      actor: "John C. McGi...",
    },
  ],
};

const StyledNode = styled.div`
  padding: 5px;
  border-radius: 8px;
  display: inline-block;
  border: 1px solid red;
`;
const ProfileCard = ({ name, clickHandler, isExpand, isRoot = false }) => {
  const StyledCard = () => (
    <StyledNode>
      <img
        src={"https://picsum.photos/200"}
        alt="Girl in a jacket"
        width="50"
        height="60"
      />
      <div>{name}</div>

      <button onClick={clickHandler}>{isExpand ? "+" : "-"}</button>
    </StyledNode>
  );
  return isRoot ? (
    <StyledCard />
  ) : (
    <TreeNode>
      <StyledCard />
    </TreeNode>
  );
};

const StyledTreeExample = () => {
  const [plus, setPlus] = useState(true);

  const handleClick = () => {
    setPlus(!plus);
  };
  return (
    <Tree
      lineWidth={"2px"}
      lineColor={"green"}
      lineBorderRadius={"10px"}
      label={
        <ProfileCard
          isRoot
          name={initechOrg.name}
          isExpand={initechOrg.isExpand}
          clickHandler={handleClick}
        />
      }
    >
      (
      {initechOrg.children.map((node) => (
        <TreeNode
          key={node.name}
          label={<StyledNode>{node.name}</StyledNode>}
        ></TreeNode>
      ))}
      )
      {false ? (
        <>
          <TreeNode label={<StyledNode>Child 1</StyledNode>}>
            <TreeNode label={<StyledNode>Grand Child</StyledNode>} />
          </TreeNode>
          <TreeNode label={<StyledNode>Child 2</StyledNode>}>
            <TreeNode label={<StyledNode>Grand Child</StyledNode>}>
              <TreeNode label={<StyledNode>Great Grand Child 1</StyledNode>} />
              <TreeNode label={<StyledNode>Great Grand Child 2</StyledNode>} />
            </TreeNode>
          </TreeNode>
          <TreeNode label={<StyledNode>Child 3</StyledNode>}>
            <TreeNode label={<StyledNode>Grand Child 1</StyledNode>} />
            <TreeNode label={<StyledNode>Grand Child 2</StyledNode>} />
          </TreeNode>
        </>
      ) : null}
    </Tree>
  );
};

export default StyledTreeExample;
