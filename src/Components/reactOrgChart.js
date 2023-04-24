import OrgChart from "react-orgchart";
import "react-orgchart/index.css";

const initechOrg = {
  name: "Bill Lumbergh",
  actor: "Gary Cole",
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

const MyNodeComponent = ({ node }) => {
  return (
    <>
      <div
        className="initechNode"
        onClick={() => alert("Hi my real name is: " + node.actor)}
      >
        <img
          src={"https://picsum.photos/200"}
          alt="Girl in a jacket"
          width="50"
          height="60"
        />
        <div>{node.name}</div>
      </div>
    </>
  );
};

const ReactOrgChart = () => (
  <OrgChart tree={initechOrg} NodeComponent={MyNodeComponent} />
);
export default ReactOrgChart;
