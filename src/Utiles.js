export const initechOrg = {
  id: 1,
  name: "Bill Lumbergh",
  actor: "Gary Cole",
  isCollapse: false,
  children: [
    {
      id: 2,
      name: "Peter Gibbons",
      actor: "Ron Livingston",
      isCollapse: false,
      children: [
        {
          id: 5,
          name: "And More!!",
          actor:
            "This is just to show how to build a complex tree with multiple levels of children. Enjoy!",
          isCollapse: false,
        },
      ],
    },
    {
      id: 3,
      name: "Milton Waddams",
      actor: "Stephen Root",
      isCollapse: false,
    },
    {
      id: 4,
      name: "Bob Slydell",
      actor: "John C. McGi...",
      isCollapse: false,
    },
  ],
};

export const updatePropertyByIdMultiple = function (id, data, obj = {}) {
  if (data.id === id) {
    for (const property in obj) {
      data[property] = obj[property];
    }
  }
  if (data.children !== undefined && data.children.length > 0) {
    for (let i = 0; i < data.children.length; i++) {
      data.children[i] = updatePropertyByIdMultiple(id, data.children[i], obj);
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
    if (!obj.children.length) delete obj.children;
  }
  return obj;
};
