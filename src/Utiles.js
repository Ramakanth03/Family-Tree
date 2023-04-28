export const options = [
  {
    label: "React Org Chart",
    value: "react-orgchart",
  },
  {
    label: "React Organizational Chart",
    value: "react-organizational-chart",
  },
  {
    label: "React D3 Tree",
    value: "react-d3-tree",
  },
];
export const initechOrg = {
  id: 1,
  name: "Bill Lumbergh",
  actor: "Gary Cole",
  children: [
    {
      id: 2,
      name: "Peter Gibbons",
      actor: "Ron Livingston",
      children: [
        {
          id: 5,
          name: "And More!!",
          actor:
            "This is just to show how to build a complex tree with multiple levels of children. Enjoy!",
        },
      ],
    },
    {
      id: 3,
      name: "Milton Waddams",
      actor: "Stephen Root",
    },
    {
      id: 4,
      name: "Bob Slydell",
      actor: "John C. McGi...",
    },
  ],
};

export const orgData = [
  {
    id: 1,
    name: "Denny Curtis",
    title: "CEO",
    img: "https://cdn.balkan.app/shared/2.jpg",
  },
  {
    id: 2,
    pid: 1,
    name: "Ashley Barnett",
    title: "Sales Manager",
    img: "https://cdn.balkan.app/shared/3.jpg",
  },
  {
    id: 3,
    pid: 1,
    name: "Caden Ellison",
    title: "Dev Manager",
    img: "https://cdn.balkan.app/shared/4.jpg",
  },
  {
    id: 4,
    pid: 2,
    name: "Elliot Patel",
    title: "Sales",
    img: "https://cdn.balkan.app/shared/5.jpg",
  },
  {
    id: 5,
    pid: 2,
    name: "Lynn Hussain",
    title: "Sales",
    img: "https://cdn.balkan.app/shared/6.jpg",
  },
  {
    id: 6,
    pid: 3,
    name: "Tanner May",
    title: "Developer",
    img: "https://cdn.balkan.app/shared/7.jpg",
  },
  {
    id: 7,
    pid: 3,
    name: "Fran Parsons",
    title: "Developer",
    img: "https://cdn.balkan.app/shared/8.jpg",
  },
];

export const updatePropertyById = function (id, data, property, value) {
  if (data.id === id) {
    data[property] = value;
  }
  if (data.children !== undefined && data.children.length > 0) {
    for (let i = 0; i < data.children.length; i++) {
      data.children[i] = updatePropertyById(
        id,
        data.children[i],
        property,
        value
      );
    }
  }

  return data;
};

export const deleteObjectById = function (obj, id) {
  if (obj.id === id) {
    return null;
  }
  if (obj.children && obj.children.length > 0) {
    obj.children = obj.children.filter(
      (child) => deleteObjectById(child, id) !== null
    );
  }
  return obj;
};
